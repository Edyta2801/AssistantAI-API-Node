import { fetchThreads, saveThreads } from '../services/threadService.js';

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

function generateObjectId() {
    return Math.random().toString(36).substring(2, 24); 
}

function generatePublicId() {
    return `${Math.random().toString(36).substring(2)}-${Math.random().toString(36).substring(2)}`;
}