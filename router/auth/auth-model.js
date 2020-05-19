const { pool } = require('../../config.js')

module.exports = {
  createUser
};


function createUser(user) {
  const queryString = `INSERT INTO users (name, email, password) VALUES ('${user.name}', '${user.email}', '${user.password}')`
  console.log(queryString)

  return pool.query(queryString)
}
