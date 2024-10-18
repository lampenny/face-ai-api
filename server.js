const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  database: 'face-ai-api-dev'
});

const app = express();
const PORT = process.env.PORT;

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("it is working!");
});

app.get('/', (req, res) => { res.send(db.users); });

app.post('/signin', signin.handleSignin(db, bcrypt));

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt); });

app.get('/profile/:id', profile.handleProfileGet(db));

//update image increments
app.put('/image', image.handleImage(db));

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res); });

app.listen(PORT || 4000, () => {
  console.log(`its working on port ${PORT || 4000}`);
});