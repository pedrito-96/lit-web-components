import { render } from '@lit-labs/ssr';
import { html } from '@lit-labs/ssr';
import { collectResult } from '@lit-labs/ssr/lib/render-result.js';
import { RenderResultReadable } from '@lit-labs/ssr/lib/render-result-readable.js';
import * as http from 'http';
import * as url from 'url';
import * as fs from 'fs';
import * as path from 'path';
// Import your component for SSR
import './simple-greeting.js';
// Enable connectedCallback for @lit/context and other features
globalThis.litSsrCallConnectedCallback = true;
/**
 * Server-only template that renders a complete HTML document
 * with your simple-greeting component
 */
const renderPage = (name = 'World') => html `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SSR Lit Component - Simple Greeting</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 20px;
      background-color: #f5f5f5;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    h1 {
      color: #333;
      margin-bottom: 20px;
    }
    .ssr-info {
      background: #e3f2fd;
      padding: 15px;
      border-radius: 4px;
      margin-bottom: 20px;
      border-left: 4px solid #2196f3;
    }
    .component-container {
      margin: 20px 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Server-Side Rendered Lit Component</h1>
    
    <div class="ssr-info">
      <strong>🚀 Server-Side Rendering Active</strong>
      <p>This page was rendered on the server with the simple-greeting component. 
      The component's styles and initial content are immediately visible without 
      waiting for JavaScript to load.</p>
    </div>

    <div class="component-container">
      <h2>Simple Greeting Component (SSR'd):</h2>
      <simple-greeting name="${name}"></simple-greeting>
    </div>

    <div class="component-container">
      <h2>Interactive Version (after hydration):</h2>
      <simple-greeting name="Hydrated ${name}" id="interactive-greeting"></simple-greeting>
    </div>

    <!-- Scripts for client-side hydration -->
    <script type="module">
      // Polyfill for browsers without native declarative shadow root support
      import {
        hasNativeDeclarativeShadowRoots,
        hydrateShadowRoots,
      } from 'https://unpkg.com/@webcomponents/template-shadowroot@1.0.0/template-shadowroot.js';
      
      if (!hasNativeDeclarativeShadowRoots()) {
        hydrateShadowRoots(document.body);
      }
      
      // Load the component for client-side interactivity
      import('./simple-greeting.js');
      
      // Example of updating the component after hydration
      setTimeout(() => {
        const greeting = document.getElementById('interactive-greeting');
        if (greeting) {
          greeting.name = 'Dynamically Updated!';
        }
      }, 2000);
    </script>

    <script type="text/json" id="page-data">
      {"name": "${name}", "timestamp": "${new Date().toISOString()}"}
    </script>
  </div>
</body>
</html>`;
/**
 * Simple HTTP server that serves SSR'd Lit components
 */
const server = http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url || '', true);
    const pathname = parsedUrl.pathname || '/';
    try {
        if (pathname === '/') {
            // Get name from query parameter or use default
            const name = parsedUrl.query.name || 'World';
            // Render the page with SSR
            const ssrResult = render(renderPage(name));
            // Set headers for streaming HTML
            res.writeHead(200, {
                'Content-Type': 'text/html; charset=utf-8',
                'Transfer-Encoding': 'chunked',
            });
            // Stream the result to the client
            const readable = new RenderResultReadable(ssrResult);
            readable.on('data', (chunk) => {
                res.write(chunk);
            });
            readable.on('end', () => {
                res.end();
            });
            readable.on('error', (error) => {
                console.error('Stream error:', error);
                res.end();
            });
        }
        else if (pathname === '/simple-greeting.js') {
            // Serve the compiled component file
            const filePath = path.join(process.cwd(), 'simple-greeting.js');
            try {
                const content = fs.readFileSync(filePath, 'utf8');
                res.writeHead(200, {
                    'Content-Type': 'application/javascript; charset=utf-8',
                });
                res.end(content);
            }
            catch (error) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Component file not found. Please run "npm run build" first.');
            }
        }
        else if (pathname === '/health') {
            // Health check endpoint
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                status: 'ok',
                timestamp: new Date().toISOString(),
                ssr: 'enabled'
            }));
        }
        else {
            // 404 for other paths
            res.writeHead(404, { 'Content-Type': 'text/html' });
            const notFoundResult = render(html `
        <!DOCTYPE html>
        <html>
        <head><title>404 - Not Found</title></head>
        <body>
          <h1>404 - Page Not Found</h1>
          <p>Try visiting <a href="/">the home page</a> or <a href="/?name=YourName">with a custom name</a></p>
        </body>
        </html>
      `);
            res.end(await collectResult(notFoundResult));
        }
    }
    catch (error) {
        console.error('SSR Error:', error);
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end(`
      <html>
        <body>
          <h1>Server Error</h1>
          <p>An error occurred during server-side rendering.</p>
          <pre>${error}</pre>
        </body>
      </html>
    `);
    }
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`🚀 SSR server running at http://localhost:${PORT}`);
    console.log(`📝 Try different names: http://localhost:${PORT}/?name=Alice`);
    console.log(`🏥 Health check: http://localhost:${PORT}/health`);
});
export { renderPage };
//# sourceMappingURL=ssr-server.js.map