from enum import Enum
from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field

class ChannelType(str, Enum):
    EMAIL = "email"
    SLACK = "slack"
    SMS = "sms"

class ThreatTier(str, Enum):
    CLEAN = "Clean"
    ADVISORY = "Advisory"
    SUSPICIOUS = "Suspicious"
    CRITICAL_SPEAR_PHISH = "Active AI Spear-Phish"

class MessagePayload(BaseModel):
    id: str
    channel: ChannelType
    sender_name: str
    sender_address: str
    recipient: str
    subject: Optional[str] = None
    content: str
    headers: Optional[Dict[str, str]] = None
    timestamp: Optional[str] = None

class PsychologicalTrigger(BaseModel):
    category: str  # e.g. "Authority", "Scarcity/Urgency", "Social Proof", "Reciprocity"
    score: float   # 0.0 - 1.0
    matched_text: str
    explanation: str

class TextSpanHighlight(BaseModel):
    start: int
    end: int
    text: str
    vector: str     # e.g. "Authority Pressure", "Artificial Urgency", "Channel Migration Anomaly"
    severity: str   # "high", "medium", "low"
    explanation: str

class LegacyFilterResult(BaseModel):
    is_flagged: bool
    spam_score: int  # 0 to 100
    status_label: str  # "Clean (Passed)", "Spam Blocked"
    reason: str

class RadarScores(BaseModel):
    identity_risk: int        # 0 - 100
    coercion_pressure: int    # 0 - 100
    sop_deviation: int        # 0 - 100
    channel_risk: int         # 0 - 100

class SocraticQuiz(BaseModel):
    question: str
    options: List[str]
    correct_index: int
    explanation: str
    rule_of_thumb: str

class InoculationData(BaseModel):
    tactical_summary: str
    why_legacy_missed: str
    contrastive_authentic: str
    quiz: SocraticQuiz

class AnalysisResult(BaseModel):
    message_id: str
    channel: ChannelType
    is_ai_phishing: bool
    overall_threat_score: int  # 0 - 100
    threat_tier: ThreatTier
    summary: str
    legacy_comparison: LegacyFilterResult
    radar_scores: RadarScores
    triggers: List[PsychologicalTrigger]
    highlights: List[TextSpanHighlight]
    inoculation: InoculationData

class VerificationRequest(BaseModel):
    message_id: str
    selected_option_index: int

class VerificationResponse(BaseModel):
    is_correct: bool
    explanation: str
    rule_of_thumb: str
    badge_awarded: Optional[str] = None

class AdversarialGenerateRequest(BaseModel):
    channel: ChannelType
    target_role: str   # e.g., "Finance Director", "DevOps Engineer", "HR Specialist"
    scenario: str      # e.g., "Urgent Wire Transfer", "SSO Credential Re-verification"
    sophistication: str = "advanced"


class AdversarialGenerateResponse(BaseModel):
    message: MessagePayload
    analysis: AnalysisResult
    reconstructed_attacker_prompt: str
