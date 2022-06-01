const dotenv = require('dotenv');
const http = require('http');

dotenv.config();

require('./bots');

http.createServer((_, res) => {
  res.writeHead(200, 'ok');
}).listen(process.env.PORT || 5000);
