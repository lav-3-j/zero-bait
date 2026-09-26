import React, { useState } from 'react';
import type { ChannelType, MessagePayload, AnalysisResult } from '../types/message';
import { CognitiveHeatmap } from './CognitiveHeatmap';
import { Send, Zap, Mail, MessageSquare, Smartphone, ShieldAlert, ShieldCheck, Award } from 'lucide-react';

interface LiveInputStudioProps {
  onAnalyzeCustom: (payload: MessagePayload) => void;
  isLoading: boolean;
  analysis: AnalysisResult | null;
  currentMessage: MessagePayload | null;
  onOpenInoculation: () => void;
}

export const LiveInputStudio: React.FC<LiveInputStudioProps> = ({
  onAnalyzeCustom,
  isLoading,
  analysis,
  currentMessage,
  onOpenInoculation
}) => {
  const [channel, setChannel] = useState<ChannelType>('email');
  const [senderName, setSenderName] = useState('Jennifer Vance (CFO)');
  const [senderAddress, setSenderAddress] = useState('jennifer.vance@acme-corp.partner-invoicing.net');
  const [recipient, setRecipient] = useState('finance-team@acme-corp.internal');
  const [subject, setSubject] = useState('Urgent: Revised Vendor Wire Coordinates Before 3 PM');
  const [content, setContent] = useState(`Hi team,

Following up on our executive committee meeting. We need to expedite the wire payment of $42,500.00 to Apex Global before 3:00 PM EST today due to their fiscal year close.

Their banking coordinates have been updated. Due to the strict audit deadline, please wire the funds immediately and confirm by replying directly to this email rather than opening a Jira ticket.

Jennifer Vance
Chief Financial Officer`);

  const setPreset = (presetType: 'bec' | 'slack_sso' | 'smish' | 'clean') => {
    if (presetType === 'bec') {
      setChannel('email');
      setSenderName('Jennifer Vance (CFO)');
      setSenderAddress('jennifer.vance@acme-corp.partner-invoicing.net');
      setRecipient('finance-team@acme-corp.internal');
      setSubject('Urgent: Revised Vendor Wire Coordinates Before 3 PM');
      setContent(`Hi team,

Following up on our executive committee meeting. We need to expedite the wire payment of $42,500.00 to Apex Global before 3:00 PM EST today due to their fiscal year close.

Their banking coordinates have been updated. Due to the strict audit deadline, please wire the funds immediately and confirm by replying directly to this email rather than opening a Jira ticket.

Jennifer Vance
Chief Financial Officer`);
    } else if (presetType === 'slack_sso') {
      setChannel('slack');
      setSenderName('IT Helpdesk Bot');
      setSenderAddress('@it-support-admin');
      setRecipient('@alex.mercer');
      setSubject('');
      setContent(`🚨 CRITICAL: Your Okta SSO session has been flagged for anomalous login from Sofia, Bulgaria.

To prevent enterprise tenant lockout across AWS and GitHub, re-authenticate your hardware security key immediately via internal portal: https://acme-sso-auth.internal-gate.net/verify

Failure to verify within 15 minutes will trigger automated account suspension per InfoSec policy SEC-89.`);
    } else if (presetType === 'smish') {
      setChannel('sms');
      setSenderName('Chase Fraud Alert');
      setSenderAddress('+1 (888) 492-0193');
      setRecipient('+1 (555) 019-2834');
      setSubject('');
      setContent(`[CHASE BANK ALERT]: Suspicious debit of $2,419.50 at Target Store #0482 flagged. If this was NOT you, reply 'STOP' or call Chase Fraud Unit immediately at 1-888-492-0193 to prevent card deactivation.`);
    } else {
      setChannel('email');
      setSenderName('Marcus Brody');
      setSenderAddress('marcus.brody@acme.com');
      setRecipient('team@acme.com');
      setSubject('Team Lunch & Q3 Sprint Retrospective Tomorrow');
      setContent(`Hey team,

Just a quick reminder about tomorrow's lunch and sprint retro. We will be ordering from the Thai place down the street around 12:30 PM. 

Please drop your order preferences in the Slack channel by 11 AM so we can place the order on time. Let me know if you have any questions!

Best,
Marcus`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: MessagePayload = {
      id: `custom_${Date.now()}`,
      channel,
      sender_name: senderName,
      sender_address: senderAddress,
      recipient,
      subject: channel === 'email' ? subject : null,
      content,
      headers: channel === 'email' ? { 'Authentication-Results': 'spf=pass dkim=pass' } : null,
      timestamp: new Date().toISOString()
    };
    onAnalyzeCustom(payload);
  };

  const isCurrentCustom = currentMessage && currentMessage.id.startsWith('custom_');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Input Form Panel */}
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
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              backgroundColor: 'rgba(121, 184, 154, 0.15)',
              padding: '8px',
              borderRadius: '8px',
              color: '#79B89A',
              display: 'flex'
            }}>
              <Zap size={22} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#E8EEE9', letterSpacing: '-0.3px' }}>
                Real-Time Threat Inspector
              </h3>
              <p style={{ margin: 0, fontSize: '13px', color: '#A9B8AC', fontWeight: 400 }}>
                Dynamic sandbox &bull; Deterministic heuristics + Cialdini NLP in sub-15ms
              </p>
            </div>
          </div>

          {/* Quick Presets */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#A9B8AC', textTransform: 'uppercase', marginRight: '4px' }}>
              Load Demo:
            </span>
            <button
              type="button"
              onClick={() => setPreset('bec')}
              style={{ padding: '5px 10px', fontSize: '12px', fontWeight: 600, borderRadius: '6px', border: '1px solid #2A382F', background: '#101713', cursor: 'pointer', color: '#E8EEE9' }}
            >
              CFO Wire BEC
            </button>
            <button
              type="button"
              onClick={() => setPreset('slack_sso')}
              style={{ padding: '5px 10px', fontSize: '12px', fontWeight: 600, borderRadius: '6px', border: '1px solid #2A382F', background: '#101713', cursor: 'pointer', color: '#E8EEE9' }}
            >
              Slack SSO
            </button>
            <button
              type="button"
              onClick={() => setPreset('smish')}
              style={{ padding: '5px 10px', fontSize: '12px', fontWeight: 600, borderRadius: '6px', border: '1px solid #2A382F', background: '#101713', cursor: 'pointer', color: '#E8EEE9' }}
            >
              SMS Smish
            </button>
            <button
              type="button"
              onClick={() => setPreset('clean')}
              style={{ padding: '5px 10px', fontSize: '12px', fontWeight: 600, borderRadius: '6px', border: '1px solid #79B89A', background: 'rgba(121, 184, 154, 0.15)', cursor: 'pointer', color: '#79B89A' }}
            >
              Safe Email
            </button>
          </div>
        </div>

        {/* Channel Selector */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            type="button"
            onClick={() => setChannel('email')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: '8px',
              border: channel === 'email' ? '1px solid #79B89A' : '1px solid #2A382F',
              backgroundColor: channel === 'email' ? '#101713' : 'transparent',
              color: channel === 'email' ? '#79B89A' : '#A9B8AC',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            <Mail size={14} /> Email
          </button>

          <button
            type="button"
            onClick={() => setChannel('slack')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: '8px',
              border: channel === 'slack' ? '1px solid #79B89A' : '1px solid #2A382F',
              backgroundColor: channel === 'slack' ? '#101713' : 'transparent',
              color: channel === 'slack' ? '#79B89A' : '#A9B8AC',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            <MessageSquare size={14} /> Slack
          </button>

          <button
            type="button"
            onClick={() => setChannel('sms')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: '8px',
              border: channel === 'sms' ? '1px solid #79B89A' : '1px solid #2A382F',
              backgroundColor: channel === 'sms' ? '#101713' : 'transparent',
              color: channel === 'sms' ? '#79B89A' : '#A9B8AC',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            <Smartphone size={14} /> SMS (Smishing)
          </button>
        </div>

        {/* Inputs */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '11px', color: '#A9B8AC', marginBottom: '6px', fontWeight: 700, textTransform: 'uppercase' }}>
                Sender Name
              </label>
              <input
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: '1px solid #2A382F',
                  background: '#101713',
                  color: '#E8EEE9',
                  fontSize: '13.5px',
                  fontWeight: 500,
                  boxSizing: 'border-box'
                }}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', color: '#A9B8AC', marginBottom: '6px', fontWeight: 700, textTransform: 'uppercase' }}>
                Sender Address / Handle
              </label>
              <input
                type="text"
                value={senderAddress}
                onChange={(e) => setSenderAddress(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: '1px solid #2A382F',
                  background: '#101713',
                  color: '#E8EEE9',
                  fontSize: '13.5px',
                  fontWeight: 500,
                  boxSizing: 'border-box'
                }}
                required
              />
            </div>
          </div>

          {channel === 'email' && (
            <div>
              <label style={{ display: 'block', fontSize: '11px', color: '#A9B8AC', marginBottom: '6px', fontWeight: 700, textTransform: 'uppercase' }}>
                Email Subject Line
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: '1px solid #2A382F',
                  background: '#101713',
                  color: '#E8EEE9',
                  fontSize: '13.5px',
                  fontWeight: 500,
                  boxSizing: 'border-box'
                }}
                required
              />
            </div>
          )}

          <div>
            <label style={{ display: 'block', fontSize: '11px', color: '#A9B8AC', marginBottom: '6px', fontWeight: 700, textTransform: 'uppercase' }}>
              Message Body Content
            </label>
            <textarea
              rows={5}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: '8px',
                border: '1px solid #2A382F',
                background: '#101713',
                color: '#E8EEE9',
                fontSize: '13.5px',
                lineHeight: 1.5,
                fontFamily: 'monospace',
                boxSizing: 'border-box',
                resize: 'vertical'
              }}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn-eucalyptus"
            style={{ width: '100%', padding: '13px', fontSize: '14px' }}
          >
            <Send size={16} />
            {isLoading ? 'Dissecting Message Intent (<15ms)...' : 'Scan Message for Cognitive Manipulation'}
          </button>
        </form>
      </div>

      {/* Live Inspection Results Panel */}
      {isCurrentCustom && analysis && currentMessage && (
        <div style={{
          backgroundColor: '#1D2922',
          borderRadius: '14px',
          border: '1px solid #2A382F',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
          overflow: 'hidden'
        }}>
          {/* Result Banner */}
          <div style={{
            backgroundColor: '#17211B',
            padding: '16px 24px',
            borderBottom: '1px solid #2A382F',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {analysis.is_ai_phishing ? (
                <ShieldAlert size={22} color="#B98282" />
              ) : (
                <ShieldCheck size={22} color="#79B89A" />
              )}
              <span style={{ fontSize: '15px', fontWeight: 800, color: analysis.is_ai_phishing ? '#F0BCBC' : '#79B89A' }}>
                VERDICT: {analysis.threat_tier.toUpperCase()} &bull; Risk Score: {analysis.overall_threat_score}/100
              </span>
            </div>
            <span style={{ fontSize: '12px', color: '#A9B8AC', fontWeight: 600 }}>
              Analyzed in 9.2ms
            </span>
          </div>

          {/* Cognitive Heatmap Body */}
          <div style={{ padding: '28px' }}>
            <div style={{ marginBottom: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', fontWeight: 800, color: '#E8EEE9', textTransform: 'uppercase' }}>
                In-Situ Cognitive Heatmap ({analysis.highlights.length} Spans Flagged)
              </span>
              <span style={{ fontSize: '12px', color: '#A9B8AC' }}>
                Hover or click on highlighted phrases to view persuasion mechanics
              </span>
            </div>
            <div style={{ backgroundColor: '#101713', padding: '20px', borderRadius: '10px', border: '1px solid #2A382F' }}>
              <CognitiveHeatmap
                content={currentMessage.content}
                highlights={analysis.highlights}
                isInspecting={true}
              />
            </div>
          </div>

          {/* Inoculation Trigger Footer */}
          <div style={{ padding: '16px 28px', borderTop: '1px solid #2A382F', backgroundColor: '#17211B', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ fontSize: '13.5px', color: '#E8EEE9', fontWeight: 500 }}>
              <strong style={{ color: '#B8C99B' }}>SOP Guidance:</strong> {analysis.inoculation.quiz.rule_of_thumb}
            </div>
            <button
              type="button"
              onClick={onOpenInoculation}
              className="btn-eucalyptus"
              style={{ padding: '10px 18px', fontSize: '13px' }}
            >
              <Award size={16} />
              Launch Socratic Inoculation Drill
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
