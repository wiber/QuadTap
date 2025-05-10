/**
 * Coordinates utility functions
 * Provides methods for normalizing and denormalizing coordinates
 */

/**
 * Convert absolute coordinates to normalized (0-1) coordinates
 * @param {number} x - The absolute x coordinate
 * @param {number} y - The absolute y coordinate
 * @param {number} containerWidth - The width of the container
 * @param {number} containerHeight - The height of the container
 * @returns {Object} The normalized coordinates
 */
export function normalizeCoordinates(x, y, containerWidth, containerHeight) {
  return {
    normalizedX: containerWidth > 0 ? x / containerWidth : 0,
    normalizedY: containerHeight > 0 ? y / containerHeight : 0
  };
}

/**
 * Convert normalized (0-1) coordinates to absolute coordinates
 * @param {number} normalizedX - The normalized x coordinate (0-1)
 * @param {number} normalizedY - The normalized y coordinate (0-1)
 * @param {number} containerWidth - The width of the container
 * @param {number} containerHeight - The height of the container
 * @returns {Object} The absolute coordinates
 */
export function denormalizeCoordinates(normalizedX, normalizedY, containerWidth, containerHeight) {
  return {
    x: normalizedX * containerWidth,
    y: normalizedY * containerHeight
  };
}

/**
 * Convert absolute coordinates to percentage (0-100%) coordinates
 * @param {number} x - The absolute x coordinate
 * @param {number} y - The absolute y coordinate
 * @param {number} containerWidth - The width of the container
 * @param {number} containerHeight - The height of the container
 * @returns {Object} The percentage coordinates
 */
export function toPercentageCoordinates(x, y, containerWidth, containerHeight) {
  return {
    percentX: containerWidth > 0 ? (x / containerWidth) * 100 : 0,
    percentY: containerHeight > 0 ? (y / containerHeight) * 100 : 0
  };
}

/**
 * Convert percentage (0-100%) coordinates to absolute coordinates
 * @param {number} percentX - The percentage x coordinate (0-100%)
 * @param {number} percentY - The percentage y coordinate (0-100%)
 * @param {number} containerWidth - The width of the container
 * @param {number} containerHeight - The height of the container
 * @returns {Object} The absolute coordinates
 */
export function fromPercentageCoordinates(percentX, percentY, containerWidth, containerHeight) {
  return {
    x: (percentX / 100) * containerWidth,
    y: (percentY / 100) * containerHeight
  };
}

/**
 * Determine the quadrant based on normalized coordinates
 * @param {number} normalizedX - The normalized x coordinate (0-1)
 * @param {number} normalizedY - The normalized y coordinate (0-1)
 * @returns {string} The quadrant identifier ('ne', 'nw', 'se', 'sw')
 */
export function getQuadrantFromNormalizedCoordinates(normalizedX, normalizedY) {
  const isRight = normalizedX >= 0.5;
  const isBottom = normalizedY >= 0.5;
  
  if (isRight && !isBottom) return 'ne';
  if (!isRight && !isBottom) return 'nw';
  if (isRight && isBottom) return 'se';
  return 'sw';
}

/**
 * Determine the quadrant based on absolute coordinates
 * @param {number} x - The absolute x coordinate
 * @param {number} y - The absolute y coordinate
 * @param {number} containerWidth - The width of the container
 * @param {number} containerHeight - The height of the container
 * @returns {string} The quadrant identifier ('ne', 'nw', 'se', 'sw')
 */
export function getQuadrantFromAbsoluteCoordinates(x, y, containerWidth, containerHeight) {
  const { normalizedX, normalizedY } = normalizeCoordinates(x, y, containerWidth, containerHeight);
  return getQuadrantFromNormalizedCoordinates(normalizedX, normalizedY);
}

/**
 * Create a coordinate data object with both absolute and normalized coordinates
 * @param {number} x - The absolute x coordinate
 * @param {number} y - The absolute y coordinate
 * @param {number} containerWidth - The width of the container
 * @param {number} containerHeight - The height of the container
 * @returns {Object} The coordinate data object
 */
export function createCoordinateData(x, y, containerWidth, containerHeight) {
  const { normalizedX, normalizedY } = normalizeCoordinates(x, y, containerWidth, containerHeight);
  const { percentX, percentY } = toPercentageCoordinates(x, y, containerWidth, containerHeight);
  const quadrant = getQuadrantFromNormalizedCoordinates(normalizedX, normalizedY);
  
  return {
    absolute: { x, y },
    normalized: { x: normalizedX, y: normalizedY },
    percentage: { x: percentX, y: percentY },
    container: { width: containerWidth, height: containerHeight },
    quadrant
  };
}

/**
 * Coordinates utility class
 * Provides methods for working with coordinates in different formats
 */
export default class Coordinates {
  /**
   * Convert absolute coordinates to normalized (0-1) coordinates
   * @param {number} x - The absolute x coordinate
   * @param {number} y - The absolute y coordinate
   * @param {number} containerWidth - The width of the container
   * @param {number} containerHeight - The height of the container
   * @returns {Object} The normalized coordinates
   */
  static normalize(x, y, containerWidth, containerHeight) {
    return normalizeCoordinates(x, y, containerWidth, containerHeight);
  }
  
  /**
   * Convert normalized (0-1) coordinates to absolute coordinates
   * @param {number} normalizedX - The normalized x coordinate (0-1)
   * @param {number} normalizedY - The normalized y coordinate (0-1)
   * @param {number} containerWidth - The width of the container
   * @param {number} containerHeight - The height of the container
   * @returns {Object} The absolute coordinates
   */
  static denormalize(normalizedX, normalizedY, containerWidth, containerHeight) {
    return denormalizeCoordinates(normalizedX, normalizedY, containerWidth, containerHeight);
  }
  
  /**
   * Convert absolute coordinates to percentage (0-100%) coordinates
   * @param {number} x - The absolute x coordinate
   * @param {number} y - The absolute y coordinate
   * @param {number} containerWidth - The width of the container
   * @param {number} containerHeight - The height of the container
   * @returns {Object} The percentage coordinates
   */
  static toPercentage(x, y, containerWidth, containerHeight) {
    return toPercentageCoordinates(x, y, containerWidth, containerHeight);
  }
  
  /**
   * Convert percentage (0-100%) coordinates to absolute coordinates
   * @param {number} percentX - The percentage x coordinate (0-100%)
   * @param {number} percentY - The percentage y coordinate (0-100%)
   * @param {number} containerWidth - The width of the container
   * @param {number} containerHeight - The height of the container
   * @returns {Object} The absolute coordinates
   */
  static fromPercentage(percentX, percentY, containerWidth, containerHeight) {
    return fromPercentageCoordinates(percentX, percentY, containerWidth, containerHeight);
  }
  
  /**
   * Determine the quadrant based on normalized coordinates
   * @param {number} normalizedX - The normalized x coordinate (0-1)
   * @param {number} normalizedY - The normalized y coordinate (0-1)
   * @returns {string} The quadrant identifier ('ne', 'nw', 'se', 'sw')
   */
  static getQuadrant(normalizedX, normalizedY) {
    return getQuadrantFromNormalizedCoordinates(normalizedX, normalizedY);
  }
  
  /**
   * Create a coordinate data object with both absolute and normalized coordinates
   * @param {number} x - The absolute x coordinate
   * @param {number} y - The absolute y coordinate
   * @param {number} containerWidth - The width of the container
   * @param {number} containerHeight - The height of the container
   * @returns {Object} The coordinate data object
   */
  static createData(x, y, containerWidth, containerHeight) {
    return createCoordinateData(x, y, containerWidth, containerHeight);
  }
}
