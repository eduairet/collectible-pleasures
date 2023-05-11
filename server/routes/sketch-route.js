'use strict';

const express = require('express'),
    { createSketch, mintSketch } = require('../controllers/sketch-controller'),
    router = express.Router();

router.route('/').get(createSketch).post(mintSketch);

module.exports = router;
