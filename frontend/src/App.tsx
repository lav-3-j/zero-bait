import React, { useState, useEffect } from 'react';
import type {
  MessagePayload,
  AnalysisResult,
  ChannelType,
  AdversarialGenerateRequest,
  AdversarialGenerateResponse
} from './types/message';
import { Sidebar } from './components/Sidebar';
import type { NavView } from './components/Sidebar';
import { Header } from './components/Header';
import { LandingPage } from './components/LandingPage';
import { AuthPage } from './components/AuthPage';
import { OnboardingTour } from './components/OnboardingTour';
import { EnterpriseAnalytics } from './components/EnterpriseAnalytics';
import { CognitiveHeatmap } from './components/CognitiveHeatmap';
import { InoculationModal } from './components/InoculationModal';
import { LiveInputStudio } from './components/LiveInputStudio';
import { AdversarialStudio } from './components/AdversarialStudio';
import { UserGuide } from './components/UserGuide';
import { MobileQrModal } from './components/MobileQrModal';
import { ForensicsBriefModal } from './components/ForensicsBriefModal';
import { InboundPhishToast } from './components/InboundPhishToast';
import {
  Mail,
  MessageSquare,
  Smartphone,
  Eye,
  Award,
  CheckCircle2
} from 'lucide-react';

const API_BASE = 'http://localhost:8000/api/v1';

type AppRoute = 'landing' | 'auth' | 'app';

