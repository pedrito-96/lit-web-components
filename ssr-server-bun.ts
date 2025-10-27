import {render} from '@lit-labs/ssr';
import {html} from '@lit-labs/ssr';
import {collectResult} from '@lit-labs/ssr/lib/render-result.js';
import {RenderResultReadable} from '@lit-labs/ssr/lib/render-result-readable.js';

// Import your component for SSR
import './src/simple-greeting.ts';

// Enable connectedCallback for @lit/context and other features
(globalThis as any).litSsrCallConnectedCallback = true;

/**
 * Server-only template that renders a complete HTML document
 * with your simple-greeting component
 */
const renderPage = (name: string = 'World') => html`
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
    .bun-info {
      background: #fff8e1;
      padding: 15px;
      border-radius: 4px;
      margin-bottom: 20px;
      border-left: 4px solid #ff9800;
    }
    .component-container {
      margin: 20px 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🚀 SSR Lit Component with Bun</h1>
    
    <div class="ssr-info">
      <strong>⚡ Server-Side Rendering Active</strong>
      <p>This page was rendered on the server with the simple-greeting component using Lit SSR.</p>
    </div>

    <div class="bun-info">
      <strong>🥯 Powered by Bun</strong>
      <p>This server is running on Bun for ultra-fast TypeScript execution and built-in optimizations.</p>
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
          greeting.name = 'Dynamically Updated with Bun!';
        }
      }, 2000);
    </script>

    <script type="text/json" id="page-data">
      {"name": "${name}", "timestamp": "${new Date().toISOString()}", "runtime": "bun"}
    </script>
  </div>
</body>
</html>`;

/**
 * Bun-optimized HTTP server for SSR Lit components
 */
const server = Bun.serve({
  port: process.env.PORT || 3000,
  async fetch(req) {
    const url = new URL(req.url);
    const pathname = url.pathname;
    
    try {
      if (pathname === '/') {
        // Get name from query parameter or use default
        const name = url.searchParams.get('name') || 'World';
        
        // Render the page with SSR
        const ssrResult = render(renderPage(name));
        
        // Convert to string for Bun's Response
        const htmlContent = await collectResult(ssrResult);
        
        return new Response(htmlContent, {
          headers: {
            'Content-Type': 'text/html; charset=utf-8',
          },
        });
        
      } else if (pathname === '/simple-greeting.js') {
        // Serve the compiled component file
        try {
          const file = Bun.file('./simple-greeting.js');
          if (await file.exists()) {
            return new Response(file, {
              headers: {
                'Content-Type': 'application/javascript; charset=utf-8',
              },
            });
          } else {
            return new Response('Component file not found. Please run "bun run build" first.', {
              status: 404,
              headers: { 'Content-Type': 'text/plain' },
            });
          }
        } catch (error) {
          return new Response('Error serving component file', {
            status: 500,
            headers: { 'Content-Type': 'text/plain' },
          });
        }
        
      } else if (pathname === '/health') {
        // Health check endpoint
        return new Response(JSON.stringify({
          status: 'ok',
          timestamp: new Date().toISOString(),
          ssr: 'enabled',
          runtime: 'bun',
          version: Bun.version
        }), {
          headers: { 'Content-Type': 'application/json' },
        });
        
      } else {
        // 404 for other paths
        const notFoundResult = render(html`
          <!DOCTYPE html>
          <html>
          <head><title>404 - Not Found</title></head>
          <body>
            <h1>404 - Page Not Found</h1>
            <p>Try visiting <a href="/">the home page</a> or <a href="/?name=YourName">with a custom name</a></p>
            <p><em>Served by Bun ${Bun.version}</em></p>
          </body>
          </html>
        `);
        
        const notFoundContent = await collectResult(notFoundResult);
        return new Response(notFoundContent, {
          status: 404,
          headers: { 'Content-Type': 'text/html' },
        });
      }
    } catch (error) {
      console.error('SSR Error:', error);
      return new Response(`
        <html>
          <body>
            <h1>Server Error</h1>
            <p>An error occurred during server-side rendering.</p>
            <pre>${error}</pre>
            <p><em>Bun Runtime: ${Bun.version}</em></p>
          </body>
        </html>
      `, {
        status: 500,
        headers: { 'Content-Type': 'text/html' },
      });
    }
  },
});

console.log(`🥯 Bun SSR server running at http://localhost:${server.port}`);
console.log(`📝 Try different names: http://localhost:${server.port}/?name=Alice`);
console.log(`🏥 Health check: http://localhost:${server.port}/health`);
console.log(`⚡ Bun version: ${Bun.version}`);

export { renderPage };