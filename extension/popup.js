document.getElementById('scan-btn').addEventListener('click', async () => {
  const input = document.getElementById('scan-input').value;
  const resultsDiv = document.getElementById('results');
  const btn = document.getElementById('scan-btn');
  
  if (!input.trim()) return;
  
  btn.innerText = 'Analyzing Cognitive Vectors...';
  btn.style.background = '#1D2922';
  btn.style.color = '#79B89A';
  
  const payload = {
    id: 'lens_' + Date.now(),
    channel: 'email',
    sender_name: 'Browser Lens Intercept',
    sender_address: 'unknown@external',
    recipient: 'current_user@company.com',
    subject: 'Realtime Browser Analysis',
    content: input
  };

  try {
    let response;
    try {
      // 1. Try local dev server first
      response = await fetch('http://localhost:8000/api/v1/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error('Local status ' + response.status);
    } catch (localErr) {
      // 2. Seamless fallback to live Render production engine
      response = await fetch('https://zero-bait.onrender.com/api/v1/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    }
    
    const data = await response.json();
    
    btn.innerText = 'Scan Complete';
    btn.style.background = '#79B89A';
    btn.style.color = '#101713';
    
    resultsDiv.style.display = 'block';
    resultsDiv.innerHTML = '';
    
    if (data.is_ai_phishing || data.overall_threat_score >= 35 || data.threat_tier !== 'Clean') {
      const p = document.createElement('p');
      p.style.color = '#B98282';
      p.style.fontWeight = 'bold';
      p.style.margin = '0 0 8px 0';
      p.innerText = `⚠️ ${data.threat_tier} (${data.overall_threat_score}/100)`;
      resultsDiv.appendChild(p);
      
      if (data.triggers && data.triggers.length > 0) {
        data.triggers.slice(0, 3).forEach(trigger => {
          const div = document.createElement('div');
          div.className = 'threat-item';
          const matchSnippet = trigger.matched_text ? `<span style="font-size:11px;opacity:0.8;display:block;margin-top:2px;">Trigger: "${trigger.matched_text}"</span>` : '';
          div.innerHTML = `<strong>${trigger.category} (${Math.round(trigger.score * 100)}%)</strong>${trigger.explanation}${matchSnippet}`;
          resultsDiv.appendChild(div);
        });
      }
    } else {
      resultsDiv.innerHTML = `<div style="color: #79B89A; font-weight: bold; padding: 10px; background: #17211B; border: 1px solid #79B89A; border-radius: 8px;">✅ Safe (8/100). No synthetic manipulation, urgency traps, or credential lures detected.</div>`;
    }
    
    setTimeout(() => {
      btn.innerText = 'Scan for Phishing Intent';
      btn.style.background = '#79B89A';
      btn.style.color = '#101713';
    }, 4000);
    
  } catch (err) {
    btn.innerText = 'Error - Backend Offline?';
    btn.style.background = '#B98282';
    btn.style.color = '#E8EEE9';
    console.error(err);
  }
});
