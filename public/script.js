document.getElementById('connectBtn').addEventListener('click', async () => {
  const phone = document.getElementById('phoneNumber').value.trim();
  if (!phone) {
    alert("Please enter a phone number.");
    return;
  }

  document.getElementById('status').innerText = "Generating session and QR code...";
  const res = await fetch('/connect', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone })
  });

  const data = await res.json();
  if (data.qr) {
    const qrCode = document.getElementById('qrCode');
    qrCode.innerHTML = "";
    const img = document.createElement('img');
    img.src = data.qr;
    qrCode.appendChild(img);
    document.getElementById('status').innerText = "Scan the QR code with WhatsApp Web to link.";
  } else {
    document.getElementById('status').innerText = "Error: " + data.message;
  }
});
