const express = require("express");
const axios = require("axios");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post("/", async (req, res) => {
    const { webhook, ...discordData } = req.body;

    if (!webhook || !webhook.startsWith("https://discord.com/api/webhooks/")) {
        return res.status(400).json({ error: "Invalid or missing webhook URL." });
    }

    try {
        await axios.post(webhook, discordData);
        res.json({ success: true });
    } catch (err) {
        console.error("Failed to send to Discord:", err.message);
        res.status(500).json({ error: "Failed to send message." });
    }
});

app.listen(PORT, () => {
    console.log(`Webhook running on port ${PORT}`);
});
