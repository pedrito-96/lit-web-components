/**
 * Client-side hydration for server-side rendered Lit components
 *
 * This file should be loaded on the client after the SSR'd HTML has been received.
 * It will hydrate the components, making them interactive.
 */
import '@lit-labs/ssr-client/lit-element-hydrate-support.js';
import './simple-greeting.js';
declare global {
    function hasNativeDeclarativeShadowRoots(): boolean;
    function hydrateShadowRoots(root: Element): void;
}
/**
 * Initialize client-side hydration
 */
export declare function initializeHydration(): void;
//# sourceMappingURL=client-hydrate.d.ts.map