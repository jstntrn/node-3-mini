const express = require('express');
require('dotenv').config();
const {json} = require('body-parser');
const mc = require('./messagesCtrl');
const session = require('express-session');
const app = express();

app.use(json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))

app.use((req, res, next) => {
  const badWords= ['fool', 'internet explorer', 'pt cruiser']
  if(req.body.message){
    for(let i=0; i<badWords.length; i++){
      let regex = new RegExp(badWords[i], 'g');
      req.body.message = req.body.message.replace(regex, '****');
    }
    next();
  } else {
    next();
    }
})

app.get('/api/messages', mc.getAllMessages);
app.get('/api/messages/history', mc.history);
app.post('/api/messages', mc.createMessage);


const PORT = process.env.SERVER_PORT
app.listen(PORT, () => {console.log(`listening on PORT ${PORT}`)})

