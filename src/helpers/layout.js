/**
 * Layout helper functions for positioning elements
 */

/**
 * Layout the control strip based on its mode (overlay or lightbox)
 * @param {HTMLElement} controlStrip - The control strip element
 * @param {string} mode - The mode ('overlay' or 'lightbox')
 * @param {HTMLElement} container - The container element
 */
export function layoutControlStrip(controlStrip, mode, container) {
  // Remove any existing mode classes
  controlStrip.classList.remove('qt-control-strip--overlay');
  controlStrip.classList.remove('qt-control-strip--lightbox');
  
  if (mode === 'overlay') {
    // Add overlay class
    controlStrip.classList.add('qt-control-strip--overlay');
    
    // Position at the bottom center of the container
    controlStrip.style.position = 'absolute';
    controlStrip.style.bottom = '20px';
    controlStrip.style.left = '50%';
    controlStrip.style.transform = 'translateX(-50%)';
    controlStrip.style.zIndex = '1000';
    
    // Set width based on container
    const containerWidth = container.offsetWidth;
    controlStrip.style.width = `${Math.min(containerWidth * 0.8, 400)}px`;
    
    // Add shadow for better visibility
    controlStrip.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
  } else if (mode === 'lightbox') {
    // Add lightbox class
    controlStrip.classList.add('qt-control-strip--lightbox');
    
    // Reset positioning styles
    controlStrip.style.position = 'static';
    controlStrip.style.bottom = '';
    controlStrip.style.left = '';
    controlStrip.style.transform = '';
    controlStrip.style.zIndex = '';
    
    // Set width to 100% of container
    controlStrip.style.width = '100%';
    
    // Remove shadow
    controlStrip.style.boxShadow = 'none';
  }
}
