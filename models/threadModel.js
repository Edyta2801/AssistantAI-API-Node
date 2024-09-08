import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const threadsFilePath = path.join(__dirname, '../data/threads.json');

// reading existing threads
export function fetchThreads() {
    try {
        const threadsData = fs.readFileSync(threadsFilePath, 'utf-8');
        return JSON.parse(threadsData);
    } catch (error) {
        console.error('Error reading threads file:', error);
        return [];
    }
}

// writing threads to file
export function saveThreads(threads) {
    try {
        fs.writeFileSync(threadsFilePath, JSON.stringify(threads, null, 2));
    } catch (error) {
        console.error('Error saving threads:', error);
    }
}

// create new thread
export function createNewThread() {
    const newThread = {
        _id: { $oid: generateObjectId() },
        public_id: generatePublicId(),
        openai_thread_id: `thread_${Math.random().toString(36).substring(7)}`,
        created_at: new Date().toISOString(),
    };

    const threads = fetchThreads();
    threads.push(newThread);
    saveThreads(threads);

    return newThread;
}

// generate random Id
function generateObjectId() {
    return Math.random().toString(36).substring(2, 24); // Generowanie przykładowego ObjectId
}

// generate random Public ID
function generatePublicId() {
    return `${Math.random().toString(36).substring(2)}-${Math.random().toString(36).substring(2)}`;
}