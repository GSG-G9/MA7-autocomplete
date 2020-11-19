const fs = require('fs');
const path = require('path');
const filterHandler = require('./habdler');

const extentions = {
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.html': 'text/html',
  '.png': 'image/png',
};

// const pathFile = path.join(__dirname, 'words.txt');
// const pathFileJSON = path.join(__dirname, 'dictionary.json');
// const arr = [];

// fs.readFile(pathFile, 'utf8', (err, data) => {
//   if (err) {
//     throw err;
//   }
//   const myData = data.split('\n');
//   // myData.forEach((item) => arr.push(item));

//   fs.writeFile(pathFileJSON, JSON.stringify(myData, null, 2), (err) => {
//     if (err) {
//       throw err;
//     }
//   });
// });

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
  } else if (endPoint === '/frag' && reqMethod === 'POST') {
    filterHandler(request, response);
  } else {
    response.writeHead(404, { 'content-type': 'text/html' });
    response.end('<h1>404</h1>');
  }
};

module.exports = router;
