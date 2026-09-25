import pytest
from app.core.models import ChannelType, ThreatTier, AdversarialGenerateRequest
from app.services.heuristics import check_domain_typosquatting
from app.data.benchmark_cases import BENCHMARK_CASES, get_benchmark_by_id
from app.services.llm_agents import run_multi_agent_analysis
from app.services.inoculation import evaluate_quiz_submission
from app.services.adversarial import generate_adversarial_attack

def test_typosquatting_detection():
    # PayPal lookalike
    res = check_domain_typosquatting("paypa1-security.com")
    assert res["is_suspicious"] is True
    assert res["matched_brand"] == "paypal.com"

    # Legitimate internal
    res_clean = check_domain_typosquatting("acme-corp.internal")
    assert res_clean["is_suspicious"] is False

def test_benchmark_suite_completeness():
    assert len(BENCHMARK_CASES) >= 6
    channels = {c.channel for c in BENCHMARK_CASES}
    assert ChannelType.EMAIL in channels
    assert ChannelType.SLACK in channels
    assert ChannelType.SMS in channels

def test_email_ai_spear_phish_detection():
    case = get_benchmark_by_id("email_ai_spear_phish")
    result = run_multi_agent_analysis(case)
    
    assert result.is_ai_phishing is True
    assert result.overall_threat_score >= 80
    assert result.threat_tier == ThreatTier.CRITICAL_SPEAR_PHISH
    # Crucial test: Legacy filter must have passed it (the AI blindspot!)
    assert result.legacy_comparison.is_flagged is False
    assert result.legacy_comparison.status_label == "Clean (Passed)"
    # ZeroBait must have caught psychological triggers and highlights
    assert len(result.triggers) > 0
    assert len(result.highlights) > 0

def test_slack_ai_phish_detection():
    case = get_benchmark_by_id("slack_ai_it_sso")
    result = run_multi_agent_analysis(case)
    
    assert result.is_ai_phishing is True
    assert result.overall_threat_score >= 80
    assert result.radar_scores.channel_risk > 70
    assert len(result.highlights) > 0

def test_sms_ai_smish_detection():
    case = get_benchmark_by_id("sms_ai_bank_smish")
    result = run_multi_agent_analysis(case)
    
    assert result.is_ai_phishing is True
    assert result.overall_threat_score >= 80
    assert len(result.triggers) > 0

def test_clean_message_not_flagged():
    case = get_benchmark_by_id("email_clean_allhands")
    result = run_multi_agent_analysis(case)
    
    assert result.is_ai_phishing is False
    assert result.threat_tier == ThreatTier.CLEAN
    assert result.overall_threat_score < 30

def test_adversarial_attack_generation():
    req = AdversarialGenerateRequest(
        channel=ChannelType.SLACK,
        target_role="DevOps Lead",
        scenario="Kubernetes Cluster Root Token Rotation",
        sophistication="advanced"
    )
    res = generate_adversarial_attack(req)
    assert res.analysis.is_ai_phishing is True
    assert res.analysis.overall_threat_score >= 80
    assert res.message is not None
    assert len(res.reconstructed_attacker_prompt) > 20

def test_inoculation_quiz_verification():
    correct = evaluate_quiz_submission(0, 0, "Test Rule")
    assert correct.is_correct is True
    assert correct.badge_awarded is not None

    incorrect = evaluate_quiz_submission(0, 1, "Test Rule")
    assert incorrect.is_correct is False
    assert incorrect.badge_awarded is None
