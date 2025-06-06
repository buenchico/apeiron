const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    let filePath = req.url === '/' ? 'public/index.html' : `public${req.url}`;
    filePath = path.join(__dirname, filePath);

    // Determine content type
    let contentType = 'text/html';
    if (req.url.endsWith('.css')) contentType = 'text/css';
    else if (req.url.endsWith('.js')) contentType = 'application/javascript';
    else if (req.url.endsWith('.png')) contentType = 'image/png';
    else if (req.url.endsWith('.jpg')) contentType = 'image/jpeg';

    // Read and serve the file
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
