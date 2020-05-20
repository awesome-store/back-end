const { pool } = require('../../config.js')

module.exports = {
  createUser,
  find,
  findBy,
  findByName
};


function createUser(user) {
  const queryString = `INSERT INTO users (name, email, password) VALUES ('${user.name}', '${user.email}', '${user.password}')`

  return pool.query(queryString)
}

function find() {
  return pool.query('SELECT * FROM users');
}

function findByName(name) {
  return pool.query(`SELECT * FROM users WHERE name = '${name}'`);
}

function findBy(parameter, filter) {
  return pool.query(`SELECT * FROM users WHERE ${parameter} = ${filter}`);
}