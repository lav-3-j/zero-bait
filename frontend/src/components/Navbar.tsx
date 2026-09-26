import React from 'react';
import {
  Shield,
  LayoutDashboard,
  Zap,
  Crosshair,
  BarChart3,
  BookOpen,
  Smartphone,
  Bell,
  Printer
} from 'lucide-react';

export type NavView = 'console' | 'live' | 'adversarial' | 'analytics' | 'guide';

interface NavbarProps {
  currentView: NavView;
  onNavigate: (view: NavView) => void;
  onOpenMobileQr: () => void;
  onSimulateInbound: () => void;
  onOpenBrief: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenMobileQr,
  onSimulateInbound,
  onOpenBrief
}) => {
  return (
    <header style={{
      backgroundColor: '#FFFFFF',
      borderBottom: '1px solid #E2E8F0',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)'
    }}>
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '0 24px',
        height: '62px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Brand & Identity */}
        <div 
          onClick={() => onNavigate('console')}
          style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
        >
          <div style={{
            width: '34px',
            height: '34px',
            borderRadius: '8px',
            backgroundColor: '#2563EB',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 4px rgba(37, 99, 235, 0.2)'
          }}>
            <Shield size={20} color="#FFFFFF" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '18px', fontWeight: 900, color: '#0F172A', letterSpacing: '-0.5px' }}>
                ZeroBait
              </span>
              <span style={{
                fontSize: '10px',
                fontWeight: 800,
                color: '#2563EB',
                backgroundColor: '#EFF6FF',
                border: '1px solid #BFDBFE',
                padding: '2px 6px',
                borderRadius: '4px',
                letterSpacing: '0.5px'
              }}>
                ENTERPRISE INOCULATION
              </span>
            </div>
            <p style={{ margin: 0, fontSize: '11px', color: '#64748B' }}>
              Zero Trust Cognitive Threat Defense
            </p>
          </div>
        </div>

        {/* Primary Navigation Tabs */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          backgroundColor: '#F8FAFC',
          padding: '4px',
          borderRadius: '8px',
          border: '1px solid #E2E8F0'
        }}>
          {[
            { id: 'console', icon: LayoutDashboard, label: 'Threat Console' },
            { id: 'live', icon: Zap, label: 'Live Inspector' },
            { id: 'adversarial', icon: Crosshair, label: 'Red-Team Studio' },
            { id: 'analytics', icon: BarChart3, label: 'CISO Posture' },
            { id: 'guide', icon: BookOpen, label: 'Documentation' }
          ].map((item) => {
            const isActive = currentView === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id as NavView)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 14px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: isActive ? '#FFFFFF' : 'transparent',
                  color: isActive ? '#0F172A' : '#64748B',
                  fontSize: '12.5px',
                  fontWeight: isActive ? 700 : 500,
                  cursor: 'pointer',
                  boxShadow: isActive ? '0 1px 3px rgba(0, 0, 0, 0.08)' : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                <Icon size={14} color={isActive ? '#2563EB' : '#64748B'} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Quick Action Toolbar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Live Simulation Button */}
          <button
            onClick={onSimulateInbound}
            title="Simulate a real-time incoming phishing attack notification"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 11px',
              borderRadius: '6px',
              backgroundColor: '#FEF2F2',
              border: '1px solid #FCA5A5',
              color: '#DC2626',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            <Bell size={13} />
            Simulate Attack
          </button>

          {/* Mobile QR Button */}
          <button
            onClick={onOpenMobileQr}
            title="Open phone QR code for live mobile smishing defense test"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 11px',
              borderRadius: '6px',
              backgroundColor: '#EFF6FF',
              border: '1px solid #BFDBFE',
              color: '#2563EB',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            <Smartphone size={13} />
            Phone QR
          </button>

          {/* Forensics Brief Button */}
          <button
            onClick={onOpenBrief}
            title="Download or Print Executive Threat Incident Brief"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 11px',
              borderRadius: '6px',
              backgroundColor: '#F1F5F9',
              border: '1px solid #CBD5E1',
              color: '#334155',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            <Printer size={13} />
            Forensics Brief
          </button>

          {/* Engine Status Pill */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '5px 10px',
            backgroundColor: '#ECFDF5',
            border: '1px solid #A7F3D0',
            borderRadius: '6px',
            marginLeft: '4px'
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#059669' }} />
            <span style={{ fontSize: '11px', color: '#065F46', fontWeight: 700 }}>
              Engine: 4.2ms
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
