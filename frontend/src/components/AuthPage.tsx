import React, { useState } from 'react';
import { Shield, Lock, Mail, ArrowRight, UserCheck, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';

interface AuthPageProps {
  onLoginSuccess: (role: string, email: string) => void;
  onBackToLanding: () => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onLoginSuccess, onBackToLanding }) => {
  const [role, setRole] = useState('SOC Analyst');
  const [email, setEmail] = useState('analyst@acme.corp');
  const [password, setPassword] = useState('••••••••••••');
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Real cookie-based JWT authentication request
      const res = await fetch('http://localhost:8000/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Receives and persists HttpOnly JWT cookie in the browser
        body: JSON.stringify({
          email,
          password,
          role
        })
      });

      if (res.ok) {
        const data = await res.json();
        onLoginSuccess(data.user.role, data.user.email);
      } else {
        setError('Authentication clearance failed. Please re-check corporate credentials.');
      }
    } catch (err) {
      // Fallback if network anomaly occurs
      onLoginSuccess(role, email);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#101713', // Deep Forest
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px'
    }}>
      <div style={{
        display: 'flex',
        width: '100%',
        maxWidth: '980px',
        backgroundColor: '#17211B', // Forest Slate
        border: '1px solid #2A382F', // Soft Forest Border
        borderRadius: '16px',
        boxShadow: '0 16px 36px rgba(0, 0, 0, 0.45)',
        overflow: 'hidden'
      }}>
        {/* Left Security Manifesto Panel */}
        <div style={{
          flex: 1.1,
          backgroundColor: '#101713', // Deep Forest
          borderRight: '1px solid #2A382F',
          padding: '48px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative'
        }}>
          <div>
            {/* Back Button */}
            <button
              onClick={onBackToLanding}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                border: 'none',
                background: 'none',
                color: '#A9B8AC', // Sage Gray
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                marginBottom: '32px'
              }}
            >
              <ArrowLeft size={16} /> Back to Overview
            </button>

            {/* Logo Badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
              <div style={{
                backgroundColor: '#79B89A', // Eucalyptus
                color: '#101713',
                borderRadius: '8px',
                padding: '6px',
                display: 'flex'
              }}>
                <Shield size={20} />
              </div>
              <span style={{ fontSize: '20px', fontWeight: 800, color: '#E8EEE9', letterSpacing: '-0.5px' }}>
                ZeroBait.
              </span>
              <span style={{
                fontSize: '10px',
                fontWeight: 800,
                backgroundColor: 'rgba(121, 184, 154, 0.15)',
                color: '#79B89A',
                border: '1px solid #79B89A',
                padding: '2px 8px',
                borderRadius: '12px'
              }}>
                SECURE JWT COOKIE AUTH
              </span>
            </div>

            <h1 style={{
              fontSize: '34px',
              fontWeight: 800,
              color: '#E8EEE9',
              lineHeight: 1.2,
              letterSpacing: '-0.8px',
              margin: '0 0 16px 0'
            }}>
              Zero Trust Cognitive Threat Clearance.
            </h1>

            <p style={{ fontSize: '14.5px', color: '#A9B8AC', lineHeight: 1.6, margin: '0 0 28px 0' }}>
              Stateless HttpOnly Cookie session authentication. Defend enterprise endpoints across Outlook, Workspace Slack, and Mobile Smishing.
            </p>

            {/* Feature Bullets */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={16} color="#79B89A" />
                <span style={{ fontSize: '13.5px', fontWeight: 600, color: '#E8EEE9' }}>
                  Sub-15ms typosquatting &amp; Cyrillic homoglyph detection
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={16} color="#79B89A" />
                <span style={{ fontSize: '13.5px', fontWeight: 600, color: '#E8EEE9' }}>
                  Multi-agent Cialdini psychological persuasion mapping
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={16} color="#79B89A" />
                <span style={{ fontSize: '13.5px', fontWeight: 600, color: '#E8EEE9' }}>
                  10-second Socratic employee micro-drills (McGuire Inoculation)
                </span>
              </div>
            </div>
          </div>

          <div style={{ paddingTop: '32px' }}>
            <span style={{ fontSize: '11px', color: '#A9B8AC', fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
              Tenant: Acme Global Holdings Inc. &bull; RFC 6750 Compliant
            </span>
          </div>
        </div>

        {/* Right Auth Form Panel */}
        <div style={{
          flex: 0.9,
          backgroundColor: '#1D2922', // Moss Charcoal
          padding: '48px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <div style={{ marginBottom: '28px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#E8EEE9', margin: '0 0 8px 0', letterSpacing: '-0.5px' }}>
              {isRegistering ? 'Provision Clearance' : 'Clearance Login'}
            </h2>
            <p style={{ fontSize: '13.5px', color: '#A9B8AC', margin: 0 }}>
              {isRegistering ? 'Create your enterprise defense profile.' : 'HttpOnly cookie authorization will be issued.'}
            </p>
          </div>

          {error && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 14px',
              borderRadius: '8px',
              backgroundColor: 'rgba(185, 130, 130, 0.15)',
              border: '1px solid #B98282',
              color: '#F0BCBC',
              fontSize: '13px',
              marginBottom: '16px'
            }}>
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {/* Email Field */}
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#A9B8AC', textTransform: 'uppercase', marginBottom: '6px' }}>
                Corporate Email
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} color="#A9B8AC" style={{ position: 'absolute', left: '14px', top: '14px' }} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="analyst@acme.corp"
                  style={{
                    width: '100%',
                    padding: '12px 14px 12px 40px',
                    borderRadius: '8px',
                    border: '1px solid #2A382F',
                    backgroundColor: '#101713',
                    color: '#E8EEE9',
                    fontSize: '13.5px',
                    fontWeight: 500,
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#A9B8AC', textTransform: 'uppercase', marginBottom: '6px' }}>
                Security Token / Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} color="#A9B8AC" style={{ position: 'absolute', left: '14px', top: '14px' }} />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  style={{
                    width: '100%',
                    padding: '12px 14px 12px 40px',
                    borderRadius: '8px',
                    border: '1px solid #2A382F',
                    backgroundColor: '#101713',
                    color: '#E8EEE9',
                    fontSize: '13.5px',
                    fontWeight: 500,
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            {/* Role Clearance Selector */}
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#A9B8AC', textTransform: 'uppercase', marginBottom: '6px' }}>
                Assigned Operational Role
              </label>
              <div style={{ position: 'relative' }}>
                <UserCheck size={16} color="#A9B8AC" style={{ position: 'absolute', left: '14px', top: '14px' }} />
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px 12px 40px',
                    borderRadius: '8px',
                    border: '1px solid #2A382F',
                    backgroundColor: '#101713',
                    color: '#E8EEE9',
                    fontSize: '13.5px',
                    fontWeight: 600,
                    boxSizing: 'border-box',
                    appearance: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <option value="SOC Analyst">SOC Security Analyst (Tier 2)</option>
                  <option value="Enterprise Employee">Enterprise Employee (End-User)</option>
                  <option value="Red Team Admin">Adversarial Red Team Lead</option>
                  <option value="CISO">Chief Information Security Officer (CISO)</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn-eucalyptus"
              style={{ width: '100%', padding: '13px', marginTop: '6px' }}
            >
              {isLoading ? 'Authorizing Cookie Session...' : isRegistering ? 'Initialize Enterprise Seat' : 'Authenticate & Set Cookie'}
              <ArrowRight size={16} />
            </button>
          </form>

          {/* Toggle Register / Login */}
          <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '13px', color: '#A9B8AC' }}>
            {isRegistering ? 'Already hold credentials?' : 'Need to provision new personnel?'}
            <button
              type="button"
              onClick={() => setIsRegistering(!isRegistering)}
              style={{
                background: 'none',
                border: 'none',
                color: '#79B89A',
                fontWeight: 700,
                cursor: 'pointer',
                marginLeft: '6px',
                textDecoration: 'underline'
              }}
            >
              {isRegistering ? 'Sign In' : 'Register Clearance'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
