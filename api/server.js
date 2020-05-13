const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { pool } = require('../config')

const logger = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] Was method "${req.method}" to address "${req.path}"`);
    next();
}

const server = express();

server.use(helmet());
server.use(cors());
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))
server.use(logger);


const getBooks = (request, response) => {
  pool.query('SELECT * FROM test_table', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const addBook = (request, response) => {
  const { author, title } = request.body

  pool.query('INSERT INTO test_table (author, title) VALUES ($1, $2)', [author, title], error => {
    if (error) {
      throw error
    }
    response.status(201).json({ status: 'success', message: 'Book added.' })
  })
}

server.get('/', (req, res) => {
    res.send("It's alive!");
  });

server
  .route('/books')
  // GET endpoint
  .get(getBooks)
  // POST endpoint
  .post(addBook)
  

module.exports = server;