import React, { useState } from 'react';
import { BookOpen, Shield, Zap, Terminal, Globe, Cpu, Crosshair, Brain, CheckCircle2 } from 'lucide-react';

export const UserGuide: React.FC = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { id: 'overview', icon: BookOpen, label: 'Platform Architecture' },
    { id: 'live_inspector', icon: Zap, label: 'Real-Time Threat Inspector' },
    { id: 'red_team', icon: Crosshair, label: 'Adversarial Studio' },
    { id: 'chrome_ext', icon: Globe, label: 'Chrome Extension' },
    { id: 'posture', icon: Shield, label: 'CISO Posture & SOC-2' },
    { id: 'api', icon: Terminal, label: 'REST API Reference' },
  ];

  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '28px', display: 'flex', gap: '32px', minHeight: 'calc(100vh - 100px)' }}>
      
      {/* Sidebar Navigation */}
      <div style={{ width: '280px', flexShrink: 0 }}>
        <div style={{
          backgroundColor: '#1D2922', // Moss Charcoal
          borderRadius: '14px',
          border: '1px solid #2A382F', // Soft Forest Border
          padding: '16px'
        }}>
          <h3 style={{ fontSize: '11px', fontWeight: 800, color: '#A9B8AC', textTransform: 'uppercase', letterSpacing: '0.8px', margin: '0 0 12px 8px' }}>
            System Documentation
          </h3>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {sections.map(sec => {
              const Icon = sec.icon;
              const isActive = activeSection === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => setActiveSection(sec.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: isActive ? '1px solid #79B89A' : '1px solid transparent',
                    backgroundColor: isActive ? '#101713' : 'transparent',
                    color: isActive ? '#79B89A' : '#A9B8AC',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.12s ease'
                  }}
                >
                  <Icon size={16} color={isActive ? '#79B89A' : '#B8C99B'} />
                  {sec.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Content Area */}
      <div style={{ flex: 1, paddingBottom: '60px' }}>
        
        {/* OVERVIEW SECTION */}
        {activeSection === 'overview' && (
          <div style={{ backgroundColor: '#1D2922', borderRadius: '16px', border: '1px solid #2A382F', padding: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
              <div style={{ backgroundColor: 'rgba(121, 184, 154, 0.15)', padding: '8px', borderRadius: '10px', color: '#79B89A', display: 'flex' }}>
                <BookOpen size={24} />
              </div>
              <h2 style={{ margin: 0, fontSize: '24px', color: '#E8EEE9', fontWeight: 800, letterSpacing: '-0.5px' }}>
                Platform Architecture &amp; Core Thesis
              </h2>
            </div>
            <p style={{ fontSize: '15px', color: '#A9B8AC', lineHeight: 1.6, marginBottom: '28px' }}>
              ZeroBait is an enterprise-grade <strong>Omni-Channel Inoculation Engine</strong> designed to defend organizations against generative AI spear-phishing that completely bypasses legacy Secure Email Gateways (SEGs). Attackers no longer include malicious binaries or known bad URLs; instead, they weaponize <strong>social engineering and procedural coercion</strong>.
            </p>
            
            <h4 style={{ fontSize: '16px', color: '#E8EEE9', fontWeight: 700, marginBottom: '16px' }}>Dual-Engine Processing Pipeline</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px', marginBottom: '32px' }}>
              <div style={{ padding: '22px', borderRadius: '12px', backgroundColor: '#101713', border: '1px solid #2A382F' }}>
                <Cpu size={24} color="#79B89A" style={{ marginBottom: '10px' }}/>
                <h5 style={{ margin: '0 0 6px 0', fontSize: '15px', color: '#E8EEE9', fontWeight: 700 }}>Layer 1: Deterministic Fast-Path (&lt;10ms)</h5>
                <p style={{ margin: 0, fontSize: '13.5px', color: '#A9B8AC', lineHeight: 1.5 }}>
                  Executes Levenshtein distance checks for typosquatting, RFC 5322 spoofing detection, Cyrillic homoglyph replacement, and zero-width obfuscation.
                </p>
              </div>
              <div style={{ padding: '22px', borderRadius: '12px', backgroundColor: '#101713', border: '1px solid #2A382F' }}>
                <Brain size={24} color="#B8C99B" style={{ marginBottom: '10px' }}/>
                <h5 style={{ margin: '0 0 6px 0', fontSize: '15px', color: '#E8EEE9', fontWeight: 700 }}>Layer 2: Multi-Agent Cognitive Persuasion</h5>
                <p style={{ margin: 0, fontSize: '13.5px', color: '#A9B8AC', lineHeight: 1.5 }}>
                  Deconstructs psychological manipulation using Robert Cialdini's six vectors of influence (Authority Bias, Artificial Urgency, Scarcity, SOP Evasion).
                </p>
              </div>
            </div>

            <h4 style={{ fontSize: '16px', color: '#E8EEE9', fontWeight: 700, marginBottom: '14px' }}>Supported Channels</h4>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', borderRadius: '8px', border: '1px solid #2A382F', backgroundColor: '#101713' }}>
                <CheckCircle2 size={16} color="#79B89A" />
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#E8EEE9' }}>Enterprise Email (Outlook &amp; Gmail)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', borderRadius: '8px', border: '1px solid #2A382F', backgroundColor: '#101713' }}>
                <CheckCircle2 size={16} color="#79B89A" />
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#E8EEE9' }}>Workspace Slack (Lateral SSO Harvest)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', borderRadius: '8px', border: '1px solid #2A382F', backgroundColor: '#101713' }}>
                <CheckCircle2 size={16} color="#79B89A" />
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#E8EEE9' }}>Mobile SMS (Smishing &amp; OTP Theft)</span>
              </div>
            </div>
          </div>
        )}

        {/* LIVE INSPECTOR SECTION */}
        {activeSection === 'live_inspector' && (
          <div style={{ backgroundColor: '#1D2922', borderRadius: '16px', border: '1px solid #2A382F', padding: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
              <div style={{ backgroundColor: 'rgba(121, 184, 154, 0.15)', padding: '8px', borderRadius: '10px', color: '#79B89A', display: 'flex' }}>
                <Zap size={24} />
              </div>
              <h2 style={{ margin: 0, fontSize: '24px', color: '#E8EEE9', fontWeight: 800 }}>Real-Time Threat Inspector (Sandbox)</h2>
            </div>
            <p style={{ fontSize: '15px', color: '#A9B8AC', lineHeight: 1.6, marginBottom: '22px' }}>
              The Live Inspector provides SOC analysts and employees with a safe interactive sandbox to submit raw inbound messages for instant psychological dissection.
            </p>
            <h4 style={{ fontSize: '16px', color: '#E8EEE9', fontWeight: 700, marginBottom: '12px' }}>How to Demonstrate to Judges:</h4>
            <ol style={{ color: '#E8EEE9', fontSize: '14.5px', lineHeight: 1.8, paddingLeft: '22px', marginBottom: '24px' }}>
              <li>Open the <strong>Live Inspector</strong> from the left sidebar navigation.</li>
              <li>Click one of the <strong>Presets</strong> (e.g. <em>CFO Wire BEC</em> or <em>Slack SSO</em>) to load a realistic attack scenario.</li>
              <li>Click <strong>"Scan Message for Cognitive Manipulation"</strong>.</li>
              <li>Point out the in-situ text heatmap where manipulative phrases are highlighted in real time.</li>
              <li>Click on any highlighted phrase to view the specific Cialdini bias explanation.</li>
            </ol>
          </div>
        )}

        {/* ADVERSARIAL STUDIO SECTION */}
        {activeSection === 'red_team' && (
          <div style={{ backgroundColor: '#1D2922', borderRadius: '16px', border: '1px solid #2A382F', padding: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
              <div style={{ backgroundColor: 'rgba(185, 130, 130, 0.15)', padding: '8px', borderRadius: '10px', color: '#B98282', display: 'flex' }}>
                <Crosshair size={24} />
              </div>
              <h2 style={{ margin: 0, fontSize: '24px', color: '#E8EEE9', fontWeight: 800 }}>Adversarial Red-Team Studio</h2>
            </div>
            <p style={{ fontSize: '15px', color: '#A9B8AC', lineHeight: 1.6, marginBottom: '22px' }}>
              ZeroBait includes an adversarial offensive engine designed to test enterprise resilience against zero-shot synthetic lures created by criminal LLMs (e.g. FraudGPT).
            </p>
            <h4 style={{ fontSize: '16px', color: '#E8EEE9', fontWeight: 700, marginBottom: '12px' }}>Reverse-Engineered Attacker Prompts</h4>
            <p style={{ fontSize: '14.5px', color: '#E8EEE9', lineHeight: 1.6 }}>
              When an attack is generated or intercepted, ZeroBait's engine deduces the exact prompt instructions the attacker fed into an LLM. This provides intelligence to security operations about the specific exploitation tactics being leveraged.
            </p>
          </div>
        )}

        {/* CHROME EXTENSION SECTION */}
        {activeSection === 'chrome_ext' && (
          <div style={{ backgroundColor: '#1D2922', borderRadius: '16px', border: '1px solid #2A382F', padding: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
              <div style={{ backgroundColor: 'rgba(121, 184, 154, 0.15)', padding: '8px', borderRadius: '10px', color: '#79B89A', display: 'flex' }}>
                <Globe size={24} />
              </div>
              <h2 style={{ margin: 0, fontSize: '24px', color: '#E8EEE9', fontWeight: 800 }}>Chrome Extension (Manifest V3)</h2>
            </div>
            <p style={{ fontSize: '15px', color: '#A9B8AC', lineHeight: 1.6, marginBottom: '22px' }}>
              ZeroBait ships with a native Manifest V3 Chrome Extension located in <code>/extension</code> that allows employees to scan text across any browser tab with a single right-click.
            </p>
            <div style={{ backgroundColor: '#101713', padding: '18px', borderRadius: '10px', border: '1px solid #2A382F', fontFamily: 'monospace', color: '#E8EEE9', fontSize: '13px', marginBottom: '20px', lineHeight: 1.6 }}>
              1. Open Chrome and navigate to chrome://extensions/<br/>
              2. Enable "Developer mode" in the top right corner.<br/>
              3. Click "Load unpacked" and select the /extension directory.<br/>
              4. Highlight any text in your web browser, right-click, and select "Scan with ZeroBait Lens".
            </div>
          </div>
        )}

        {/* POSTURE SECTION */}
        {activeSection === 'posture' && (
          <div style={{ backgroundColor: '#1D2922', borderRadius: '16px', border: '1px solid #2A382F', padding: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
              <div style={{ backgroundColor: 'rgba(121, 184, 154, 0.15)', padding: '8px', borderRadius: '10px', color: '#79B89A', display: 'flex' }}>
                <Shield size={24} />
              </div>
              <h2 style={{ margin: 0, fontSize: '24px', color: '#E8EEE9', fontWeight: 800 }}>CISO Posture &amp; SOC-2 Compliance</h2>
            </div>
            <p style={{ fontSize: '15px', color: '#A9B8AC', lineHeight: 1.6, marginBottom: '22px' }}>
              The CISO Posture dashboard visualizes real-time organizational vulnerability across four dimensions: Coercion Pressure, SOP Deviation, Channel Risk, and Identity Risk.
            </p>
            <p style={{ fontSize: '14.5px', color: '#E8EEE9', lineHeight: 1.6 }}>
              Clicking <strong>"Export SOC-2 Audit Report (CSV)"</strong> generates a cryptographic evidence log of all neutralizations and completed inoculation micro-drills for third-party compliance auditors.
            </p>
          </div>
        )}

        {/* API REFERENCE */}
        {activeSection === 'api' && (
          <div style={{ backgroundColor: '#1D2922', borderRadius: '16px', border: '1px solid #2A382F', padding: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
              <div style={{ backgroundColor: 'rgba(121, 184, 154, 0.15)', padding: '8px', borderRadius: '10px', color: '#79B89A', display: 'flex' }}>
                <Terminal size={24} />
              </div>
              <h2 style={{ margin: 0, fontSize: '24px', color: '#E8EEE9', fontWeight: 800 }}>REST API Integration Reference</h2>
            </div>
            <p style={{ fontSize: '14.5px', color: '#A9B8AC', lineHeight: 1.5, marginBottom: '20px' }}>
              ZeroBait integrates into enterprise SOAR systems (Splunk, Palo Alto Cortex XSOAR, Microsoft Sentinel) via standard JSON REST endpoints.
            </p>
            <div style={{ backgroundColor: '#101713', padding: '18px', borderRadius: '10px', border: '1px solid #2A382F', fontFamily: 'monospace', color: '#E8EEE9', fontSize: '13px' }}>
              <div style={{ color: '#79B89A', fontWeight: 700, marginBottom: '8px' }}>POST /api/v1/analyze</div>
              {`// Request:
{
  "message": "Urgent wire payment required before 3 PM.",
  "channel_context": "email"
}

// Response:
{
  "threat_score": 88,
  "threat_tier": "CRITICAL RISK",
  "triggers": [
    { "category": "Urgency", "score": 0.95 }
  ]
}`}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
