require('express-async-errors');
const winston = require('winston');
//require('winston-mongodb');

module.exports = function () {
    // Handel uncaughtException with winston
    winston.handleExceptions(
        new winston.transports.Console({ colorize: true, prettyPrint: true }),
        new winston.transports.File({ filename: 'uncaughtExceptions.log' })
    );

// handle unhandled rejection using winston
    process.on('unhandledRejection', (ex) => {
        throw ex;  // this will throw an unhandled rejection and above winston.handleExceptions code will catch it
    });

    winston.add(winston.transports.File, { filename: 'logfile.log'});
    //winston.add(winston.transports.MongoDB, {
    //    db: 'mongodb://localhost/vidly',
    //    level: 'info'
    //});
}