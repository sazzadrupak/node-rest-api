const winston = require('winston');
const express = require('express');
const app = express();


require('./startapp/logging')();
require('./startapp/routes')(app);
require('./startapp/db')();
require('./startapp/config')();
require('./startapp/validation')();

//mongoose.connection.close();

const port = process.env.PORT || 3000;
const server = app.listen(port, () => winston.info(`Listening to port ${port}...`));
module.exports = server;