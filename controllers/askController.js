import { moderate } from '../services/moderationService.js';
import { getAssistantResponse } from '../services/assistantService.js';
import { parseJsonBody } from '../helpers/parseJSONBody.js';
import { logger } from '../logger.js';


export async function handleAsk(req, res) {
    try {
        const body = await parseJsonBody(req);
        if (typeof body.question !== 'string') {
            logger.error('Invalid question format:', body.question);
        }
        logger.info('Request Body:', body);

        const isSafe = moderate(body.question);
        logger.info(
            `Moderation result for question "${body.question}": ${isSafe}`
        );

        if (!isSafe) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            return res.end(
                JSON.stringify({
                    error: 'Your input was flagged by moderation.',
                })
            );
        }

        const threadId = body.threadId || 'default';
        const response = getAssistantResponse(threadId, body.question);
        logger.info('Assistant Response:', response);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ answer: response }));
    } catch (err) {
        logger.error('Error parsing JSON:', err);
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Invalid JSON format.' }));
    }
}
