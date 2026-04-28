import type { NextApiRequest, NextApiResponse } from 'next';

const ALCHEMY_HOSTS: Record<string, string> = {
    polygon: 'https://polygon-mainnet.g.alchemy.com/v2/',
    sepolia: 'https://eth-sepolia.g.alchemy.com/v2/',
};

const KEYS: Record<string, string | undefined> = {
    polygon: process.env.POLYGON_KEY,
    sepolia: process.env.SEPOLIA_KEY,
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).end();
    }

    const chain = String(req.query.chain);
    const host = ALCHEMY_HOSTS[chain];
    const key = KEYS[chain];
    if (!host || !key) {
        return res.status(404).json({ error: 'Unknown chain' });
    }

    try {
        const upstream = await fetch(`${host}${key}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body),
        });
        const text = await upstream.text();
        res.status(upstream.status)
            .setHeader('Content-Type', 'application/json')
            .send(text);
    } catch (err) {
        console.error('RPC proxy failed:', err);
        res.status(502).json({ error: 'Bad gateway' });
    }
}
