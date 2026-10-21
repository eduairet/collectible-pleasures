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

// TEMPORARY — REMOVE AFTER DEPLOY VERIFICATION
// Confirms this Vercel function is running the patched Node.js 24 line
// from the October 21, 2026 security release (24.22.1 or newer).
// Delete this route once process.version has been checked. Do not log env.
router.get('/__node_version', (_req, res) => {
    res.set('Cache-Control', 'no-store');
    res.json({ node: process.version });
});

router.route('/').get(createSketch);
router.route('/mint').post(requireInternalSecret, mintSketch);
router.route('/style.css').get(sendStyles);
router.route('/sketch.js').get(sendSketch);
router.route('/letters.js').get(sendLetters);

module.exports = router;
