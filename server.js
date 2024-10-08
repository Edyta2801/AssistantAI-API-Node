import http from 'http';
import url from 'url';
import { handleAsk } from './controllers/askController.js';
import { handleMain } from './controllers/mainController.js';
import { handleNewThread } from './controllers/newThreadController.js';
import { handleFetchThreads } from './controllers/threadController.js';
import { logger } from './logger.js';

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    logger.info(`Request URL: ${req.url}`);
    logger.info(`Request Method: ${req.method}`);

    if (req.method === 'POST' && parsedUrl.pathname === '/api/ask') {
        return handleAsk(req, res);
    } else if (req.method === 'POST' && parsedUrl.pathname === '/api/new-thread') {
        return handleNewThread(req, res);
    } else if (req.method === 'GET' && parsedUrl.pathname === '/api/threads') {
        return handleFetchThreads(req, res);
    } else if (parsedUrl.pathname === '/') {
        return handleMain(req, res);
    } else {
        logger.error('404 Not Found');
        res.writeHead(404, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Not Found' }));
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});
