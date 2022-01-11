const bcrypt = require("bcrypt-nodejs");
const knex = require("knex");

const db = knex({
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      host : '127.0.0.1',
      // user : '',
      // password : '',
      database : 'smart-brain'
    }
  });

module.exports = { knex, bcrypt, db };