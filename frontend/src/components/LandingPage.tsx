import React, { useState } from 'react';
import {
  Shield,
  ArrowRight,
  Lock,
  Smartphone,
  Mail,
  MessageSquare,
  Award,
  Terminal,
  Brain,
  AlertTriangle,
  Eye,
  FileSpreadsheet,
  Layers,
  Sparkles,
  Activity,
  Cpu
} from 'lucide-react';

interface LandingPageProps {
  onGoToAuth: () => void;
  onGoToConsole: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGoToAuth, onGoToConsole }) => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const usageSteps = [
    {
      num: '01',
      title: 'Select Channel Vector',
      desc: 'Switch between enterprise Email (Outlook/Gmail), Slack workspace DMs, and Mobile SMS (Smishing) in a single unified triage stream.',
      icon: <Layers size={22} color="#79B89A" />
    },
    {
      num: '02',
      title: 'Activate Cognitive Heatmap',
      desc: 'Toggle the in-situ heatmap to inspect psychological influence markers mapped directly onto message sentences in under 15ms.',
      icon: <Eye size={22} color="#B8C99B" />
    },
    {
      num: '03',
      title: 'Deploy 10s Inoculation',
      desc: 'Launch the Socratic micro-trainer at interception. Staff analyze contrastive authentic baselines and lock in psychological immunity.',
      icon: <Award size={22} color="#C9AD72" />
    },
    {
      num: '04',
      title: 'Scan on Mobile & Chrome',
      desc: 'Scan the live QR code on iOS/Android to test smishing on real phones, or use the ZeroBait Lens Chrome Extension to scan any webpage.',
      icon: <Smartphone size={22} color="#79B89A" />
    }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#101713', // Deep Forest
      color: '#E8EEE9', // Soft Ivory
      display: 'flex',
      flexDirection: 'column',
      overflowX: 'hidden'
    }}>
      {/* ==================== GLASSMORPHIC TOP NAVBAR ==================== */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backdropFilter: 'blur(20px) saturate(180%)',
        backgroundColor: 'rgba(23, 33, 27, 0.75)', // Forest Slate with glass blur
        borderBottom: '1px solid rgba(121, 184, 154, 0.15)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.35)'
      }}>
        <div style={{
          maxWidth: '1360px',
          margin: '0 auto',
          padding: '16px 28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {/* Logo & Tag */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              backgroundColor: '#79B89A',
              color: '#101713',
              borderRadius: '10px',
              padding: '8px',
              display: 'flex',
              boxShadow: '0 0 15px rgba(121, 184, 154, 0.3)'
            }}>
              <Shield size={20} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '20px', fontWeight: 900, color: '#E8EEE9', letterSpacing: '-0.5px' }}>
                  Zero<span style={{ color: '#79B89A' }}>Bait</span>
                </span>
                <span style={{
                  fontSize: '9.5px',
                  fontWeight: 800,
                  backgroundColor: 'rgba(121, 184, 154, 0.12)',
                  color: '#79B89A',
                  border: '1px solid rgba(121, 184, 154, 0.3)',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  letterSpacing: '0.8px'
                }}>
                  COGNITIVE DEFENSE
                </span>
              </div>
            </div>
          </div>

          {/* Quick Nav Anchor Links */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <a href="#motive" style={{ color: '#A9B8AC', fontSize: '13px', fontWeight: 600, textDecoration: 'none', transition: 'color 0.2s ease' }} onMouseEnter={(e) => (e.currentTarget.style.color = '#79B89A')} onMouseLeave={(e) => (e.currentTarget.style.color = '#A9B8AC')}>Why ZeroBait</a>
            <a href="#how-it-works" style={{ color: '#A9B8AC', fontSize: '13px', fontWeight: 600, textDecoration: 'none', transition: 'color 0.2s ease' }} onMouseEnter={(e) => (e.currentTarget.style.color = '#79B89A')} onMouseLeave={(e) => (e.currentTarget.style.color = '#A9B8AC')}>How It Works</a>
            <a href="#how-to-use" style={{ color: '#A9B8AC', fontSize: '13px', fontWeight: 600, textDecoration: 'none', transition: 'color 0.2s ease' }} onMouseEnter={(e) => (e.currentTarget.style.color = '#79B89A')} onMouseLeave={(e) => (e.currentTarget.style.color = '#A9B8AC')}>How to Use</a>
            <a href="#features" style={{ color: '#A9B8AC', fontSize: '13px', fontWeight: 600, textDecoration: 'none', transition: 'color 0.2s ease' }} onMouseEnter={(e) => (e.currentTarget.style.color = '#79B89A')} onMouseLeave={(e) => (e.currentTarget.style.color = '#A9B8AC')}>Features</a>
          </nav>

          {/* Header Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={onGoToAuth}
              className="btn-forest-secondary"
              style={{
                padding: '9px 18px',
                fontSize: '13px',
                backdropFilter: 'blur(8px)',
                background: 'rgba(29, 41, 34, 0.7)',
                boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.08), 0 4px 12px rgba(0,0,0,0.2)'
              }}
            >
              <Lock size={13} color="#79B89A" style={{ marginRight: '6px' }} />
              Clearance Sign In
            </button>
            <button
              onClick={onGoToConsole}
              className="btn-eucalyptus"
              style={{
                padding: '9px 20px',
                fontSize: '13px',
                boxShadow: '0 4px 16px rgba(121, 184, 154, 0.35)'
              }}
            >
              Launch Console <ArrowRight size={14} style={{ marginLeft: '4px' }} />
            </button>
          </div>
        </div>
      </header>

      {/* ==================== HERO SECTION ==================== */}
      <section style={{
        maxWidth: '1240px',
        margin: '0 auto',
        padding: '70px 24px 60px 24px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative'
      }}>
        {/* Glowing Pill Tag */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          padding: '6px 18px',
          borderRadius: '30px',
          backgroundColor: 'rgba(23, 33, 27, 0.8)',
          border: '1px solid rgba(121, 184, 154, 0.3)',
          boxShadow: '0 0 20px rgba(121, 184, 154, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
          marginBottom: '32px'
        }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#79B89A', boxShadow: '0 0 8px #79B89A' }} />
          <span style={{ fontSize: '12px', fontWeight: 800, color: '#B8C99B', letterSpacing: '0.8px', textTransform: 'uppercase' }}>
            Human Sensor &bull; Zero Trust Cognitive Security
          </span>
        </div>

        {/* Central Bold Quote */}
        <blockquote style={{
          margin: '0 0 28px 0',
          padding: '0 10px',
          fontSize: '48px',
          fontWeight: 900,
          lineHeight: 1.15,
          letterSpacing: '-1.8px',
          color: '#E8EEE9',
          maxWidth: '1000px'
        }}>
          &ldquo;The human is not the weakest link; the human is the <span style={{ color: '#79B89A' }}>only sensor</span> capable of detecting true intent.&rdquo;
        </blockquote>

        <p style={{
          fontSize: '18px',
          color: '#A9B8AC',
          lineHeight: 1.6,
          maxWidth: '780px',
          margin: '0 auto 40px auto',
          fontWeight: 400
        }}>
          When generative AI writes tailored spear-phishing with clean links, zero malware, and perfect SPF/DKIM, legacy security gateways pass it directly to inboxes. ZeroBait decodes psychological coercion across Email, Slack, and SMS—inoculating users in 10 seconds.
        </p>

        {/* Hero CTAs */}
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={onGoToConsole}
            className="btn-eucalyptus"
            style={{
              padding: '16px 36px',
              fontSize: '15px',
              boxShadow: '0 8px 24px rgba(121, 184, 154, 0.35)'
            }}
          >
            Enter Security Command Center <ArrowRight size={18} />
          </button>

          <button
            onClick={onGoToAuth}
            className="btn-forest-secondary"
            style={{
              padding: '16px 32px',
              fontSize: '15px',
              backdropFilter: 'blur(8px)',
              background: 'rgba(29, 41, 34, 0.85)',
              boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 4px 16px rgba(0,0,0,0.3)'
            }}
          >
            <Lock size={16} color="#79B89A" /> Enterprise Clearance Login
          </button>
        </div>

        {/* Live Channel Badges */}
        <div style={{
          display: 'flex',
          gap: '14px',
          marginTop: '44px',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 18px',
            backgroundColor: '#1D2922',
            border: '1px solid #2A382F',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
          }}>
            <Mail size={16} color="#79B89A" />
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#E8EEE9' }}>
              Enterprise Outlook &amp; Gmail (BEC Defense)
            </span>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 18px',
            backgroundColor: '#1D2922',
            border: '1px solid #2A382F',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
          }}>
            <MessageSquare size={16} color="#B8C99B" />
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#E8EEE9' }}>
              Workspace Slack (Lateral SSO Harvest)
            </span>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 18px',
            backgroundColor: '#1D2922',
            border: '1px solid #2A382F',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
          }}>
            <Smartphone size={16} color="#79B89A" />
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#E8EEE9' }}>
              Mobile SMS (Executive Smishing Defense)
            </span>
          </div>
        </div>
      </section>

      {/* ==================== SECTION: WHAT'S THE MOTIVE ==================== */}
      <section id="motive" style={{
        maxWidth: '1240px',
        margin: '0 auto',
        padding: '60px 24px',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '44px' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#79B89A', letterSpacing: '1px' }}>
            Why We Built ZeroBait
          </span>
          <h2 style={{ fontSize: '32px', fontWeight: 900, color: '#E8EEE9', margin: '8px 0 12px 0', letterSpacing: '-0.8px' }}>
            The Generative AI Blindspot in Modern Cybersecurity
          </h2>
          <p style={{ fontSize: '16px', color: '#A9B8AC', maxWidth: '720px', margin: '0 auto', lineHeight: 1.6 }}>
            Legacy Secure Email Gateways (SEGs) like Proofpoint and Microsoft Defender were engineered for the 2010s. Here is why generative AI renders them helpless.
          </p>
        </div>

        {/* Contrast Cards: Old Security vs ZeroBait */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          {/* Card 1: The Broken Legacy Model */}
          <div style={{
            backgroundColor: '#17211B',
            border: '1px solid rgba(185, 130, 130, 0.4)',
            borderRadius: '16px',
            padding: '32px',
            position: 'relative',
            boxShadow: '0 12px 30px rgba(0,0,0,0.3)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
              <div style={{ backgroundColor: 'rgba(185, 130, 130, 0.15)', padding: '8px', borderRadius: '8px' }}>
                <AlertTriangle size={22} color="#B98282" />
              </div>
              <h3 style={{ margin: 0, fontSize: '19px', fontWeight: 800, color: '#F0BCBC' }}>
                Legacy Security Filter (SEG) Failure
              </h3>
            </div>

            <ul style={{ margin: 0, paddingLeft: '20px', color: '#A9B8AC', lineHeight: 1.8, fontSize: '14px' }}>
              <li>
                <strong style={{ color: '#E8EEE9' }}>URL &amp; Domain Dependent:</strong> Only looks for known malicious domains. GenAI attacks use compromised legitimate domains or request replies without links.
              </li>
              <li>
                <strong style={{ color: '#E8EEE9' }}>Malware Signature Blind:</strong> Checks file hashes for viruses. Generative AI spear-phishing carries <em style={{ color: '#F0BCBC' }}>zero malware</em> payloads.
              </li>
              <li>
                <strong style={{ color: '#E8EEE9' }}>Grammar &amp; Spam Rules Obsolete:</strong> Filters look for broken English or spam trigger words. Modern LLMs write with flawless executive tone.
              </li>
              <li>
                <strong style={{ color: '#E8EEE9' }}>Punitive Human Treatment:</strong> Treats staff as "the weakest link," punishing victims with boring 45-minute annual video compliance quizzes they ignore.
              </li>
            </ul>
          </div>

          {/* Card 2: The ZeroBait Paradigm */}
          <div style={{
            backgroundColor: '#1D2922',
            border: '1px solid #79B89A',
            borderRadius: '16px',
            padding: '32px',
            position: 'relative',
            boxShadow: '0 12px 30px rgba(121, 184, 154, 0.12)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
              <div style={{ backgroundColor: 'rgba(121, 184, 154, 0.18)', padding: '8px', borderRadius: '8px' }}>
                <Shield size={22} color="#79B89A" />
              </div>
              <h3 style={{ margin: 0, fontSize: '19px', fontWeight: 800, color: '#79B89A' }}>
                The ZeroBait Cognitive Defense
              </h3>
            </div>

            <ul style={{ margin: 0, paddingLeft: '20px', color: '#A9B8AC', lineHeight: 1.8, fontSize: '14px' }}>
              <li>
                <strong style={{ color: '#E8EEE9' }}>Linguistic Manipulation Detection:</strong> Analyzes psychological persuasion vectors (Authority Bias, Urgency, Scarcity, SOP Evasion) in &lt;15ms.
              </li>
              <li>
                <strong style={{ color: '#E8EEE9' }}>Cross-Vector Omni-Channel:</strong> Protects Slack DMs, executive SMS (Smishing), and inboxes from one coordinated command console.
              </li>
              <li>
                <strong style={{ color: '#E8EEE9' }}>In-Situ Visual Heatmap:</strong> Highlights manipulative syntax right inside the message body, rendering the attacker's deception transparent.
              </li>
              <li>
                <strong style={{ color: '#E8EEE9' }}>10-Second McGuire Inoculation:</strong> Empowers employees as active human sensors with instant contrastive micro-drills that boost cognitive immunity.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ==================== SECTION: HOW IT WORKS ==================== */}
      <section id="how-it-works" style={{
        maxWidth: '1240px',
        margin: '0 auto',
        padding: '60px 24px',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#79B89A', letterSpacing: '1px' }}>
            Architecture Pipeline
          </span>
          <h2 style={{ fontSize: '32px', fontWeight: 900, color: '#E8EEE9', margin: '8px 0 12px 0', letterSpacing: '-0.8px' }}>
            How ZeroBait Works: The 4-Stage Cognitive Pipeline
          </h2>
          <p style={{ fontSize: '16px', color: '#A9B8AC', maxWidth: '680px', margin: '0 auto', lineHeight: 1.6 }}>
            From packet arrival to psychological inoculation, every incoming message traverses a sub-15ms defense workflow.
          </p>
        </div>

        {/* 4 Pipeline Stages */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '20px'
        }}>
          {/* Stage 1 */}
          <div style={{
            backgroundColor: '#17211B',
            border: '1px solid #2A382F',
            borderRadius: '14px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.25)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', fontWeight: 900, color: '#79B89A', backgroundColor: 'rgba(121, 184, 154, 0.12)', padding: '3px 8px', borderRadius: '4px' }}>
                STAGE 01
              </span>
              <Cpu size={18} color="#79B89A" />
            </div>
            <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#E8EEE9' }}>
              Omni-Channel Ingestion &amp; Heuristics
            </h4>
            <p style={{ margin: 0, fontSize: '13px', color: '#A9B8AC', lineHeight: 1.5 }}>
              Standardizes inbound payloads from Email, Slack, and SMS. Executes sub-millisecond Levenshtein typosquatting, SPF/DKIM verification, and homoglyph detection.
            </p>
          </div>

          {/* Stage 2 */}
          <div style={{
            backgroundColor: '#17211B',
            border: '1px solid #2A382F',
            borderRadius: '14px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.25)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', fontWeight: 900, color: '#B8C99B', backgroundColor: 'rgba(184, 201, 155, 0.12)', padding: '3px 8px', borderRadius: '4px' }}>
                STAGE 02
              </span>
              <Brain size={18} color="#B8C99B" />
            </div>
            <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#E8EEE9' }}>
              Cialdini Vector Decomposition
            </h4>
            <p style={{ margin: 0, fontSize: '13px', color: '#A9B8AC', lineHeight: 1.5 }}>
              Multi-agent reasoning models parse the semantic payload against 6 behavioral psychology vectors: Authority Bias, Urgency, Scarcity, and Internal SOP Evasion.
            </p>
          </div>

          {/* Stage 3 */}
          <div style={{
            backgroundColor: '#17211B',
            border: '1px solid #2A382F',
            borderRadius: '14px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.25)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', fontWeight: 900, color: '#C9AD72', backgroundColor: 'rgba(201, 173, 114, 0.12)', padding: '3px 8px', borderRadius: '4px' }}>
                STAGE 03
              </span>
              <Activity size={18} color="#C9AD72" />
            </div>
            <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#E8EEE9' }}>
              In-Situ Cognitive Heatmap
            </h4>
            <p style={{ margin: 0, fontSize: '13px', color: '#A9B8AC', lineHeight: 1.5 }}>
              Renders interactive color-coded tokens directly on the message body, visually highlighting procedural bypasses, manufactured haste, and credential lures.
            </p>
          </div>

          {/* Stage 4 */}
          <div style={{
            backgroundColor: '#1D2922',
            border: '1px solid #79B89A',
            borderRadius: '14px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            boxShadow: '0 8px 24px rgba(121, 184, 154, 0.15)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', fontWeight: 900, color: '#79B89A', backgroundColor: 'rgba(121, 184, 154, 0.2)', padding: '3px 8px', borderRadius: '4px' }}>
                STAGE 04
              </span>
              <Award size={18} color="#79B89A" />
            </div>
            <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#79B89A' }}>
              10s Socratic Inoculation
            </h4>
            <p style={{ margin: 0, fontSize: '13px', color: '#E8EEE9', lineHeight: 1.5 }}>
              At the exact moment of risk, delivers a 10-second contrastive quiz (McGuire Inoculation Theory). Staff recognize synthetic deception and earn resilience badges.
            </p>
          </div>
        </div>
      </section>

      {/* ==================== SECTION: HOW TO USE IT ==================== */}
      <section id="how-to-use" style={{
        maxWidth: '1240px',
        margin: '0 auto',
        padding: '60px 24px',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '44px' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#79B89A', letterSpacing: '1px' }}>
            Interactive User Guide
          </span>
          <h2 style={{ fontSize: '32px', fontWeight: 900, color: '#E8EEE9', margin: '8px 0 12px 0', letterSpacing: '-0.8px' }}>
            How to Use ZeroBait: 4 Simple Steps
          </h2>
          <p style={{ fontSize: '16px', color: '#A9B8AC', maxWidth: '640px', margin: '0 auto', lineHeight: 1.6 }}>
            Whether you are a SOC Analyst, CISO, or an end-user, navigating ZeroBait is intuitive and fast.
          </p>
        </div>

        {/* Interactive Step Navigator */}
        <div style={{
          backgroundColor: '#17211B',
          border: '1px solid #2A382F',
          borderRadius: '16px',
          padding: '32px',
          boxShadow: '0 12px 36px rgba(0,0,0,0.35)'
        }}>
          {/* Step Selector Tabs */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '28px' }}>
            {usageSteps.map((step, idx) => {
              const isSelected = activeStep === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  style={{
                    backgroundColor: isSelected ? '#1D2922' : 'transparent',
                    border: isSelected ? '1px solid #79B89A' : '1px solid #2A382F',
                    borderRadius: '10px',
                    padding: '14px 16px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: isSelected ? '0 4px 16px rgba(121, 184, 154, 0.2)' : 'none'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 900, color: isSelected ? '#79B89A' : '#A9B8AC' }}>
                      {step.num}
                    </span>
                    {step.icon}
                  </div>
                  <div style={{ fontSize: '13.5px', fontWeight: 700, color: isSelected ? '#E8EEE9' : '#A9B8AC' }}>
                    {step.title}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Step Showcase Card */}
          <div style={{
            backgroundColor: '#1D2922',
            border: '1px solid #2A382F',
            borderRadius: '12px',
            padding: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '24px'
          }}>
            <div style={{ maxWidth: '600px' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#79B89A', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                Operational Step {usageSteps[activeStep].num}
              </span>
              <h3 style={{ margin: '6px 0 10px 0', fontSize: '22px', fontWeight: 900, color: '#E8EEE9' }}>
                {usageSteps[activeStep].title}
              </h3>
              <p style={{ margin: 0, fontSize: '14.5px', color: '#A9B8AC', lineHeight: 1.6 }}>
                {usageSteps[activeStep].desc}
              </p>
            </div>

            <button
              onClick={onGoToConsole}
              className="btn-eucalyptus"
              style={{ padding: '12px 24px', fontSize: '13.5px' }}
            >
              Try In Command Console <ArrowRight size={14} style={{ marginLeft: '4px' }} />
            </button>
          </div>
        </div>
      </section>

      {/* ==================== SECTION: EXTRA FEATURES BEYOND EXISTING ==================== */}
      <section id="features" style={{
        maxWidth: '1240px',
        margin: '0 auto',
        padding: '60px 24px 80px 24px',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '44px' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#79B89A', letterSpacing: '1px' }}>
            Our Innovation Delta
          </span>
          <h2 style={{ fontSize: '32px', fontWeight: 900, color: '#E8EEE9', margin: '8px 0 12px 0', letterSpacing: '-0.8px' }}>
            Advanced Capabilities Built Beyond Standard Tools
          </h2>
          <p style={{ fontSize: '16px', color: '#A9B8AC', maxWidth: '680px', margin: '0 auto', lineHeight: 1.6 }}>
            ZeroBait introduces 6 patent-ready capabilities designed specifically for the generative AI threat landscape.
          </p>
        </div>

        {/* 6 High-Impact Feature Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '22px'
        }}>
          {/* Feature 1 */}
          <div className="forest-card" style={{ padding: '26px' }}>
            <div style={{ backgroundColor: 'rgba(121, 184, 154, 0.15)', padding: '10px', borderRadius: '10px', display: 'inline-flex', marginBottom: '16px' }}>
              <Eye size={22} color="#79B89A" />
            </div>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '17px', fontWeight: 800, color: '#E8EEE9' }}>
              In-Situ Linguistic Persuasion Heatmap
            </h3>
            <p style={{ margin: 0, fontSize: '13.5px', color: '#A9B8AC', lineHeight: 1.55 }}>
              Highlights specific sentences mapped to Cialdini influence markers directly inside the email or message body, making invisible manipulation visually obvious.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="forest-card" style={{ padding: '26px' }}>
            <div style={{ backgroundColor: 'rgba(184, 201, 155, 0.15)', padding: '10px', borderRadius: '10px', display: 'inline-flex', marginBottom: '16px' }}>
              <Award size={22} color="#B8C99B" />
            </div>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '17px', fontWeight: 800, color: '#E8EEE9' }}>
              10-Second McGuire Inoculation Socratic Drill
            </h3>
            <p style={{ margin: 0, fontSize: '13.5px', color: '#A9B8AC', lineHeight: 1.55 }}>
              Replaces boring annual video compliance quizzes with instant 10s interactive micro-vaccines at the moment of risk, establishing permanent psychological reflexes.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="forest-card" style={{ padding: '26px' }}>
            <div style={{ backgroundColor: 'rgba(121, 184, 154, 0.15)', padding: '10px', borderRadius: '10px', display: 'inline-flex', marginBottom: '16px' }}>
              <Smartphone size={22} color="#79B89A" />
            </div>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '17px', fontWeight: 800, color: '#E8EEE9' }}>
              Real-Device Mobile Smishing Bridge (QR Sync)
            </h3>
            <p style={{ margin: 0, fontSize: '13.5px', color: '#A9B8AC', lineHeight: 1.55 }}>
              Scan a live LAN QR code to test mobile smishing attacks directly on judges' or executives' personal phones without installing any mobile app.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="forest-card" style={{ padding: '26px' }}>
            <div style={{ backgroundColor: 'rgba(201, 173, 114, 0.15)', padding: '10px', borderRadius: '10px', display: 'inline-flex', marginBottom: '16px' }}>
              <Terminal size={22} color="#C9AD72" />
            </div>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '17px', fontWeight: 800, color: '#E8EEE9' }}>
              Adversarial Red-Team Studio (FraudGPT)
            </h3>
            <p style={{ margin: 0, fontSize: '13.5px', color: '#A9B8AC', lineHeight: 1.55 }}>
              Reverse-engineers criminal prompts to show how attackers use LLMs like FraudGPT to bypass security, testing defense models against synthetic zero-days.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="forest-card" style={{ padding: '26px' }}>
            <div style={{ backgroundColor: 'rgba(121, 184, 154, 0.15)', padding: '10px', borderRadius: '10px', display: 'inline-flex', marginBottom: '16px' }}>
              <Sparkles size={22} color="#79B89A" />
            </div>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '17px', fontWeight: 800, color: '#E8EEE9' }}>
              ZeroBait Lens Chrome Extension (MV3)
            </h3>
            <p style={{ margin: 0, fontSize: '13.5px', color: '#A9B8AC', lineHeight: 1.55 }}>
              A lightweight Manifest V3 browser extension allowing employees to highlight any suspicious text on webmail or portals and scan for cognitive intent instantly.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="forest-card" style={{ padding: '26px' }}>
            <div style={{ backgroundColor: 'rgba(184, 201, 155, 0.15)', padding: '10px', borderRadius: '10px', display: 'inline-flex', marginBottom: '16px' }}>
              <FileSpreadsheet size={22} color="#B8C99B" />
            </div>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '17px', fontWeight: 800, color: '#E8EEE9' }}>
              Stateful Cookie JWT &amp; SOC-2 Export
            </h3>
            <p style={{ margin: 0, fontSize: '13.5px', color: '#A9B8AC', lineHeight: 1.55 }}>
              Production-ready HttpOnly JWT cookie auth across roles (SOC Analyst, CISO, Security Lead) with one-click cryptographic SOC-2 CSV compliance exporting.
            </p>
          </div>
        </div>

        {/* Bottom Call to Action Card */}
        <div style={{
          marginTop: '60px',
          padding: '40px',
          borderRadius: '16px',
          background: 'linear-gradient(135deg, #17211B 0%, #1D2922 100%)',
          border: '1px solid #79B89A',
          boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '24px'
        }}>
          <div>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '24px', fontWeight: 900, color: '#E8EEE9' }}>
              Ready to Activate the Human Cognitive Sensor Layer?
            </h3>
            <p style={{ margin: 0, fontSize: '14.5px', color: '#A9B8AC', maxWidth: '640px' }}>
              Join enterprise teams protecting against generative AI spear-phishing across email, Slack, and SMS.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={onGoToConsole}
              className="btn-eucalyptus"
              style={{ padding: '14px 28px', fontSize: '14.5px' }}
            >
              Launch ZeroBait Console <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer style={{
        backgroundColor: '#17211B',
        borderTop: '1px solid #2A382F',
        padding: '28px 32px'
      }}>
        <div style={{
          maxWidth: '1360px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '15px', fontWeight: 900, color: '#E8EEE9' }}>
              Zero<span style={{ color: '#79B89A' }}>Bait</span>
            </span>
            <span style={{ color: '#2A382F' }}>&bull;</span>
            <span style={{ fontSize: '12.5px', color: '#A9B8AC', fontWeight: 500 }}>
              Enterprise Cognitive Threat Defense &amp; Inoculation Platform
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#79B89A', boxShadow: '0 0 8px #79B89A' }} />
            <span style={{ fontSize: '12px', color: '#79B89A', fontWeight: 700 }}>
              Live Engine Active (Latency &lt; 12ms)
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};
