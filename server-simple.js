import { render } from '@lit-labs/ssr';
import { collectResult, collectResultSync, } from '@lit-labs/ssr/lib/render-result.js';
import { html } from 'lit';
const myServerTemplate = (name) => html `<p>Hello ${name}</p>`;
const ssrResult = render(myServerTemplate('SSR with Lit!'));
// Will throw if a Promise is encountered
console.log(collectResultSync(ssrResult));
// Awaits promises
console.log(collectResult(ssrResult));
//# sourceMappingURL=server-simple.js.map