const fs = require('fs');
const path = require('path');
const querystring = require('querystring');

const jsonPath = path.join(__dirname, 'dictionary.json');
const wordfilter = require('../public/js/utils');

const filterHandler = (req, res) => {
  let allData = '';
  req.on('data', (dataFrag) => {
    allData += dataFrag;
  });
  req.on('end', () => {
    //   dataprosses
    const convertedData = querystring.parse(allData);
    fs.readFile(jsonPath, (err, arr) => {
      if (err) {
        res.writeHead(500, { 'content-type': 'text/html' });
        res.write('<h1>no Data</h1>');
        res.end();
      } else {
        const newData = wordfilter(convertedData, JSON.parse(arr));
        res.writeHead(200, { 'content-type': 'application/json' });
        // eslint-disable-next-line no-console
        // console.log(newData);
        res.end(JSON.stringify(newData));
      }
    });
  });
};

module.exports = filterHandler;
