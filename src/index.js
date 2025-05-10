/**
 * QuadTap - Interactive Video Overlay Component
 * Main entry point for the QuadTap package
 */

import QuadTap from './QuadTap';
import SettingsBuilder from './SettingsBuilder';
import VideoPlayerAdapter from './adapters/VideoPlayerAdapter.js';
import Coordinates from './utils/coordinates';
import * as ControlStrip from './components/ControlStrip';

// Global flag to indicate QuadTap initialization status
window.quadTapInitialized = false;

// Auto-initialization function
const autoInitialize = () => {
  // If already initialized, don't initialize again
  if (window.quadTapInitialized) {
    console.log('[QuadTap] Already initialized, skipping auto-initialization');
    return;
  }

  // First check for containers with data attribute
  const containers = document.querySelectorAll('[data-quad-tap-auto-init]');
  
  // If no containers with data attribute, check for default container ID
  if (containers.length === 0) {
    const defaultContainer = document.getElementById('main-video-droppable');
    if (defaultContainer) {
      console.log('[QuadTap] Auto-initializing with default container');
      
      // Initialize with default settings
      window.quadTap = new QuadTap();
      
      // Store instance on container for future reference
      defaultContainer.quadTap = window.quadTap;
      
      // Set global initialization flag
      window.quadTapInitialized = true;
      
      // Expose helper functions to global scope for testing and debugging
      window.activateOverlay = (x, y) => {
        if (window.quadTap) {
          // Get container dimensions
          const container = document.getElementById('main-video-droppable');
          if (container) {
            const rect = container.getBoundingClientRect();
            // If x and y are not provided, use center of container
            const posX = x || rect.width / 2;
            const posY = y || rect.height / 2;
            return window.quadTap.activateOverlay(posX, posY);
          }
        }
        return false;
      };
      
      window.openLightBox = () => {
        if (window.quadTap) {
          window.quadTap.openLightBox();
          return true;
        }
        return false;
      };
      
      window.ensureControlStripModuleAvailable = () => {
        // Make sure the updatePlayPauseButton function is available globally
        if (!window.updatePlayPauseButton && ControlStrip.updatePlayPauseButton) {
          window.updatePlayPauseButton = ControlStrip.updatePlayPauseButton;
        }
      };
      
      // Ensure the updatePlayPauseButton function is available globally
      window.ensureControlStripModuleAvailable();
      
      return;
    }
  }
  
  // Process containers with data attribute
  if (containers.length > 0) {
    console.log(`[QuadTap] Auto-initializing ${containers.length} containers`);
    
    containers.forEach(container => {
      // Get container ID
      const containerId = container.id;
      if (!containerId) {
        console.warn('[QuadTap] Container must have an ID for auto-initialization');
        return;
      }
      
      // Get video selector from data attribute or default to 'video'
      const videoSelector = container.getAttribute('data-quad-tap-video-selector') || 'video';
      
      // Get profile image URL if provided
      const profileImageUrl = container.getAttribute('data-quad-tap-profile-image');
      
      // Create settings builder
      const settingsBuilder = new SettingsBuilder()
        .withContainer(containerId)
        .withVideoSelector(videoSelector)
        .withAutoInitialize(true);
      
      // Add profile image if provided
      if (profileImageUrl) {
        settingsBuilder.withProfileBubble({
          imageUrl: profileImageUrl
        });
      }
      
      // Check for custom colors
      const overlayBgColor = container.getAttribute('data-quad-tap-overlay-bg');
      const lightboxBgColor = container.getAttribute('data-quad-tap-lightbox-bg');
      
      if (overlayBgColor || lightboxBgColor) {
        const colorConfig = {};
        
        if (overlayBgColor) {
          colorConfig.overlay = { background: overlayBgColor };
        }
        
        if (lightboxBgColor) {
          colorConfig.lightbox = { background: lightboxBgColor };
        }
        
        settingsBuilder.withColors(colorConfig);
      }
      
      // Initialize QuadTap
      const quadTap = new QuadTap(settingsBuilder.build());
      
      // Store instance on container for future reference
      container.quadTap = quadTap;
      
      // If this is the first container, store it globally
      if (!window.quadTap) {
        window.quadTap = quadTap;
      }
    });
    
    // Set global initialization flag
    window.quadTapInitialized = true;
    
    // Expose helper functions to global scope for testing and debugging
    window.activateOverlay = (x, y) => {
      if (window.quadTap) {
        // Get container dimensions
        const container = document.querySelector('[data-quad-tap-auto-init]') || 
                         document.getElementById('main-video-droppable');
        if (container) {
          const rect = container.getBoundingClientRect();
          // If x and y are not provided, use center of container
          const posX = x || rect.width / 2;
          const posY = y || rect.height / 2;
          return window.quadTap.activateOverlay(posX, posY);
        }
      }
      return false;
    };
    
    window.openLightBox = () => {
      if (window.quadTap) {
        window.quadTap.openLightBox();
        return true;
      }
      return false;
    };
    
    window.ensureControlStripModuleAvailable = () => {
      // Make sure the updatePlayPauseButton function is available globally
      if (!window.updatePlayPauseButton && ControlStrip.updatePlayPauseButton) {
        window.updatePlayPauseButton = ControlStrip.updatePlayPauseButton;
      }
    };
    
    // Ensure the updatePlayPauseButton function is available globally
    window.ensureControlStripModuleAvailable();
  }
};

