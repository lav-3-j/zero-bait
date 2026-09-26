import React from 'react';
import {
  Shield,
  LayoutDashboard,
  Zap,
  Crosshair,
  BarChart3,
  BookOpen,
  LogOut,
  Sparkles
} from 'lucide-react';

export type NavView = 'console' | 'live' | 'adversarial' | 'analytics' | 'guide';

interface SidebarProps {
  currentView: NavView;
  onNavigate: (view: NavView) => void;
  userRole: string;
  userEmail: string;
  onLogout: () => void;
  onOpenTour: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  userRole,
  userEmail,
  onLogout,
  onOpenTour
}) => {
  const navItems = [
    { id: 'console', icon: LayoutDashboard, label: 'Threat Console' },
    { id: 'live', icon: Zap, label: 'Live Inspector' },
    { id: 'adversarial', icon: Crosshair, label: 'Red-Team Studio' },
    { id: 'analytics', icon: BarChart3, label: 'CISO Posture' },
    { id: 'guide', icon: BookOpen, label: 'User Guide' },
  ];

  return (
    <aside style={{
      width: '230px',
      backgroundColor: '#17211B', // Forest Slate
      borderRight: '1px solid #2A382F',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100vh',
      position: 'sticky',
      top: 0,
      flexShrink: 0
    }}>
      {/* Brand Header & Nav List */}
      <div>
        {/* Brand */}
        <div style={{
          padding: '18px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          borderBottom: '1px solid rgba(42, 56, 47, 0.5)'
        }}>
          <div style={{
            backgroundColor: '#79B89A',
            color: '#101713',
            borderRadius: '8px',
            padding: '6px',
            display: 'flex'
          }}>
            <Shield size={18} />
          </div>
          <span style={{ fontSize: '17px', fontWeight: 900, color: '#E8EEE9', letterSpacing: '-0.4px' }}>
            Zero<span style={{ color: '#79B89A' }}>Bait</span>
          </span>
        </div>

        {/* Clean Google Material 3 Navigation List */}
        <nav style={{ padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id as NavView)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 14px',
                  borderRadius: '24px', // Material 3 pill
                  border: 'none',
                  backgroundColor: isActive ? 'rgba(121, 184, 154, 0.14)' : 'transparent',
                  color: isActive ? '#79B89A' : '#A9B8AC',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '13.5px',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
                    e.currentTarget.style.color = '#E8EEE9';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#A9B8AC';
                  }
                }}
              >
                <Icon size={17} color={isActive ? '#79B89A' : '#A9B8AC'} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Clean Bottom User Profile & Tour */}
      <div style={{
        padding: '14px 16px',
        borderTop: '1px solid rgba(42, 56, 47, 0.5)',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}>
        {/* System Tour */}
        <button
          onClick={onOpenTour}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '7px 12px',
            borderRadius: '20px',
            background: 'none',
            border: 'none',
            color: '#B8C99B',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer',
            textAlign: 'left',
            transition: 'all 0.15s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
            e.currentTarget.style.color = '#E8EEE9';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#B8C99B';
          }}
        >
          <Sparkles size={14} color="#79B89A" />
          <span>System Tour</span>
        </button>

        {/* Minimal User Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '6px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: '#79B89A',
              color: '#101713',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '11px',
              flexShrink: 0
            }}>
              {userRole.substring(0, 1).toUpperCase()}
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#E8EEE9', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {userRole}
              </div>
              <div style={{ fontSize: '10px', color: '#A9B8AC', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {userEmail}
              </div>
            </div>
          </div>

          <button
            onClick={onLogout}
            title="Log Out & Clear Session"
            style={{
              border: 'none',
              background: 'none',
              color: '#B98282',
              cursor: 'pointer',
              padding: '6px',
              display: 'flex',
              borderRadius: '50%',
              transition: 'background 0.15s ease'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(185, 130, 130, 0.15)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
          >
            <LogOut size={15} />
          </button>
        </div>
      </div>
    </aside>
  );
};
