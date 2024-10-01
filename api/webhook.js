'use strict';

const express = require('express');
const bodyParser = require('body-parser');

// Crear servidor Express y configurar body-parser para manejar JSON
const app = express().use(bodyParser.json());

// Definir el token de verificación que usaste al crear la suscripción
const VERIFY_TOKEN = "902edd8098d4abf617edb6e2a396a5e947d27bc2";

// Configurar el puerto de escucha
const PORT = process.env.PORT || 3000;

// Iniciar el servidor en el puerto especificado
app.listen(PORT, () => console.log(`Webhook is listening on port ${PORT}`));

// Crear endpoint para manejar las notificaciones de Strava
app.post('/webhook', (req, res) => {
    console.log("Webhook event received!", req.query, req.body);
    res.status(200).send('EVENT_RECEIVED');
});

// Endpoint para la verificación de Strava (GET)
app.get('/webhook', (req, res) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    // Verificar si el token y el modo están presentes en la solicitud
    if (mode && token) {
        // Validar el token de verificación
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            // Responder con el challenge proporcionado por Strava
            console.log('WEBHOOK_VERIFIED');
            res.json({ "hub.challenge": challenge });
        } else {
            // Responder con un error 403 si el token no coincide
            res.sendStatus(403);
        }
    } else {
        // Si faltan parámetros, también se responde con 403
        res.sendStatus(403);
    }
});

// Exportar la app de Express para usarla en Vercel
module.exports = app;
