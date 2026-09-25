from typing import Dict, Any
from ..core.models import MessagePayload, ChannelType, InoculationData, SocraticQuiz, VerificationResponse

def generate_inoculation_profile(msg: MessagePayload, threat_tier: str, primary_vector: str) -> InoculationData:
    """
    Generates just-in-time pedagogical inoculation grounded in cognitive psychology.
    Provides contrastive counterfactuals and an interactive Socratic challenge.
    """
    if "clean" in msg.id:
        return InoculationData(
            tactical_summary="This communication follows verified internal protocol with no cognitive coercion.",
            why_legacy_missed="N/A (This is authentic, legitimate traffic).",
            contrastive_authentic=msg.content,
            quiz=SocraticQuiz(
                question="Why is this message considered safe and compliant?",
                options=[
                    "It uses internal verified channels without imposing an artificial urgency deadline",
                    "Because it contains a polite greeting and sign-off",
                    "Because it came during normal working hours",
                    "Because it has no links at all"
                ],
                correct_index=0,
                explanation="Authentic internal communications respect standard workflows and give reasonable lead time without threatening penalties or bypassing ticketing systems.",
                rule_of_thumb="The Calm Workflow Rule: Genuine operational notices provide clear advance notice and reference permanent company documentation."
            )
        )

    if msg.id == "email_legacy_paypal":
        return InoculationData(
            tactical_summary="Classic 2010s-era opportunistic phishing using fear and visual typos.",
            why_legacy_missed="Standard filters DID catch this because of spelling errors ('susppended', 'cust0mer') and failed SPF records.",
            contrastive_authentic="""Dear Alex Mercer,
We detected a new sign-in to your PayPal account from a new device (Firefox on macOS, Austin TX). If this was you, no action is needed. If you did not sign in, please open your official PayPal app or visit paypal.com directly to review your security settings.""",
            quiz=SocraticQuiz(
                question="What is the most immediate technical red flag in this legacy phishing email?",
                options=[
                    "The homoglyph 'cust0mer' and lookalike domain 'paypa1-security-verification.com'",
                    "The email was sent at 11:22 AM",
                    "It mentions credit card information",
                    "It was addressed to Alex Mercer"
                ],
                correct_index=0,
                explanation="Lookalike domains (paypa1 with the digit '1') and homoglyphs are blatant signs of low-tier commodity spam.",
                rule_of_thumb="The Domain Anchor Rule: Always read domain names from right to left before the first forward slash."
            )
        )

    if msg.id == "email_ai_spear_phish":
        return InoculationData(
            tactical_summary="High-Sophistication AI BEC: Leverages Executive Authority, Scarcity (3:00 PM cutoff), and explicit Channel Bypassing ('rather than opening a Jira ticket').",
            why_legacy_missed="The attacker used clean generative AI: zero spelling errors, valid SPF/DKIM on a newly aged lookalike domain ('acme-corp.partner-invoicing.net'), and polite executive language.",
            contrastive_authentic="""Hi Robert,
Please review the attached invoice for Apex Cloud Solutions in the standard Coupa/SAP treasury portal under PR-84920. Per our company finance policy, any adjustments to payee banking coordinates require two-factor voice verification with the vendor's chief accounting officer.
Once approved in the portal, accounts payable will schedule the disbursement in the standard Tuesday batch.""",
            quiz=SocraticQuiz(
                question="Why should you NEVER process an urgent banking or wire routing change requested solely via email, even if signed by the CFO?",
                options=[
                    "Because enterprise financial policy strictly requires multi-channel voice verification and formal ERP ticket logging for bank coordinate changes",
                    "Because CFOs only send emails from desktop computers, not mobile",
                    "Because wire transfers cannot be processed on Thursdays",
                    "Because international vendors never change their bank accounts"
                ],
                correct_index=0,
                explanation="Attackers impersonate C-level authority to pressure staff into bypassing standard internal controls. Real CFOs enforce separation of duties and out-of-band verification.",
                rule_of_thumb="The Out-of-Band Financial Rule: Any request to alter payee routing details requires independent verbal verification via a pre-established trusted phone number."
            )
        )

    if msg.id == "slack_ai_it_sso":
        return InoculationData(
            tactical_summary="Lateral Workforce Phishing: Spoofs internal IT automation to exploit compliance anxiety and fear of workstation lockout.",
            why_legacy_missed="Slack DMs bypass email security gateways completely. The attacker used clean system terminology and realistic enterprise software names (Okta, Active Directory).",
            contrastive_authentic="""IT Notification: Okta SSO certificate updates are performed automatically at the identity-provider layer. End users do not need to re-enter credentials or synchronize tokens. For questions, visit #help-it or check status.acme-corp.internal.""",
            quiz=SocraticQuiz(
                question="An automated Slack bot warns you that your SSO token will expire in 15 minutes unless you click an external link. What is your safest immediate action?",
                options=[
                    "Do NOT click the link; navigate independently to your company's official SSO dashboard or ask IT in the public #help-it channel",
                    "Click the link quickly to avoid being locked out of GitHub",
                    "Forward the link to your teammates to see if they got it too",
                    "Reply to the bot with your employee ID number"
                ],
                correct_index=0,
                explanation="IT departments never distribute urgent credential reset links via unverified DM bots with arbitrary 15-minute countdowns.",
                rule_of_thumb="The Independent Channel Rule: When an alert demands urgent credential re-entry, never use the provided link—open your company bookmark directly."
            )
        )

    if msg.id == "slack_ai_ceo_dm":
        return InoculationData(
            tactical_summary="C-Suite Social Engineering & Exfiltration: Exploits secrecy ('strictly confidential') and requests data exfiltration to a personal Gmail address.",
            why_legacy_missed="No malware links or attachments. Pure conversational persuasion exploiting employee eagerness to assist the CEO.",
            contrastive_authentic="""Priya, when you have a moment today, please ensure the Q4 investor presentation is updated in the shared Google Drive 'Board Materials' folder. Our legal team will grant permissions directly.""",
            quiz=SocraticQuiz(
                question="An executive messages you on Slack asking you to email confidential corporate financial data to their personal Gmail address. What is the fatal red flag?",
                options=[
                    "Channel Exfiltration: Requesting sensitive internal corporate assets to be transferred to an unmonitored personal email outside DLP boundaries",
                    "The message was sent in the afternoon",
                    "The CEO didn't use an emoji in the greeting",
                    "The message came from an executive"
                ],
                correct_index=0,
                explanation="Personal email addresses (like @gmail.com) bypass enterprise Data Loss Prevention (DLP) and audit logs. Attackers frequently use this vector to steal proprietary IP.",
                rule_of_thumb="The Corporate Perimeter Rule: Sensitive enterprise data must NEVER leave managed corporate repositories or be transmitted to personal webmail accounts."
            )
        )

    if msg.id == "sms_ai_bank_smish":
        return InoculationData(
            tactical_summary="Urgent Financial Smishing: Induces panic by faking a massive unauthorized wire debit ($7,820.00) to force a reflexive panic-click.",
            why_legacy_missed="Mobile SMS has zero perimeter filtering. The message looks like authentic Chase text phrasing with zero spelling mistakes.",
            contrastive_authentic="""Chase Alert: Free Msg. Did you attempt a $7,820 wire to Global Apex? Reply YES or NO. If no, your card is paused; call the number on the back of your physical card.""",
            quiz=SocraticQuiz(
                question="You receive an alarming SMS about a fraudulent $7,800 wire with a verification link. How should you respond?",
                options=[
                    "Never click the SMS link; immediately log into the bank's official mobile app or call the verified number printed on the back of your physical corporate card",
                    "Click the link immediately to dispute the charge before the money leaves",
                    "Reply with your account number to confirm your identity",
                    "Call the phone number displayed in the text message"
                ],
                correct_index=0,
                explanation="Phishing links in SMS lead to fake bank portals designed to capture your 2FA OTP codes in real time.",
                rule_of_thumb="The Card-Back Rule: For any financial alert, only use the telephone number printed directly on your physical debit/credit card."
            )
        )

    # Generic high-sophistication fallback
    return InoculationData(
        tactical_summary="Synthetic Social Engineering: Uses high cognitive pressure and authority mimicry to override normal critical verification.",
        why_legacy_missed="AI generated flawless syntax and lacked conventional blacklist indicators.",
        contrastive_authentic="An authentic message follows standard organizational channels, provides verifiable ticket references, and never demands instant off-policy action.",
        quiz=SocraticQuiz(
            question="What is the primary indicator of an AI-engineered social engineering attempt?",
            options=[
                "High artificial urgency, out-of-band communication shift, or pressure to bypass standard verification protocols",
                "The email is longer than two paragraphs",
                "The sender uses formal business language",
                "The email was received on a mobile device"
            ],
            correct_index=0,
            explanation="AI phishing targets human psychology rather than software vulnerabilities.",
            rule_of_thumb="The Pause & Verify Rule: The greater the urgency expressed, the more vital it is to verify through a secondary, trusted channel."
        )
    )

def evaluate_quiz_submission(correct_index: int, selected_index: int, rule_of_thumb: str) -> VerificationResponse:
    if selected_index == correct_index:
        return VerificationResponse(
            is_correct=True,
            explanation="Outstanding work! You correctly identified the cognitive exploit vector and reinforced your mental immune defense.",
            rule_of_thumb=rule_of_thumb,
            badge_awarded="🛡️ Inoculated Cognitive Defender (Level 1)"
        )
    else:
        return VerificationResponse(
            is_correct=False,
            explanation="Not quite. That is a common misdirection that attackers rely on to confuse victims.",
            rule_of_thumb=rule_of_thumb,
            badge_awarded=None
        )
