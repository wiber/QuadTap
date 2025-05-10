/**
 * UnifiedControlStrip Component
 * A unified control strip that can be used in both overlay and lightbox contexts
 */

import { createElement } from '../helpers/dom';
import { layoutControlStrip } from '../helpers/layout';

/**
 * Create a unified control strip
 * @param {Object} options - Configuration options
 * @param {HTMLElement} options.container - The container element
 * @param {HTMLElement} options.video - The video element
 * @param {number} options.rewindTime - Time in seconds to rewind
 * @param {number} options.forwardTime - Time in seconds to forward
 * @param {boolean} options.debug - Enable debug logging
 * @returns {Object} The control strip object with element and methods
 */
export function createUnifiedControlStrip(options) {
  const {
    container,
    video,
    rewindTime = 30,
    forwardTime = 30,
    debug = false
  } = options;
  
  // Log function for debugging
  const log = (message, data) => {
    if (debug) {
      console.log(`[UnifiedControlStrip] ${message}`, data || '');
    }
  };
  
  log('Creating unified control strip', options);
  
  // Create control strip container
  const controlStrip = createElement('div', {
    className: 'qt-control-strip',
    styles: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      borderRadius: '4px',
      color: 'white'
    }
  });
  
  // Create time display
  const timeDisplay = createElement('div', {
    className: 'qt-time-display',
    styles: {
      fontSize: '14px',
      marginRight: '10px',
      minWidth: '80px',
      textAlign: 'center'
    }
  });
  
  // Create buttons container
  const buttonsContainer = createElement('div', {
    className: 'qt-buttons-container',
    styles: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flex: '1'
    }
  });
  
  // Check if we're on a mobile device
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 768;
  
  // Check orientation - true if portrait (height > width)
  const isPortrait = window.innerHeight > window.innerWidth;
  
  // Calculate responsive font size based on device and orientation
  const getResponsiveButtonStyles = (isLarge = false) => {
    // Base font size
    let fontSize = isLarge ? 24 : 20;
    
    // Adjust for mobile
    if (isMobile) {
      fontSize = isLarge ? 22 : 18;
      
      // Further adjust for portrait orientation
      if (isPortrait) {
        fontSize = isLarge ? 20 : 16;
      }
    }
    
    return {
      backgroundColor: 'transparent',
      border: 'none',
      color: 'white',
      fontSize: `${fontSize}px`,
      cursor: 'pointer',
      padding: '5px 10px',
      margin: '0 5px',
      transition: 'transform 0.2s ease, font-size 0.3s ease'
    };
  };
  
  // Create rewind button
  const rewindButton = createElement('button', {
    className: 'qt-control-button qt-rewind-button',
    text: '⏪',
    attributes: {
      'data-cmd': 'seek:-30',
      'title': `Rewind ${rewindTime} seconds`
    },
    styles: getResponsiveButtonStyles()
  });
  
  // Create play/pause button
  const playPauseButton = createElement('button', {
    className: 'qt-control-button qt-play-pause-button',
    text: '▶️',
    attributes: {
      'data-cmd': 'play',
      'title': 'Play/Pause'
    },
    styles: getResponsiveButtonStyles(true) // Larger size for play/pause
  });
  
  // Create forward button
  const forwardButton = createElement('button', {
    className: 'qt-control-button qt-forward-button',
    text: '⏩',
    attributes: {
      'data-cmd': 'seek:+30',
      'title': `Forward ${forwardTime} seconds`
    },
    styles: getResponsiveButtonStyles()
  });
  
  // Create share button
  const shareButton = createElement('button', {
    className: 'qt-control-button qt-share-button',
    text: '📤',
    attributes: {
      'data-cmd': 'share',
      'title': 'Share'
    },
    styles: getResponsiveButtonStyles()
  });
  
  // Create copy URL button
  const copyUrlButton = createElement('button', {
    className: 'qt-control-button qt-copy-url-button',
    text: '🔗',
    attributes: {
      'data-cmd': 'copyurl',
      'title': 'Copy URL'
    },
    styles: getResponsiveButtonStyles()
  });
  
  // Create slider container
  const sliderContainer = createElement('div', {
    className: 'qt-slider-container',
    styles: {
      width: '100%',
      padding: '10px 0',
      display: 'flex',
      flexDirection: 'column'
    }
  });
  
  // Create slider
  const slider = createElement('input', {
    className: 'qt-video-slider',
    attributes: {
      'type': 'range',
      'min': '0',
      'max': '100',
      'value': '0',
      'step': '0.1'
    },
    styles: {
      width: '100%',
      margin: '5px 0',
      cursor: 'pointer'
    }
  });
  
  // Add buttons to container
  buttonsContainer.appendChild(rewindButton);
  buttonsContainer.appendChild(playPauseButton);
  buttonsContainer.appendChild(forwardButton);
  buttonsContainer.appendChild(shareButton);
  buttonsContainer.appendChild(copyUrlButton);
  
  // Add elements to control strip
  controlStrip.appendChild(timeDisplay);
  controlStrip.appendChild(buttonsContainer);
  
  // Store references to elements
  const elements = {
    controlStrip,
    timeDisplay,
    buttonsContainer,
    rewindButton,
    playPauseButton,
    forwardButton,
    shareButton,
    copyUrlButton,
    sliderContainer,
    slider
  };
  
  // Event handlers
  let eventHandlers = {};
  
  // Bind events to control strip buttons
  function bindEvents() {
    log('Binding events');
    
    // Unbind any existing events first
    unbindEvents();
    
    // Play/pause button
    eventHandlers.playPause = () => {
      log('Play/pause clicked');
      if (video) {
        if (video.paused) {
          video.play()
            .then(() => {
              updatePlayPauseButton(true);
            })
            .catch(err => {
              log('Error playing video', err);
            });
        } else {
          video.pause();
          updatePlayPauseButton(false);
        }
      }
    };
    playPauseButton.addEventListener('click', eventHandlers.playPause);
    
    // Rewind button
    eventHandlers.rewind = () => {
      log('Rewind clicked');
      if (video) {
        video.currentTime = Math.max(0, video.currentTime - rewindTime);
        updateTimeDisplay();
      }
    };
    rewindButton.addEventListener('click', eventHandlers.rewind);
    
    // Forward button
    eventHandlers.forward = () => {
      log('Forward clicked');
      if (video) {
        video.currentTime = Math.min(video.duration, video.currentTime + forwardTime);
        updateTimeDisplay();
      }
    };
    forwardButton.addEventListener('click', eventHandlers.forward);
    
    // Share button
    eventHandlers.share = () => {
      log('Share clicked');
      if (navigator.share) {
        navigator.share({
          title: 'Shared Video',
          text: 'Check out this video!',
          url: window.location.href
        }).catch(err => {
          log('Share failed', err);
        });
      } else {
        alert('Share feature not supported by your browser');
      }
    };
    shareButton.addEventListener('click', eventHandlers.share);
    
    // Copy URL button
    eventHandlers.copyUrl = () => {
      log('Copy URL clicked');
      const url = window.location.href;
      navigator.clipboard.writeText(url)
        .then(() => {
          alert('URL copied to clipboard');
        })
        .catch(err => {
          log('Copy failed', err);
          // Fallback
          const input = document.createElement('input');
          input.value = url;
          document.body.appendChild(input);
          input.select();
          document.execCommand('copy');
          document.body.removeChild(input);
          alert('URL copied to clipboard');
        });
    };
    copyUrlButton.addEventListener('click', eventHandlers.copyUrl);
    
    // Slider input
    eventHandlers.sliderInput = (evt) => {
      if (video) {
        const seekTime = (evt.target.value / 100) * video.duration;
        video.currentTime = seekTime;
        updateTimeDisplay();
      }
    };
    slider.addEventListener('input', eventHandlers.sliderInput);
    
    // Video timeupdate event
    eventHandlers.timeUpdate = () => {
      updateTimeDisplay();
    };
    if (video) {
      video.addEventListener('timeupdate', eventHandlers.timeUpdate);
    }
    
    // Video play event
    eventHandlers.videoPlay = () => {
      updatePlayPauseButton(true);
    };
    if (video) {
      video.addEventListener('play', eventHandlers.videoPlay);
    }
    
    // Video pause event
    eventHandlers.videoPause = () => {
      updatePlayPauseButton(false);
    };
    if (video) {
      video.addEventListener('pause', eventHandlers.videoPause);
    }
  }
  
  // Unbind events
  function unbindEvents() {
    log('Unbinding events');
    
    if (eventHandlers.playPause) {
      playPauseButton.removeEventListener('click', eventHandlers.playPause);
    }
    
    if (eventHandlers.rewind) {
      rewindButton.removeEventListener('click', eventHandlers.rewind);
    }
    
    if (eventHandlers.forward) {
      forwardButton.removeEventListener('click', eventHandlers.forward);
    }
    
    if (eventHandlers.share) {
      shareButton.removeEventListener('click', eventHandlers.share);
    }
    
    if (eventHandlers.copyUrl) {
      copyUrlButton.removeEventListener('click', eventHandlers.copyUrl);
    }
    
    if (eventHandlers.sliderInput) {
      slider.removeEventListener('input', eventHandlers.sliderInput);
    }
    
    if (video && eventHandlers.timeUpdate) {
      video.removeEventListener('timeupdate', eventHandlers.timeUpdate);
    }
    
    if (video && eventHandlers.videoPlay) {
      video.removeEventListener('play', eventHandlers.videoPlay);
    }
    
    if (video && eventHandlers.videoPause) {
      video.removeEventListener('pause', eventHandlers.videoPause);
    }
    
    // Reset event handlers
    eventHandlers = {};
  }
  
  // Update play/pause button state
  function updatePlayPauseButton(isPlaying) {
    if (isPlaying) {
      playPauseButton.textContent = '⏸️';
      playPauseButton.setAttribute('title', 'Pause');
    } else {
      playPauseButton.textContent = '▶️';
      playPauseButton.setAttribute('title', 'Play');
    }
  }
  
  // Update time display
  function updateTimeDisplay() {
    if (!video) return;
    
    // Format time
    const formatTime = (seconds) => {
      if (isNaN(seconds) || !isFinite(seconds)) return '0:00';
      
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };
    
    const currentTime = formatTime(video.currentTime);
    const duration = formatTime(video.duration);
    
    // Update time display
    timeDisplay.textContent = `${currentTime} / ${duration}`;
    
    // Update slider position
    if (video.duration) {
      const percent = (video.currentTime / video.duration) * 100;
      slider.value = percent;
    }
  }
  
  // Set mode (overlay or lightbox)
  function setMode(mode, container) {
    log(`Setting mode to ${mode}`);
    
    // Apply layout based on mode
    layoutControlStrip(controlStrip, mode, container);
    
    // Show/hide elements based on mode
    if (mode === 'overlay') {
      // In overlay mode, hide slider and some buttons
      if (sliderContainer.parentNode === controlStrip) {
        controlStrip.removeChild(sliderContainer);
      }
      
      // Hide share and copy URL buttons in overlay mode
      shareButton.style.display = 'none';
      copyUrlButton.style.display = 'none';
    } else if (mode === 'lightbox') {
      // In lightbox mode, show slider and all buttons
      if (sliderContainer.parentNode !== controlStrip) {
        // Add slider before buttons
        controlStrip.insertBefore(sliderContainer, buttonsContainer);
      }
      
      // Show share and copy URL buttons in lightbox mode
      shareButton.style.display = 'block';
      copyUrlButton.style.display = 'block';
    }
    
    // Update time display
    updateTimeDisplay();
    
    // Update play/pause button state
    if (video) {
      updatePlayPauseButton(!video.paused);
    }
  }
  
  // Initialize
  function init() {
    log('Initializing');
    
    // Set initial state
    updateTimeDisplay();
    if (video) {
      updatePlayPauseButton(!video.paused);
    }
    
    // Bind events
    bindEvents();
  }
  
  // Initialize
  init();
  
  // Return public API
  return {
    element: controlStrip,
    bindEvents,
    unbindEvents,
    setMode,
    updateTimeDisplay,
    updatePlayPauseButton
  };
}
