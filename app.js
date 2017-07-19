const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const valid = require('express-validator');
const crypto = require('crypto');


//router



var app = express();


app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(valid())
app.use(session({
  secret: 'sag',
  resave: false,
  saveUninitialized: true,
  cookie: {}
}))



app.listen(process.env.PORT || 3000);
