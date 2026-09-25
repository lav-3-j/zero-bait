import React from 'react';
import type { RadarScores } from '../types/message';

interface ThreatRadarProps {
  scores: RadarScores;
  overallScore: number;
}

export const ThreatRadar: React.FC<ThreatRadarProps> = ({ scores, overallScore }) => {
  const size = 220;
  const center = size / 2;
  const radius = 70;

  const toCoords = (value: number, angleDeg: number) => {
    const angleRad = (angleDeg * Math.PI) / 180;
    const r = (Math.max(8, Math.min(100, value)) / 100) * radius;
    return {
      x: center + r * Math.cos(angleRad),
      y: center + r * Math.sin(angleRad),
    };
  };

  const pTop = toCoords(scores.coercion_pressure, -90);
  const pRight = toCoords(scores.sop_deviation, 0);
  const pBottom = toCoords(scores.channel_risk, 90);
  const pLeft = toCoords(scores.identity_risk, 180);

  const polygonPoints = `${pTop.x},${pTop.y} ${pRight.x},${pRight.y} ${pBottom.x},${pBottom.y} ${pLeft.x},${pLeft.y}`;

  const getRiskColor = (score: number) => {
    if (score >= 70) return '#B98282'; // Dust Rose (Threat)
    if (score >= 40) return '#C9AD72'; // Muted Gold (Caution)
    return '#79B89A'; // Eucalyptus (Safe)
  };

  const riskColor = getRiskColor(overallScore);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '18px',
      backgroundColor: '#1D2922', // Moss Charcoal
      borderRadius: '12px',
      border: '1px solid #2A382F'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', marginBottom: '12px' }}>
        <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.8px', color: '#A9B8AC' }}>
          Cognitive Threat Radar
        </span>
        <span style={{
          fontSize: '11px',
          fontWeight: 800,
          padding: '2px 8px',
          borderRadius: '4px',
          backgroundColor: `${riskColor}22`,
          color: riskColor,
          border: `1px solid ${riskColor}44`
        }}>
          {overallScore}/100 Risk
        </span>
      </div>

      <svg width={size} height={size} style={{ overflow: 'visible' }}>
        {/* Concentric Forest Grid Rings */}
        {[0.25, 0.5, 0.75, 1.0].map((level, i) => (
          <circle
            key={i}
            cx={center}
            cy={center}
            r={radius * level}
            fill="none"
            stroke="#2A382F"
            strokeDasharray={level === 1 ? 'none' : '3,3'}
            strokeWidth={1.2}
          />
        ))}

        {/* Crosshair Coordinates */}
        <line x1={center} y1={center - radius} x2={center} y2={center + radius} stroke="#2A382F" strokeWidth="1" />
        <line x1={center - radius} y1={center} x2={center + radius} y2={center} stroke="#2A382F" strokeWidth="1" />

        {/* Radar Data Polygon */}
        <polygon
          points={polygonPoints}
          fill={riskColor}
          fillOpacity="0.22"
          stroke={riskColor}
          strokeWidth="2.5"
          style={{ transition: 'all 0.3s ease' }}
        />

        {/* Coordinate Points */}
        {[pTop, pRight, pBottom, pLeft].map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="4"
            fill={riskColor}
            style={{ transition: 'all 0.3s ease' }}
          />
        ))}

        {/* Axis Labels */}
        <text x={center} y={center - radius - 8} textAnchor="middle" fill="#A9B8AC" fontSize="10" fontWeight="700">
          Coercion ({scores.coercion_pressure})
        </text>
        <text x={center + radius + 10} y={center + 4} textAnchor="start" fill="#A9B8AC" fontSize="10" fontWeight="700">
          SOP Drift ({scores.sop_deviation})
        </text>
        <text x={center} y={center + radius + 16} textAnchor="middle" fill="#A9B8AC" fontSize="10" fontWeight="700">
          Channel ({scores.channel_risk})
        </text>
        <text x={center - radius - 10} y={center + 4} textAnchor="end" fill="#A9B8AC" fontSize="10" fontWeight="700">
          Identity ({scores.identity_risk})
        </text>
      </svg>
    </div>
  );
};
