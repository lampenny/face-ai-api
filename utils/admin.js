const bcrypt = require("bcrypt-nodejs");
const knex = require("knex");

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

const db = knex({
  client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL
    },
    ssl: {
      rejectUnauthorized: false,
    }
});

module.exports = { knex, bcrypt, db };