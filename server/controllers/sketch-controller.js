'use strict';

const path = require('path'),
    { storeNFT } = require('../scripts/nft-storage'),
    dir = path.dirname(__dirname),
    filePath = path.join(dir, 'public', 'sketch.html');

require('dotenv').config();
const { NFT_STORAGE_KEY } = process.env;

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

const mintSketch = async (req, res) => {
    const { nft } = req.body;
    if (!nft || !/^[a-zA-Z\s]{3}/.test(nft)) {
        res.status(400).send('Please provide a correct NFT name!');
        return;
    }
    const fnft = nft.toLowerCase().replace(/\s/g, '0');
    const baseUrl = 'https://raw.githubusercontent.com/eduairet/collectible-pleasures-generator/master/gifs/'
    const imageUrl = path.join(baseUrl, `${fnft}.gif`);
    try {
        const { ipnft, url } = await storeNFT(imageUrl, nft, `Collectible Pleasures: ${nft}`);
        res.status(200).json({ ipnft, url });
    } catch (error) {
        res.status(500).json({ error: 'We couldn\'t store your NFT on IPFS, please try later!' });
    }
};

module.exports = { createSketch, mintSketch, sendStyles, sendLetters, sendSketch };
