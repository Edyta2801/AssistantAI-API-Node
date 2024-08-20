const http = require("http");
const url = require('url');
const assistantController = require('./controllers/assistantController');
const moderationController = require('./controllers/moderationController');


// Funkcja pomocnicza do parsowania JSON
function parseJsonBody(req) {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                const json = JSON.parse(body);
                resolve(json);
            } catch (err) {
                reject(err);
            }
        });
    });
}


const server = http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    console.log(`Request URL: ${req.url}`);
    console.log(`Request Method: ${req.method}`);

    if (req.method === 'POST' && parsedUrl.pathname === '/api/ask') {
        try {
            const body = await parseJsonBody(req);
            if (typeof body.question !== 'string') {
                console.error('Invalid question format:', body.question);
              }
            console.log('Request Body:', body);

            const isSafe = moderationController.moderate(body.question);
            console.log(`Moderation result for question "${body.question}": ${isSafe}`);

            if (!isSafe) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: 'Your input was flagged by moderation.' }));
            }

            const threadId = body.threadId || 'default';
            const response = assistantController.getAssistantResponse(threadId, body.question);
            console.log('Assistant Response:', response);

            res.writeHead(200, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ answer: response }));
        } catch (err) {
            console.error('Error parsing JSON:', err);
            res.writeHead(400, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: 'Invalid JSON format.' }));
        }
    } else if (parsedUrl.pathname === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        return res.end('<h1>Welcome to the API Server</h1>');
    } else {
        console.log('404 Not Found');
        res.writeHead(404, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Not Found' }));
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});