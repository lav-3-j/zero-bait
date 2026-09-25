import React, { useState } from 'react';
import type { TextSpanHighlight } from '../types/message';
import { AlertTriangle } from 'lucide-react';

interface CognitiveHeatmapProps {
  content: string;
  highlights: TextSpanHighlight[];
  isInspecting: boolean;
}

export const CognitiveHeatmap: React.FC<CognitiveHeatmapProps> = ({
  content,
  highlights,
  isInspecting
}) => {
  const [activeHighlight, setActiveHighlight] = useState<TextSpanHighlight | null>(null);

  if (!isInspecting || highlights.length === 0) {
    return (
      <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.7', fontSize: '14.5px', color: '#E8EEE9' }}>
        {content}
      </div>
    );
  }

  // Slice content by highlight ranges
  const segments: React.ReactNode[] = [];
  let currentIndex = 0;

  // Filter and sort highlights
  const sortedHighlights = [...highlights].sort((a, b) => a.start - b.start);

  sortedHighlights.forEach((h, idx) => {
    // Normal text before highlight
    if (h.start > currentIndex) {
      segments.push(
        <span key={`text-${idx}`}>{content.substring(currentIndex, h.start)}</span>
      );
    }

    // Highlighted text span
    const spanText = content.substring(h.start, h.end);
    segments.push(
      <span
        key={`hl-${idx}`}
        className={`highlight-span ${h.severity}`}
        onClick={() => setActiveHighlight(activeHighlight?.start === h.start ? null : h)}
        onMouseEnter={() => setActiveHighlight(h)}
        title={h.vector}
      >
        {spanText}
      </span>
    );

    currentIndex = h.end;
  });

  if (currentIndex < content.length) {
    segments.push(<span key="tail">{content.substring(currentIndex)}</span>);
  }

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.75', fontSize: '14.5px', color: '#E8EEE9' }}>
        {segments}
      </div>

      {activeHighlight && (
        <div
          style={{
            marginTop: '18px',
            padding: '16px 20px',
            borderRadius: '10px',
            backgroundColor: '#17211B', // Forest Slate
            border: '1px solid #2A382F', // Soft Forest Border
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '14px',
            animation: 'fadeIn 0.2s ease-in-out'
          }}
        >
          <div style={{
            backgroundColor: 'rgba(185, 130, 130, 0.15)',
            border: '1px solid #B98282',
            padding: '6px',
            borderRadius: '6px',
            display: 'flex',
            flexShrink: 0
          }}>
            <AlertTriangle size={18} color="#B98282" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{ fontSize: '12px', fontWeight: 800, color: '#B98282', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {activeHighlight.vector}
              </span>
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(201, 173, 114, 0.15)',
                  border: '1px solid #C9AD72',
                  color: '#C9AD72'
                }}
              >
                {activeHighlight.severity.toUpperCase()} RISK
              </span>
            </div>
            <p style={{ margin: 0, fontSize: '13.5px', color: '#A9B8AC', lineHeight: 1.5, fontWeight: 500 }}>
              {activeHighlight.explanation}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
