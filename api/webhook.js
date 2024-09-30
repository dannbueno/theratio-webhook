const express = require('express');
const app = express();
const VERIFY_TOKEN = "3762b1f82fe66627a9e96587044c3740bb68255a"; // Coloca tu verify_token aquí

app.use(express.json());

// Ruta para verificar la suscripción de Strava
app.get('/webhook', (req, res) => {
    console.log('Query parameters:', req.query);
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
        res.json({ 'hub.challenge': challenge });
    } else {
        res.status(403).send('Verification failed');
    }
});

// Ruta para manejar las notificaciones de Strava
app.post('/webhook', (req, res) => {
    console.log('Received event:', req.body);
    res.sendStatus(200); // Confirmar recepción de la notificación
});

module.exports = app;
