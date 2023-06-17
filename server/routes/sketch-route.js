'use strict';

const express = require('express'),
    { createSketch, mintSketch, sendStyles, sendLetters, sendSketch } = require('../controllers/sketch-controller'),
    router = express.Router();

router.route('/').get(createSketch);
router.route('/mint').post(mintSketch);
router.route('/style.css').get(sendStyles);
router.route('/sketch.js').get(sendSketch);
router.route('/letters.js').get(sendLetters);

module.exports = router;
