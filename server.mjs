const express = import('express');
const bodyParser = import('body-parser');
const bcrypt = import('bcrypt');
const cors = import('cors');
const knex = import('knex');

const register = import('./controllers/register');
const signin = import('./controllers/signin');
const profile = import('./controllers/profile');
const image = import('./controllers/image');
const { DatabaseError } = import('pg');

const db = knex({
    client: 'pg',
    connection: {
      connectionString : process.env.DATABASE_URL,
      ssl: true
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