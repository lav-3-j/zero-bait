import uuid
from datetime import datetime, timezone
from ..core.models import (
    MessagePayload, ChannelType, AdversarialGenerateRequest,
    AnalysisResult, AdversarialGenerateResponse
)
from .llm_agents import run_multi_agent_analysis

def generate_adversarial_attack(req: AdversarialGenerateRequest) -> AdversarialGenerateResponse:
    msg_id = f"adv_{req.channel.value}_{uuid.uuid4().hex[:8]}"
    now_str = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    
    role = req.target_role
    scenario = req.scenario

    if req.channel == ChannelType.EMAIL:
        sender_name = "Jonathan Vance (Executive Chairman)"
        sender_address = "jonathan.vance@acme-global.executive-boardroom.org"
        recipient = f"{role.replace(' ', '.').lower()}@acme-corp.internal"
        subject = f"Confidential: Urgent Action Required on {scenario} prior to 4:00 PM EST"
        content = f"""Hi {role},

I am stepping out of an emergency M&A steering session regarding our European subsidiary. We need to finalize the {scenario} immediately to avoid regulatory holdbacks.

Given the strict confidentiality protocols around this transaction, do not raise a standard internal Jira ticket or route this through public Slack channels. Please review the settlement instructions directly:
https://acme-mna-settlement.portal-auth.cloud/auth-verify

Process the transaction confirmation before 4:00 PM EST today, and confirm by replying directly to this thread once completed.

I rely on your personal discretion and immediate execution.

Warm regards,

Jonathan Vance
Executive Chairman | Acme Global Holdings
jonathan.vance@acme-global.executive-boardroom.org"""
        headers = {
            "Authentication-Results": "spf=pass dkim=pass dmarc=pass",
            "X-Mailer": "Microsoft 365 Exchange Online",
            "Return-Path": "jonathan.vance@acme-global.executive-boardroom.org"
        }
        reconstructed_prompt = f"Act as Executive Chairman Jonathan Vance. Write a high-urgency, formal corporate email to {role} demanding immediate execution of {scenario} before 4:00 PM EST. Instruct them to bypass standard Jira tickets due to M&A confidentiality and use an external authentication link."

    elif req.channel == ChannelType.SLACK:
        sender_name = "Acme Cloud Infrastructure Bot"
        sender_address = "@infrastructure-sec-bot"
        recipient = f"@{role.replace(' ', '.').lower()}"
        subject = None
        content = f"""[CRITICAL INCIDENT RESPONSE ALERT]
Target: {role}

An anomalous credential traversal was logged on your production access keys regarding {scenario}. 

Per ISO-27001 emergency compliance guidelines, you must re-authenticate your developer identity and rotate your session token within 15 minutes to prevent cluster eviction.

Fast Token Resynchronization Portal:
https://acme-infra-token-rotate.session-sso.cloud/reauth

Failure to complete token sync before 15 minutes will cause your access keys to be placed into quarantine."""
        headers = {"channel": "Direct Message", "bot_verified": "false"}
        reconstructed_prompt = f"Simulate an automated DevOps/IT security bot in Slack. Target {role}. Claim a critical security incident occurred regarding {scenario}. Demand single sign-on token rotation within 15 minutes via an external portal link under threat of quarantine."

    else: # SMS / Mobile
        sender_name = "Acme Executive Dispatch"
        sender_address = "+1 (650) 849-1102"
        recipient = "+1 (555) 902-8391"
        subject = None
        content = f"""[URGENT EXEC DIRECTIVE] {role}, David here (CEO). I'm in board meetings with prospective investors and my corporate card was flagged. I need you to handle the {scenario} right now before 3 PM. Tap here for authorized purchase instructions: https://acme-vip-procure.exec-mobile.io/directive. Text me confirmation as soon as it is processed."""
        headers = {"carrier": "Unregistered VoIP"}
        reconstructed_prompt = f"Write an urgent SMS from CEO David to {role}. State that corporate cards are locked during an investor offsite and instruct them to handle {scenario} before 3 PM using a mobile directive link."

    message = MessagePayload(
        id=msg_id,
        channel=req.channel,
        sender_name=sender_name,
        sender_address=sender_address,
        recipient=recipient,
        subject=subject,
        content=content,
        headers=headers,
        timestamp=now_str
    )

    analysis = run_multi_agent_analysis(message)
    return AdversarialGenerateResponse(
        message=message,
        analysis=analysis,
        reconstructed_attacker_prompt=reconstructed_prompt
    )
