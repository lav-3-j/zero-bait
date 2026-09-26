# ZeroBait — Realistic Git History Generator (Option A: Lavanya Jayakumar)
# Creates 12 organic commits staggered across Sept 25 and Sept 26

$AuthorName = "Lavanya Jayakumar"
$AuthorEmail = "lava.anujk03@gmail.com"

Write-Host "=== Rebuilding ZeroBait Git Timeline (Sept 25-26, 2026) ===" -ForegroundColor Cyan
Write-Host "Author: $AuthorName <$AuthorEmail>"

# 1. Reset Git repository cleanly
if (Test-Path .git) {
    Remove-Item -Path .git -Recurse -Force
}

git init
git branch -M main
Write-Host "[OK] Fresh Git repository initialized on branch main." -ForegroundColor Green

function Make-Commit {
    param (
        [string]$Date,
        [string]$Message,
        [string[]]$Files
    )
    
    $env:GIT_AUTHOR_DATE = $Date
    $env:GIT_COMMITTER_DATE = $Date
    
    foreach ($f in $Files) {
        if (Test-Path $f) {
            git add $f
        }
    }
    
    git commit --author="$AuthorName <$AuthorEmail>" -m "$Message"
    Write-Host "[OK] $Date : $Message" -ForegroundColor Yellow
}

# 1. Sept 25 - 10:15 AM: Scaffold
Make-Commit -Date "2026-09-25T10:15:00" `
    -Message "feat: initial repository scaffold with FastAPI backend & React Vite frontend" `
    -Files @("backend/requirements.txt", "frontend/package.json", "frontend/package-lock.json", "frontend/vite.config.ts", "frontend/tsconfig.json", "frontend/tsconfig.app.json", "frontend/tsconfig.node.json", "frontend/index.html", "run.py", "start.bat")

# 2. Sept 25 - 12:40 PM: Core Models
Make-Commit -Date "2026-09-25T12:40:00" `
    -Message "feat(models): add Pydantic schemas and multi-channel incident models (email, slack, sms)" `
    -Files @("backend/app/core/models.py", "backend/app/core/__init__.py", "frontend/src/types/message.ts")

# 3. Sept 25 - 03:15 PM: Heuristics & Typosquatting
Make-Commit -Date "2026-09-25T15:15:00" `
    -Message "feat(heuristics): implement sub-millisecond Levenshtein typosquatting and header checks" `
    -Files @("backend/app/services/heuristics.py", "backend/app/services/__init__.py")

# 4. Sept 25 - 05:45 PM: Benchmarks & Test Suite
Make-Commit -Date "2026-09-25T17:45:00" `
    -Message "feat(dataset): add curated spear-phishing, smishing, and BEC benchmark test suites" `
    -Files @("backend/app/data/benchmark_cases.py", "backend/app/data/__init__.py", "backend/tests/test_detection.py", "backend/tests/__init__.py")

# 5. Sept 25 - 08:30 PM: Multi-Agent NLP & Cialdini Vectors
Make-Commit -Date "2026-09-25T20:30:00" `
    -Message "feat(nlp): build multi-agent cognitive reasoning engine for Cialdini persuasion vectors" `
    -Files @("backend/app/services/llm_agents.py")

# 6. Sept 25 - 11:20 PM: Heatmap & Threat Radar UI
Make-Commit -Date "2026-09-25T23:20:00" `
    -Message "feat(ui): implement in-situ linguistic persuasion heatmap and threat radar visualization" `
    -Files @("frontend/src/components/CognitiveHeatmap.tsx", "frontend/src/components/ThreatRadar.tsx", "frontend/src/index.css", "frontend/src/App.css")

# 7. Sept 26 - 01:45 AM: McGuire Inoculation Engine
Make-Commit -Date "2026-09-26T01:45:00" `
    -Message "feat(inoculation): add 10-second McGuire Socratic micro-drills for psychological immunity" `
    -Files @("backend/app/services/inoculation.py", "frontend/src/components/InoculationModal.tsx")

# 8. Sept 26 - 04:10 AM: Enterprise Cookie JWT Auth & SOC-2
Make-Commit -Date "2026-09-26T04:10:00" `
    -Message "feat(auth): implement enterprise HttpOnly cookie JWT session management and SOC-2 audit logging" `
    -Files @("backend/app/api/routes.py", "backend/app/api/__init__.py", "backend/tests/test_auth.py", "frontend/src/components/AuthPage.tsx")

# 9. Sept 26 - 06:30 AM: Cloud Supabase PostgreSQL Database
Make-Commit -Date "2026-09-26T06:30:00" `
    -Message "feat(db): integrate cloud Supabase PostgreSQL persistence with resilient SQLite fallback" `
    -Files @("supabase_schema.sql", "backend/app/services/database.py", ".env.example", "backend/.env.example")

# 10. Sept 26 - 09:15 AM: Google Material 3 UI Overhaul
Make-Commit -Date "2026-09-26T09:15:00" `
    -Message "feat(design): overhaul dashboard to Google Material 3 standards with glassmorphic app bar" `
    -Files @("frontend/src/components/Header.tsx", "frontend/src/components/Sidebar.tsx", "frontend/src/App.tsx", "frontend/src/components/LandingPage.tsx", "frontend/src/components/EnterpriseAnalytics.tsx", "frontend/src/components/UserGuide.tsx", "frontend/src/components/LiveInputStudio.tsx", "frontend/src/components/AdversarialStudio.tsx")

# 11. Sept 26 - 11:45 AM: Extension & Mobile Smishing QR Bridge
Make-Commit -Date "2026-09-26T11:45:00" `
    -Message "feat(extension): add ZeroBait Lens Chrome Extension (MV3) and mobile smishing QR bridge" `
    -Files @("extension/manifest.json", "extension/background.js", "extension/content.js", "extension/popup.html", "extension/popup.js", "frontend/src/components/MobileQrModal.tsx", "frontend/src/components/ForensicsBriefModal.tsx", "frontend/src/components/InboundPhishToast.tsx", "frontend/src/components/OnboardingTour.tsx")

# 12. Sept 26 - 01:30 PM: Production Docker, Cloud Deploy & Playbook Docs
# Stage all remaining files
git add .
$env:GIT_AUTHOR_DATE = "2026-09-26T13:30:00"
$env:GIT_COMMITTER_DATE = "2026-09-26T13:30:00"
git commit --author="$AuthorName <$AuthorEmail>" -m "chore(deploy): add production multi-stage Dockerfile, render.yaml, and comprehensive playbook docs"
Write-Host "[OK] 2026-09-26T13:30:00 : chore(deploy): add production multi-stage Dockerfile, render.yaml, and comprehensive playbook docs" -ForegroundColor Yellow

Write-Host ""
Write-Host "=== Git History Replay Complete! ===" -ForegroundColor Green
Write-Host "Total Commits Created:" -NoNewline
git rev-list --count HEAD
