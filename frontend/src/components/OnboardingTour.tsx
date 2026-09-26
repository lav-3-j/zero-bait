import React, { useState } from 'react';
import { Shield, X, ArrowRight, ArrowLeft, Check, Brain, Zap, Award } from 'lucide-react';

interface OnboardingTourProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export const OnboardingTour: React.FC<OnboardingTourProps> = ({ isOpen, onClose, onComplete }) => {
  const [step, setStep] = useState<number>(0);

  if (!isOpen) return null;

  const tourSteps = [
    {
      title: 'Welcome to ZeroBait.',
      tag: 'HUMAN SENSOR ACTIVATED',
      desc: 'Traditional security gatekeepers treat employees as the weakest link. ZeroBait proves that humans are the only sensors capable of detecting true malicious intent in zero-shot AI attacks.',
      icon: <Shield size={28} color="#79B89A" />,
      callout: 'Generative AI spear-phishing carries no malware payloads. We detect psychological manipulation instead.'
    },
    {
      title: 'Omni-Channel Inbound Defense',
      tag: 'EMAIL • SLACK • SMS',
      desc: 'Modern attackers don’t just hit inboxes. They execute lateral credential harvesting on Slack and smish executives via SMS. ZeroBait unifies all three vector streams into one real-time triage console.',
      icon: <Zap size={28} color="#B8C99B" />,
      callout: 'Use the Channel Vector tabs to switch between enterprise Outlook, Slack, and iOS Messages.'
    },
    {
      title: 'The Cognitive Heatmap',
      tag: 'IN-SITU LINGUISTIC FORENSICS',
      desc: 'Our dual engine calculates sub-15ms typosquatting heuristics and maps sentences to Robert Cialdini’s 6 vectors of influence: Authority Bias, Urgency, Scarcity, and SOP Evasion.',
      icon: <Brain size={28} color="#C9AD72" />,
      callout: 'Click any highlighted phrase in the message body to inspect the exact persuasion trigger.'
    },
    {
      title: '10-Second McGuire Inoculation',
      tag: 'ACTIVE PSYCHOLOGICAL IMMUNITY',
      desc: 'Instead of boring annual compliance modules that employees click through, ZeroBait delivers an instant 10-second Socratic micro-drill at the moment of interception, building permanent resilience.',
      icon: <Award size={28} color="#79B89A" />,
      callout: 'Employees complete a rapid contrastive drill and earn verified resilience badges.'
    }
  ];

  const current = tourSteps[step];

  const handleNext = () => {
    if (step < tourSteps.length - 1) {
      setStep(step + 1);
    } else {
      onComplete();
      onClose();
    }
  };

  const handlePrev = () => {
    if (step > 0) setStep(step - 1);
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
      zIndex: 2000,
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: '#1D2922',
        border: '1px solid #2A382F',
        borderRadius: '16px',
        boxShadow: '0 20px 45px rgba(0, 0, 0, 0.6)',
        width: '100%',
        maxWidth: '540px',
        padding: '36px',
        position: 'relative'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            border: '1px solid #2A382F',
            backgroundColor: '#17211B',
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

        {/* Step Indicator */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
          {tourSteps.map((_, i) => (
            <div
              key={i}
              style={{
                height: '5px',
                flex: 1,
                borderRadius: '3px',
                backgroundColor: i === step ? '#79B89A' : i < step ? '#B8C99B' : '#2A382F',
                transition: 'all 0.2s ease'
              }}
            />
          ))}
        </div>

        {/* Badge & Icon */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
          <span style={{
            fontSize: '11px',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            backgroundColor: '#17211B',
            color: '#79B89A',
            border: '1px solid #2A382F',
            padding: '4px 12px',
            borderRadius: '20px'
          }}>
            {current.tag}
          </span>
          <div style={{
            backgroundColor: '#17211B',
            border: '1px solid #2A382F',
            borderRadius: '12px',
            padding: '10px',
            display: 'flex'
          }}>
            {current.icon}
          </div>
        </div>

        {/* Title & Description */}
        <h2 style={{ fontSize: '22px', fontWeight: 900, color: '#E8EEE9', margin: '0 0 12px 0', letterSpacing: '-0.4px' }}>
          {current.title}
        </h2>
        <p style={{ fontSize: '14.5px', color: '#A9B8AC', lineHeight: 1.6, margin: '0 0 20px 0' }}>
          {current.desc}
        </p>

        {/* Callout Box */}
        <div style={{
          backgroundColor: '#17211B',
          border: '1px solid #2A382F',
          borderLeft: '4px solid #79B89A',
          borderRadius: '8px',
          padding: '12px 16px',
          marginBottom: '28px'
        }}>
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#79B89A', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
            Interactive Pro-Tip:
          </span>
          <span style={{ fontSize: '13px', color: '#E8EEE9', fontWeight: 500 }}>
            {current.callout}
          </span>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            onClick={handlePrev}
            disabled={step === 0}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              border: 'none',
              background: 'none',
              fontSize: '13px',
              fontWeight: 700,
              color: step === 0 ? '#2A382F' : '#A9B8AC',
              cursor: step === 0 ? 'default' : 'pointer'
            }}
          >
            <ArrowLeft size={16} /> Back
          </button>

          <button
            onClick={handleNext}
            className="btn-eucalyptus"
            style={{ padding: '10px 22px', fontSize: '13.5px' }}
          >
            {step === tourSteps.length - 1 ? (
              <>Start Defending <Check size={16} /></>
            ) : (
              <>Next Step <ArrowRight size={16} /></>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
