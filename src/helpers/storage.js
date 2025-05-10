/**
 * Storage Helper Functions
 * Utility functions for working with localStorage
 */

const STORAGE_PREFIX = 'quadTap_';

/**
 * Save data to localStorage with the quadTap prefix
 * @param {string} key - The key to save under
 * @param {*} value - The value to save
 */
export function saveToStorage(key, value) {
  try {
    const prefixedKey = STORAGE_PREFIX + key;
    
    // Handle objects and arrays by converting to JSON
    if (typeof value === 'object') {
      localStorage.setItem(prefixedKey, JSON.stringify(value));
    } else {
      localStorage.setItem(prefixedKey, value);
    }
    
    return true;
  } catch (error) {
    console.error('[QuadTap] Error saving to localStorage:', error);
    return false;
  }
}

/**
 * Get data from localStorage with the quadTap prefix
 * @param {string} key - The key to retrieve
 * @param {*} defaultValue - Default value if key doesn't exist
 * @returns {*} The retrieved value or defaultValue
 */
export function getFromStorage(key, defaultValue = null) {
  try {
    const prefixedKey = STORAGE_PREFIX + key;
    const value = localStorage.getItem(prefixedKey);
    
    if (value === null) {
      return defaultValue;
    }
    
    // Try to parse as JSON, return as is if not valid JSON
    try {
      return JSON.parse(value);
    } catch (e) {
      return value;
    }
  } catch (error) {
    console.error('[QuadTap] Error retrieving from localStorage:', error);
    return defaultValue;
  }
}

/**
 * Remove data from localStorage with the quadTap prefix
 * @param {string} key - The key to remove
 */
export function removeFromStorage(key) {
  try {
    const prefixedKey = STORAGE_PREFIX + key;
    localStorage.removeItem(prefixedKey);
    return true;
  } catch (error) {
    console.error('[QuadTap] Error removing from localStorage:', error);
    return false;
  }
}

/**
 * Clear all quadTap data from localStorage
 */
export function clearAllStorage() {
  try {
    const keysToRemove = [];
    
    // Find all keys with the quadTap prefix
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith(STORAGE_PREFIX)) {
        keysToRemove.push(key);
      }
    }
    
    // Remove all found keys
    keysToRemove.forEach(key => {
      localStorage.removeItem(key);
    });
    
    return true;
  } catch (error) {
    console.error('[QuadTap] Error clearing localStorage:', error);
    return false;
  }
}

/**
 * Save the entire throw-down context to localStorage
 * @param {Object} context - The throw-down context
 */
export function saveThrowDownContext(context) {
  try {
    // Save each property individually
    for (const key in context) {
      saveToStorage(key, context[key]);
    }
    
    // Save a timestamp
    saveToStorage('timestamp', Date.now());
    
    return true;
  } catch (error) {
    console.error('[QuadTap] Error saving throw-down context:', error);
    return false;
  }
}

/**
 * Get the entire throw-down context from localStorage
 * @returns {Object} The throw-down context
 */
export function getThrowDownContext() {
  try {
    return {
      selectedEmoji: getFromStorage('selectedEmoji', ''),
      selectedQuadrant: getFromStorage('selectedQuadrant', ''),
      selectedIndex: getFromStorage('selectedIndex', -1),
      videoTime: getFromStorage('videoTime', 0),
      videoId: getFromStorage('videoId', 'unknown'),
      positionX: getFromStorage('positionX', 0),
      positionY: getFromStorage('positionY', 0),
      timestamp: getFromStorage('timestamp', Date.now()),
      comment: getFromStorage('comment', ''),
      extractedUrl: getFromStorage('extractedUrl', '')
    };
  } catch (error) {
    console.error('[QuadTap] Error retrieving throw-down context:', error);
    return {};
  }
}
