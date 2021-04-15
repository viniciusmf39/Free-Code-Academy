// NOTE: the test cases are flawed so we have to paster code in server.js (on repl env) and routing will not work for tests

'use strict';

const express     = require('express');
const bodyParser  = require('body-parser');
const fccTesting  = require('./freeCodeCamp/fcctesting.js');
const passport=require('passport');
const session=require('express-session');
const path=require('path');
//const mongoose=require('mongoose');
const mongo = require('mongodb').MongoClient;
const cors=require('cors');
const app = express();
const bcrypt=require('bcrypt');
var http = require('http');
const io = require('socket.io')(http);
const routes = require('./routes.js');
const auth = require('./auth.js');
const GitHubStrategy = require('passport-github').Strategy;

fccTesting(app); //For FCC testing purposes


app.use(cors());
app.set('view engine', 'pug');


app.use('/public', express.static(process.cwd() + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


 passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: 'https://fcc-advanced-node-and-express-challenges.supercoder1.repl.co/return'
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
  }));

mongo.connect(process.env.MONGO_URI, (err, db) => {
  if(err) {
    console.log('Database error: ' + err);
  } 
  else {
    console.log('Successful database connection');
    auth(app,db);
    routes(app,db);
   //serialization and app.listen
  

   
    app.listen(process.env.PORT || 3000, () => {
      console.log("Listening on port " + process.env.PORT);
    });
  }
});


