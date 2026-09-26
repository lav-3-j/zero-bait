import os
import json
import sqlite3
import httpx
from typing import Optional, List, Dict, Any
from pathlib import Path
from dotenv import load_dotenv

# Load .env file from backend or root directory
load_dotenv(Path(__file__).resolve().parent.parent.parent / ".env")
load_dotenv(Path(__file__).resolve().parent.parent.parent.parent / ".env")

SUPABASE_URL = os.getenv("SUPABASE_URL", "https://ycvebygthrneehraxgif.supabase.co")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

supabase_client = None
if SUPABASE_URL and SUPABASE_KEY:
    try:
        from supabase import create_client, Client, ClientOptions
        supabase_client: Optional[Client] = create_client(
            SUPABASE_URL,
            SUPABASE_KEY,
            options=ClientOptions(httpx_client=httpx.Client(verify=False))
        )
        print(f"Connected to Supabase PostgreSQL at {SUPABASE_URL}")
    except Exception as e:
        print(f"Supabase init notice: {e}. Falling back to SQLite.")

# Local SQLite fallback database path
DB_PATH = Path(__file__).resolve().parent.parent.parent / "zerobait.db"

def init_sqlite_db():
    conn = sqlite3.connect(str(DB_PATH))
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS incidents (
            id TEXT PRIMARY KEY,
            channel TEXT NOT NULL,
            sender_name TEXT NOT NULL,
            sender_address TEXT NOT NULL,
            recipient TEXT NOT NULL,
            subject TEXT,
            content TEXT NOT NULL,
            headers TEXT,
            overall_threat_score INTEGER NOT NULL,
            threat_tier TEXT NOT NULL,
            is_ai_phishing INTEGER NOT NULL,
            created_at TEXT NOT NULL
        )
    """)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS analyses (
            id TEXT PRIMARY KEY,
            incident_id TEXT NOT NULL,
            radar_scores TEXT NOT NULL,
            triggers TEXT NOT NULL,
            legacy_comparison TEXT NOT NULL,
            highlights TEXT NOT NULL,
            summary TEXT NOT NULL,
            created_at TEXT NOT NULL
        )
    """)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS inoculation_drills (
            id TEXT PRIMARY KEY,
            user_email TEXT NOT NULL,
            incident_id TEXT NOT NULL,
            selected_option_index INTEGER NOT NULL,
            is_correct INTEGER NOT NULL,
            badge_awarded TEXT,
            created_at TEXT NOT NULL
        )
    """)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS audit_logs (
            id TEXT PRIMARY KEY,
            event_type TEXT NOT NULL,
            user_email TEXT NOT NULL,
            ip_address TEXT,
            details TEXT,
            created_at TEXT NOT NULL
        )
    """)
    conn.commit()
    conn.close()

# Initialize local fallback on startup
init_sqlite_db()

def save_incident_and_analysis(payload: Dict[str, Any], analysis: Dict[str, Any]):
    from datetime import datetime, timezone
    now = datetime.now(timezone.utc).isoformat()

    # 1. Try Supabase
    if supabase_client:
        try:
            supabase_client.table("incidents").upsert({
                "id": payload.get("id"),
                "channel": payload.get("channel"),
                "sender_name": payload.get("sender_name"),
                "sender_address": payload.get("sender_address"),
                "recipient": payload.get("recipient"),
                "subject": payload.get("subject"),
                "content": payload.get("content"),
                "headers": payload.get("headers"),
                "overall_threat_score": analysis.get("overall_threat_score"),
                "threat_tier": str(analysis.get("threat_tier")),
                "is_ai_phishing": bool(analysis.get("is_ai_phishing")),
                "created_at": now
            }).execute()

            supabase_client.table("analyses").insert({
                "incident_id": payload.get("id"),
                "radar_scores": analysis.get("radar_scores"),
                "triggers": analysis.get("triggers"),
                "legacy_comparison": analysis.get("legacy_comparison"),
                "highlights": analysis.get("highlights"),
                "summary": analysis.get("summary"),
                "created_at": now
            }).execute()
            return
        except Exception as e:
            print(f"Supabase write error: {e}. Writing to SQLite fallback.")

    # 2. SQLite Fallback
    try:
        conn = sqlite3.connect(str(DB_PATH))
        cursor = conn.cursor()
        cursor.execute("""
            INSERT OR REPLACE INTO incidents 
            (id, channel, sender_name, sender_address, recipient, subject, content, headers, overall_threat_score, threat_tier, is_ai_phishing, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            payload.get("id"),
            payload.get("channel"),
            payload.get("sender_name"),
            payload.get("sender_address"),
            payload.get("recipient"),
            payload.get("subject"),
            payload.get("content"),
            json.dumps(payload.get("headers")) if payload.get("headers") else None,
            analysis.get("overall_threat_score", 0),
            str(analysis.get("threat_tier", "Safe")),
            1 if analysis.get("is_ai_phishing") else 0,
            now
        ))
        cursor.execute("""
            INSERT INTO analyses 
            (id, incident_id, radar_scores, triggers, legacy_comparison, highlights, summary, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            f"ana_{now}",
            payload.get("id"),
            json.dumps(analysis.get("radar_scores")),
            json.dumps(analysis.get("triggers")),
            json.dumps(analysis.get("legacy_comparison")),
            json.dumps(analysis.get("highlights")),
            analysis.get("summary"),
            now
        ))
        conn.commit()
        conn.close()
    except Exception as e:
        print(f"SQLite save error: {e}")

def save_drill_result(user_email: str, incident_id: str, selected_option_index: int, is_correct: bool, badge: Optional[str]):
    from datetime import datetime, timezone
    now = datetime.now(timezone.utc).isoformat()

    if supabase_client:
        try:
            supabase_client.table("inoculation_drills").insert({
                "user_email": user_email,
                "incident_id": incident_id,
                "selected_option_index": selected_option_index,
                "is_correct": is_correct,
                "badge_awarded": badge,
                "created_at": now
            }).execute()
            return
        except Exception as e:
            print(f"Supabase drill insert error: {e}")

    try:
        conn = sqlite3.connect(str(DB_PATH))
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO inoculation_drills 
            (id, user_email, incident_id, selected_option_index, is_correct, badge_awarded, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        """, (f"drill_{now}", user_email, incident_id, selected_option_index, 1 if is_correct else 0, badge, now))
        conn.commit()
        conn.close()
    except Exception as e:
        print(f"SQLite drill save error: {e}")

def log_audit_event(event_type: str, user_email: str, details: Dict[str, Any], ip_address: str = "127.0.0.1"):
    from datetime import datetime, timezone
    now = datetime.now(timezone.utc).isoformat()

    if supabase_client:
        try:
            supabase_client.table("audit_logs").insert({
                "event_type": event_type,
                "user_email": user_email,
                "ip_address": ip_address,
                "details": details,
                "created_at": now
            }).execute()
            return
        except Exception as e:
            print(f"Supabase audit log insert error: {e}")

    try:
        conn = sqlite3.connect(str(DB_PATH))
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO audit_logs 
            (id, event_type, user_email, ip_address, details, created_at)
            VALUES (?, ?, ?, ?, ?, ?)
        """, (f"audit_{now}", event_type, user_email, ip_address, json.dumps(details), now))
        conn.commit()
        conn.close()
    except Exception as e:
        print(f"SQLite audit log save error: {e}")
