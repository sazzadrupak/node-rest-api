const asyncMiddleware = require('../middleware/async');
const validateObjectId = require('../middleware/validateObjectId');
//const log_error = require('../middleware/logger');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const {Genre, validate} = require('../models/genre');
const validator = require('../middleware/validate');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', asyncMiddleware(async (req, res, next) => {
    //log_error.errorLog.info('Could not get the genres.');

    //throw new Error('Could not get the genres.');
    const genres = await Genre.find().sort('name');
    res.send(genres);
}));


// here auth is the middleware to check the valid user jwt token
router.post('/', [auth, validator(validate)], asyncMiddleware(async (req, res) => {
    let genre = new Genre({ name: req.body.name });
    genre = await genre.save();

    res.send(genre);
}));

router.put('/:id', [auth, validateObjectId], async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
        new: true
    });

    if (!genre) return res.status(404).send('The genre with the given ID was not found.');

    res.send(genre);
});

router.delete('/:id', [auth, admin, validateObjectId], async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);

    if (!genre) return res.status(404).send('The genre with the given ID was not found.');

    res.send(genre);
});

router.get('/:id', validateObjectId, async (req, res) => {
    const genre = await Genre.findById(req.params.id);

    if (!genre) return res.status(404).send('The genre with the given ID was not found.');

    res.send(genre);
});

module.exports = router;