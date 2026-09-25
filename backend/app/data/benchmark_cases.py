from typing import List, Dict
from ..core.models import MessagePayload, ChannelType

BENCHMARK_CASES: List[MessagePayload] = [
    # --- EMAIL CASES ---
    MessagePayload(
        id="email_clean_allhands",
        channel=ChannelType.EMAIL,
        sender_name="Acme People & Culture",
        sender_address="people-ops@acme-corp.internal",
        recipient="all-team@acme-corp.internal",
        subject="Q3 Global All-Hands & Product Roadmap: Thursday 10:00 AM EST",
        content="""Hi Acme Team,

Please join us this Thursday at 10:00 AM EST for our Q3 Global All-Hands. Our executive leadership team will review customer milestones, showcase new features shipping next month, and host an open Q&A session.

The agenda and Zoom link are already synced to your corporate Google Calendar. You can submit anonymous questions via the standard Slido link on our internal Notion wiki.

Looking forward to seeing everyone there!

Best regards,
The People & Culture Team
Acme Corporation""",
        headers={
            "Authentication-Results": "spf=pass dkim=pass dmarc=pass",
            "X-Mailer": "Google Workspace Internal",
            "Return-Path": "people-ops@acme-corp.internal"
        },
        timestamp="2026-09-17T09:15:00Z"
    ),

    MessagePayload(
        id="email_legacy_paypal",
        channel=ChannelType.EMAIL,
        sender_name="PayPal Securty Team",
        sender_address="service-alert@paypa1-security-verification.com",
        recipient="alex.mercer@acme-corp.internal",
        subject="URGENT: Your PayPal Acount Has Been Temporarily Susppended!!",
        content="""Dear Valued Cust0mer,

We have detected un-authorized activities on your PayPal wallet from an un-recognized IP address. To prevent permanent termination of your account, you must confirm your identity immediately.

Click the link below to verify your login credentials and credit card information:
http://paypa1-security-verification.com/login.php?ref=urgent

Failure to do so within 24 hours will result in permanent account suspension and freezing of remaining funds.

Thank you,
PayPal Customer Care Center""",
        headers={
            "Authentication-Results": "spf=fail dkim=none dmarc=fail",
            "X-Spam-Flag": "YES",
            "Return-Path": "bounce@spammer-botnet.ru"
        },
        timestamp="2026-09-17T11:22:00Z"
    ),

    MessagePayload(
        id="email_ai_spear_phish",
        channel=ChannelType.EMAIL,
        sender_name="Jennifer Vance (Chief Financial Officer)",
        sender_address="jennifer.vance@acme-corp.partner-invoicing.net",
        recipient="robert.chen@acme-corp.internal",
        subject="Confidential: Expedited Vendor Routing Adjustment — Apex Cloud Solutions Q3 Settlement",
        content="""Hi Robert,

Following up on our executive audit committee meeting this morning regarding the infrastructure transition. We need to expedite the outstanding Q3 settlement for Apex Cloud Solutions before their fiscal close at 3:00 PM EST today.

Due to an ongoing banking transition at their treasury department, they have updated their international wiring details. I have already reviewed and approved the contract addendum with external counsel. 

Please process the revised wire of $48,650.00 to the updated routing coordinates attached below before the cutoff window. Given the time sensitivity and ongoing audit compliance, please prioritize this and confirm via email once the bank wire receipt is generated, rather than opening an internal Jira ticket.

I appreciate your discretion and prompt turnaround on this.

Warm regards,

Jennifer Vance
Chief Financial Officer | Acme Corporation
jennifer.vance@acme-corp.partner-invoicing.net""",
        headers={
            "Authentication-Results": "spf=pass dkim=pass dmarc=pass",
            "X-Mailer": "Microsoft Exchange Online (Clean)",
            "Return-Path": "jennifer.vance@acme-corp.partner-invoicing.net"
        },
        timestamp="2026-09-17T13:40:00Z"
    ),

    # --- SLACK CASES ---
    MessagePayload(
        id="slack_clean_design",
        channel=ChannelType.SLACK,
        sender_name="Marcus Reed",
        sender_address="@marcus.ux",
        recipient="#design-engineering",
        subject=None,
        content="""Hey team! Just pushed the updated Figma components for the customer settings dashboard. Whenever you have 5 minutes this afternoon, take a look at the auto-layout specs on slide 4 and let me know if the responsive breakpoints look straightforward to implement. No rush at all!""",
        headers={"channel": "#design-engineering", "team_id": "T01ACME"},
        timestamp="2026-09-17T10:30:00Z"
    ),

    MessagePayload(
        id="slack_ai_it_sso",
        channel=ChannelType.SLACK,
        sender_name="Acme IT Automation Bot",
        sender_address="@it-support-service",
        recipient="@alex.mercer",
        subject=None,
        content="""⚠️ [CRITICAL IT COMPLIANCE NOTICE] ⚠️
Alex, our annual enterprise Okta SSO certificate renewal is taking place today across the engineering division. 

To prevent interruption to your GitHub, AWS, and internal portal credentials, all staff must re-validate their Active Directory session token before 2:00 PM EST.

Please complete the 1-click token re-synchronization here:
👉 https://acme-sso-okta.auth-gateway.internal-sync.io

Failure to re-authenticate within 15 minutes will trigger an automated security quarantine on your workstation.""",
        headers={"channel": "Direct Message", "bot_verified": "false"},
        timestamp="2026-09-17T13:45:00Z"
    ),

    MessagePayload(
        id="slack_ai_ceo_dm",
        channel=ChannelType.SLACK,
        sender_name="David Chen (CEO)",
        sender_address="@david.chen.exec",
        recipient="@priya.sharma",
        subject=None,
        content="""Priya, are you free right now? I'm in a closed-door meeting with prospective lead investors and need the unredacted Q4 financial projections and employee stock option pool ledger. 

My Slack workspace access on mobile is glitching and won't let me download from the shared drive. Could you export the spreadsheet as a PDF and send it directly to my personal advisory address: dchen.advisory@gmail.com right away?

Please don't discuss this in public channels just yet as the term sheet is strictly confidential.""",
        headers={"channel": "Direct Message", "team_id": "T01ACME"},
        timestamp="2026-09-17T14:10:00Z"
    ),

    # --- SMS / MOBILE CASES ---
    MessagePayload(
        id="sms_clean_otp",
        channel=ChannelType.SMS,
        sender_name="Acme Security",
        sender_address="72341",
        recipient="+1 (555) 019-2834",
        subject=None,
        content="""Acme Security Code: 849-201. Use this one-time code to verify your VPN login. This code expires in 5 minutes. Acme IT will NEVER ask you for this code over the phone or text.""",
        headers={"carrier": "Twilio Verified Shortcode"},
        timestamp="2026-09-17T11:00:00Z"
    ),

    MessagePayload(
        id="sms_ai_bank_smish",
        channel=ChannelType.SMS,
        sender_name="Chase Fraud Detection",
        sender_address="+1 (888) 492-1082",
        recipient="+1 (555) 019-2834",
        subject=None,
        content="""[CHASE SECURITY ALERT] An international wire transfer of $7,820.00 to 'Global Apex Holding' was submitted from your Business Checking account. If you DID NOT authorize this wire, reply CANCEL immediately or verify your security token now at: https://chase-business-verification.security-id9.com to freeze the transfer.""",
        headers={"carrier": "Unverified VoIP"},
        timestamp="2026-09-17T12:15:00Z"
    ),

    MessagePayload(
        id="sms_ai_ceo_smish",
        channel=ChannelType.SMS,
        sender_name="David Chen (CEO)",
        sender_address="+1 (415) 902-8419",
        recipient="+1 (555) 019-2834",
        subject=None,
        content="""Alex, it's David (CEO). My flight just landed at SFO and I'm heading directly into the client summit. My corporate card is temporarily locked due to a fraud trigger. I need you to purchase 4 x $250 Apple digital e-gift cards for the keynote giveaways right now. Text the redemption codes directly to this number before 3 PM. I'll have finance process your reimbursement invoice first thing Monday.""",
        headers={"carrier": "Prepaid Mobile SIM"},
        timestamp="2026-09-17T14:20:00Z"
    )
]

def get_benchmark_by_id(case_id: str) -> MessagePayload:
    for case in BENCHMARK_CASES:
        if case.id == case_id:
            return case
    return BENCHMARK_CASES[2] # default to email AI spear phish
