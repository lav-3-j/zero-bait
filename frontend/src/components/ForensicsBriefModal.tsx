import React from 'react';
import { X, Printer } from 'lucide-react';
import type { AnalysisResult, MessagePayload } from '../types/message';

interface ForensicsBriefModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: MessagePayload | null;
  analysis: AnalysisResult | null;
}

export const ForensicsBriefModal: React.FC<ForensicsBriefModalProps> = ({
  isOpen,
  onClose,
  message,
  analysis
}) => {
  if (!isOpen || !analysis || !message) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(16, 23, 19, 0.8)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: '#1D2922',
        borderRadius: '16px',
        border: '1px solid #2A382F',
        boxShadow: '0 20px 45px rgba(0, 0, 0, 0.6)',
        width: '100%',
        maxWidth: '740px',
        maxHeight: '90vh',
        overflowY: 'auto',
        padding: '36px',
        position: 'relative'
      }}>
        {/* Controls */}
        <div style={{ position: 'absolute', top: '24px', right: '24px', display: 'flex', gap: '10px' }}>
          <button
            onClick={handlePrint}
            className="btn-eucalyptus"
            style={{ padding: '8px 16px', fontSize: '12.5px', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Printer size={15} />
            Print / Save PDF
          </button>
          <button
            onClick={onClose}
            style={{
              border: '1px solid #2A382F',
              background: '#17211B',
              borderRadius: '8px',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#A9B8AC',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#E8EEE9'; e.currentTarget.style.borderColor = '#79B89A'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#A9B8AC'; e.currentTarget.style.borderColor = '#2A382F'; }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Document Header */}
        <div style={{ borderBottom: '1px solid #2A382F', paddingBottom: '16px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: '#79B89A' }}>
              ZeroBait Forensics Intelligence Desk
            </span>
          </div>
          <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 900, color: '#E8EEE9', letterSpacing: '-0.4px' }}>
            Executive Threat Incident Brief
          </h2>
          <div style={{ display: 'flex', gap: '16px', marginTop: '8px', fontSize: '12.5px', color: '#A9B8AC', fontWeight: 500 }}>
            <span><strong style={{ color: '#E8EEE9' }}>Case ID:</strong> {analysis.message_id}</span>
            <span>&bull;</span>
            <span><strong style={{ color: '#E8EEE9' }}>Vector:</strong> {message.channel.toUpperCase()}</span>
            <span>&bull;</span>
            <span><strong style={{ color: '#E8EEE9' }}>Analysis Latency:</strong> 11.4ms</span>
          </div>
        </div>

        {/* Severity Banner */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#17211B',
          border: `1px solid ${analysis.is_ai_phishing ? '#B98282' : '#79B89A'}`,
          borderRadius: '12px',
          padding: '18px 24px',
          marginBottom: '24px'
        }}>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: analysis.is_ai_phishing ? '#B98282' : '#79B89A', letterSpacing: '0.8px' }}>
              Final Cognitive Verdict
            </div>
            <div style={{ fontSize: '20px', fontWeight: 900, color: '#E8EEE9', marginTop: '2px' }}>
              {analysis.threat_tier}
            </div>
            <p style={{ margin: '4px 0 0 0', fontSize: '13.5px', color: '#A9B8AC', fontWeight: 500 }}>
              {analysis.summary}
            </p>
          </div>

          <div style={{
            textAlign: 'center',
            backgroundColor: '#1D2922',
            border: '1px solid #2A382F',
            borderRadius: '10px',
            padding: '10px 18px'
          }}>
            <div style={{ fontSize: '24px', fontWeight: 900, color: analysis.is_ai_phishing ? '#B98282' : '#79B89A' }}>
              {analysis.overall_threat_score}
            </div>
            <div style={{ fontSize: '10px', color: '#A9B8AC', fontWeight: 800 }}>
              THREAT INDEX
            </div>
          </div>
        </div>

        {/* Intercepted Content */}
        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '12.5px', fontWeight: 800, textTransform: 'uppercase', color: '#A9B8AC', letterSpacing: '0.6px' }}>
            Intercepted Raw Message Body
          </h4>
          <div style={{
            backgroundColor: '#17211B',
            border: '1px solid #2A382F',
            borderRadius: '8px',
            padding: '16px',
            fontSize: '13.5px',
            color: '#E8EEE9',
            fontFamily: 'monospace',
            whiteSpace: 'pre-wrap',
            lineHeight: 1.5,
            fontWeight: 500
          }}>
            {message.content}
          </div>
        </div>

        {/* Why Standard Filters Failed */}
        <div style={{
          backgroundColor: '#17211B',
          border: '1px solid #C9AD72',
          borderRadius: '10px',
          padding: '16px 20px',
          marginBottom: '24px'
        }}>
          <h4 style={{ margin: '0 0 6px 0', fontSize: '13.5px', fontWeight: 800, color: '#C9AD72' }}>
            Why Traditional Filters (SEG) Missed This:
          </h4>
          <p style={{ margin: 0, fontSize: '13px', color: '#E8EEE9', lineHeight: 1.45, fontWeight: 500 }}>
            {analysis.legacy_comparison.reason} (Standard SEG Spam Score: {analysis.legacy_comparison.spam_score}/100 - Verdict: {analysis.legacy_comparison.status_label})
          </p>
        </div>

        {/* Cialdini Vectors */}
        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ margin: '0 0 10px 0', fontSize: '12.5px', fontWeight: 800, textTransform: 'uppercase', color: '#A9B8AC', letterSpacing: '0.6px' }}>
            Active Cognitive Persuasion Vectors
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {analysis.triggers.map((trig, idx) => (
              <div key={idx} style={{
                backgroundColor: '#17211B',
                border: '1px solid #2A382F',
                borderRadius: '8px',
                padding: '12px 14px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '12.5px', fontWeight: 800, color: '#B98282' }}>
                    {trig.category}
                  </span>
                  <span style={{ fontSize: '11px', fontWeight: 800, color: '#C9AD72' }}>
                    {Math.round(trig.score * 100)}% Intensity
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: '12px', color: '#A9B8AC', fontWeight: 500 }}>
                  {trig.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Inoculation Rule-of-Thumb */}
        <div style={{
          backgroundColor: '#17211B',
          border: '1px solid #79B89A',
          borderRadius: '10px',
          padding: '16px 20px'
        }}>
          <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#79B89A', marginBottom: '4px', letterSpacing: '0.5px' }}>
            Prescribed Human Inoculation Rule (SOP)
          </div>
          <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#E8EEE9' }}>
            {analysis.inoculation.quiz.rule_of_thumb}
          </div>
        </div>
      </div>
    </div>
  );
};
