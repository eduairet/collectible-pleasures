async function run(url: string): Promise<void> {
    const { create } = await import('ipfs-http-client');
    const ipfs = create();

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

            image: url,
            description: "Collectible Pleasures NFT"
        })
    };

    const result = await ipfs.add(metadata);
    console.log(result);

    process.exit(0);
}

run('');