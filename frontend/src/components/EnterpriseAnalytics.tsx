import React from 'react';
import {
  BarChart3,
  ShieldCheck,
  Users,
  Clock,
  FileCheck,
  Award
} from 'lucide-react';

export const EnterpriseAnalytics: React.FC = () => {
  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '28px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header Banner */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#1D2922', // Moss Charcoal
        padding: '24px 28px',
        borderRadius: '14px',
        border: '1px solid #2A382F',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <div style={{
              backgroundColor: 'rgba(121, 184, 154, 0.15)',
              padding: '6px',
              borderRadius: '8px',
              color: '#79B89A',
              display: 'flex'
            }}>
              <BarChart3 size={22} />
            </div>
            <h2 style={{ margin: 0, fontSize: '22px', fontWeight: 800, color: '#E8EEE9', letterSpacing: '-0.5px' }}>
              Executive CISO Posture &amp; SOC-2 Audit
            </h2>
          </div>
          <p style={{ margin: 0, fontSize: '13.5px', color: '#A9B8AC', fontWeight: 400 }}>
            Enterprise Inoculation Telemetry &bull; Acme Global Holdings Inc. (4,280 Seats &bull; Multi-Tenant Active)
          </p>
        </div>

        <button 
          onClick={() => {
            const csvData = "Date,Event,Target,Channel,Threat Score,Status,Inoculation Result\n2026-09-25 10:41:00,CFO Wire Transfer BEC Intercepted,robert.chen@acme.com,Email,89/100,Blocked,Inoculation Passed (10s Drill)\n2026-09-25 10:29:00,Slack Lateral IT SSO Harvest Blocked,@alex.mercer,Slack,94/100,Quarantined,Token Revoked\n2026-09-25 10:02:00,Mobile Bank Alert Smish Inoculated,+1 (555) 019-2834,SMS,82/100,Neutralized,Card-Back SOP Verified\n2026-09-25 09:14:00,Executive Gift Card Smish Intercepted,ceo.office@acme.com,Email,78/100,Blocked,Inoculation Passed\n2026-09-25 08:30:00,GitHub Token Exfiltration Slack Bot,@devops-team,Slack,96/100,Quarantined,Credential Rotated\n";
            const blob = new Blob([csvData], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'ZeroBait_SOC2_Compliance_Audit_Log.csv';
            a.click();
            window.URL.revokeObjectURL(url);
          }}
          className="btn-eucalyptus"
          style={{ padding: '11px 18px', fontSize: '13px' }}
        >
          <FileCheck size={16} />
          Export SOC-2 Audit Report (CSV)
        </button>
      </div>

      {/* Top 4 Metric KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '18px' }}>
        
        {/* KPI 1 */}
        <div style={{ backgroundColor: '#1D2922', padding: '22px', borderRadius: '12px', border: '1px solid #2A382F' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#A9B8AC', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
              Threats Neutralized
            </span>
            <ShieldCheck size={20} color="#79B89A" />
          </div>
          <div style={{ fontSize: '32px', fontWeight: 800, color: '#79B89A', display: 'flex', alignItems: 'center', gap: '10px' }}>
            1,429
            <svg width="40" height="20" viewBox="0 0 40 20">
              <path d="M0 20 Q5 5 10 10 T20 15 T30 5 T40 2" fill="none" stroke="#79B89A" strokeWidth="2.5" />
            </svg>
          </div>
          <div style={{ fontSize: '12px', color: '#E8EEE9', marginTop: '6px', fontWeight: 600 }}>
            &uarr; 99.4% zero-payload AI lures stopped
          </div>
        </div>

        {/* KPI 2 */}
        <div style={{ backgroundColor: '#1D2922', padding: '22px', borderRadius: '12px', border: '1px solid #2A382F' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#A9B8AC', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
              Human Resilience Index
            </span>
            <Users size={20} color="#B8C99B" />
          </div>
          <div style={{ fontSize: '32px', fontWeight: 800, color: '#E8EEE9', display: 'flex', alignItems: 'center', gap: '10px' }}>
            87.4%
            <svg width="40" height="20" viewBox="0 0 40 20">
              <path d="M0 15 L10 12 L20 18 L30 8 L40 5" fill="none" stroke="#B8C99B" strokeWidth="2.5" />
            </svg>
          </div>
          <div style={{ fontSize: '12px', color: '#B8C99B', marginTop: '6px', fontWeight: 600 }}>
            &uarr; +24.1% post-McGuire Inoculation
          </div>
        </div>

        {/* KPI 3 */}
        <div style={{ backgroundColor: '#1D2922', padding: '22px', borderRadius: '12px', border: '1px solid #2A382F' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#A9B8AC', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
              Inoculation Drill Latency
            </span>
            <Clock size={20} color="#C9AD72" />
          </div>
          <div style={{ fontSize: '32px', fontWeight: 800, color: '#E8EEE9' }}>
            8.2 sec
          </div>
          <div style={{ fontSize: '12px', color: '#A9B8AC', marginTop: '6px', fontWeight: 500 }}>
            Average employee quiz completion
          </div>
        </div>

        {/* KPI 4 */}
        <div style={{ backgroundColor: '#1D2922', padding: '22px', borderRadius: '12px', border: '1px solid #2A382F' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#B98282', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
              Pending Inoculation Queue
            </span>
            <Award size={20} color="#B98282" />
          </div>
          <div style={{ fontSize: '32px', fontWeight: 800, color: '#B98282', display: 'flex', alignItems: 'center', gap: '10px' }}>
            18 Seats
            <svg width="40" height="20" viewBox="0 0 40 20">
              <path d="M0 5 L10 18 L20 12 L30 15 L40 5" fill="none" stroke="#B98282" strokeWidth="2.5" />
            </svg>
          </div>
          <div style={{ fontSize: '12px', color: '#B98282', marginTop: '6px', fontWeight: 600 }}>
            Automated Socratic drill scheduled
          </div>
        </div>
      </div>

      {/* Main Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>
        
        {/* Plot 1: Radar Chart */}
        <div style={{ backgroundColor: '#1D2922', borderRadius: '14px', border: '1px solid #2A382F', padding: '24px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '14px', fontWeight: 800, color: '#E8EEE9', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
            Cialdini Threat Vector Radar
          </h3>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="240" height="240" viewBox="0 0 200 200">
              {/* Concentric Forest Grid Lines */}
              {[40, 60, 80, 100].map(r => (
                <polygon key={r} points={`
                  100,${100 - r} 
                  ${100 + r * 0.95},${100 - r * 0.31} 
                  ${100 + r * 0.59},${100 + r * 0.81} 
                  ${100 - r * 0.59},${100 + r * 0.81} 
                  ${100 - r * 0.95},${100 - r * 0.31}
                `} fill="none" stroke="#2A382F" strokeWidth="1.2" strokeDasharray="3,3" />
              ))}

              {/* Coordinates */}
              <line x1="100" y1="100" x2="100" y2="0" stroke="#2A382F" strokeWidth="1" />
              <line x1="100" y1="100" x2="195" y2="69" stroke="#2A382F" strokeWidth="1" />
              <line x1="100" y1="100" x2="159" y2="181" stroke="#2A382F" strokeWidth="1" />
              <line x1="100" y1="100" x2="41" y2="181" stroke="#2A382F" strokeWidth="1" />
              <line x1="100" y1="100" x2="5" y2="69" stroke="#2A382F" strokeWidth="1" />
              
              {/* Data Polygon */}
              <polygon points={`
                100,22 
                174,72 
                146,148 
                78,130 
                26,52
              `} fill="#79B89A" fillOpacity="0.25" stroke="#79B89A" strokeWidth="2.5" />
              <circle cx="100" cy="22" r="4" fill="#79B89A" />
              <circle cx="174" cy="72" r="4" fill="#79B89A" />
              <circle cx="146" cy="148" r="4" fill="#79B89A" />
              <circle cx="78" cy="130" r="4" fill="#79B89A" />
              <circle cx="26" cy="52" r="4" fill="#79B89A" />

              {/* Labels */}
              <text x="100" y="12" fill="#E8EEE9" fontSize="9" fontWeight="800" textAnchor="middle">Coercion</text>
              <text x="195" y="65" fill="#E8EEE9" fontSize="9" fontWeight="800" textAnchor="middle">Spoofing</text>
              <text x="165" y="192" fill="#E8EEE9" fontSize="9" fontWeight="800" textAnchor="middle">SOP Drift</text>
              <text x="35" y="192" fill="#E8EEE9" fontSize="9" fontWeight="800" textAnchor="middle">Anomalies</text>
              <text x="5" y="65" fill="#E8EEE9" fontSize="9" fontWeight="800" textAnchor="middle">Linguistics</text>
            </svg>
          </div>
        </div>

        {/* Plot 2: Time-Series Stacked Bar/Line Chart */}
        <div style={{ backgroundColor: '#1D2922', borderRadius: '14px', border: '1px solid #2A382F', padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 800, color: '#E8EEE9', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
              Threat Volume vs. Human Sensor Interception (30-Day Window)
            </h3>
            <div style={{ display: 'flex', gap: '14px', fontSize: '12px', color: '#A9B8AC', fontWeight: 600 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '10px', height: '10px', backgroundColor: '#101713', border: '1px solid #2A382F', borderRadius: '2px' }}></div> Inbound Attacks
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '14px', height: '3px', backgroundColor: '#79B89A', borderRadius: '2px' }}></div> Human Interceptions
              </span>
            </div>
          </div>
          
          <div style={{ width: '100%', height: '210px', position: 'relative' }}>
            <svg width="100%" height="100%" viewBox="0 0 600 200" preserveAspectRatio="none">
              {/* Subtle Grid Lines */}
              <line x1="0" y1="50" x2="600" y2="50" stroke="#2A382F" strokeWidth="1" strokeDasharray="3,3" />
              <line x1="0" y1="100" x2="600" y2="100" stroke="#2A382F" strokeWidth="1" strokeDasharray="3,3" />
              <line x1="0" y1="150" x2="600" y2="150" stroke="#2A382F" strokeWidth="1" strokeDasharray="3,3" />
              <line x1="0" y1="198" x2="600" y2="198" stroke="#2A382F" strokeWidth="1.5" />
              
              {/* Bars */}
              {[40, 60, 50, 80, 110, 90, 70, 120, 150, 130, 80, 90].map((h, i) => (
                <rect key={`bar-${i}`} x={20 + i * 48} y={200 - h} width="24" height={h} fill="#101713" stroke="#2A382F" strokeWidth="1" rx="3" />
              ))}

              {/* Line (Human Interceptions) */}
              <path d="M 32 170 L 80 150 L 128 160 L 176 130 L 224 100 L 272 120 L 320 140 L 368 90 L 416 60 L 464 80 L 512 130 L 560 120" 
                    fill="none" stroke="#79B89A" strokeWidth="3" />
              
              {[170, 150, 160, 130, 100, 120, 140, 90, 60, 80, 130, 120].map((cy, i) => (
                <circle key={`pt-${i}`} cx={32 + i * 48} cy={cy} r="4" fill="#1D2922" stroke="#79B89A" strokeWidth="2" />
              ))}
            </svg>
          </div>
        </div>

        {/* Plot 3: Department Vulnerability Heatmap */}
        <div style={{ backgroundColor: '#1D2922', borderRadius: '14px', border: '1px solid #2A382F', padding: '24px', gridColumn: '1 / -1' }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '14px', fontWeight: 800, color: '#E8EEE9', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
            Department Social Engineering Susceptibility Matrix
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '170px repeat(5, 1fr)', gap: '8px' }}>
            {/* Header Row */}
            <div></div>
            <div style={{ fontSize: '11px', color: '#A9B8AC', fontWeight: 700, textAlign: 'center' }}>Urgency Bias</div>
            <div style={{ fontSize: '11px', color: '#A9B8AC', fontWeight: 700, textAlign: 'center' }}>Authority Bias</div>
            <div style={{ fontSize: '11px', color: '#A9B8AC', fontWeight: 700, textAlign: 'center' }}>SOP Evasion</div>
            <div style={{ fontSize: '11px', color: '#A9B8AC', fontWeight: 700, textAlign: 'center' }}>Familiarity</div>
            <div style={{ fontSize: '11px', color: '#A9B8AC', fontWeight: 700, textAlign: 'center' }}>Reciprocity</div>

            {/* Row 1 */}
            <div style={{ fontSize: '13px', color: '#E8EEE9', fontWeight: 600, display: 'flex', alignItems: 'center' }}>Finance &amp; AP (BEC)</div>
            <div style={{ background: '#B98282', height: '30px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF', fontSize: '11.5px', fontWeight: 800 }}>88%</div>
            <div style={{ background: '#C9AD72', height: '30px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#101713', fontSize: '11.5px', fontWeight: 800 }}>74%</div>
            <div style={{ background: 'rgba(201, 173, 114, 0.4)', height: '30px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#E8EEE9', fontSize: '11.5px', fontWeight: 800 }}>52%</div>
            <div style={{ background: 'rgba(121, 184, 154, 0.15)', height: '30px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#A9B8AC', fontSize: '11.5px', fontWeight: 800 }}>28%</div>
            <div style={{ background: 'rgba(121, 184, 154, 0.1)', height: '30px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#A9B8AC', fontSize: '11.5px', fontWeight: 800 }}>14%</div>

            {/* Row 2 */}
            <div style={{ fontSize: '13px', color: '#E8EEE9', fontWeight: 600, display: 'flex', alignItems: 'center' }}>Cloud &amp; DevOps (SSO)</div>
            <div style={{ background: 'rgba(121, 184, 154, 0.15)', height: '30px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#A9B8AC', fontSize: '11.5px', fontWeight: 800 }}>31%</div>
            <div style={{ background: 'rgba(201, 173, 114, 0.4)', height: '30px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#E8EEE9', fontSize: '11.5px', fontWeight: 800 }}>48%</div>
            <div style={{ background: '#B98282', height: '30px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF', fontSize: '11.5px', fontWeight: 800 }}>92%</div>
            <div style={{ background: 'rgba(121, 184, 154, 0.15)', height: '30px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#A9B8AC', fontSize: '11.5px', fontWeight: 800 }}>35%</div>
            <div style={{ background: 'rgba(121, 184, 154, 0.1)', height: '30px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#A9B8AC', fontSize: '11.5px', fontWeight: 800 }}>18%</div>

            {/* Row 3 */}
            <div style={{ fontSize: '13px', color: '#E8EEE9', fontWeight: 600, display: 'flex', alignItems: 'center' }}>Executive Leadership</div>
            <div style={{ background: '#B98282', height: '30px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF', fontSize: '11.5px', fontWeight: 800 }}>82%</div>
            <div style={{ background: 'rgba(121, 184, 154, 0.15)', height: '30px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#A9B8AC', fontSize: '11.5px', fontWeight: 800 }}>22%</div>
            <div style={{ background: 'rgba(121, 184, 154, 0.1)', height: '30px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#A9B8AC', fontSize: '11.5px', fontWeight: 800 }}>12%</div>
            <div style={{ background: '#C9AD72', height: '30px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#101713', fontSize: '11.5px', fontWeight: 800 }}>64%</div>
            <div style={{ background: 'rgba(121, 184, 154, 0.2)', height: '30px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#A9B8AC', fontSize: '11.5px', fontWeight: 800 }}>38%</div>

            {/* Row 4 */}
            <div style={{ fontSize: '13px', color: '#E8EEE9', fontWeight: 600, display: 'flex', alignItems: 'center' }}>HR &amp; People Operations</div>
            <div style={{ background: 'rgba(201, 173, 114, 0.4)', height: '30px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#E8EEE9', fontSize: '11.5px', fontWeight: 800 }}>44%</div>
            <div style={{ background: '#C9AD72', height: '30px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#101713', fontSize: '11.5px', fontWeight: 800 }}>68%</div>
            <div style={{ background: 'rgba(121, 184, 154, 0.1)', height: '30px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#A9B8AC', fontSize: '11.5px', fontWeight: 800 }}>19%</div>
            <div style={{ background: 'rgba(121, 184, 154, 0.15)', height: '30px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#A9B8AC', fontSize: '11.5px', fontWeight: 800 }}>32%</div>
            <div style={{ background: '#B98282', height: '30px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF', fontSize: '11.5px', fontWeight: 800 }}>86%</div>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '16px', alignItems: 'center', fontSize: '11.5px', color: '#A9B8AC' }}>
            <span>Low Risk</span>
            <div style={{ width: '80px', height: '8px', background: 'linear-gradient(to right, rgba(121, 184, 154, 0.2), #C9AD72, #B98282)', borderRadius: '4px' }}></div>
            <span style={{ color: '#B98282', fontWeight: 700 }}>Critical Threat</span>
          </div>
        </div>
      </div>
    </div>
  );
};