export const App: React.FC = () => {
  // Navigation & User State
  const [currentRoute, setCurrentRoute] = useState<AppRoute>('landing');
  const [currentView, setCurrentView] = useState<NavView>('console');
  const [userRole, setUserRole] = useState<string>('SOC Analyst');
  const [userEmail, setUserEmail] = useState<string>('analyst@acme.corp');
  const [showTour, setShowTour] = useState<boolean>(false);

  // Threat Console State
  const [consoleChannel, setConsoleChannel] = useState<ChannelType>('email');
  const [benchmarks, setBenchmarks] = useState<MessagePayload[]>([]);
  const [selectedCaseId, setSelectedCaseId] = useState<string>('email_ai_spear_phish');
  const [currentMessage, setCurrentMessage] = useState<MessagePayload | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isInoculationOpen, setIsInoculationOpen] = useState<boolean>(false);
  const [isInspecting, setIsInspecting] = useState<boolean>(true);

  // Modals & Action States
  const [isMobileQrOpen, setIsMobileQrOpen] = useState<boolean>(false);
  const [isBriefOpen, setIsBriefOpen] = useState<boolean>(false);
  const [inboundToast, setInboundToast] = useState<{ visible: boolean; payload: MessagePayload | null }>({
    visible: false,
    payload: null
  });

  // Verify Auth Session and Load Benchmarks on start
  useEffect(() => {
    checkAuthSession();
    fetchBenchmarks();
  }, []);

  const checkAuthSession = async () => {
    try {
      const res = await fetch(`${API_BASE}/auth/me`, { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        if (data.authenticated && data.user) {
          setUserRole(data.user.role || 'SOC Analyst');
          setUserEmail(data.user.email || 'analyst@acme.corp');
          setCurrentRoute('app');
        }
      }
    } catch (err) {
      console.warn('Session verification error:', err);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE}/auth/logout`, {
        method: 'POST',
        credentials: 'include'
      });
    } catch (err) {
      console.warn('Logout network error:', err);
    }
    setUserRole('SOC Analyst');
    setUserEmail('analyst@acme.corp');
    setCurrentRoute('landing');
  };

  const fetchBenchmarks = async () => {
    try {
      const res = await fetch(`${API_BASE}/benchmarks`, { credentials: 'include' });
      if (res.ok) {
        const data: MessagePayload[] = await res.json();
        setBenchmarks(data);
        const defaultCase = data.find((c) => c.id === 'email_ai_spear_phish') || data[0];
        if (defaultCase) {
          analyzePayload(defaultCase);
        }
      }
    } catch (err) {
      console.warn('Backend not yet reachable, using fallback');
    }
  };

  const analyzePayload = async (payload: MessagePayload) => {
    setIsLoading(true);
    setCurrentMessage(payload);
    try {
      const res = await fetch(`${API_BASE}/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const data: AnalysisResult = await res.json();
        setAnalysis(data);
      }
    } catch (err) {
      console.error('Analysis error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCaseSelect = (caseItem: MessagePayload) => {
    setSelectedCaseId(caseItem.id);
    analyzePayload(caseItem);
  };

  const handleGenerateAdversarial = async (req: AdversarialGenerateRequest): Promise<AdversarialGenerateResponse | null> => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/adversarial/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(req)
      });
      if (res.ok) {
        const data: AdversarialGenerateResponse = await res.json();
        setAnalysis(data.analysis);
        setCurrentMessage(data.message);
        return data;
      }
      return null;
    } catch (err) {
      console.error('Adversarial generation failed:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const triggerInboundSimulation = () => {
    const attackSamples: MessagePayload[] = [
      {
        id: `live_toast_${Date.now()}`,
        channel: 'slack',
        sender_name: 'David Keller (VP Engineering)',
        sender_address: '@david.keller',
        recipient: '@devops-oncall',
        subject: null,
        content: 'URGENT: Production Kubernetes cluster credentials have been leaked on GitHub. Rotate our AWS root access key immediately and paste the temporary token in this thread so I can verify rollout before the board meeting.',
        headers: null,
        timestamp: new Date().toISOString()
      },
      {
        id: `live_toast_${Date.now()}`,
        channel: 'email',
        sender_name: 'CFO Office - Sarah Jenkins',
        sender_address: 'sarah.jenkins@acme-invoicing.net',
        recipient: 'ap@acme.com',
        subject: 'EXPEDITE: Final wire approval before 2 PM cutoff',
        content: 'Please process the attached revised invoice #9824 for Apex Cloud Services. Banking coordinates were changed due to our bank transition. Do not delay with Jira approval tickets; CEO authorized this directly.',
        headers: { 'Authentication-Results': 'spf=pass dkim=pass' },
        timestamp: new Date().toISOString()
      },
      {
        id: `live_toast_${Date.now()}`,
        channel: 'sms',
        sender_name: 'IT Security Alert',
        sender_address: '+1 (844) 920-1923',
        recipient: '+1 (555) 019-3829',
        subject: null,
        content: 'Acme InfoSec: Unusual login to Workday from Tokyo, Japan. To prevent immediate payroll account freeze, reply YES with your 6-digit MFA authenticator code.',
        headers: null,
        timestamp: new Date().toISOString()
      }
    ];

    const randomSample = attackSamples[Math.floor(Math.random() * attackSamples.length)];
    setInboundToast({
      visible: true,
      payload: randomSample
    });
  };

  const handleInspectToast = (payload: MessagePayload) => {
    setInboundToast({ visible: false, payload: null });
    setCurrentView('live');
    analyzePayload(payload);
  };

  // ROUTE 1: Public Landing Page
  if (currentRoute === 'landing') {
    return (
      <LandingPage
        onGoToAuth={() => setCurrentRoute('auth')}
        onGoToConsole={() => setCurrentRoute('app')}
      />
    );
  }

  // ROUTE 2: Dedicated Authentication Screen
  if (currentRoute === 'auth') {
    return (
      <AuthPage
        onLoginSuccess={(role: string, email: string) => {
          setUserRole(role);
          setUserEmail(email);
          setCurrentRoute('app');
          setShowTour(true);
        }}
        onBackToLanding={() => setCurrentRoute('landing')}
      />
    );
  }

  // ROUTE 3: Authenticated Enterprise Command Shell (with Sidebar + Breadcrumb Header)
  const currentChannelBenchmarks = benchmarks.filter((b) => b.channel === consoleChannel);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#101713', color: '#E8EEE9' }}>
      {/* Sleek Google-style Sidebar */}
      <Sidebar
        currentView={currentView}
        onNavigate={setCurrentView}
        userRole={userRole}
        userEmail={userEmail}
        onLogout={handleLogout}
        onOpenTour={() => setShowTour(true)}
      />

      {/* Main Operational Container */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflowY: 'auto' }}>
        {/* Top Minimal Google App Bar */}
        <Header
          currentView={currentView}
          onOpenMobileQr={() => setIsMobileQrOpen(true)}
          onSimulateInbound={triggerInboundSimulation}
          onOpenBrief={() => setIsBriefOpen(true)}
        />

        {/* View: CISO Posture & Compliance */}
        {currentView === 'analytics' && <EnterpriseAnalytics />}

        {/* View: System Guide & Documentation */}
        {currentView === 'guide' && <UserGuide />}

        {/* View: Live Threat Inspector (Sandbox) */}
        {currentView === 'live' && (
          <main style={{ maxWidth: '1360px', margin: '0 auto', padding: '32px', width: '100%', boxSizing: 'border-box' }}>
            <LiveInputStudio
              onAnalyzeCustom={(p) => analyzePayload(p)}
              isLoading={isLoading}
              analysis={analysis}
              currentMessage={currentMessage}
              onOpenInoculation={() => setIsInoculationOpen(true)}
            />
          </main>
        )}

        {/* View: Adversarial Red-Team Studio */}
        {currentView === 'adversarial' && (
          <main style={{ maxWidth: '1360px', margin: '0 auto', padding: '32px', width: '100%', boxSizing: 'border-box' }}>
            <AdversarialStudio
              onGenerateAttack={handleGenerateAdversarial}
              isLoading={isLoading}
            />
          </main>
        )}

        {/* View: Multi-Channel Threat Console (Google Workspace & Security Command Center View) */}
        {currentView === 'console' && (
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '24px 32px' }}>
            {/* Unified Material 3 Toolbar: Vector Switcher & Incidents in ONE Line */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px',
              marginBottom: '24px'
            }}>
              {/* Material 3 Segmented Vector Switcher */}
              <div style={{
                display: 'flex',
                backgroundColor: '#17211B',
                borderRadius: '24px',
                padding: '4px',
                border: '1px solid #2A382F'
              }}>
                <button
                  onClick={() => {
                    setConsoleChannel('email');
                    const firstEmail = benchmarks.find((b) => b.channel === 'email');
                    if (firstEmail) handleCaseSelect(firstEmail);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 18px',
                    borderRadius: '20px',
                    border: 'none',
                    backgroundColor: consoleChannel === 'email' ? 'rgba(121, 184, 154, 0.16)' : 'transparent',
                    color: consoleChannel === 'email' ? '#79B89A' : '#A9B8AC',
                    fontSize: '13px',
                    fontWeight: consoleChannel === 'email' ? 700 : 500,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <Mail size={15} color={consoleChannel === 'email' ? '#79B89A' : '#A9B8AC'} />
                  Email (Inboxes)
                </button>

                <button
                  onClick={() => {
                    setConsoleChannel('slack');
                    const firstSlack = benchmarks.find((b) => b.channel === 'slack');
                    if (firstSlack) handleCaseSelect(firstSlack);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 18px',
                    borderRadius: '20px',
                    border: 'none',
                    backgroundColor: consoleChannel === 'slack' ? 'rgba(121, 184, 154, 0.16)' : 'transparent',
                    color: consoleChannel === 'slack' ? '#79B89A' : '#A9B8AC',
                    fontSize: '13px',
                    fontWeight: consoleChannel === 'slack' ? 700 : 500,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <MessageSquare size={15} color={consoleChannel === 'slack' ? '#79B89A' : '#A9B8AC'} />
                  Slack Workspace
                </button>

                <button
                  onClick={() => {
                    setConsoleChannel('sms');
                    const firstSms = benchmarks.find((b) => b.channel === 'sms');
                    if (firstSms) handleCaseSelect(firstSms);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 18px',
                    borderRadius: '20px',
                    border: 'none',
                    backgroundColor: consoleChannel === 'sms' ? 'rgba(121, 184, 154, 0.16)' : 'transparent',
                    color: consoleChannel === 'sms' ? '#79B89A' : '#A9B8AC',
                    fontSize: '13px',
                    fontWeight: consoleChannel === 'sms' ? 700 : 500,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <Smartphone size={15} color={consoleChannel === 'sms' ? '#79B89A' : '#A9B8AC'} />
                  Mobile SMS (Smishing)
                </button>
              </div>

              {/* Clean Incident Selector Pills */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '12px', color: '#A9B8AC', fontWeight: 600 }}>
                  Curated Case:
                </span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {currentChannelBenchmarks.map((b) => {
                    const isSelected = selectedCaseId === b.id;
                    const isClean = b.id.includes('clean');
                    return (
                      <button
                        key={b.id}
                        onClick={() => handleCaseSelect(b)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '6px 14px',
                          borderRadius: '20px',
                          fontSize: '12px',
                          fontWeight: isSelected ? 700 : 500,
                          cursor: 'pointer',
                          border: isSelected ? '1px solid #79B89A' : '1px solid #2A382F',
                          backgroundColor: isSelected ? 'rgba(121, 184, 154, 0.12)' : '#17211B',
                          color: isSelected ? '#79B89A' : '#E8EEE9',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: isClean ? '#79B89A' : '#B98282' }} />
                        {b.sender_name}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Google Clean Operational Grid */}
            <main style={{
              display: 'grid',
              gridTemplateColumns: '1.25fr 0.75fr',
              gap: '24px',
              flex: 1,
              width: '100%',
              boxSizing: 'border-box'
            }}>
              {/* Left Column: Airy Google Workspace Message Viewer */}
              <div style={{
                backgroundColor: '#1D2922',
                borderRadius: '16px',
                border: '1px solid #2A382F',
                padding: '32px',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px'
              }}>
                {/* Message Header Bar */}
                {currentMessage && (
                  <div style={{ borderBottom: '1px solid #2A382F', paddingBottom: '20px' }}>
                    {/* Top Subject and Actions */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', marginBottom: '16px' }}>
                      <h1 style={{ margin: 0, fontSize: '22px', fontWeight: 800, color: '#E8EEE9', lineHeight: 1.3 }}>
                        {currentMessage.subject || `${currentMessage.channel.toUpperCase()} Message Thread`}
                      </h1>

                      <button
                        onClick={() => setIsInspecting(!isInspecting)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '6px 14px',
                          borderRadius: '20px',
                          backgroundColor: isInspecting ? 'rgba(121, 184, 154, 0.14)' : 'transparent',
                          border: isInspecting ? '1px solid #79B89A' : '1px solid #2A382F',
                          color: isInspecting ? '#79B89A' : '#A9B8AC',
                          fontSize: '12px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          flexShrink: 0
                        }}
                      >
                        <Eye size={13} color={isInspecting ? '#79B89A' : '#A9B8AC'} />
                        {isInspecting ? 'Cognitive Heatmap: ON' : 'Cognitive Heatmap: OFF'}
                      </button>
                    </div>

                    {/* Sender & Security Protocol Row */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        {/* Sender Avatar */}
                        <div style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                          backgroundColor: '#17211B',
                          border: '1px solid #2A382F',
                          color: '#79B89A',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 800,
                          fontSize: '13px'
                        }}>
                          {currentMessage.sender_name.substring(0, 1)}
                        </div>

                        <div>
                          <div style={{ fontSize: '14px', fontWeight: 700, color: '#E8EEE9' }}>
                            {currentMessage.sender_name} <span style={{ color: '#A9B8AC', fontWeight: 400, fontSize: '13px' }}>&lt;{currentMessage.sender_address}&gt;</span>
                          </div>
                          <div style={{ fontSize: '12px', color: '#A9B8AC', marginTop: '2px' }}>
                            To: {currentMessage.recipient} &bull; {new Date(currentMessage.timestamp || Date.now()).toLocaleTimeString()}
                          </div>
                        </div>
                      </div>

                      {/* Technical Verification Chips */}
                      {currentMessage.headers && (
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <span style={{ fontSize: '11px', padding: '3px 8px', borderRadius: '12px', backgroundColor: 'rgba(121, 184, 154, 0.12)', color: '#79B89A', border: '1px solid rgba(121, 184, 154, 0.25)', fontWeight: 600 }}>
                            SPF: Pass
                          </span>
                          <span style={{ fontSize: '11px', padding: '3px 8px', borderRadius: '12px', backgroundColor: 'rgba(121, 184, 154, 0.12)', color: '#79B89A', border: '1px solid rgba(121, 184, 154, 0.25)', fontWeight: 600 }}>
                            DKIM: Pass
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Message Body with In-Situ Cognitive Heatmap */}
                <div style={{ minHeight: '300px', fontSize: '15px', lineHeight: 1.75, color: '#E8EEE9' }}>
                  {currentMessage ? (
                    <CognitiveHeatmap
                      content={currentMessage.content}
                      highlights={analysis?.highlights || []}
                      isInspecting={isInspecting}
                    />
                  ) : (
                    <div style={{ color: '#A9B8AC', textAlign: 'center', marginTop: '60px' }}>
                      Select a communication vector to analyze
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Unified Google Security Command Center Deck */}
              <div style={{
                backgroundColor: '#1D2922',
                borderRadius: '16px',
                border: '1px solid #2A382F',
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px'
              }}>
                {analysis ? (
                  <>
                    {/* Section 1: Verdict & Threat Index */}
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                        <div>
                          <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.8px', color: '#A9B8AC' }}>
                            Security Assessment
                          </span>
                          <h2 style={{ margin: '4px 0 0 0', fontSize: '20px', fontWeight: 800, color: '#E8EEE9' }}>
                            {analysis.threat_tier}
                          </h2>
                        </div>

                        {/* Modern Score Badge */}
                        <div style={{
                          display: 'flex',
                          alignItems: 'baseline',
                          gap: '2px',
                          backgroundColor: '#17211B',
                          padding: '6px 12px',
                          borderRadius: '12px',
                          border: `1px solid ${analysis.is_ai_phishing ? '#B98282' : '#79B89A'}`
                        }}>
                          <span style={{ fontSize: '22px', fontWeight: 900, color: analysis.is_ai_phishing ? '#B98282' : '#79B89A' }}>
                            {analysis.overall_threat_score}
                          </span>
                          <span style={{ fontSize: '11px', color: '#A9B8AC', fontWeight: 600 }}>/100</span>
                        </div>
                      </div>

                      <p style={{ margin: '8px 0 0 0', fontSize: '13.5px', color: '#A9B8AC', lineHeight: 1.5 }}>
                        {analysis.summary}
                      </p>
                    </div>

                    {/* Section 2: Persuasion Vectors (Material Progress Bars) */}
                    <div style={{ borderTop: '1px solid #2A382F', paddingTop: '20px' }}>
                      <span style={{ fontSize: '11.5px', fontWeight: 800, textTransform: 'uppercase', color: '#A9B8AC', letterSpacing: '0.6px', display: 'block', marginBottom: '14px' }}>
                        Detected Cognitive Persuasion Signals ({analysis.triggers.length})
                      </span>

                      {analysis.triggers.length === 0 ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#79B89A', fontSize: '13px', fontWeight: 600 }}>
                          <CheckCircle2 size={16} />
                          <span>No manipulative psychological vectors identified.</span>
                        </div>
                      ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                          {analysis.triggers.map((trig, idx) => {
                            const percent = Math.round(trig.score * 100);
                            return (
                              <div key={idx}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', marginBottom: '4px' }}>
                                  <span style={{ fontWeight: 700, color: '#E8EEE9' }}>
                                    {trig.category}
                                  </span>
                                  <span style={{ color: '#C9AD72', fontWeight: 700 }}>
                                    {percent}% Intensity
                                  </span>
                                </div>

                                {/* Clean Google-style progress bar */}
                                <div style={{ width: '100%', height: '5px', backgroundColor: '#17211B', borderRadius: '3px', overflow: 'hidden' }}>
                                  <div style={{
                                    width: `${percent}%`,
                                    height: '100%',
                                    backgroundColor: percent > 70 ? '#B98282' : '#C9AD72',
                                    borderRadius: '3px'
                                  }} />
                                </div>
                                <span style={{ fontSize: '12px', color: '#A9B8AC', marginTop: '4px', display: 'block' }}>
                                  {trig.explanation}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* Section 3: Legacy Filter Blindspot (Why SEGs Missed It) */}
                    <div style={{
                      backgroundColor: '#17211B',
                      border: '1px solid rgba(201, 173, 114, 0.3)',
                      borderRadius: '12px',
                      padding: '16px'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                        <span style={{ fontSize: '11.5px', fontWeight: 800, color: '#C9AD72', textTransform: 'uppercase' }}>
                          Traditional Filter Delta
                        </span>
                        <span style={{ fontSize: '11px', color: '#A9B8AC', fontWeight: 600 }}>
                          Spam Score: {analysis.legacy_comparison.spam_score}/100
                        </span>
                      </div>
                      <p style={{ margin: 0, fontSize: '12.5px', color: '#E8EEE9', lineHeight: 1.45 }}>
                        {analysis.legacy_comparison.reason}
                      </p>
                    </div>

                    {/* Section 4: 10s Inoculation Protocol Button */}
                    <button
                      onClick={() => setIsInoculationOpen(true)}
                      className="btn-eucalyptus"
                      style={{
                        padding: '14px',
                        fontSize: '14px',
                        width: '100%',
                        borderRadius: '10px'
                      }}
                    >
                      <Award size={16} />
                      Launch 10s Inoculation Training
                    </button>
                  </>
                ) : (
                  <div style={{ textAlign: 'center', color: '#A9B8AC', padding: '40px 0' }}>
                    Select an incident to view security forensics
                  </div>
                )}
              </div>
            </main>
          </div>
        )}
      </div>

      {/* Onboarding Tour Modal */}
      <OnboardingTour
        isOpen={showTour}
        onClose={() => setShowTour(false)}
        onComplete={() => setShowTour(false)}
      />

      {/* Floating Inoculation Modal */}
      {analysis && (
        <InoculationModal
          isOpen={isInoculationOpen}
          onClose={() => setIsInoculationOpen(false)}
          inoculation={analysis.inoculation}
          messageId={analysis.message_id}
        />
      )}

      {/* Mobile QR Code Modal */}
      <MobileQrModal
        isOpen={isMobileQrOpen}
        onClose={() => setIsMobileQrOpen(false)}
      />

      {/* Incident Forensics Brief Modal */}
      <ForensicsBriefModal
        isOpen={isBriefOpen}
        onClose={() => setIsBriefOpen(false)}
        message={currentMessage}
        analysis={analysis}
      />

      {/* Live Inbound Attack Simulated Toast */}
      <InboundPhishToast
        toast={inboundToast}
        onInspect={handleInspectToast}
        onDismiss={() => setInboundToast({ visible: false, payload: null })}
      />
    </div>
  );
};

export default App;
