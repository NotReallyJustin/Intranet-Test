const http = require("http");

const server = http.createServer((request, response) => {
    const textToSend = "Houston, HTTPS is online.";

    response.writeHead(200, {
        'content-length': Buffer.byteLength(textToSend),
        'content-type': 'text/plain'
    });

    response.end(textToSend);
});

server.listen(80);