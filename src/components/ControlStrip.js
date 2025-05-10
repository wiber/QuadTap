/**
 * ControlStrip Component
 * 
 * This component creates and manages the video control strip that appears
 * at the center of the overlay. It follows the positioning requirements
 * specified in the SPEC.md document.
 */

// Control strip styles as JavaScript objects
const controlStripStyles = {
  base: {
    width: '80%',
    maxWidth: '400px',
    padding: '8px 12px',
    borderRadius: '24px',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
    transition: 'opacity 0.3s ease'
  },
  overlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  lightbox: {
    position: 'static',
    top: '',
    left: '',
    transform: '',
    margin: '20px auto'
  },
  button: {
    background: 'none',
    border: 'none',
    color: 'white',
    fontSize: '18px',
    padding: '8px 12px',
    cursor: 'pointer',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'background-color 0.2s ease, font-size 0.3s ease, width 0.3s ease, height 0.3s ease'
  },
  buttonHover: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)'
  },
  tooltip: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    color: 'white',
    padding: '5px 10px',
    borderRadius: '4px',
    fontSize: '14px',
    zIndex: '2000',
    pointerEvents: 'none',
    opacity: '0',
    transition: 'opacity 0.3s ease'
  }
};

/**
 * Apply styles to an element
 * @param {HTMLElement} element - The element to apply styles to
 * @param {Object} styles - The styles to apply
 */
function applyStyles(element, styles) {
  Object.assign(element.style, styles);
}

/**
 * Apply layout styles to the control strip
 * @param {HTMLElement} controlStrip - The control strip element
 * @param {boolean} isLightbox - Whether the control strip is in a lightbox
 */
function applyControlStripLayout(controlStrip, isLightbox) {
  // Apply base styles
  applyStyles(controlStrip, controlStripStyles.base);
  
  // Apply positioning styles based on context
  if (isLightbox) {
    applyStyles(controlStrip, controlStripStyles.lightbox);
  } else {
    applyStyles(controlStrip, controlStripStyles.overlay);
  }
}

/**
 * Creates a control strip element and positions it correctly
 * @param {Object} options - Configuration options
 * @param {HTMLElement} options.overlay - The overlay element to attach the control strip to
 * @param {Function} options.onPlay - Callback for play button click
 * @param {Function} options.onPause - Callback for pause button click
 * @param {Function} options.onRewind - Callback for rewind button click
 * @param {Function} options.onForward - Callback for forward button click
 * @param {Function} options.onShare - Callback for share button click
 * @param {Function} options.onCopyUrl - Callback for copy URL button click
 * @param {number} options.rewindTime - Time in seconds to rewind (default: 30)
 * @param {number} options.forwardTime - Time in seconds to forward (default: 30)
 * @param {boolean} options.debug - Enable debug mode
 * @param {boolean} options.showAllButtons - Show all buttons including share and copy URL (default: false)
 * @param {boolean} options.isLightbox - Whether this control strip is for a lightbox (default: false)
 * @returns {HTMLElement} The created control strip element
 */
