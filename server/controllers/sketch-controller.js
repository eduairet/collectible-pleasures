'use strict';

const path = require('path'),
    dir = path.dirname(__dirname),
    filePath = path.join(dir, 'public', 'sketch.html');

const createSketch = (req, res) => {
    if (!Object.keys(req.query)) {
        res.status(200).send('Write a query to generate your art');
        return;
    }

    const { nft } = req.query;

    if (!nft || !/^[a-zA-Z]{1,3}$/.test(nft)) {
        res.status(400).send(
            'Please provide a valid NFT input (1 to 3 letters only)'
        );
        return;
    }
    res.status(200).sendFile(filePath);
};

const mintSketch = (req, res) => {
    res.status(200).send('minting');
};

module.exports = { createSketch, mintSketch };
