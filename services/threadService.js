import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {logger} from '../logger.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const threadsFilePath = path.join(__dirname, '../data/threads.json');

export function fetchThreads() {
    try {
        const threadsData = fs.readFileSync(threadsFilePath, 'utf-8');
        return JSON.parse(threadsData);
    } catch (error) {
        logger.error('Error reading threads file:', error);
        return [];
    }
}

export function saveThreads(threads) {
    try {
        fs.writeFileSync(threadsFilePath, JSON.stringify(threads, null, 2));
    } catch (error) {
        logger.error('Error saving threads:', error);
    }
}