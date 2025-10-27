/**
 * Client-side hydration for server-side rendered Lit components
 *
 * This file should be loaded on the client after the SSR'd HTML has been received.
 * It will hydrate the components, making them interactive.
 */
// Must be imported before lit to enable hydration support
import '@lit-labs/ssr-client/lit-element-hydrate-support.js';
// Import the component definitions for client-side use
import './simple-greeting.js';
/**
 * Initialize client-side hydration
 */
export function initializeHydration() {
    // Check if we need to polyfill declarative shadow roots
    if (typeof hasNativeDeclarativeShadowRoots === 'function' && !hasNativeDeclarativeShadowRoots()) {
        console.log('🔄 Polyfilling declarative shadow roots...');
        if (typeof hydrateShadowRoots === 'function') {
            hydrateShadowRoots(document.body);
        }
    }
    else {
        console.log('✅ Native declarative shadow root support detected or polyfill not loaded');
    }
    console.log('🚀 Client hydration initialized');
    // Optional: Add some interactivity examples
    addInteractivityExamples();
}
/**
 * Add some interactive examples to demonstrate hydration
 */
function addInteractivityExamples() {
    // Find all simple-greeting components
    const greetings = document.querySelectorAll('simple-greeting');
    greetings.forEach((greeting, index) => {
        // Add a click handler to demonstrate interactivity
        greeting.addEventListener('click', () => {
            const currentName = greeting.getAttribute('name') || 'Unknown';
            const newName = `Clicked ${currentName} (${Date.now()})`;
            greeting.setAttribute('name', newName);
            console.log(`Updated greeting ${index + 1} to: ${newName}`);
        });
    });
    // Example: Update one component after a delay
    setTimeout(() => {
        const interactiveGreeting = document.getElementById('interactive-greeting');
        if (interactiveGreeting) {
            interactiveGreeting.setAttribute('name', 'Dynamically Updated!');
            console.log('🔄 Updated interactive greeting component');
        }
    }, 2000);
    // Example: Add a button to create new components dynamically
    addDynamicComponentExample();
}
/**
 * Add an example of creating components dynamically after hydration
 */
function addDynamicComponentExample() {
    const container = document.querySelector('.container');
    if (!container)
        return;
    // Create a section for dynamic components
    const dynamicSection = document.createElement('div');
    dynamicSection.className = 'component-container';
    dynamicSection.innerHTML = `
    <h2>Dynamic Components (Client-Side Only):</h2>
    <button id="add-component" style="margin: 10px 0; padding: 8px 16px; background: #007acc; color: white; border: none; border-radius: 4px; cursor: pointer;">
      Add New Greeting Component
    </button>
    <div id="dynamic-components"></div>
  `;
    container.appendChild(dynamicSection);
    // Add click handler for the button
    const addButton = document.getElementById('add-component');
    const dynamicContainer = document.getElementById('dynamic-components');
    let componentCount = 0;
    addButton?.addEventListener('click', () => {
        componentCount++;
        const newGreeting = document.createElement('simple-greeting');
        newGreeting.setAttribute('name', `Dynamic Component #${componentCount}`);
        newGreeting.style.margin = '10px 0';
        newGreeting.style.display = 'block';
        dynamicContainer?.appendChild(newGreeting);
        console.log(`Created dynamic component #${componentCount}`);
    });
}
// Auto-initialize when the DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeHydration);
}
else {
    initializeHydration();
}
//# sourceMappingURL=client-hydrate.js.map