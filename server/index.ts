import { createServer } from 'http'
import { parse } from 'url'
import next from 'next'
import heapdump from 'heapdump';

const port = parseInt(process.env.PORT || '3000', 10)
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url!, true)
    const { pathname, query } = parsedUrl

    if (pathname === '/a') {
      app.render(req, res, '/a', query)
    } else if (pathname === '/b') {
      app.render(req, res, '/b', query)
    } else if (pathname === '/___heapdump') {
      heapdump.writeSnapshot((_err, filename: string | undefined) => {
        console.log('dump written to', filename);
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write('OK');
        res.end();
      });
      return true;
    } else {
      handle(req, res, parsedUrl)
    }
  }).listen(port)

  // tslint:disable-next-line:no-console
  console.log(
    `> Server listening at http://localhost:${port} as ${
      dev ? 'development' : process.env.NODE_ENV
    }`
  )
})
