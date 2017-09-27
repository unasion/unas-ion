const express = require('express'),
      session = require('express-session'),
      bodyParser = require('body-parser'),
      massive = require('massive'),
      passport = require('passport'),
      Auth0Strategy = require('passport-auth0'),
      // config = require('./config.js'),
      cors = require('cors'),
      http = require('http');

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



//////////////
// DATABASE //
//////////////

massive("postgres://uunjpeyj:yVNsIpBpaTMB_a2TXEss-Gmq1DGSIOte@pellefant.db.elephantsql.com:5432/uunjpeyj").then(massiveInstance => {
    app.set('db', massiveInstance);
    const db = app.get('db');

    app.get('/api/test', (req,res) => {
      db.test_end((err, users) => {
      }).then(users => res.send(users))
    })

    app.post('/api/contacts', (req, res) => {
      db.getAllContacts(req.body.id, (err, contacts)=> {
      }).then(contacts => res.send(contacts))
    })

    app.post('/api/barbers', (req, res) => {
      db.get_barbers(req.body.id, (err, contacts)=> {
      }).then(contacts => res.send(contacts))
    })

    app.post('/api/services', (req, res) => {
      db.get_services(req.body.id, (err, contacts)=> {
      }).then(contacts => res.send(contacts))
    })

    app.post('/api/add-appt', (req, res) => {
      let newappt = [
        req.body.b_id,
        req.body.c_id,
        req.body.v_id,
        req.body.shop_id,
        req.body.start_time,
        req.body.end_time
      ]
      console.log('-- appt added server --',newappt)
      db.add_appt(newappt, (err, info)=> {
        console.log('-- appt added server --',err,info);
      }).then(info => res.send(info))
    })  

    app.post('/api/add-barber', (req, res) => {
      // first_name, last_name, email, password, color, phonenumber, shop_id
      newUser = [
        req.body.firstName,
        req.body.lastName,
        req.body.userName,
        req.body.password,
        'grey',
        req.body.phonenumber,
        1
      ]
      // console.log('-- new barber created --', newUser)
      db.add_barber(newUser, (err, users) => {
        console.log('back from db -->>',err,users)})
        .then((users) => {
          console.log('-- barber from DB --',users)
          res.send(users)
        },
        (error) => {res.send({fail:'That email address is already in use!'})
      })
    })

    app.post('/api/login', (req, res)=> {
      credentials = [req.body.userName, req.body.password]
      db.login(credentials, (err, user)=> {
        console.log(err);
      }).then((user) => {res.send(user)})
    })

    app.post('/api/appts', (req, res)=> {
      console.log('-- bod cuming in --',req.body);
      db.get_appts(req.body.id, (err, appts)=>{
        console.log(err, appts);
      }).then((appts)=> {
        console.log(' -- appts from DB -- ',appts)
        res.send(appts)
      })
    })

});

const server = http.createServer(app);
server.listen( 3001, ()=> {console.log('Connected on 3001')})
