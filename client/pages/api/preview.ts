// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {};
const { NEXT_PUBLIC_SERVER } = process.env;

console.log(NEXT_PUBLIC_SERVER);

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    try {
        const { nft } = req.query;
        if (NEXT_PUBLIC_SERVER && nft) {
            const previewURL = `${NEXT_PUBLIC_SERVER}?nft=${nft}`;
            console.log(previewURL);
            const response = await fetch(`${NEXT_PUBLIC_SERVER}?nft=${nft}`);
            console.log(response);
            res.status(200).send(response);
        } else {
            throw new Error('API URL is not working');
        }
    } catch (error) {
        res.status(500).json({
            error: 'There was an error with your request, reload the page and try again.',
        });
    }
}
