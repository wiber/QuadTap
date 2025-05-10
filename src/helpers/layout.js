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
  
  // Check if we're on a mobile device
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 768;
  
  // Check orientation - true if portrait (height > width)
  const isPortrait = window.innerHeight > window.innerWidth;
  
  if (mode === 'overlay') {
    // Add overlay class
    controlStrip.classList.add('qt-control-strip--overlay');
    
    // Position at the bottom center of the container
    controlStrip.style.position = 'absolute';
    controlStrip.style.bottom = '20px';
    controlStrip.style.left = '50%';
    controlStrip.style.transform = 'translateX(-50%)';
    controlStrip.style.zIndex = '1000';
    
    // Set width based on container and device
    const containerWidth = container.offsetWidth;
    let widthPercentage = 0.8; // Default 80% width
    
    // Adjust width percentage based on device and orientation
    if (isMobile) {
      if (isPortrait) {
        // Mobile portrait: wider control strip (relative to narrower screen)
        widthPercentage = 0.9;
      } else {
        // Mobile landscape: slightly narrower control strip
        widthPercentage = 0.7;
      }
    }
    
    // Calculate width with constraints
    const controlStripWidth = Math.min(containerWidth * widthPercentage, isMobile ? 350 : 400);
    controlStrip.style.width = `${controlStripWidth}px`;
    
    // Adjust padding based on width
    const paddingScale = Math.max(0.5, Math.min(1, controlStripWidth / 400));
    const paddingH = Math.floor(12 * paddingScale);
    const paddingV = Math.floor(8 * paddingScale);
    controlStrip.style.padding = `${paddingV}px ${paddingH}px`;
    
    // Adjust button size based on control strip width
    const buttons = controlStrip.querySelectorAll('button');
    if (buttons.length > 0) {
      const buttonScale = Math.max(0.7, Math.min(1, controlStripWidth / 400));
      const buttonSize = Math.floor(40 * buttonScale);
      const fontSize = Math.floor(18 * buttonScale);
      
      buttons.forEach(button => {
        button.style.width = `${buttonSize}px`;
        button.style.height = `${buttonSize}px`;
        button.style.fontSize = `${fontSize}px`;
      });
    }
    
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
    
    // Adjust button size for lightbox mode
    const buttons = controlStrip.querySelectorAll('button');
    if (buttons.length > 0) {
      // In lightbox mode, buttons can be slightly larger
      const buttonSize = isMobile ? 36 : 44;
      const fontSize = isMobile ? 16 : 20;
      
      buttons.forEach(button => {
        button.style.width = `${buttonSize}px`;
        button.style.height = `${buttonSize}px`;
        button.style.fontSize = `${fontSize}px`;
      });
    }
    
    // Remove shadow
    controlStrip.style.boxShadow = 'none';
  }
}
