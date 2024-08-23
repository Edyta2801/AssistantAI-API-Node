import {moderate} from'./moderationController.js ';
import {getAssistantResponse} from './assistantController.js';

// JSON parsing helper function
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

export async function handleAsk(req, res) {
    try {
        const body = await parseJsonBody(req);
        if (typeof body.question !== 'string') {
            console.error('Invalid question format:', body.question);
        }
        console.log('Request Body:', body);

        const isSafe = moderate(body.question);
        console.log(`Moderation result for question "${body.question}": ${isSafe}`);

        if (!isSafe) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: 'Your input was flagged by moderation.' }));
        }

        const threadId = body.threadId || 'default';
        const response = getAssistantResponse(threadId, body.question);
        console.log('Assistant Response:', response);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ answer: response }));
    } catch (err) {
        console.error('Error parsing JSON:', err);
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Invalid JSON format.' }));
    }
}
