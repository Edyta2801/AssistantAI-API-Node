const http = require('http');

const requestHandler = (req, res) => {
  if (req.method === 'GET' && req.url === '/api/assistant') {
 
    const assistantResponse = {
      message: "Hello, how can I assist you today?",
      status: "success"
    };

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(assistantResponse));
  } else if (req.method === 'POST' && req.url === '/api/moderation') {
    
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      const requestBody = JSON.parse(body);
     
      const moderationResponse = {
        message: "Content received and moderated.",
        status: "success",
        content: requestBody
      };

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(moderationResponse));
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
};

const server = http.createServer(requestHandler);
// const server = http.createServer((req, res)=>{});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
