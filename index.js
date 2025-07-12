const express = require('express');
const app = express();
app.use(express.json());

const playerIPs = {};

app.get('/log-ip', (req, res) => {
  const userId = req.query.userId;
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  if (userId) {
    playerIPs[userId] = ip;
    console.log(`Logged IP for UserId ${userId}: ${ip}`);
    res.json({ success: true });
  } else {
    res.status(400).json({ error: 'No userId provided' });
  }
});

app.get('/get-ip/:userId', (req, res) => {
  const ip = playerIPs[req.params.userId];
  if (ip) {
    res.json({ ip });
  } else {
    res.status(404).json({ error: 'IP not found' });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
