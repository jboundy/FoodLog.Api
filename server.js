const express = require('express');
const routes = require('./routes');
const server = express();

const PORT = process.env.PORT || 9090;
const HOST = '0.0.0.0';

server.use('/',routes);
server.listen(PORT, HOST);