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

    if (!nft || !/^[a-zA-Z\s]{1,3}$/.test(nft)) {
        res.status(400).send(
            'Please provide a valid NFT input (1 to 3 letters only)'
        );
        return;
    }
    res.status(200).sendFile(filePath);
};

const sendStyles = (req, res) => {
    res.status(200).sendFile(path.join(dir, 'public', 'style.css'));
};

const sendLetters = (req, res) => {
    res.status(200).sendFile(path.join(dir, 'public', 'letters.js'));
};

const sendSketch = (req, res) => {
    res.status(200).sendFile(path.join(dir, 'public', 'sketch.js'));
};

const mintSketch = (req, res) => {
    console.log(req.body);
    res.status(200).json("Minting");
};

module.exports = { createSketch, mintSketch, sendStyles, sendLetters, sendSketch };
