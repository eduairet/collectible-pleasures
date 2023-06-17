'use strict';

const { NFTStorage, File } = require('nft.storage'),
    path = require('path');

require('dotenv').config();
const { NFT_STORAGE_KEY } = process.env;

async function storeNFT(imageUrl, name, description) {
    const image = await fileFromUrl(imageUrl);
    const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY })
    return nftstorage.store({
        image,
        name,
        description,
    })
}

async function fileFromUrl(url) {
    const response = await fetch(url),
        content = await response.blob(),
        fileName = path.basename(url);
    return new File([content], fileName, { type: 'image/gif' });
}

module.exports = { storeNFT };