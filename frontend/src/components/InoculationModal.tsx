import React, { useState } from 'react';
import type { InoculationData, VerificationResponse } from '../types/message';
import { ShieldCheck, X, CheckCircle2, AlertOctagon, HelpCircle, Award, ArrowRight } from 'lucide-react';

interface InoculationModalProps {
  isOpen: boolean;
  onClose: () => void;
  inoculation: InoculationData;
  messageId: string;
}

export const InoculationModal: React.FC<InoculationModalProps> = ({
  isOpen,
  onClose,
  inoculation,
  messageId
}) => {
  const [activeTab, setActiveTab] = useState<'deconstruct' | 'contrast' | 'quiz'>('deconstruct');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [verification, setVerification] = useState<VerificationResponse | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  if (!isOpen) return null;

  const handleVerifyAnswer = async () => {
    if (selectedOption === null) return;
    setIsVerifying(true);
    try {
      const res = await fetch('http://localhost:8000/api/v1/inoculate/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          message_id: messageId,
          selected_option_index: selectedOption
        })
      });
      if (res.ok) {
        const data: VerificationResponse = await res.json();
        setVerification(data);
      }
    } catch (e) {
      const isCorrect = selectedOption === inoculation.quiz.correct_index;
      setVerification({
        is_correct: isCorrect,
        explanation: isCorrect
          ? 'Outstanding! You pierced through the synthetic deception.'
          : 'Incorrect. Remember that artificial urgency is designed to override caution.',
        rule_of_thumb: inoculation.quiz.rule_of_thumb,
        badge_awarded: isCorrect ? '🛡️ Cognitive Defense Sentinel (Level 1)' : null
      });
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(16, 23, 19, 0.8)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '680px',
          backgroundColor: '#1D2922',
          border: '1px solid #2A382F',
          borderRadius: '16px',
          boxShadow: '0 20px 45px rgba(0, 0, 0, 0.6)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '90vh'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '20px 28px',
            borderBottom: '1px solid #2A382F',
            backgroundColor: '#17211B'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              backgroundColor: '#1D2922',
              border: '1px solid #2A382F',
              padding: '8px',
              borderRadius: '8px',
              color: '#79B89A',
              display: 'flex'
            }}>
              <ShieldCheck size={22} color="#79B89A" />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 900, color: '#E8EEE9' }}>
                Cognitive Inoculation Trainer
              </h2>
              <span style={{ fontSize: '12px', color: '#A9B8AC', fontWeight: 500 }}>
                10-Second Active Psychological Immunity Protocol (McGuire Inoculation Theory)
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: '#1D2922',
              border: '1px solid #2A382F',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
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

        {/* Tab Navigation */}
        <div style={{ display: 'flex', borderBottom: '1px solid #2A382F', backgroundColor: '#17211B' }}>
          {[
            { id: 'deconstruct', label: '1. Threat Anatomy' },
            { id: 'contrast', label: '2. Spot The Difference' },
            { id: 'quiz', label: '3. Socratic Challenge' }
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  flex: 1,
                  padding: '14px 16px',
                  fontSize: '13px',
                  fontWeight: isActive ? 800 : 600,
                  background: isActive ? '#1D2922' : 'transparent',
                  border: 'none',
                  color: isActive ? '#79B89A' : '#A9B8AC',
                  borderBottom: isActive ? '3px solid #79B89A' : '3px solid transparent',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content Body */}
        <div style={{ padding: '28px', overflowY: 'auto', flex: 1 }}>
          {activeTab === 'deconstruct' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div
                style={{
                  padding: '18px',
                  borderRadius: '10px',
                  backgroundColor: '#17211B',
                  border: '1px solid #B98282'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <AlertOctagon size={18} color="#B98282" />
                  <span style={{ fontSize: '13px', fontWeight: 800, color: '#B98282', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
                    Attacker Psychological Exploit
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: '14px', color: '#E8EEE9', lineHeight: 1.5, fontWeight: 500 }}>
                  {inoculation.tactical_summary}
                </p>
              </div>

              <div
                style={{
                  padding: '18px',
                  borderRadius: '10px',
                  backgroundColor: '#17211B',
                  border: '1px solid #2A382F'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <HelpCircle size={18} color="#B8C99B" />
                  <span style={{ fontSize: '13px', fontWeight: 800, color: '#B8C99B', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
                    Why Traditional Email Gateways Missed It
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: '14px', color: '#A9B8AC', lineHeight: 1.5, fontWeight: 500 }}>
                  {inoculation.why_legacy_missed}
                </p>
              </div>

              <button
                onClick={() => setActiveTab('contrast')}
                className="btn-eucalyptus"
                style={{ marginTop: '8px', padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                Next: Compare With Authentic Communication <ArrowRight size={15} />
              </button>
            </div>
          )}

          {activeTab === 'contrast' && (
            <div>
              <p style={{ margin: '0 0 12px 0', fontSize: '13.5px', color: '#A9B8AC', fontWeight: 600 }}>
                Compare this authentic enterprise baseline with what an attacker sends:
              </p>
              <div
                style={{
                  padding: '18px',
                  borderRadius: '10px',
                  backgroundColor: '#17211B',
                  border: '1px solid #79B89A',
                  whiteSpace: 'pre-wrap',
                  fontSize: '13.5px',
                  lineHeight: '1.6',
                  color: '#E8EEE9',
                  fontFamily: 'monospace',
                  fontWeight: 500
                }}
              >
                {inoculation.contrastive_authentic}
              </div>
              <div style={{ marginTop: '16px', padding: '14px 18px', background: '#17211B', border: '1px solid #C9AD72', borderRadius: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: 800, color: '#C9AD72', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  KEY TAKEAWAY:
                </span>
                <span style={{ fontSize: '13px', color: '#E8EEE9', marginLeft: '6px', fontWeight: 500 }}>
                  Authentic corporate operations never bypass standard ticketing, multi-party verification, or formal ERP authorization.
                </span>
              </div>

              <button
                onClick={() => setActiveTab('quiz')}
                className="btn-eucalyptus"
                style={{ marginTop: '18px', width: '100%', padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                Ready for Socratic Challenge <ArrowRight size={15} />
              </button>
            </div>
          )}

          {activeTab === 'quiz' && (
            <div>
              <div style={{
                fontSize: '14.5px',
                color: '#E8EEE9',
                fontWeight: 700,
                marginBottom: '16px',
                padding: '14px 18px',
                backgroundColor: '#17211B',
                border: '1px solid #2A382F',
                borderRadius: '8px'
              }}>
                {inoculation.quiz.question}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {inoculation.quiz.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedOption(idx)}
                    style={{
                      textAlign: 'left',
                      padding: '14px 18px',
                      borderRadius: '8px',
                      border: selectedOption === idx ? '1px solid #79B89A' : '1px solid #2A382F',
                      backgroundColor: selectedOption === idx ? '#17211B' : '#1D2922',
                      color: selectedOption === idx ? '#E8EEE9' : '#A9B8AC',
                      fontSize: '13.5px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <span style={{ fontWeight: 800, marginRight: '8px', color: selectedOption === idx ? '#79B89A' : '#B8C99B' }}>
                      {String.fromCharCode(65 + idx)}.
                    </span>
                    {opt}
                  </button>
                ))}
              </div>

              {!verification && (
                <button
                  disabled={selectedOption === null || isVerifying}
                  onClick={handleVerifyAnswer}
                  className="btn-eucalyptus"
                  style={{
                    marginTop: '20px',
                    width: '100%',
                    padding: '14px',
                    fontSize: '14px',
                    opacity: selectedOption === null ? 0.6 : 1,
                    cursor: selectedOption === null ? 'not-allowed' : 'pointer'
                  }}
                >
                  {isVerifying ? 'Verifying Defense...' : 'Lock In Answer & Inoculate'}
                </button>
              )}

              {verification && (
                <div
                  style={{
                    marginTop: '20px',
                    padding: '18px',
                    borderRadius: '10px',
                    backgroundColor: '#17211B',
                    border: `1px solid ${verification.is_correct ? '#79B89A' : '#B98282'}`
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    {verification.is_correct ? (
                      <CheckCircle2 color="#79B89A" size={22} />
                    ) : (
                      <AlertOctagon color="#B98282" size={22} />
                    )}
                    <span style={{ fontWeight: 800, color: verification.is_correct ? '#79B89A' : '#B98282', letterSpacing: '0.5px' }}>
                      {verification.is_correct ? 'CORRECT! COGNITIVE IMMUNITY BOOSTED' : 'INCORRECT'}
                    </span>
                  </div>

                  <p style={{ margin: '0 0 12px 0', fontSize: '13.5px', color: '#E8EEE9', fontWeight: 500 }}>
                    {verification.explanation}
                  </p>

                  <div style={{ padding: '10px 14px', background: '#1D2922', border: '1px solid #C9AD72', borderRadius: '6px', marginBottom: '12px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 800, color: '#C9AD72', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
                      Mental Defense Rule:
                    </span>
                    <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#E8EEE9', fontWeight: 600 }}>
                      {verification.rule_of_thumb}
                    </p>
                  </div>

                  {verification.badge_awarded && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#79B89A', fontWeight: 800, fontSize: '13.5px' }}>
                      <Award size={18} color="#79B89A" />
                      <span>Awarded: {verification.badge_awarded}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
