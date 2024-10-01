const express = require('express');
const app = express();
const VERIFY_TOKEN = "902edd8098d4abf617edb6e2a396a5e947d27bc2";

app.use(express.json());

app.get('/webhook', (req, res) => {
    console.log('Full Request Object:', req);
    console.log('Full Query Parameters:', req.query);

    console.log('VERIFY_TOKEN:', VERIFY_TOKEN);
    console.log('Webhook Token:', req.query['hub.verify_token']);
    console.log('Challenge:', req.query['hub.challenge']);
    console.log('mode:', req.query['hub.mode']);
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
        console.log('Webhook verified successfully');
        res.json({ 'hub.challenge': challenge });
    } else {
        console.log('Verification failed');
        console.log('Webhook Token:', req.query['hub.verify_token']);
        res.status(403).send('Verification failed');
    }
});

app.post('/webhook', (req, res) => {
    console.log('Received event:', req.body);
    res.sendStatus(200);
});

module.exports = app;
