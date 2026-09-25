import re
from typing import Dict, List, Tuple, Any
from ..core.models import MessagePayload, ChannelType, LegacyFilterResult, TextSpanHighlight

PROTECTED_DOMAINS = [
    "paypal.com", "microsoft.com", "google.com", "acme-corp.com",
    "acme-corp.internal", "okta.com", "slack.com", "chase.com", "apple.com"
]

HOMOGLYPH_MAP = {
    '0': 'o', '1': 'l', '3': 'e', '4': 'a', '5': 's',
    '8': 'b', '@': 'a', '$': 's', 'vv': 'w', 'rn': 'm'
}

def levenshtein_distance(s1: str, s2: str) -> int:
    if len(s1) < len(s2):
        return levenshtein_distance(s2, s1)
    if len(s2) == 0:
        return len(s1)
    
    previous_row = range(len(s2) + 1)
    for i, c1 in enumerate(s1):
        current_row = [i + 1]
        for j, c2 in enumerate(s2):
            insertions = previous_row[j + 1] + 1
            deletions = current_row[j] + 1
            substitutions = previous_row[j] + (c1 != c2)
            current_row.append(min(insertions, deletions, substitutions))
        previous_row = current_row
    return previous_row[-1]

def normalize_homoglyphs(text: str) -> str:
    normalized = text.lower()
    for h, repl in HOMOGLYPH_MAP.items():
        normalized = normalized.replace(h, repl)
    return normalized

def check_domain_typosquatting(domain: str) -> Dict[str, Any]:
    domain = domain.lower().strip()
    result = {
        "is_suspicious": False,
        "matched_brand": None,
        "distance": 99,
        "homoglyph_detected": False,
        "details": "Domain appears standard."
    }
    
    # Check exact match
    if domain in PROTECTED_DOMAINS:
        return result

    norm_domain = normalize_homoglyphs(domain)
    if norm_domain != domain:
        result["homoglyph_detected"] = True

    tokens = re.split(r'[-.]', domain)
    norm_tokens = [normalize_homoglyphs(t) for t in tokens]

    for target in PROTECTED_DOMAINS:
        target_name = target.split('.')[0]
        domain_name = domain.split('.')[0]
        dist = levenshtein_distance(domain_name, target_name)
        norm_dist = levenshtein_distance(normalize_homoglyphs(domain_name), target_name)
        
        # Typosquatting on full domain name
        if (1 <= dist <= 2) or (norm_dist == 0 and domain_name != target_name):
            result["is_suspicious"] = True
            result["matched_brand"] = target
            result["distance"] = min(dist, norm_dist)
            result["details"] = f"Domain '{domain}' is a deceptive lookalike of protected brand '{target}'."
            return result
        
        # Check sub-tokens
        for token, norm_token in zip(tokens, norm_tokens):
            tdist = levenshtein_distance(token, target_name)
            tnorm_dist = levenshtein_distance(norm_token, target_name)
            if (1 <= tdist <= 2) or (tnorm_dist == 0 and token != target_name) or (1 <= tnorm_dist <= 2 and token != target_name):
                result["is_suspicious"] = True
                result["matched_brand"] = target
                result["distance"] = min(tdist, tnorm_dist)
                result["details"] = f"Domain '{domain}' exploits brand name '{target_name}' via homoglyph/typosquatted token '{token}'."
                return result

        # Subdomain / hyphenated spoofing: e.g. "acme-corp.partner-invoicing.net"
        if (target_name in domain or target_name in norm_domain) and not domain.endswith(f".{target}"):
            result["is_suspicious"] = True
            result["matched_brand"] = target
            result["distance"] = 1
            result["details"] = f"Domain '{domain}' exploits brand name '{target_name}' within an untrusted external TLD."
            return result

    return result

def extract_urgency_spans(text: str) -> List[Tuple[int, int, str, str]]:
    urgency_patterns = [
        (r"(?i)\bwithin \d+ (minutes|hours|mins)\b", "Artificial Urgency Deadline", "high"),
        (r"(?i)\bimmediately\b", "High-Pressure Coercion", "medium"),
        (r"(?i)\bbefore \d+(:\d+)?\s*(AM|PM|EST|PST|GMT)?\b", "Arbitrary Time Cutoff", "high"),
        (r"(?i)\bpermanent (account suspension|termination|quarantine)\b", "Fear & Loss Coercion", "high"),
        (r"(?i)\bemergency\b", "Crisis Exploitation", "medium"),
        (r"(?i)\bright (away|now)\b", "Immediate Action Pressure", "medium"),
        (r"(?i)\bconfidential|discreet|don't discuss\b", "Secrecy & Isolation Tactic", "high")
    ]
    spans = []
    for pattern, vector, severity in urgency_patterns:
        for match in re.finditer(pattern, text):
            spans.append((match.start(), match.end(), match.group(), vector, severity))
    return spans

def extract_sop_anomalies(text: str) -> List[Tuple[int, int, str, str]]:
    sop_patterns = [
        (r"(?i)\b(wire of \$[\d,]+|\bwire transfer\b|\bupdated routing coordinates\b)", "Out-of-Band Financial Wire Request", "high"),
        (r"(?i)\b(gift cards?|e-gift cards?|Apple digital gift)\b", "Irrevocable Asset Extraction (Gift Cards)", "high"),
        (r"(?i)\b(rather than opening an internal Jira ticket|don't discuss this in public channels)\b", "Explicit SOP Channel Bypass", "high"),
        (r"(?i)\b(send it directly to my personal (advisory )?address:?\s*[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+)\b", "Exfiltration to Personal Email", "high"),
        (r"(?i)\b(re-validate their Active Directory session token|re-authenticate)\b", "Credential Harvesting Vector", "high")
    ]
    spans = []
    for pattern, vector, severity in sop_patterns:
        for match in re.finditer(pattern, text):
            spans.append((match.start(), match.end(), match.group(), vector, severity))
    return spans

def simulate_legacy_filter(msg: MessagePayload) -> LegacyFilterResult:
    if "paypa1" in msg.sender_address.lower() or "susppended" in (msg.subject or "").lower() or "cust0mer" in msg.content.lower():
        return LegacyFilterResult(
            is_flagged=True,
            spam_score=94,
            status_label="Spam Blocked",
            reason="Blocked by Legacy SEG: Homoglyph keyword detected ('cust0mer'), domain mismatch on SPF record (spf=fail), and known blacklisted redirect URL."
        )
    
    if msg.id in ["email_clean_allhands", "slack_clean_design", "sms_clean_otp"]:
        return LegacyFilterResult(
            is_flagged=False,
            spam_score=4,
            status_label="Clean (Passed)",
            reason="Standard benign corporate traffic. SPF/DKIM aligned, low lexical entropy, no blacklisted indicators."
        )

    if msg.channel == ChannelType.EMAIL:
        return LegacyFilterResult(
            is_flagged=False,
            spam_score=14,
            status_label="Clean (Passed)",
            reason="LEGACY DEFENSE BLIND SPOT: All technical IoCs passed. Valid SPF/DKIM authentication, 0 spam keywords, pristine grammatical syntax, clean reputation IP. Legacy SEG delivered to inbox."
        )
    else:
        return LegacyFilterResult(
            is_flagged=False,
            spam_score=0,
            status_label="Unprotected Surface",
            reason="ZERO SEG COVERAGE: Traditional email gateways do not inspect Workspace Chat (Slack) or Mobile SMS streams. Message delivered without perimeter inspection."
        )
