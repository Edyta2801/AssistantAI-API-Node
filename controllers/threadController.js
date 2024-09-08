import { fetchThreads } from '../services/threadService.js';

export function handleFetchThreads(req, res) {
    if (req.method !== 'GET') {
        res.writeHead(405, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Method Not Allowed' }));
    }

    const threads = fetchThreads();
    console.log('Fetched threads:', threads);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(threads));
}