const Joi = require('joi'); // to check validation of an object id, we add it here so all model file can access it

module.exports = function (){
    Joi.objectId = require('joi-objectid')(Joi);
}