const VERIFY_TOKEN = "13f962c46ab51d30f8d71485409831ebb6d1469e";
const bodyParser = require('body-parser');
const express = require("express");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/webhook", (req, res) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    console.log('mode: ' + mode);
    console.log('token: ' + token);
    console.log('VERIFY_TOKEN: ' + VERIFY_TOKEN);
    console.log('challenge: ' + challenge);

    // Validar el token recibido con el token definido
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
        console.log("Webhook verified successfully");
        res.status(200).json({ 'hub.challenge': challenge });
    } else {
        console.log("Verification failed");
        res.status(403).send('Verification failed');
    }
});

app.post('/webhook', (req, res) => {
    console.log("webhook event received!", req.query, req.body);

    if (req.body.object_type === 'activity' && req.body.aspect_type === 'create') {
        console.log("Nueva actividad creada:");
        console.log("Detalles del evento:", req.body);
        // Aquí puedes manejar los datos de la actividad, como el `object_id` que es el ID de la actividad en Strava
    }

    res.status(200).send('EVENT_RECEIVED');
});


app.listen(3000, () => console.log("Server ready on port 3000."));
module.exports = app;