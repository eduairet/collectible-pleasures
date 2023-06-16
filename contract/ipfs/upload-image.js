async function run() {
    const path = require('path');
    const { create } = await import('ipfs-core');

    const ipfs = await create();

    const imageUrl = 'https://raw.githubusercontent.com/eduairet/collectible-pleasures-generator/master/gifs/EAT.gif';
    const filename = path.basename(imageUrl);
    const imageBuffer = getFileContentById(imageUrl);
    const image = new Uint8Array(imageBuffer);
    const imageCID = await ipfs.add(image);
    const gateway = 'https://ipfs.io/ipfs/'
    console.log(imageCID);
    console.log(`${gateway}${imageCID.path}/?filename=${filename}`);
    process.exit(0);
}

async function getFileContentById(
    downloadUrl
) {
    const axios = require('axios');
    const response = await axios.get(downloadUrl, {
        responseType: "arraybuffer",
    });
    return Buffer.from(response.data, "base64");
}

run();