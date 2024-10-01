const express = require('express');
const app = express();
const VERIFY_TOKEN = "902edd8098d4abf617edb6e2a396a5e947d27bc2"; // Coloca tu verify_token aquí

app.use(express.json());

// Verifica la suscripción de Strava en la raíz (`/`) y redirige a `/webhook`
app.get('/', (req, res) => {
    res.redirect('/webhook');
});

// Ruta para verificar la suscripción de Strava
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

// Ruta para manejar las notificaciones de Strava
app.post('/webhook', (req, res) => {
    console.log('Evento recibido:', req.body);
    res.sendStatus(200); // Confirmar recepción de la notificación
});

module.exports = app;
