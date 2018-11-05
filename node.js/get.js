const http = require('http');

const hostname= '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {

    http.get(`http://www.google.fr/search?q=${req.url.substr(1)}`, response => {
        response.setEncoding('utf8');
        let rawData = '';
        response.on('data', chunk => {
            rawData += chunk;
        })
        response.on('end', () => {
            console.log('getdata : ', rawData)
            res.end(rawData)
        })
    })
    console.log(Object.keys(req))
    req.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World\n');
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
});