/**
 * DOM Helper Functions
 * Utility functions for DOM manipulation
 */

/**
 * Create an HTML element with specified options
 * @param {string} tag - The HTML tag name
 * @param {Object} options - Options for the element
 * @param {string} options.className - CSS class name
 * @param {string} options.id - Element ID
 * @param {string} options.text - Text content
 * @param {string} options.html - HTML content
 * @param {Object} options.attributes - HTML attributes
 * @param {Object} options.styles - CSS styles
 * @param {Object} options.events - Event listeners
 * @param {Array} options.children - Child elements
 * @returns {HTMLElement} The created element
 */
export function createElement(tag, options = {}) {
  const element = document.createElement(tag);
  
  if (options.className) element.className = options.className;
  if (options.id) element.id = options.id;
  if (options.text) element.textContent = options.text;
  if (options.html) element.innerHTML = options.html;
  
  if (options.attributes) {
    for (const key in options.attributes) {
      element.setAttribute(key, options.attributes[key]);
    }
  }
  
  if (options.styles) {
    for (const key in options.styles) {
      element.style[key] = options.styles[key];
    }
  }
  
  if (options.events) {
    for (const event in options.events) {
      element.addEventListener(event, options.events[event]);
    }
  }
  
  if (options.children) {
    options.children.forEach(child => {
      element.appendChild(child);
    });
  }
  
  return element;
}

/**
 * Position an element with its center at the specified coordinates
 * @param {HTMLElement} element - The element to position
 * @param {number} x - X coordinate (can be pixels or percentage 0-1)
 * @param {number} y - Y coordinate (can be pixels or percentage 0-1)
 * @param {boolean} isPercentage - Whether coordinates are percentages (0-1) or pixels
 */
export function positionElementWithCenterMaintained(element, x, y, isPercentage = false) {
  if (isPercentage) {
    // Convert percentage to pixels based on parent container dimensions
    const parent = element.parentElement;
    if (parent) {
      const parentRect = parent.getBoundingClientRect();
      x = parentRect.width * x;
      y = parentRect.height * y;
    }
  }
  
  element.style.left = x + "px";
  element.style.top = y + "px";
  element.style.transform = "translate(-50%, -50%)";
}

/**
 * Get the quadrant of a point within a container
 * @param {number} x - X coordinate
 * @param {number} y - Y coordinate
 * @param {HTMLElement} container - Container element
 * @returns {string} Quadrant name: 'top-left', 'top-right', 'bottom-left', or 'bottom-right'
 */
export function getQuadrant(x, y, container) {
  const rect = container.getBoundingClientRect();
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  
  if (x < centerX) {
    if (y < centerY) {
      return 'top-left';
    } else {
      return 'bottom-left';
    }
  } else {
    if (y < centerY) {
      return 'top-right';
    } else {
      return 'bottom-right';
    }
  }
}

/**
 * Check if a point is within an element
 * @param {number} x - X coordinate
 * @param {number} y - Y coordinate
 * @param {HTMLElement} element - Element to check
 * @returns {boolean} True if the point is within the element
 */
export function isPointInElement(x, y, element) {
  const rect = element.getBoundingClientRect();
  return (
    x >= rect.left &&
    x <= rect.right &&
    y >= rect.top &&
    y <= rect.bottom
  );
}

/**
 * Get the distance between two points
 * @param {number} x1 - X coordinate of first point
 * @param {number} y1 - Y coordinate of first point
 * @param {number} x2 - X coordinate of second point
 * @param {number} y2 - Y coordinate of second point
 * @returns {number} Distance between the points
 */
export function getDistance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}
