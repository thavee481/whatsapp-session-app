const express = require('express');
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

let client;

app.post('/connect', async (req, res) => {
  const { phone } = req.body;
  if (!phone) return res.status(400).json({ message: "Phone number required." });

  const sessionPath = `./session/${phone}`;
  if (!fs.existsSync(sessionPath)) fs.mkdirSync(sessionPath, { recursive: true });

  client = new Client({
    authStrategy: new LocalAuth({ dataPath: sessionPath }),
    puppeteer: {
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
  });

  client.on('qr', async (qr) => {
    const qrImage = await qrcode.toDataURL(qr);
    res.json({ qr: qrImage });
  });

  client.on('ready', () => {
    console.log('Client is ready!');
  });

  client.initialize();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
