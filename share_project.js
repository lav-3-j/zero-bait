const { spawn } = require('child_process');
const readline = require('readline');

console.log('🚀 Initializing ZeroBait Public Tunnel...');
console.log('This will expose localhost:8000 to the public internet so judges can scan a QR code and test the mobile UI.');
console.log('Starting localtunnel...');

// Run localtunnel via npx
const lt = spawn('npx', ['localtunnel', '--port', '8000'], { 
  shell: true, 
  env: { ...process.env, npm_config_strict_ssl: 'false' } 
});

lt.stdout.on('data', (data) => {
  const output = data.toString();
  if (output.includes('your url is:')) {
    const url = output.split('your url is:')[1].trim();
    console.log('\n✅ Tunnel Established Successfully!');
    console.log(`🌐 Public URL: ${url}\n`);
    
    console.log('Generating Scannable QR Code...');
    // Run qrcode-terminal to display it in terminal
    const qr = spawn('npx', ['qrcode-terminal', url], { 
      stdio: 'inherit', 
      shell: true,
      env: { ...process.env, npm_config_strict_ssl: 'false' } 
    });
    
    console.log('\n📱 Keep this terminal open! Tell the judges to scan this QR code with their phones to see the mobile smishing defense in action.\n');
  } else {
    process.stdout.write(output);
  }
});

lt.stderr.on('data', (data) => {
  console.error(`Tunnel Error: ${data}`);
});

lt.on('close', (code) => {
  console.log(`Tunnel closed with code ${code}`);
});
