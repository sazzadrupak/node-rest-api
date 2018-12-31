const express = require('express');
const router = express.Router();

// 2 arguments
router.get('/', (req, res) => {
    // res.send('Hello World!!!'); for RESTful API
    res.render('index', { title: 'My express app', message: 'Hello' });  // to give a view to client
});

router.get('/api/query_parameter', (req, res) => {
    res.send(req.query);
});

module.exports = router;