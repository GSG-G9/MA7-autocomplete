const fs = require('fs');
const path = require('path');

const extentions = {
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.html': 'text/html',
};

const router = (request, response) => {
  const endPoint = request.url;
  const reqMethod = request.method;
  // console.log(reqMethod);
  const ext = path.extname(endPoint);
  if (endPoint === '/' && reqMethod === 'GET') {
    const filePath = path.join(__dirname, '..', 'public', 'index.html');
    // eslint-disable-next-line no-console
    console.log(filePath);
    fs.readFile(filePath, (err, file) => {
      if (err) {
        response.writeHead(500, { 'content-type': 'text/html' });
        response.write('<h1> server error</h1>');
        response.end();
      } else {
        response.writeHead(200, { 'content-type': 'text/html' });
        response.end(file);
      }
    });
  } else if (ext) {
    const filePath = path.join(__dirname, '..', 'public', endPoint);
    fs.readFile(filePath, (err, file) => {
      if (err) {
        response.writeHead(500, { 'content-type': 'text/html' });
        response.write('<h1> server error</h1>');
        response.end();
      } else {
        response.writeHead(200, { 'content-type': extentions[ext] });
        response.end(file);
      }
    });
  } else {
    response.writeHead(404, { 'content-type': 'text/html' });
    response.end('<h1>404</h1>');
  }
};

module.exports = router;
