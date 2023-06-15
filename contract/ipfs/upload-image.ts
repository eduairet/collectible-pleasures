import { IPFSHTTPClient } from 'ipfs-http-client';
import { CID } from 'multiformats/src/cid';
import { Mtime } from 'ipfs-unixfs/src/index';

export interface AddResult {
    cid: CID
    size: number
    path: string
    mode?: number
    mtime?: Mtime
}

async function run(): Promise<void> {
    const { create } = await import('ipfs-http-client');
    const ipfs: IPFSHTTPClient = create();
    const imageUrl: string = 'https://raw.githubusercontent.com/eduairet/collectible-pleasures-generator/master/gifs/EAT.gif';
    const imageBuffer: ArrayBuffer = await (await fetch(imageUrl)).arrayBuffer();
    const image: Uint8Array = new Uint8Array(imageBuffer);
    const imageCID: AddResult = await ipfs.add(image);
    console.log(imageCID);
    process.exit(0);
}

run();