/**
 * Flui Generic Template — minimal Node.js HTTP server.
 * Zero dependencies, easy to customize.
 */

import { createServer } from 'node:http';

const PORT = parseInt(process.env.PORT ?? '3000', 10);
const APP_NAME = process.env.APP_NAME ?? 'Flui Demo Generic';
const APP_VERSION = process.env.APP_VERSION ?? '1.0.0';
const START_TIME = Date.now();

const homeHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${APP_NAME}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #0a0a0f; color: #e8e8ed; min-height: 100vh;
    }
    a { color: #4f9eff; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .page { max-width: 800px; margin: 0 auto; padding: 4rem 2rem; }
    .badge {
      display: inline-block; padding: 0.4rem 0.9rem; border-radius: 999px;
      background: linear-gradient(135deg, #4f9eff, #a855f7); color: #fff;
      font-size: 0.8rem; font-weight: 600; margin-bottom: 1.5rem;
    }
    h1 { font-size: 2.5rem; margin-bottom: 0.5rem; }
    .subtitle { color: #888; margin-bottom: 2rem; }
    .card {
      background: #15151c; border: 1px solid #2a2a35; border-radius: 12px;
      padding: 1.5rem; margin-bottom: 2rem;
    }
    .card h2 { font-size: 1.2rem; margin-bottom: 1rem; }
    .card p { color: #aaa; line-height: 1.5; }
    ul { list-style: none; display: grid; gap: 0.5rem; }
    code {
      display: inline-block; background: #2a2a35; color: #4f9eff;
      padding: 0.1rem 0.4rem; border-radius: 4px; font-size: 0.75rem;
      font-weight: 600; margin-right: 0.4rem;
    }
    footer {
      margin-top: 3rem; padding-top: 1.5rem; border-top: 1px solid #2a2a35;
      color: #666; font-size: 0.85rem; text-align: center;
    }
  </style>
</head>
<body>
  <main class="page">
    <div class="badge">🚀 Flui Demo Application</div>
    <h1>${APP_NAME}</h1>
    <p class="subtitle">Generic Node.js · Zero dependencies · v${APP_VERSION}</p>
    <section class="card">
      <h2>About this template</h2>
      <p>
        This is a starting point — a minimal Node.js HTTP server with zero
        dependencies. Replace <code>server.js</code> with your own runtime,
        or adapt the Dockerfile to use any language or framework you prefer.
      </p>
    </section>
    <section class="card">
      <h2>Endpoints</h2>
      <ul>
        <li><code>GET</code> <a href="/health">/health</a> — health check</li>
        <li><code>GET</code> <a href="/api/info">/api/info</a> — runtime info</li>
      </ul>
    </section>
    <footer>Powered by <a href="https://flui.cloud">Flui</a></footer>
  </main>
</body>
</html>`;

const server = createServer((req, res) => {
  const url = new URL(req.url ?? '/', `http://${req.headers.host}`);

  if (url.pathname === '/' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(homeHtml);
    return;
  }

  if (url.pathname === '/health' && req.method === 'GET') {
    const body = JSON.stringify({
      status: 'ok',
      appName: APP_NAME,
      version: APP_VERSION,
      uptime: Math.floor((Date.now() - START_TIME) / 1000),
      timestamp: new Date().toISOString(),
    });
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(body);
    return;
  }

  if (url.pathname === '/api/info' && req.method === 'GET') {
    const body = JSON.stringify({
      appName: APP_NAME,
      version: APP_VERSION,
      runtime: `Node ${process.version}`,
      platform: process.platform,
      arch: process.arch,
      pid: process.pid,
    });
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(body);
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not found' }));
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`${APP_NAME} listening on http://0.0.0.0:${PORT}`);
});
