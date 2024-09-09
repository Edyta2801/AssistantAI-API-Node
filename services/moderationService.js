import {logger} from '../logger.js'

export function moderate(input) {
    // Checking whether the input contains any prohibited words
    const forbiddenWords = ['badword', 'anotherbadword'];

    logger.info(`Input: "${input}"`);
    logger.warn(`Forbidden Words: ${forbiddenWords.join(', ')}`);

    const containsForbiddenWords = forbiddenWords.some((word) => {
        const isIncluded = input.includes(word);
        logger.warn(`Checking word "${word}": ${isIncluded}`);
        return isIncluded;
    });

    return !containsForbiddenWords;
}
logger.info(moderate('This is a clean message.')); // should return true
logger.info(moderate('This message contains badword.')); // should return false
logger.info(moderate('Another message with anotherbadword.')); // should return false
