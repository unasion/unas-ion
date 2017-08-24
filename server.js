const express = require('express'),
      session = require('express-session'),
      bodyParser = require('body-parser'),
      massive = require('massive'),
      passport = require('passport'),
      Auth0Strategy = require('passport-auth0'),
      // config = require('./config.js'),
      cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(session({
  resave: true, //Without this you get a constant warning about default values
  saveUninitialized: true, //Without this you get a constant warning about default values
  secret: 'keyboardcat'
}))
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/www'));



/////////////
// DATABASE //
/////////////

massive("postgres://uunjpeyj:yVNsIpBpaTMB_a2TXEss-Gmq1DGSIOte@pellefant.db.elephantsql.com:5432/uunjpeyj").then(massiveInstance => {
    app.set('db', massiveInstance);
    const db = app.get('db');

    app.get('/api/test', (req,res) => {
      app.get('db').test_end((err, users) => {
      }).then(users => res.send(users))
    })

});

app.listen(3000, () => {console.log('listening on 3000')})
