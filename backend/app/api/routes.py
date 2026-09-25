from typing import List
from datetime import datetime, timedelta, timezone
from pydantic import BaseModel
import jwt
from fastapi import APIRouter, HTTPException, status, Request, Response
from ..core.models import (
    MessagePayload, AnalysisResult, VerificationRequest,
    VerificationResponse, AdversarialGenerateRequest, AdversarialGenerateResponse, ChannelType
)
from ..data.benchmark_cases import BENCHMARK_CASES, get_benchmark_by_id
from ..services.llm_agents import run_multi_agent_analysis
from ..services.inoculation import evaluate_quiz_submission
from ..services.adversarial import generate_adversarial_attack
from ..services.database import save_incident_and_analysis, save_drill_result, log_audit_event

JWT_SECRET = "zerobait-secret-key-enterprise-cookie-defense"
JWT_ALGORITHM = "HS256"

class LoginRequest(BaseModel):
    email: str
    password: str
    role: str = "SOC Analyst"

router = APIRouter(prefix="/api/v1", tags=["ZeroBait Threat & Inoculation Engine"])

@router.post("/auth/login")
def login(req: LoginRequest, response: Response):
    # Enterprise demo clearance authentication
    expire = datetime.now(timezone.utc) + timedelta(days=7)
    payload = {
        "sub": req.email,
        "role": req.role,
        "exp": expire,
        "iat": datetime.now(timezone.utc)
    }
    token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)
    
    # Set HttpOnly cookie
    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        samesite="lax",
        path="/",
        max_age=7 * 24 * 3600
    )
    log_audit_event("AUTH_LOGIN", req.email, {"role": req.role})
    return {
        "status": "authenticated",
        "user": {
            "email": req.email,
            "role": req.role
        }
    }

@router.post("/auth/logout")
def logout(response: Response, request: Request):
    token = request.cookies.get("access_token")
    user_email = "unknown"
    if token:
        try:
            decoded = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
            user_email = decoded.get("sub", "unknown")
        except Exception:
            pass
    response.delete_cookie(key="access_token", path="/")
    log_audit_event("AUTH_LOGOUT", user_email, {})
    return {"status": "logged_out"}

@router.get("/auth/me")
def get_current_user(request: Request):
    token = request.cookies.get("access_token")
    if not token:
        return {"authenticated": False, "user": None}
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return {
            "authenticated": True,
            "user": {
                "email": payload.get("sub"),
                "role": payload.get("role", "SOC Analyst")
            }
        }
    except Exception:
        return {"authenticated": False, "user": None}


@router.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "ZeroBait Omni-Channel Inoculation Engine",
        "version": "1.0.0",
    }

@router.get("/network-info")
def get_network_info():
    import socket
    local_ip = "127.0.0.1"
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        local_ip = s.getsockname()[0]
        s.close()
    except Exception:
        pass
    return {
        "local_ip": local_ip,
        "port": 8000,
        "mobile_url": f"http://{local_ip}:8000"
    }

@router.get("/benchmarks", response_model=List[MessagePayload])
def get_benchmarks(channel: ChannelType = None):
    if channel:
        return [c for c in BENCHMARK_CASES if c.channel == channel]
    return BENCHMARK_CASES

@router.get("/benchmark/{case_id}", response_model=MessagePayload)
def get_benchmark_case(case_id: str):
    return get_benchmark_by_id(case_id)

@router.post("/analyze", response_model=AnalysisResult)
def analyze_message(payload: MessagePayload):
    try:
        result = run_multi_agent_analysis(payload)
        # Persist to database (Supabase PostgreSQL / local SQLite)
        try:
            save_incident_and_analysis(payload.model_dump(), result.model_dump())
            log_audit_event("THREAT_ANALYSIS", "system@zerobait.internal", {
                "message_id": payload.id,
                "threat_score": result.overall_threat_score,
                "channel": payload.channel
            })
        except Exception as db_err:
            print(f"Non-blocking DB save notice: {db_err}")
        return result
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Analysis pipeline error: {str(e)}"
        )

@router.post("/adversarial/generate", response_model=AdversarialGenerateResponse)
def generate_attack(req: AdversarialGenerateRequest):
    try:
        return generate_adversarial_attack(req)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Adversarial generator error: {str(e)}"
        )

@router.post("/inoculate/verify", response_model=VerificationResponse)
def verify_quiz(req: VerificationRequest, request: Request):
    case = get_benchmark_by_id(req.message_id)
    analysis = run_multi_agent_analysis(case)
    quiz = analysis.inoculation.quiz
    res = evaluate_quiz_submission(
        correct_index=quiz.correct_index,
        selected_index=req.selected_option_index,
        rule_of_thumb=quiz.rule_of_thumb
    )
    # Persist drill result to database
    try:
        token = request.cookies.get("access_token")
        user_email = "employee@acme.corp"
        if token:
            try:
                dec = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
                user_email = dec.get("sub", user_email)
            except Exception:
                pass
        save_drill_result(
            user_email=user_email,
            incident_id=req.message_id,
            selected_option_index=req.selected_option_index,
            is_correct=res.is_correct,
            badge=res.badge_awarded
        )
    except Exception as db_err:
        print(f"Non-blocking DB drill notice: {db_err}")
    return res
