const express = require('express');
const app = express();
const VERIFY_TOKEN = "902edd8098d4abf617edb6e2a396a5e947d27bc2";

app.use(express.json());

app.get('/', (req, res) => {
    res.redirect('/webhook');
});

app.get('/webhook', (req, res) => {
    console.log('Verificando Webhook...');
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
        console.log('Webhook verificado exitosamente');
        res.json({ 'hub.challenge': challenge });
    } else {
        console.log('Verificación fallida');
        res.status(403).send('Verification failed');
    }
});

app.post('/webhook', (req, res) => {
    console.log('Evento recibido:', req.body);
    res.sendStatus(200);
});

module.exports = app;
