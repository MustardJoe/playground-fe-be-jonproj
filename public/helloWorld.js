const http = require('http');
const fs = require('fs');

function serveStaticFiles(res, path, contentType, responseCode) {
  if(!responseCode) responseCode = 200;
  fs.readFile(__dirname + path, function(err, data) {
    if(err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('500 - Internal Error');
    }
    else {
      res.writeHead(responseCode, { 'Content-Type': contentType });
      res.end(data);
    }
  });
}

http.createServer(function(req, res) {
  let path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();
  switch(path) {
    case '':
      serveStaticFiles(res, '/index.html', 'text/html');
      break;
    case '/about':
      serveStaticFiles(res, '/src/GodzJon_printSize_sticker1.jpg', 'image/jpeg');
      break;
  }
}).listen(7890);

// eslint-disable-next-line no-console
console.log('Server started on port 7890');
