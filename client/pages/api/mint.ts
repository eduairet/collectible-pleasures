import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const { NEXT_PUBLIC_SERVER } = process.env;
type Data = {};
interface IPFSData {
    ipnft: string;
    url: `ipfs://${string}`;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    try {
        const requestMethod = req.method;
        if (requestMethod === 'POST') {
            const { nft } = req.body;
            if (!nft) {
                throw new Error('Fix your request and try again!');
            }
            if (NEXT_PUBLIC_SERVER) {
                const response = await axios.post(`${NEXT_PUBLIC_SERVER}/mint`,
                    { nft },
                );
                const { url }: IPFSData = response.data;
                res.status(200).json({ success: true, url });
            } else {
                throw new Error('We have problems with our server, please try again later.');
            }
        }
        else {
            res.status(200).json({ message: 'Collectible Pleasures' });
        }
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}
