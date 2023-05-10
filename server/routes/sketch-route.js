'use strict';

const express = require('express'),
    { createSketch } = require('../controllers/sketch-controller'),
    router = express.Router();

router.get('/', createSketch);

module.exports = router;
