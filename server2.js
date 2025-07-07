
const express = require('express');
const app = express();
const PORT = 3002;

// ✅ This parses JSON bodies
app.use(express.json());
app.get('/', (req, res) => {
    return res.status(200).json({
        message: "success"
    })
})  

app.post('/chat/:id', async (req, res) => {
    console.log("✅ Message received at Server 2");

    // If no body, send error
    if (!req.body || !req.body.message) {
        return res.status(400).json({ error: "Missing 'message' in body" });
    }

    const { message } = req.body;
    console.log("📩 Message:", message);

    return res.status(200).json({
        status: "success",
        id: req.params.id,
        received: message
    });
});

app.post('/chat', async (req, res) => {
    console.log("✅ Message received at Server 2");

    // Check for missing body/message
    if (!req.body || !req.body.message) {
        res.write("❌ Error: Missing 'message' in body\n");
        return res.end();
    }

    const { message } = req.body;
    console.log("📩 Message:", message);

    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Transfer-Encoding', 'chunked');

    const simulatedResponse = `Hello! I received your message: "${message}". Thank you for sending it. I'm here if you need anything else. 😊`;

    // Break into words and stream them with delay
    const words = simulatedResponse.split(" ");

    let index = 0;
    console.log("STreaming Started")
    const interval = setInterval(() => {
        if (index < words.length) {
            res.write(words[index] + " ");
            index++;
        } else {
            clearInterval(interval);
            res.end();
        }
    }, 200); // 200ms delay between words (simulate typing)
});


app.listen(PORT, () => {
    console.log(`🤖 Server 2 running on http://localhost:${PORT}`);
});
