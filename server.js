const express = require('express');
const bodyParser = require('body-parser');
const { knex, bcrypt, db } = require("./utils/admin");

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const cors = require('cors');
const app = require("express")();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("it is working!");
});

app.post('/signin', signin.handleSignin(db, bcrypt));
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });
app.get('/profile/:id', profile.handleProfileGet(db));
//update image increments
app.put('/image', image.handleImage(db));
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })

app.listen(process.env.PORT || 3000, () => {
    console.log(`its working on port ${process.env.PORT}`);
})

/*
/--> res = this is working
/ signin --> POST = success/fail
/ register --> POST = user
/ profile/:userId --> GET = user
/ image --> PUT --> user
*/