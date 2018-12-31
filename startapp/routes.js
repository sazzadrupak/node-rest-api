const express = require('express');
const genres = require('../routes/genres');
// const home = require('../routes/home');
const customers = require('../routes/customers');
const movies = require('../routes/movies');
const rentals = require('../routes/rentals');
const users = require('../routes/users');
const weather = require('../routes/weather');
const auth = require('../routes/auth');
const returns = require('../routes/returns');
const error = require('../middleware/error');

module.exports = function (app) {
    //app.use('/', home);
    app.use(express.json());
    app.use('/api/genres', genres);
    app.use('/api/customers', customers);
    app.use('/api/movies', movies);
    app.use('/api/rentals', rentals);
    app.use('/api/users', users);
    app.use('/api/weather', weather);
    app.use('/api/auth', auth);
    app.use('/api/returns', returns);

    app.use(express.urlencoded({ extended: true }));

    app.use(error);
};
