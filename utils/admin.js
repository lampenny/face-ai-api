const bcrypt = require("bcrypt-nodejs");
const knex = require("knex");

const db = knex({
  client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: true
    }
});

module.exports = { knex, bcrypt, db };