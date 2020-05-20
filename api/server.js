const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const passport = require('passport');

const passportService = require('../router/auth/passport.js');
const authentication = require('../router/auth/authentication.js');
const books = require('../router/books.js');
const auth = require('../router/auth/auth-router.js');


const logger = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] Was method "${req.method}" to address "${req.path}"`);
    next();
}
const requireAuth = passport.authenticate('jwt', {session: false})

const server = express();

server.use(helmet());
server.use(cors());
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))
server.use(logger);


server.get('/', (req, res) => {
    res.send("It's alive!");
  });


server.use('/books', requireAuth, books);
server.use('/auth', auth);
// server.use('/att', authentication);


module.exports = server;