const fs = require('fs');
const path = require('path');
const queryString = require('querystring');

const wordFilter = require('./utils');

const extentions = {
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.html': 'text/html',
  '.png': 'image/png',
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
  } else if (endPoint.includes('/search')) {
    const searchText = queryString.parse(endPoint.split('?')[1]);
    const pathFile = path.join(__dirname, 'dictionary.json');
    fs.readFile(pathFile, 'utf8', (err, data) => {
      if (err) {
        response.writeHead(500, { 'content-type': 'application/json' });
        response.end(JSON.stringify(err));
      } else {
        const arrOfWords = JSON.parse(data);
        let searchResult = wordFilter(searchText.text, arrOfWords).splice(0, 50);
        if (searchText.text === '') {
          searchResult = [];
        }
        response.writeHead(200, { 'content-type': 'application/json', Location: '/' });
        // response.writeHead(302, { Location: '/' });
        response.end(JSON.stringify(searchResult));
      }
    });
  } else {
    response.writeHead(404, { 'content-type': 'text/html' });
    response.end('<h1>404</h1>');
  }
};

module.exports = router;
