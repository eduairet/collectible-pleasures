import { IPFSHTTPClient } from 'ipfs-http-client';

async function run(imageCIDPath: string): Promise<void> {
    const { create } = await import('ipfs-http-client');
    const ipfs: IPFSHTTPClient = create();

    const metadata = {
        path: '/',
        content: JSON.stringify({
            name: "Collectible Pleasures",
            attributes: [
                {
                    "trait_type": "Joy Division",
                    "value": "10000"
                },
                {
                    "trait_type": "Unknown Pleasures",
                    "value": "1000"
                },
                {
                    "trait_type": "Generative Type",
                    "value": "1000"
                },
                {
                    "trait_type": "P5.js",
                    "value": "500"
                },
            ],

            image: imageCIDPath,
            description: "Collectible Pleasures NFT"
        })
    };

    const result = await ipfs.add(metadata);
    console.log(result);

    process.exit(0);
}

run(process.argv[2]);
// run('QmY9JMmQFbv5z3YkjK9zqfHxYzZg3YkjKs3V7ZJ4xvK7'];