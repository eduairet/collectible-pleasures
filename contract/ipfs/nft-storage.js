const { NFTStorage, File } = require('nft.storage'),
    mime = require('mime'),
    fs = require('fs'),
    path = require('path');

require('dotenv').config();
const { NFT_STORAGE_KEY } = process.env;

async function storeNFT(imageUrl, name, description) {
    const image = await fileFromUrl(imageUrl);
    console.log(image);
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

async function main() {
    const args = process.argv.slice(2)
    if (args.length !== 3) {
        console.error(`usage: ${process.argv[0]} ${process.argv[1]} <image-path> <name> <description>`)
        process.exit(1);
    }
    const [imageUrl, name, description] = args;
    const result = await storeNFT(imageUrl, name, description);
    console.log(result);
}

main()
    .then(() => process.exit(0))
    .catch(err => {
        console.error(err)
        process.exit(1)
    })