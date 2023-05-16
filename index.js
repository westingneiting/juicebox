const PORT = 3000;
const express = require('express');
const server = express();
const morgan = require('morgan');
const apiRouter = require('./api');
server.use(morgan('dev'));
server.use('/api', apiRouter);
server.use(express.json())

const { client } = require('./db');
client.connect();

server.listen(PORT, () => {
  console.log('The server is up on port', PORT)
});
