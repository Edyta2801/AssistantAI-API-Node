import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {logger} from '../logger.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function getAssistantResponse(threadId, userInput) {
   logger.info(
        `Received request for threadId: ${threadId} and userInput: ${userInput}`
    );

    const threads = JSON.parse(
        fs.readFileSync(path.join(__dirname, '../data/threads.json'))
    );
    const messages = JSON.parse(
        fs.readFileSync(path.join(__dirname, '../data/messages.json'))
    );

    let thread = threads.find((t) => t.public_id === threadId);
    if (!thread) {
        logger.warn('Thread not found, creating a new one.');
        thread = {
            public_id: threadId,
            openai_thread_id: `thread_${Math.random().toString(36).substring(7)}`,
            created_at: new Date().toISOString(),
        };
        threads.push(thread);
        fs.writeFileSync(
            path.join(__dirname, '../data/threads.json'),
            JSON.stringify(threads, null, 2)
        );
    }

    // Create assistence message
    const assistantMessage = {
        public_id: `msg_${Math.random().toString(36).substring(7)}`,
        content: `Simulated response to "${userInput}"`,
        role: 'ASSISTANT',
        thread_id: thread.public_id,
        created_at: new Date().toISOString(),
    };
    messages.push(assistantMessage);
    fs.writeFileSync(
        path.join(__dirname, '../data/messages.json'),
        JSON.stringify(messages, null, 2)
    );

    logger.info('Assistant response generated:', assistantMessage.content);
    return assistantMessage.content;
}
