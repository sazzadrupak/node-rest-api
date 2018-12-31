const Joi = require('joi');
const validate = require('../middleware/validate');
const {Rental} = require('../models/rental');
const {Movie} = require('../models/movie');
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();

router.post('/', [auth, validate(validateReturns)], async (req, res, next) => {
    const rental = await Rental.lookup(req.body.customerId, req.body.movieId);  // STATIC METHOD, you can find it inside rental model
    if(!rental) return res.status(404).send('No rental found');

    if(rental.dateReturned) return res.status(400).send('Already processed');

    rental.return();
    await rental.save();

    await Movie.update({_id: rental.movie._id}, { $inc: {numberInStock: 1}});

    return res.status(200).send(rental);
});

function validateReturns(req) {  // don't use async on validate function
    const schema = {
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required(),
    };

    return Joi.validate(req, schema);
}

module.exports = router;