function createControlStrip(options) {
  const {
    overlay,
    onPlay,
    onPause,
    onRewind,
    onForward,
    onShare,
    onCopyUrl,
    rewindTime = 30,
    forwardTime = 30,
    debug = false,
    showAllButtons = false,
    isLightbox = false
  } = options;

  // Create the control strip element
  const controlStrip = document.createElement('div');
  
  // Apply styles directly using our style objects
  applyControlStripLayout(controlStrip, isLightbox);
  
  // Ensure proper z-index (at least 10 higher than overlay) for overlay control strip
  if (!isLightbox) {
    const overlayZIndex = parseInt(getComputedStyle(overlay).zIndex) || 1000;
    controlStrip.style.zIndex = (overlayZIndex + 10).toString();
  }
  
  // Create control buttons
  const rewindButton = createButton('⟲' + rewindTime, 'Rewind ' + rewindTime + ' seconds', onRewind);
  const playPauseButton = createButton('▶', 'Play/Pause', (evt) => {
    const isPlaying = playPauseButton.textContent === '▶';
    playPauseButton.textContent = isPlaying ? '❚❚' : '▶';
    if (isPlaying) {
      onPlay(evt);
    } else {
      onPause(evt);
    }
  });
  const forwardButton = createButton('⟳' + forwardTime, 'Forward ' + forwardTime + ' seconds', onForward);
  
  // Create share button
  const shareButton = createButton('⤴', 'Share', (evt) => {
    evt.stopPropagation();
    
    if (onShare) {
      // Use the provided callback
      onShare(evt);
    } else {
      // Default share functionality
      const shareUrl = window.location.href;
      
      // Try to use the Web Share API if available
      if (navigator.share) {
        navigator.share({
          title: 'Check out this video moment',
          url: shareUrl
        }).catch(err => {
          console.error('Error sharing:', err);
        });
      } else {
        // Fallback to copying to clipboard
        copyToClipboard(shareUrl);
        showTooltip(shareButton, 'Link copied!');
      }
    }
  });
  
  // Create copy URL button
  const copyButton = createButton('⧉', 'Copy URL', (evt) => {
    evt.stopPropagation();
    
    if (onCopyUrl) {
      // Use the provided callback
      onCopyUrl(evt);
    } else {
      // Default copy URL functionality
      const url = window.location.href;
      copyToClipboard(url);
      showTooltip(copyButton, 'Link copied!');
    }
  });
  
  // Add buttons to control strip
  controlStrip.appendChild(rewindButton);
  controlStrip.appendChild(playPauseButton);
  controlStrip.appendChild(forwardButton);
  
  // Only add share and copy buttons if showAllButtons is true or we're in a lightbox context
  if (showAllButtons || isLightbox) {
    controlStrip.appendChild(shareButton);
    controlStrip.appendChild(copyButton);
  }
  
  // Prevent clicks from dismissing overlay
  controlStrip.addEventListener('click', (evt) => {
    evt.stopPropagation();
    if (debug) console.log('[QuadTap] Control strip clicked, propagation stopped');
  });
  
  // Add to overlay as direct child
  overlay.appendChild(controlStrip);
  
  // Set up auto-fade for overlay control strip (not for lightbox)
  if (!isLightbox) {
    let fadeTimeout;
    const fadeControls = () => {
      controlStrip.style.opacity = '0.5';
    };
    
    // Show controls at full opacity on hover
    controlStrip.addEventListener('mouseenter', () => {
      clearTimeout(fadeTimeout);
      controlStrip.style.opacity = '1';
    });
    
    // Fade controls when mouse leaves
    controlStrip.addEventListener('mouseleave', () => {
      clearTimeout(fadeTimeout);
      fadeTimeout = setTimeout(fadeControls, 2000);
    });
    
    // Initial fade after 2 seconds
    controlStrip.style.opacity = '1';
    fadeTimeout = setTimeout(fadeControls, 2000);
  }
  
  // Log positioning information if debug is enabled
  if (debug) {
    console.log('[QuadTap] Control strip created with positioning:', {
      isLightbox,
      className: controlStrip.className,
      zIndex: controlStrip.style.zIndex
    });
    
    // Add a resize observer to log position changes
    if (!isLightbox) {
      const resizeObserver = new ResizeObserver(() => {
        const rect = controlStrip.getBoundingClientRect();
        const overlayRect = overlay.getBoundingClientRect();
        
        // Calculate actual percentage position
        const actualTopPercent = ((rect.top - overlayRect.top + rect.height / 2) / overlayRect.height * 100);
        const actualLeftPercent = (rect.left - overlayRect.left + rect.width / 2) / overlayRect.width * 100;
        
        console.log('[QuadTap] Control strip position after resize:', {
          topPercent: actualTopPercent.toFixed(2) + '%',
          leftPercent: actualLeftPercent.toFixed(2) + '%',
          width: rect.width,
          height: rect.height
        });
      });
      
      resizeObserver.observe(overlay);
    }
  }
  
  return controlStrip;
}

