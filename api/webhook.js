const express = require('express');
const app = express();
const VERIFY_TOKEN = "902edd8098d4abf617edb6e2a396a5e947d27bc2"; // El mismo token que usaste para registrar el webhook en Strava

app.use(express.json());

// Ruta de verificación de suscripción
app.get('/webhook', (req, res) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    console.log('Verifying webhook with token:', token);

    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
        console.log('Webhook verified successfully');
        res.json({ 'hub.challenge': challenge });
    } else {
        console.log('Verification failed');
        res.status(403).send('Verification failed');
    }
});

// Ruta para manejar notificaciones de Strava
app.post('/webhook', (req, res) => {
    console.log('Received event:', req.body);
    res.sendStatus(200);
});

module.exports = app;
