// TEMPORARY: delete after reading process.version on the deploy.
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
    res.setHeader('Cache-Control', 'no-store');
    res.json({ node: process.version });
}
