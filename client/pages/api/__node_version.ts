// TEMPORARY — REMOVE AFTER DEPLOY VERIFICATION
// Confirms this Vercel function is running the patched Node.js 24 line
// from the October 21, 2026 security release (24.22.1 or newer).
// Delete this file once process.version has been checked. Do not log env.
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
    res.setHeader('Cache-Control', 'no-store');
    res.status(200).json({ node: process.version });
}
