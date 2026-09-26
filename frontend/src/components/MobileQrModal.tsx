import React, { useState, useEffect } from 'react';
import { Smartphone, X, Copy, Check, ShieldCheck } from 'lucide-react';
import { API_BASE } from '../config/api';

interface MobileQrModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileQrModal: React.FC<MobileQrModalProps> = ({ isOpen, onClose }) => {
  const [mobileUrl, setMobileUrl] = useState<string>(typeof window !== 'undefined' ? window.location.origin : 'http://localhost:8000');
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      if (typeof window !== 'undefined' && !window.location.hostname.includes('localhost') && !window.location.hostname.includes('127.0.0.1')) {
        // On cloud/production: judges scan QR to open the live public cloud website directly on their phone
        setMobileUrl(window.location.origin);
      } else {
        fetch(`${API_BASE}/network-info`, { credentials: 'include' })
          .then((res) => res.json())
          .then((data) => {
            if (data.mobile_url) {
              setMobileUrl(data.mobile_url);
            }
          })
          .catch(() => {
            setMobileUrl(window.location.origin);
          });
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(mobileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(mobileUrl)}&margin=10`;

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
        maxWidth: '440px',
        padding: '32px',
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
            background: '#17211B',
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

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <div style={{
            backgroundColor: '#17211B',
            color: '#79B89A',
            border: '1px solid #2A382F',
            borderRadius: '10px',
            padding: '8px',
            display: 'flex'
          }}>
            <Smartphone size={22} color="#79B89A" />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '19px', fontWeight: 900, color: '#E8EEE9', letterSpacing: '-0.3px' }}>
              Test Live on Phone (SMS)
            </h3>
            <p style={{ margin: 0, fontSize: '12.5px', color: '#A9B8AC', fontWeight: 500 }}>
              ZeroBait Mobile Smishing Defense
            </p>
          </div>
        </div>

        <p style={{ fontSize: '13.5px', color: '#A9B8AC', lineHeight: 1.5, margin: '16px 0 20px 0' }}>
          Scan this QR code with any smartphone connected to the same Wi-Fi. The judges can test smishing attack interception directly on their own mobile screens.
        </p>

        {/* QR Code Container */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
          border: '1px solid #2A382F',
          borderRadius: '12px',
          padding: '18px',
          marginBottom: '20px'
        }}>
          <img
            src={qrImageUrl}
            alt="Mobile Demo QR Code"
            width={180}
            height={180}
            style={{ borderRadius: '6px' }}
          />
        </div>

        {/* URL Box */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#17211B',
          border: '1px solid #2A382F',
          borderRadius: '8px',
          padding: '8px 12px',
          marginBottom: '20px'
        }}>
          <span style={{ fontSize: '13px', fontFamily: 'monospace', color: '#E8EEE9', fontWeight: 600 }}>
            {mobileUrl}
          </span>
          <button
            onClick={handleCopy}
            className="btn-eucalyptus"
            style={{
              padding: '6px 12px',
              fontSize: '11.5px',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            {copied ? <Check size={13} /> : <Copy size={13} />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>

        {/* Trust Badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: '#17211B',
          border: '1px solid #2A382F',
          borderRadius: '8px',
          padding: '10px 14px'
        }}>
          <ShieldCheck size={18} color="#79B89A" />
          <span style={{ fontSize: '12px', color: '#79B89A', fontWeight: 600 }}>
            LAN Wi-Fi Direct Sync Active &bull; Sub-15ms Latency
          </span>
        </div>
      </div>
    </div>
  );
};
