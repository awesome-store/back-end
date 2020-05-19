const router = require('express').Router();
const { pool } = require('../../config.js')



const createUser = (request, response) => {
    const { name, email, password } = request.body
    pool.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)', [name, email, password], error => {
        if (error) {
        throw error
        }
        response.status(201).json({ status: 'success', message: 'User added' })
    })
}

router
  .route('/create')
  .post(createUser)

module.exports = router;