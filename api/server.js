const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const logger = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] Was method "${req.method}" to address "${req.path}"`);
    next();
}

const server = express();


server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(logger);

server.get('/', (req, res) => {
    res.send("It's alive!");
  });
  

module.exports = server;