export function handleMain(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    return res.end('<h1>Welcome to the API Server</h1>');
}
