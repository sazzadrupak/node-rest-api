const winston = require('winston');
require('winston-mongodb');
const path = require('path');

// Set this to whatever, by default the path of the script.
const logPath = 'logs';

const tsFormat = () => (new Date().toISOString());

const errorLog = winston.createLogger({
    transports: [
        new winston.transports.File({
            filename: path.join(logPath, 'errors.log'),
            timestamp: tsFormat,
            level: 'info'})
    ]
});

const accessLog = winston.createLogger({
    transports: [
        new winston.transports.File({
            filename: path.join(logPath, 'access.log'),
            timestamp: tsFormat,
            level: 'info'})
    ]
});

const db_logger = winston.createLogger({
    transports: [
        new winston.transports.MongoDB({
            db: 'mongodb://localhost/vidly',
            collection: 'log',
            level: 'info',
            storeHost: true,
            capped: true,
        })
    ]
});


module.exports = {
    errorLog: errorLog,
    accessLog: accessLog,
    db_logger: db_logger
};