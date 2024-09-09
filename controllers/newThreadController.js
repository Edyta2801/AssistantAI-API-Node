import { createNewThread } from '../models/threadModel.js';
import {logger} from '../logger.js'

export function handleNewThread(req, res) {
    if (req.method !== 'POST') {
        res.writeHead(405, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Method Not Allowed' }));
    }

    const newThread = createNewThread();
    logger.info('New thread created:', newThread);

    res.writeHead(201, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(newThread));
}