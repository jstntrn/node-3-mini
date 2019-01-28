require('dotenv').config;
const express = require('express');
const bodyParser = require('body-parser');
const ctrl = require('./messagesCtrl');
const session = require('express-session');

const app = express();
app.use(bodyParser.json());
app.use(session,({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.get('/api/messages', ctrl.getAllMessages);
app.get('/api/messages/history', ctrl.history);
app.post('api/messages', ctrl.createMessage);

const PORT = process.env.SERVER_PORT || 3005
app.listen(PORT, () => {console.log(`listening on PORT ${PORT}`)})