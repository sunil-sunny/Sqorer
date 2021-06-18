const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');
const fileUpload = require("express-fileupload");
const passport = require('passport');
const cookieSession = require('cookie-session');
require('./routes/api/passport-setup');
const app = express(feathers());
const cors = require('cors');
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("config");
const User = require("./models/user");


const gameServices = require('./routes/middleware/game');

//import socket Io


const connectDB = require(`./config/db`)
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}


app.use(cors());
app.use(express.json({ extended: false }));

// Config Socket.io realtime APIs
app.configure(socketio());
// Set up REST transport
app.configure(express.rest())
// Set up fileUpload
app.use(fileUpload());
//call upload folder to server
app.use(express.static("uploads"));

// connection to database;
connectDB();


//Coockie Session

app.use(cookieSession({
    name: 'sqorer',
    keys: ['key1', 'key2']
}));


const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
}

// nitialize passport.

app.use(passport.initialize());
app.use(passport.session());

// Auth Routes
app.get('google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/good');
    }
);

// Apis
app.use("/api/user", require('./routes/api/user'));
app.use("/api/auth", require('./routes/api/auth'));
app.use("/api/games", require('./routes/api/game'));
app.use("/api/game", new gameServices())
app.use("/api/exercice", require('./routes/api/exercice'));
app.use("/api/image", require('./routes/api/upload'));
app.use("/api/payment", require('./routes/api/payment'));
app.use("/api/team", require('./routes/api/team'));
app.use("/uploads", express.static("uploads"));
app.use("/api/teacher", require('./routes/api/teacherRoute'));
app.use("/api/parent", require('./routes/api/parentRoute'));

//
app.use(express.static('client/build'));

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

// New connections connect to stream channel
app.on('connection', conn => app.channel('stream').join(conn));
// Publish events to stream
app.publish(data => app.channel('stream'));

let PORT = process.env.PORT || 8082;

app.listen(PORT)
    .on('listening', () =>
        console.log(`Realtime server running on port ${PORT}`)
    );