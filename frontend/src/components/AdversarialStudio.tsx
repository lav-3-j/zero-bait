import React, { useState } from 'react';
import type { ChannelType, AdversarialGenerateRequest, AdversarialGenerateResponse } from '../types/message';
import { CognitiveHeatmap } from './CognitiveHeatmap';
import { Crosshair, Sparkles, Terminal, ShieldAlert } from 'lucide-react';

interface AdversarialStudioProps {
  onGenerateAttack: (req: AdversarialGenerateRequest) => Promise<AdversarialGenerateResponse | null>;
  isLoading: boolean;
}

export const AdversarialStudio: React.FC<AdversarialStudioProps> = ({
  onGenerateAttack,
  isLoading
}) => {
  const [channel, setChannel] = useState<ChannelType>('email');
  const [targetRole, setTargetRole] = useState('Chief Financial Officer');
  const [scenario, setScenario] = useState('Urgent Vendor Wire Routing Adjustment');
  const [lastResult, setLastResult] = useState<AdversarialGenerateResponse | null>(null);

  const handleRun = async () => {
    const res = await onGenerateAttack({
      channel,
      target_role: targetRole,
      scenario,
      sophistication: 'advanced'
    });
    if (res) {
      setLastResult(res);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Generator Control Panel */}
      <div style={{
        backgroundColor: '#1D2922', // Moss Charcoal
        borderRadius: '14px',
        border: '1px solid #2A382F', // Soft Forest Border
        padding: '28px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              backgroundColor: 'rgba(185, 130, 130, 0.15)',
              border: '1px solid #B98282',
              padding: '8px',
              borderRadius: '8px',
              color: '#B98282',
              display: 'flex'
            }}>
              <Crosshair size={22} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#E8EEE9', letterSpacing: '-0.3px' }}>
                Adversarial Red-Team Studio (Live Attack Simulator)
              </h3>
              <p style={{ margin: 0, fontSize: '13px', color: '#A9B8AC', fontWeight: 400 }}>
                Simulate FraudGPT / WormGPT LLM generation and reverse-engineer attacker prompts
              </p>
            </div>
          </div>
          <span style={{
            fontSize: '11px',
            fontWeight: 700,
            color: '#B98282',
            backgroundColor: 'rgba(185, 130, 130, 0.15)',
            padding: '4px 10px',
            borderRadius: '20px',
            border: '1px solid #B98282'
          }}>
            OFFENSIVE BENCHMARKING
          </span>
        </div>

        <p style={{ margin: 0, fontSize: '14.5px', color: '#A9B8AC', lineHeight: 1.6 }}>
          Test ZeroBait against <strong>unseen, zero-shot AI attacks</strong>. Select any victim persona and threat scenario below. Our dual engine synthesizes the attack and demonstrates how ZeroBait detects the manipulation.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '11px', color: '#A9B8AC', marginBottom: '6px', fontWeight: 700, textTransform: 'uppercase' }}>
              Attack Vector Channel
            </label>
            <select
              value={channel}
              onChange={(e) => setChannel(e.target.value as ChannelType)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                background: '#101713',
                border: '1px solid #2A382F',
                color: '#E8EEE9',
                fontSize: '13.5px',
                fontWeight: 600,
                boxSizing: 'border-box'
              }}
            >
              <option value="email">Enterprise Email</option>
              <option value="slack">Workspace Slack</option>
              <option value="sms">Mobile SMS (Smishing)</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '11px', color: '#A9B8AC', marginBottom: '6px', fontWeight: 700, textTransform: 'uppercase' }}>
              Target Employee Persona
            </label>
            <select
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                background: '#101713',
                border: '1px solid #2A382F',
                color: '#E8EEE9',
                fontSize: '13.5px',
                fontWeight: 600,
                boxSizing: 'border-box'
              }}
            >
              <option value="Chief Financial Officer">Finance Director / CFO</option>
              <option value="DevOps Lead">DevOps / Cloud Architect</option>
              <option value="HR Talent Director">HR / People Operations</option>
              <option value="Senior Software Engineer">Senior Engineer</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '11px', color: '#A9B8AC', marginBottom: '6px', fontWeight: 700, textTransform: 'uppercase' }}>
              Exploit Scenario
            </label>
            <select
              value={scenario}
              onChange={(e) => setScenario(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                background: '#101713',
                border: '1px solid #2A382F',
                color: '#E8EEE9',
                fontSize: '13.5px',
                fontWeight: 600,
                boxSizing: 'border-box'
              }}
            >
              <option value="Urgent Vendor Wire Routing Adjustment">Expedited Vendor Wire</option>
              <option value="Okta SSO Certificate Expiration">SSO Credential Harvesting</option>
              <option value="Confidential Mergers & Acquisitions Deck">Exfiltration to Personal Email</option>
              <option value="Executive Keynote Gift Cards">Executive Gift Card Scam</option>
            </select>
          </div>
        </div>

        <button
          type="button"
          disabled={isLoading}
          onClick={handleRun}
          className="btn-eucalyptus"
          style={{ width: '100%', padding: '13px', fontSize: '14px' }}
        >
          <Sparkles size={16} />
          {isLoading ? 'Synthesizing Attack & Running Dual-Engine Defense...' : 'Synthesize AI Spear-Phish & Run Defense'}
        </button>
      </div>

      {/* Reconstructed Attacker Prompt & Intercepted Message Output */}
      {lastResult && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* Reconstructed Attacker GenAI Prompt Box */}
          <div style={{
            padding: '18px 24px',
            borderRadius: '12px',
            backgroundColor: '#17211B', // Forest Slate
            border: '1px solid #C9AD72', // Muted Gold
            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.2)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Terminal size={18} color="#C9AD72" />
              <span style={{ fontSize: '12px', fontWeight: 800, color: '#C9AD72', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                Reconstructed Attacker GenAI Prompt (Reverse-Engineered)
              </span>
            </div>
            <p style={{ margin: 0, fontSize: '13.5px', color: '#F5E1AF', fontFamily: 'monospace', lineHeight: 1.5, fontWeight: 500 }}>
              "{lastResult.reconstructed_attacker_prompt}"
            </p>
          </div>

          {/* Intercepted Message Preview with Live Heatmap */}
          <div style={{
            backgroundColor: '#1D2922',
            borderRadius: '14px',
            border: '1px solid #2A382F',
            overflow: 'hidden',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)'
          }}>
            <div style={{
              backgroundColor: '#17211B',
              padding: '14px 24px',
              borderBottom: '1px solid #2A382F',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldAlert size={18} color="#B98282" />
                <span style={{ fontSize: '13px', fontWeight: 800, color: '#F0BCBC' }}>
                  LIVE INTERCEPTED ATTACK MESSAGE ({lastResult.message.channel.toUpperCase()})
                </span>
              </div>
              <span style={{ fontSize: '11.5px', color: '#A9B8AC', fontWeight: 600 }}>
                Intercepted at {new Date(lastResult.message.timestamp || Date.now()).toLocaleTimeString()}
              </span>
            </div>

            <div style={{ padding: '18px 24px', borderBottom: '1px solid #2A382F', backgroundColor: '#1D2922' }}>
              {lastResult.message.subject && (
                <h4 style={{ margin: '0 0 6px 0', fontSize: '16px', fontWeight: 800, color: '#E8EEE9' }}>
                  {lastResult.message.subject}
                </h4>
              )}
              <div style={{ fontSize: '13px', color: '#E8EEE9', fontWeight: 600 }}>
                <strong>From:</strong> {lastResult.message.sender_name} &lt;{lastResult.message.sender_address}&gt;
              </div>
              <div style={{ fontSize: '11.5px', color: '#A9B8AC', marginTop: '2px' }}>
                <strong>To:</strong> {lastResult.message.recipient}
              </div>
            </div>

            <div style={{ padding: '28px' }}>
              <CognitiveHeatmap
                content={lastResult.message.content}
                highlights={lastResult.analysis.highlights}
                isInspecting={true}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
