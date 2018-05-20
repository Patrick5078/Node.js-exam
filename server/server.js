/** Dependencies ************/
const express = require('express')
const app = express()
const mysql = require('mysql')
const path = require('path')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const passportJWT = require('passport-jwt')
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const bb = require('express-busboy');
const Entities = require('html-entities').XmlEntities;
const entities = new Entities();

process.on( 'uncaughtException' , ( ex ) => {
    console.log(ex)
})

app.use(passport.initialize());
bb.extend(app, {
    upload: true,
    path: '/images',
    allowedPath: /./
});

/** Database Imports  ************/
const dbUserClass = require('./controllers/dbUser.js')
const dbUser = new dbUserClass


/** sql connection ************/
global.con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: 'webfiction'
});

global.con.connect(function (err) {
    if (err) throw err;
    console.log("Connected to mysql!");
});


const jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = require('./security/secretKey.js')

const strategy = new JwtStrategy(jwtOptions, async (jwt_payload, next) => {
    console.log('payload received', jwt_payload);
    try {
        // usually this would be a database call:
        let user = await dbUser.getUser(jwt_payload.id)
        user = user[0]
        if (user.id) {
            next(null, user);
        } else {
            next(null, false);
        }
    } catch (e) {
        console.log('Problem getting user from DB during authentication '+e)
        return false
    }
});

passport.use(strategy);

/** Route imports **************/
const rGetUser = require('./routes/getUser.js')
const rCreateStory = require('./routes/createStory')
const rLogin = require('./routes/login')
const rCreateUser = require('./routes/createUser')
const rTestMail = require('./routes/testMail')
/** API **/
app.use(express.static(`${__dirname}/../public`))

app.get('/api/getUserFromJwt' , passport.authenticate('jwt', { session: false }), async (req,res) => {
    return res.json({status: 'ok', data: req.user})
})

app.get('/api/test-mail', (req , res) => {rTestMail(req,res)})
app.post("/api/login", (req, res) => {rLogin(req,res)});
app.get('/api/getUser', (req,res) => {rGetUser(req,res)})
app.post('/api/createStory', passport.authenticate('jwt', { session: false }), (req,res) => {rCreateStory(req,res)})
app.post('/api/createUser', (req, res) => {rCreateUser(req,res)})


/** Server side routing  ************/
app.get('*', (req, res) => {
    return res.sendFile(path.resolve(`${__dirname}/../public/index.html`))
})
/** Connection  ************/
const port = 3000

app.listen(port, (err) => {
    if (err) {
        console.log(err)
        return false
    }
    console.log('Server is listening to port '+port)
})