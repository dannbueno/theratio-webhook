const VERIFY_TOKEN = "13f962c46ab51d30f8d71485409831ebb6d1469e";

const express = require("express");
const app = express();

app.post('/webhook', (req, res) => {
    console.log("webhook event received!", req.query, req.body);
    res.status(200).send('EVENT_RECEIVED');
});

app.get("/webhook", (req, res) => {
    res.send("Express on Vercel!!!");

    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    console.log('mode: ' + mode);
    console.log('token: ' + token);
    console.log('VERIFY_TOKEN: ' + VERIFY_TOKEN);
    console.log('challenge: ' + challenge);
});

app.listen(3000, () => console.log("Server ready on port 3000."));
module.exports = app;