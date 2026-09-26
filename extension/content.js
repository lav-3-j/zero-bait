chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "scan_text") {
    showOverlay("Analyzing cognitive intent in real-time...");
    
    fetch('http://127.0.0.1:8000/api/v1/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: request.text, channel_context: 'browser_context_menu' })
    })
    .then(res => res.json())
    .then(data => {
      if (data.is_ai_phishing || data.overall_threat_score >= 50) {
        updateOverlay(`⚠️ <strong>Threat Detected (${data.overall_threat_score}/100)</strong><br/><br/>${data.triggers[0]?.category || 'Cognitive Manipulation'}: ${data.triggers[0]?.explanation || 'Deceptive persuasion intent identified.'}`, true);
      } else {
        updateOverlay('✅ <strong>Safe Content</strong><br/>No synthetic persuasion or homoglyphs detected.', false);
      }
    })
    .catch(err => {
      updateOverlay('❌ Error reaching ZeroBait Engine. Verify backend is running on localhost:8000.', true);
    });
  }
});

let overlayEl = null;

function showOverlay(text) {
  if (overlayEl) overlayEl.remove();
  
  overlayEl = document.createElement('div');
  overlayEl.style.position = 'fixed';
  overlayEl.style.bottom = '24px';
  overlayEl.style.right = '24px';
  overlayEl.style.backgroundColor = '#FFFFFF';
  overlayEl.style.color = '#0F172A';
  overlayEl.style.border = '1px solid #CBD5E1';
  overlayEl.style.padding = '16px 18px';
  overlayEl.style.borderRadius = '12px';
  overlayEl.style.zIndex = '999999';
  overlayEl.style.boxShadow = '0 20px 25px -5px rgba(15, 23, 42, 0.15), 0 8px 10px -6px rgba(15, 23, 42, 0.1)';
  overlayEl.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  overlayEl.style.fontSize = '13.5px';
  overlayEl.style.maxWidth = '320px';
  overlayEl.style.transition = 'all 0.25s ease';
  
  overlayEl.innerHTML = `
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
      <span class="zb-spinner" style="font-size:16px;">🔄</span>
      <strong style="color:#0F172A;font-size:13px;letter-spacing:-0.2px;">ZeroBait Lens</strong>
    </div>
    <div style="color:#475569;line-height:1.45;font-size:12.5px;" id="zb-content">${text}</div>
  `;
  
  document.body.appendChild(overlayEl);
}

function updateOverlay(text, isWarning) {
  if (!overlayEl) return;
  const content = overlayEl.querySelector('#zb-content');
  const spinner = overlayEl.querySelector('.zb-spinner');
  
  if (spinner) spinner.innerHTML = isWarning ? '🛡️' : '✅';
  if (content) content.innerHTML = text;
  
  if (isWarning) {
    overlayEl.style.borderColor = '#FCA5A5';
    overlayEl.style.backgroundColor = '#FEF2F2';
  } else {
    overlayEl.style.borderColor = '#A7F3D0';
    overlayEl.style.backgroundColor = '#ECFDF5';
  }
  
  // Auto dismiss after 6s
  setTimeout(() => {
    if (overlayEl) {
      overlayEl.style.opacity = '0';
      setTimeout(() => overlayEl.remove(), 300);
      overlayEl = null;
    }
  }, 6000);
}
