'use strict';

const express = require('express'),
    { createSketch, mintSketch, sendStyles, sendLetters, sendSketch } = require('../controllers/sketch-controller'),
    router = express.Router();

const requireInternalSecret = (req, res, next) => {
    const expected = process.env.INTERNAL_API_SECRET;
    if (!expected || req.get('x-internal-secret') !== expected) {
        return res.status(403).json({ error: 'Forbidden' });
    }
    next();
};

router.route('/').get(createSketch);
router.route('/mint').post(requireInternalSecret, mintSketch);
router.route('/style.css').get(sendStyles);
router.route('/sketch.js').get(sendSketch);
router.route('/letters.js').get(sendLetters);

module.exports = router;
