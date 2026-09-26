import React from 'react';
import { X, ShieldAlert, MessageSquare, Mail, Smartphone } from 'lucide-react';
import type { MessagePayload } from '../types/message';

interface InboundPhishToastProps {
  toast: {
    visible: boolean;
    payload: MessagePayload | null;
  };
  onInspect: (payload: MessagePayload) => void;
  onDismiss: () => void;
}

export const InboundPhishToast: React.FC<InboundPhishToastProps> = ({
  toast,
  onInspect,
  onDismiss
}) => {
  if (!toast.visible || !toast.payload) return null;

  const payload = toast.payload;

  const getChannelIcon = () => {
    switch (payload.channel) {
      case 'slack':
        return <MessageSquare size={16} color="#79B89A" />;
      case 'sms':
        return <Smartphone size={16} color="#B98282" />;
      default:
        return <Mail size={16} color="#79B89A" />;
    }
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '28px',
      right: '28px',
      width: '400px',
      backgroundColor: '#1D2922',
      border: '1px solid #B98282',
      borderRadius: '14px',
      boxShadow: '0 12px 30px rgba(0, 0, 0, 0.6)',
      zIndex: 900,
      padding: '20px',
      animation: 'slideIn 0.25s ease-out'
    }}>
      {/* Top Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            backgroundColor: '#17211B',
            border: '1px solid #2A382F',
            padding: '6px',
            borderRadius: '6px',
            display: 'flex'
          }}>
            {getChannelIcon()}
          </div>
          <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#B98282', letterSpacing: '0.8px' }}>
            Live Inbound {payload.channel.toUpperCase()} Intercepted
          </span>
        </div>
        <button
          onClick={onDismiss}
          style={{
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            color: '#A9B8AC',
            padding: 0
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = '#E8EEE9'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = '#A9B8AC'; }}
        >
          <X size={18} />
        </button>
      </div>

      {/* Message Content Preview */}
      <div style={{
        fontSize: '12.5px',
        fontWeight: 700,
        color: '#E8EEE9',
        marginBottom: '6px'
      }}>
        Sender: {payload.sender_name || 'External Endpoint'}
      </div>
      <p style={{
        margin: '0 0 16px 0',
        fontSize: '13px',
        color: '#A9B8AC',
        lineHeight: 1.45,
        maxHeight: '54px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        fontWeight: 500
      }}>
        "{payload.content}"
      </p>

      {/* Buttons */}
      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          onClick={() => onInspect(payload)}
          className="btn-eucalyptus"
          style={{ flex: 1, padding: '9px 12px', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
        >
          <ShieldAlert size={14} />
          Scan with ZeroBait
        </button>
        <button
          onClick={onDismiss}
          className="btn-forest-secondary"
          style={{
            padding: '9px 14px',
            fontSize: '12px',
            fontWeight: 700
          }}
        >
          Dismiss
        </button>
      </div>
    </div>
  );
};
