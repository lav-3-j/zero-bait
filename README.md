# ZeroBait: Omni-Channel AI Phishing & Cognitive Inoculation Engine
> *"Zero Trust Meets Anti-Phishing: Stop the Bait Before the Bite"*

[![FastAPI](https://img.shields.io/badge/FastAPI-0.136-009688?style=flat&logo=fastapi)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org)
[![Pytest](https://img.shields.io/badge/Tests-8%20Passed-brightgreen)](https://pytest.org)

ZeroBait is a real-time, explainable AI spear-phishing defense and cognitive inoculation platform. While legacy Secure Email Gateways (SEGs) miss modern AI-generated phishing because it contains zero malware, zero bad links, and zero grammatical errors, ZeroBait detects **Psychological Exploitation Vectors** (Cialdini persuasion principles) and **Contextual SOP Drift** across **Enterprise Email, Workspace Slack, and Mobile SMS**.

Instead of punitive blocking, ZeroBait provides **just-in-time micro-inoculation** to train employees as permanent human sensors in under 10 seconds.

---

## 🌟 Core Breakthroughs

1. **Omni-Channel Defense Surface**:
   - 📧 **Enterprise Email (Outlook 365 / Gmail)**: Detects executive BEC, vendor invoice fraud, and lookalike domain spoofing.
   - 💬 **Workspace Chat (Slack / MS Teams)**: Detects lateral workforce phishing, fake IT SSO re-authentication bots, and cap-table exfiltration.
   - 📱 **Mobile SMS / WhatsApp (Smishing)**: Detects urgent executive gift card directives and fake banking wire alerts.

2. **100% Real-Time Dynamic Analysis**:
   - Paste or type **any raw message** in the world—ZeroBait calculates Levenshtein homoglyphs, lexical coercion density, and Cialdini persuasion vectors on the fly.

3. **Cognitive Inoculation (Psychological Immunity)**:
   - Grounded in McGuire's Inoculation Theory.
   - Interactive 10-second Socratic challenge that reinforces long-term human resistance and awards defense badges.

4. **Live Adversarial Red-Team Studio**:
   - Interactive workbench where judges can pick any employee role and attack scenario to synthesize novel AI spear-phishing attacks live.

---

## 🚀 Quickstart Guide

### Prerequisites
- Python 3.10+
- Node.js 18+ (Optional, frontend is already pre-compiled into `dist/`)

### Option A: Run Everything via FastAPI (Single Command)
```powershell
cd scratch/zerobait/backend
python -m uvicorn app.main:app --port 8000 --reload
```
Open your browser at **http://localhost:8000**. The full web application and API run together!

### Option B: Run Frontend Dev Server with Hot Reload
In a separate terminal:
```powershell
cd scratch/zerobait/frontend
npm run dev
```
Open your browser at **http://localhost:5173**.

---

## 🧪 Running Automated Tests
```powershell
cd scratch/zerobait/backend
python -m pytest tests
```
All 8 automated forensic tests will run and pass in under 0.2s.

---

## 🏆 3-Minute Hackathon Pitch Script

* **[0:00 - 0:30] The Hook**: Show a flawless email from "The CFO" requesting an expedited vendor wire before 3 PM. Show the legacy filter verdict: *100% CLEAN (SPF/DKIM passed, 0 spam keywords)*. Legacy filters are completely blind to GenAI.
* **[0:30 - 1:15] The Dissection**: Open ZeroBait. ZeroBait flags it **96/100 RED**. Show the In-Situ Cognitive Heatmap highlighting *Authority Bias*, *Artificial Urgency*, and *Explicit SOP Channel Bypass*.
* **[1:15 - 1:50] The Omni-Channel Reveal**: Switch to the **Slack** and **SMS** tabs. Explain that modern AI spear-phishers have moved to chat and text where traditional email filters have ZERO presence.
* **[1:50 - 2:30] Cognitive Inoculation**: Click **"Launch Cognitive Inoculation Trainer"**. Show the contrastive authentic baseline ("Spot the Difference") and solve the 10-second Socratic challenge live.
* **[2:30 - 3:00] The Clincher (Judge Challenge)**: Open the **Red-Team Studio**. Ask a judge: *"Pick an employee role and an attack scenario."* Hit Generate, and watch ZeroBait dissect that live attack in real-time.
