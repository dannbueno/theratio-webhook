const express = require('express');
const app = express();
const VERIFY_TOKEN = "3762b1f82fe66627a9e96587044c3740bb68255a"; // Coloca tu verify_token aquí

app.use(express.json());

app.get('/webhook', (req, res) => {
    console.log('Query parameters:', req.query);
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    console.log(`Received mode: ${mode}, token: ${token}, challenge: ${challenge}`);
    console.log(`Expected token: ${VERIFY_TOKEN}`);

    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
        console.log('Token matched! Verification successful.');
        res.json({ 'hub.challenge': challenge });
    } else {
        console.log('Verification failed: Mode or token did not match.');
        res.status(403).send('Verification failed');
    }
});
