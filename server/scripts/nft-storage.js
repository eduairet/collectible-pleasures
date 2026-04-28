'use strict';

require('dotenv').config();
const { PINATA_JWT } = process.env;

const PINATA_API = 'https://api.pinata.cloud';

async function storeNFT(imageUrl, name, description) {
    if (!PINATA_JWT) throw new Error('PINATA_JWT is not set');

    const imageRes = await fetch(imageUrl);
    if (!imageRes.ok) {
        throw new Error(`Failed to fetch image (${imageRes.status}) from ${imageUrl}`);
    }
    const imageBlob = await imageRes.blob();
    const fileName = imageUrl.split('/').pop();

    const imageForm = new FormData();
    imageForm.append('file', imageBlob, fileName);
    imageForm.append('pinataMetadata', JSON.stringify({ name: fileName }));

    const pinFile = await fetch(`${PINATA_API}/pinning/pinFileToIPFS`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${PINATA_JWT}` },
        body: imageForm,
    });
    if (!pinFile.ok) {
        throw new Error(`Pinata image upload failed (${pinFile.status}): ${await pinFile.text()}`);
    }
    const { IpfsHash: imageCid } = await pinFile.json();

    const metadata = {
        name,
        description,
        image: `ipfs://${imageCid}`,
    };

    const pinJson = await fetch(`${PINATA_API}/pinning/pinJSONToIPFS`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${PINATA_JWT}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            pinataContent: metadata,
            pinataMetadata: { name: `${name}-metadata.json` },
        }),
    });
    if (!pinJson.ok) {
        throw new Error(`Pinata metadata upload failed (${pinJson.status}): ${await pinJson.text()}`);
    }
    const { IpfsHash: metadataCid } = await pinJson.json();

    return {
        ipnft: metadataCid,
        url: `ipfs://${metadataCid}`,
    };
}

module.exports = { storeNFT };
