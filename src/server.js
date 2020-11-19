/* eslint-disable no-console */
const http = require('http');
const router = require('./router.js');

const server = http.createServer(router);

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`server is listining on port ${port} ready?`);
});
