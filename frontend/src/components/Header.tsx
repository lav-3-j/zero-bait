import React from 'react';
import { Bell, Smartphone, Printer, ChevronRight } from 'lucide-react';
import type { NavView } from './Sidebar';

interface HeaderProps {
  currentView: NavView;
  onOpenMobileQr: () => void;
  onSimulateInbound: () => void;
  onOpenBrief: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onOpenMobileQr,
  onSimulateInbound,
  onOpenBrief
}) => {
  const getViewTitle = () => {
    switch (currentView) {
      case 'console':
        return 'Multi-Channel Threat Console';
      case 'live':
        return 'Real-Time Threat Inspector';
      case 'adversarial':
        return 'Adversarial Red-Team Studio';
      case 'analytics':
        return 'Executive CISO Posture & SOC-2 Audit';
      case 'guide':
        return 'System Architecture & SOP Guide';
      default:
        return 'Operations';
    }
  };

  return (
    <header style={{
      height: '56px',
      backgroundColor: '#17211B', // Forest Slate
      borderBottom: '1px solid #2A382F',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      position: 'sticky',
      top: 0,
      zIndex: 50
    }}>
      {/* Clean Google Material Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '13px', fontWeight: 600, color: '#A9B8AC' }}>
          ZeroBait
        </span>
        <ChevronRight size={14} color="#79B89A" />
        <span style={{ fontSize: '13.5px', fontWeight: 700, color: '#E8EEE9' }}>
          {getViewTitle()}
        </span>
      </div>

      {/* Clean Minimal Action Toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {/* Simulate Threat Action */}
        <button
          onClick={onSimulateInbound}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            borderRadius: '20px',
            backgroundColor: 'rgba(185, 130, 130, 0.12)',
            border: '1px solid rgba(185, 130, 130, 0.3)',
            color: '#F0BCBC',
            fontSize: '12px',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(185, 130, 130, 0.22)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(185, 130, 130, 0.12)'; }}
        >
          <Bell size={13} color="#B98282" />
          Simulate Attack
        </button>

        {/* Mobile QR Action */}
        <button
          onClick={onOpenMobileQr}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            borderRadius: '20px',
            backgroundColor: '#1D2922',
            border: '1px solid #2A382F',
            color: '#E8EEE9',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#79B89A'; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#2A382F'; }}
        >
          <Smartphone size={13} color="#79B89A" />
          Mobile QR
        </button>

        {/* Forensics Brief Action */}
        <button
          onClick={onOpenBrief}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            borderRadius: '20px',
            backgroundColor: '#1D2922',
            border: '1px solid #2A382F',
            color: '#E8EEE9',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#B8C99B'; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#2A382F'; }}
        >
          <Printer size={13} color="#B8C99B" />
          Export Brief
        </button>

        {/* Subtle Latency Pill */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '4px 10px',
          borderRadius: '16px',
          backgroundColor: '#101713',
          border: '1px solid #2A382F'
        }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#79B89A' }} />
          <span style={{ fontSize: '11px', color: '#79B89A', fontWeight: 700 }}>
            11.4ms
          </span>
        </div>
      </div>
    </header>
  );
};
