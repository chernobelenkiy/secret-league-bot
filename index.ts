import dotenv from 'dotenv';
import http from 'http';

dotenv.config();

import './src/index.ts';

http.createServer((_, res) => {
  res.writeHead(200, 'ok');
}).listen(process.env.PORT || 5000);
