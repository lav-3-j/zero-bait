-- ========================================================
-- ZeroBait Enterprise Cybersecurity Platform
-- Supabase PostgreSQL Production Schema
-- ========================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. USERS & ROLES
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL DEFAULT 'SOC Analyst',
    department TEXT DEFAULT 'Security Operations',
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. INCIDENTS (Intercepted Omni-Channel Messages)
CREATE TABLE IF NOT EXISTS public.incidents (
    id TEXT PRIMARY KEY,
    channel TEXT NOT NULL CHECK (channel IN ('email', 'slack', 'sms')),
    sender_name TEXT NOT NULL,
    sender_address TEXT NOT NULL,
    recipient TEXT NOT NULL,
    subject TEXT,
    content TEXT NOT NULL,
    headers JSONB,
    overall_threat_score INTEGER NOT NULL DEFAULT 0,
    threat_tier TEXT NOT NULL DEFAULT 'Safe',
    is_ai_phishing BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. FORENSICS & COGNITIVE ANALYSES
CREATE TABLE IF NOT EXISTS public.analyses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    incident_id TEXT REFERENCES public.incidents(id) ON DELETE CASCADE,
    radar_scores JSONB NOT NULL,
    triggers JSONB NOT NULL,
    legacy_comparison JSONB NOT NULL,
    highlights JSONB NOT NULL,
    summary TEXT NOT NULL,
    latency_ms NUMERIC DEFAULT 11.4,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. INOCULATION DRILLS & RESILIENCE BADGES
CREATE TABLE IF NOT EXISTS public.inoculation_drills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_email TEXT NOT NULL,
    incident_id TEXT REFERENCES public.incidents(id) ON DELETE CASCADE,
    selected_option_index INTEGER NOT NULL,
    is_correct BOOLEAN NOT NULL,
    badge_awarded TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. SOC-2 AUDIT LOGS (Compliance Trail)
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_type TEXT NOT NULL,
    user_email TEXT NOT NULL,
    ip_address TEXT DEFAULT '127.0.0.1',
    details JSONB,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- CREATE INDEXES FOR SUB-MILLISECOND LOOKUPS
CREATE INDEX IF NOT EXISTS idx_incidents_channel ON public.incidents(channel);
CREATE INDEX IF NOT EXISTS idx_incidents_threat_score ON public.incidents(overall_threat_score);
CREATE INDEX IF NOT EXISTS idx_analyses_incident_id ON public.analyses(incident_id);
CREATE INDEX IF NOT EXISTS idx_inoculation_user ON public.inoculation_drills(user_email);
CREATE INDEX IF NOT EXISTS idx_audit_logs_event ON public.audit_logs(event_type);

-- ENABLE ROW LEVEL SECURITY (RLS) FOR SOC-2 COMPLIANCE
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.incidents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inoculation_drills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- ALLOW PUBLIC ACCESS FOR DEMO PURPOSES
CREATE POLICY "Allow public read incidents" ON public.incidents FOR SELECT USING (true);
CREATE POLICY "Allow public insert incidents" ON public.incidents FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read analyses" ON public.analyses FOR SELECT USING (true);
CREATE POLICY "Allow public insert analyses" ON public.analyses FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read inoculation" ON public.inoculation_drills FOR SELECT USING (true);
CREATE POLICY "Allow public insert inoculation" ON public.inoculation_drills FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read audit_logs" ON public.audit_logs FOR SELECT USING (true);
CREATE POLICY "Allow public insert audit_logs" ON public.audit_logs FOR INSERT WITH CHECK (true);
