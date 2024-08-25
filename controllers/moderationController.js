// const users = await prisma.db.users (generate types) Model
// users.create({})

// service, helpers,
export function moderate(input) {
    // Sprawdzenie, czy input zawiera jakieś zakazane słowa
    const forbiddenWords = ['badword', 'anotherbadword'];

    console.log(`Input: "${input}"`);
    console.log(`Forbidden Words: ${forbiddenWords.join(', ')}`);

    const containsForbiddenWords = forbiddenWords.some((word) => {
        const isIncluded = input.includes(word);
        console.log(`Checking word "${word}": ${isIncluded}`);
        return isIncluded;
    });

    return !containsForbiddenWords;
}
console.log(moderate('This is a clean message.')); // powinno zwrócić true
console.log(moderate('This message contains badword.')); // powinno zwrócić false
console.log(moderate('Another message with anotherbadword.')); // powinno zwrócić false