// Run auto-initialization when DOM is ready
if (typeof document !== 'undefined') {
  // Try to initialize on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoInitialize);
  } else {
    // DOM already loaded, run auto-initialization immediately
    autoInitialize();
  }
  
  // Also try to initialize on window load as a fallback
  // This helps with cases where the video element might be loaded dynamically
  window.addEventListener('load', () => {
    if (!window.quadTapInitialized) {
      console.log('[QuadTap] Attempting initialization on window load');
      autoInitialize();
    }
  });
  
  // Final attempt after a short delay to catch any late-loading elements
  setTimeout(() => {
    if (!window.quadTapInitialized) {
      console.log('[QuadTap] Final attempt to initialize QuadTap...');
      autoInitialize();
    }
  }, 1000);
  
  // Force initialization if it hasn't happened after 2 seconds
  // This is a fallback for cases where the container might be dynamically added
  setTimeout(() => {
    if (!window.quadTapInitialized) {
      console.log('[QuadTap] Forcing initialization...');
      // Try to find any video container
      const containers = document.querySelectorAll('[data-quad-tap-auto-init]');
      const defaultContainer = document.getElementById('main-video-droppable');
      
      if (containers.length > 0 || defaultContainer) {
        console.log('[QuadTap] Found container, initializing...');
        autoInitialize();
      } else {
        console.log('[QuadTap] No container found, creating default container...');
        // Create a default container if none exists
        const videoElements = document.querySelectorAll('video');
        if (videoElements.length > 0) {
          const video = videoElements[0];
          const parent = video.parentElement;
          
          // Create a wrapper div with the default ID
          const wrapper = document.createElement('div');
          wrapper.id = 'main-video-droppable';
          wrapper.style.position = 'relative';
          
          // Replace the video with the wrapper and add the video inside
          parent.replaceChild(wrapper, video);
          wrapper.appendChild(video);
          
          console.log('[QuadTap] Created default container, initializing...');
          autoInitialize();
        }
      }
    }
  }, 2000);
}

// Export the main QuadTap class as default
export default QuadTap;

// Export additional classes and utilities
export {
  SettingsBuilder,
  VideoPlayerAdapter,
  Coordinates,
  ControlStrip,
  autoInitialize
};

// Example usage:
/*
// Using the default constructor
const quadTap = new QuadTap({
  containerId: 'video-container',
  videoSelector: '#my-video'
});

// Using the settings builder
import { QuadTap, SettingsBuilder, VideoPlayerAdapter, Coordinates } from 'quad-tap';

// Create a video player adapter
const videoAdapter = VideoPlayerAdapter.forHtml5Video(
  document.querySelector('#my-video'),
  true // debug mode
);

// Build settings with fluent interface
const settings = new SettingsBuilder()
  .withContainer('video-container')
  .withVideoSelector('#my-video')
  .withDebug(true)
  .withAutoCancelTimeout(3000)
  .withQuadrantEmojis({
    topLeft: "🕊️",
    topRight: "🌟",
    bottomLeft: "🌧️",
    bottomRight: "💥"
  })
  .withVideoPlayerApi({
    enabled: true,
    playMethod: () => videoAdapter.play(),
    pauseMethod: () => videoAdapter.pause(),
    seekMethod: (time) => videoAdapter.seek(time),
    getCurrentTimeMethod: () => videoAdapter.getCurrentTime(),
    getDurationMethod: () => videoAdapter.getDuration(),
    getVideoIdMethod: () => videoAdapter.getVideoId()
  })
  .withCoordinateSystem({
    type: 'normalized', // 'normalized', 'percentage', or 'absolute'
    storeMetadata: true // Include container dimensions in stored data
  })
  .onOverlayActivate((coordinates) => {
    console.log('Overlay activated at', coordinates);
    // coordinates contains both absolute and normalized positions
  })
  .onThrowDownConfirm((quadrant, coordinates, videoInfo) => {
    console.log('Throw-down confirmed in', quadrant);
    console.log('Coordinates:', coordinates);
    console.log('Video info:', videoInfo);
  })
  .build();

// Initialize QuadTap with the settings
const quadTap = new QuadTap(settings);

// Using the Coordinates utility directly
const containerWidth = 800;
const containerHeight = 600;
const absoluteX = 400;
const absoluteY = 300;

// Convert to normalized coordinates (0-1)
const { normalizedX, normalizedY } = Coordinates.normalize(
  absoluteX, 
  absoluteY, 
  containerWidth, 
  containerHeight
);

// Get the quadrant
const quadrant = Coordinates.getQuadrant(normalizedX, normalizedY);

// Create a complete coordinate data object
const coordinateData = Coordinates.createData(
  absoluteX,
  absoluteY,
  containerWidth,
  containerHeight
);
*/
