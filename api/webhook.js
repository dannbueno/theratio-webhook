const VERIFY_TOKEN = "3762b1f82f6e6627a9e96587044c3740bb68255a"; // Mismo token usado en el POST a Strava

app.get('/webhook', (req, res) => {
    console.log('Query parameters:', req.query); // Agrega este console.log para verificar los parámetros
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
        res.json({ 'hub.challenge': challenge });
    } else {
        res.status(403).send('Verification failed');
    }
});
