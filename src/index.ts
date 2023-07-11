import { logEvent, errorEvent } from './eventLogger.js';
import { ServerResponse, IncomingMessage, createServer } from 'http';
import { extname, join, parse } from 'path';
import { readFile } from 'fs/promises';
import { PORT, __dirname } from './constants.js';
import { existsSync } from 'fs';
import getContentType from './getContentType.js';

const PAGES_PATH = 'views';

const serveFile = async (
  filePath: string,
  contentType: string,
  response: ServerResponse<IncomingMessage>,
) => {
  try {
    const rawData = await readFile(filePath, {
      encoding: !contentType.includes('image') ? 'utf8' : null,
    });

    const data =
      contentType === 'application/json'
        ? JSON.parse(rawData.toString())
        : rawData;

    response.writeHead(filePath.includes('404.html') ? 404 : 200, {
      'Content-Type': contentType,
    });

    response.end(
      contentType === 'application/json' ? JSON.stringify(data) : data,
    );
  } catch (err) {
    errorEvent(`${err}`);
    response.statusCode = 500;
    response.end();
  }
};

const server = createServer((req, res) => {
  const reqUrl = req.url || '/';
  const extension = extname(reqUrl);

  logEvent(`${reqUrl} | ${req.method}`);

  const contentType = getContentType(extension);

  let filePath =
    contentType === 'text/html' && reqUrl === '/'
      ? join(__dirname, PAGES_PATH, 'index.html')
      : contentType === 'text/html' && reqUrl.slice(-1) === '/'
      ? join(__dirname, PAGES_PATH, reqUrl, 'index.html')
      : contentType === 'text/html'
      ? join(__dirname, PAGES_PATH, reqUrl)
      : join(__dirname, reqUrl);

  if (!extension && reqUrl.slice(-1) !== '/') {
    filePath += '.html';
  }

  const fileExists = existsSync(filePath);

  if (fileExists) {
    serveFile(filePath, contentType, res);
  } else {
    switch (parse(filePath).base) {
      case 'old-page.html':
        res.writeHead(301, { Location: '/new-page.html' });
        res.end();
        break;
      case 'www-page.html':
        res.writeHead(301, { Location: '/' });
        res.end();
        break;
      default:
        serveFile(join(__dirname, 'views', '404.html'), 'text/html', res);
    }
  }
});

server.listen(PORT);
