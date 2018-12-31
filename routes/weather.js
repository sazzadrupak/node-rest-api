const express = require('express');
const request = require('request');
const router = express.Router();

router.get('/:address', async (req, res) => {
    let encodedAddress = encodeURIComponent(req.params.address);
    let address;
    let latitude;
    let longitude;

    await request({
        url: `http://www.mapquestapi.com/geocoding/v1/address?key=7GnxHGZFiN5ybq16MQqSn3SDEGLGTskf&location=${encodedAddress}`,
        json: true
    }, (error, response, body) => {
        //console.log(JSON.stringify(body, undefined, 4));
        if(error){
            res.status(400).send('Unable to connect to google server.')
        } else if(body.status === 'ZERO_RESULTS'){
            res.status(400).send('Unable to find the address');
        } else if(body.status === 'OK'){
            res.send({
                address: body.results[0].providedLocation.location,
                latitude: body.results[0].locations[0].latLng.lat,
                longitude: body.results[0].locations[0].latLng.lng
            });
        }
        address = body.results[0].providedLocation.location;
        latitude = body.results[0].locations[0].latLng.lat;
        longitude = body.results[0].locations[0].latLng.lng;

        let url = `https://api.darksky.net/forecast/cbcc13b2dcbdcb1642341389b83900cd/${latitude},${longitude}`;
        request({
            url: url,
            json: true
        }, (error, response, body) => {
            if(!error && response.statusCode === 200){
                res.send({
                    address: address,
                    latitude: latitude,
                    longitude: longitude,
                    temperature: body.currently.temperature,
                    apparentTemperature: body.currently.apparentTemperature
                });
            } else {
                res.status(500).send('Unable to connect to Forecast.io server');
            }
        });
    });
});

module.exports = router;