/**
 * Helper function to create a button for the control strip
 * @param {string} text - Button text
 * @param {string} ariaLabel - Accessibility label
 * @param {Function} onClick - Click handler
 * @returns {HTMLElement} The created button
 */
function createButton(text, ariaLabel, onClick) {
  const button = document.createElement('button');
  applyStyles(button, controlStripStyles.button);
  button.textContent = text;
  button.setAttribute('aria-label', ariaLabel);
  
  // Add hover effect
  button.addEventListener('mouseenter', () => {
    applyStyles(button, controlStripStyles.buttonHover);
  });
  
  button.addEventListener('mouseleave', () => {
    button.style.backgroundColor = '';
  });
  
  // Click handler
  button.addEventListener('click', onClick);
  
  return button;
}

/**
 * Updates the play/pause button state
 * @param {HTMLElement} controlStrip - The control strip element
 * @param {boolean} isPlaying - Whether the video is currently playing
 */
function updatePlayPauseButton(controlStrip, isPlaying) {
  const playPauseButton = controlStrip.querySelector('button:nth-child(2)');
  if (playPauseButton) {
    playPauseButton.textContent = isPlaying ? '❚❚' : '▶';
  }
}

/**
 * Shows the control strip
 * @param {HTMLElement} controlStrip - The control strip element
 */
function showControlStrip(controlStrip) {
  controlStrip.style.display = 'flex';
  controlStrip.style.opacity = '1';
  
  // Set up fade timeout if it's an overlay control strip
  if (controlStrip.classList.contains('qt-control-strip--overlay')) {
    setTimeout(() => {
      controlStrip.style.opacity = '0.5';
    }, 2000);
  }
}

/**
 * Hides the control strip
 * @param {HTMLElement} controlStrip - The control strip element
 */
function hideControlStrip(controlStrip) {
  controlStrip.style.opacity = '0';
  setTimeout(() => {
    controlStrip.style.display = 'none';
  }, 300); // Match the transition duration
}

/**
 * Helper function to copy text to clipboard
 * @param {string} text - Text to copy
 */
function copyToClipboard(text) {
  // Use the Clipboard API if available
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).catch(err => {
      console.error('Failed to copy text: ', err);
    });
    return;
  }
  
  // Fallback for older browsers
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';  // Prevent scrolling to bottom
  document.body.appendChild(textarea);
  textarea.select();
  
  try {
    document.execCommand('copy');
  } catch (err) {
    console.error('Failed to copy text: ', err);
  }
  
  document.body.removeChild(textarea);
}

/**
 * Shows a tooltip near an element
 * @param {HTMLElement} element - Element to show tooltip near
 * @param {string} message - Tooltip message
 */
function showTooltip(element, message) {
  // Create tooltip element
  const tooltip = document.createElement('div');
  applyStyles(tooltip, controlStripStyles.tooltip);
  tooltip.textContent = message;
  
  // Position the tooltip above the element
  const rect = element.getBoundingClientRect();
  tooltip.style.top = `${rect.top - 30}px`;
  tooltip.style.left = `${rect.left + rect.width / 2}px`;
  tooltip.style.transform = 'translateX(-50%)';
  
  // Add to document
  document.body.appendChild(tooltip);
  
  // Show tooltip
  setTimeout(() => {
    tooltip.style.opacity = '1';
  }, 10);
  
  // Hide and remove tooltip after 1.5 seconds
  setTimeout(() => {
    tooltip.style.opacity = '0';
    setTimeout(() => {
      document.body.removeChild(tooltip);
    }, 300);
  }, 1500);
}

export {
  createControlStrip,
  updatePlayPauseButton,
  showControlStrip,
  hideControlStrip,
  copyToClipboard,
  showTooltip,
  applyControlStripLayout
};
