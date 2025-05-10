/**
 * Events Helper Functions
 * Utility functions for event handling
 */

/**
 * Create a debounced function
 * @param {Function} func - The function to debounce
 * @param {number} wait - The debounce wait time in milliseconds
 * @returns {Function} The debounced function
 */
export function debounce(func, wait) {
  let timeout;
  
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Create a throttled function
 * @param {Function} func - The function to throttle
 * @param {number} limit - The throttle limit in milliseconds
 * @returns {Function} The throttled function
 */
export function throttle(func, limit) {
  let inThrottle;
  
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

/**
 * Add event listeners to multiple elements
 * @param {Array|NodeList} elements - The elements to add listeners to
 * @param {string} event - The event type
 * @param {Function} handler - The event handler
 * @param {Object} options - Event listener options
 */
export function addEventListenerToAll(elements, event, handler, options = {}) {
  if (!elements) return;
  
  // Convert to array if it's a NodeList
  const elementsArray = Array.isArray(elements) ? elements : Array.from(elements);
  
  elementsArray.forEach(element => {
    element.addEventListener(event, handler, options);
  });
}

/**
 * Remove event listeners from multiple elements
 * @param {Array|NodeList} elements - The elements to remove listeners from
 * @param {string} event - The event type
 * @param {Function} handler - The event handler
 * @param {Object} options - Event listener options
 */
export function removeEventListenerFromAll(elements, event, handler, options = {}) {
  if (!elements) return;
  
  // Convert to array if it's a NodeList
  const elementsArray = Array.isArray(elements) ? elements : Array.from(elements);
  
  elementsArray.forEach(element => {
    element.removeEventListener(event, handler, options);
  });
}

/**
 * Create a custom event
 * @param {string} name - The event name
 * @param {Object} detail - The event detail
 * @returns {CustomEvent} The custom event
 */
export function createCustomEvent(name, detail = {}) {
  return new CustomEvent(name, {
    bubbles: true,
    cancelable: true,
    detail
  });
}

/**
 * Dispatch a custom event
 * @param {HTMLElement} element - The element to dispatch the event on
 * @param {string} name - The event name
 * @param {Object} detail - The event detail
 * @returns {boolean} Whether the event was canceled
 */
export function dispatchCustomEvent(element, name, detail = {}) {
  const event = createCustomEvent(name, detail);
  return element.dispatchEvent(event);
}

/**
 * Add a one-time event listener
 * @param {HTMLElement} element - The element to add the listener to
 * @param {string} event - The event type
 * @param {Function} handler - The event handler
 * @param {Object} options - Event listener options
 */
export function addOneTimeEventListener(element, event, handler, options = {}) {
  const onceHandler = function(e) {
    handler(e);
    element.removeEventListener(event, onceHandler, options);
  };
  
  element.addEventListener(event, onceHandler, options);
}
