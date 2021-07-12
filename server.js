const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const { DatabaseError } = require('pg');

const db = knex({
    client: 'pg',
    connection: {
      connectionString : process.env.DATABASE_URL,
      ssl: true,
    }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => { res.send("its working") });
app.post('/signin', signin.handleSignin (db, bcrypt));
app.post('/register', register.handleRegister(db, bcrypt));
app.get('/profile/:id', profile.handleProfileGet(db));
app.put('/image', image.handleImage(db));
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res) })

app.listen(process.env.PORT || 3000, () => {
    console.log(`its working on port ${process.env.PORT}`);
})