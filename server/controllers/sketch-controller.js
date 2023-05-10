'use strict';

const path = require('path');

const createSketch = (req, res) => {
    const { nft } = req.query;

    if (!nft || !/^[a-zA-Z]{1,3}$/.test(nft)) {
        res.status(400).send(
            'Please provide a valid NFT input (1 to 3 letters only)'
        );
        return;
    }

    const dir = path.dirname(__dirname),
        filePath = path.join(dir, 'public', 'sketch.html');
    res.status(200).sendFile(filePath);
};

module.exports = { createSketch };
