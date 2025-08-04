const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public")); // serve index.html if placed in 'public'

app.post("/generate-session", (req, res) => {
  const { number } = req.body;

  if (!number || !/^\+?\d{10,15}$/.test(number)) {
    return res.status(400).json({ success: false, message: "Invalid number format." });
  }

  // Simulate session generation
  const sessionId = uuidv4(); // Random UUID for session

  // Here you’d typically call a WhatsApp API to initiate the session pairing

  return res.json({ success: true, sessionId });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

  client.initialize();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
