const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const knex = require("knex");

// const Pool = require("pg").Pool;

// let pool;
// if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
//   pool = new Pool({
//     host: "127.0.0.1",
//     user: "Penny",
//     password: "",
//     port: process.env.PORT,
//     database: "smart-brain",
//   });
// } else {
//   pool = new Pool({
//     connectionString: process.env.DATABASE_URL,
//     ssl: {
//       required: true,
//       rejectUnauthorized: false,
//     },
//     sslmode: "require",
//   });
// }



//  DEVELOPMENT ONLY - check database
// db.select('*').from('users').then(data => {
//   console.log(data);
// })

module.exports = { knex, bcrypt, express };
//add pool