/**
 * Quad-Tap Overlay - Core Implementation
 * A pure JavaScript implementation with no dependencies
 * 
 * Key features:
 * 1. Proper bubble positioning at exact tap location
 * 2. Correct emoji grid layout with 2x2 table structure
 * 3. Proper variable naming to avoid redeclaration
 * 4. Single event handler with state checking
 * 5. All styles injected via JavaScript
 * 6. Video controls (play/pause, rewind, forward, share)
 * 7. Directional and quadrant emojis with proper scaling
 * 8. Enhanced usability with tooltips and clear guidance
 */

import { injectStyles } from './styles/overlay.js';
import { createElement, positionElementWithCenterMaintained, getQuadrant } from './helpers/dom.js';
import { saveToStorage, getFromStorage, saveThrowDownContext } from './helpers/storage.js';
import { throttle } from './helpers/events.js';
import { pauseIfPlaying, resumeIfNeeded, alwaysResume } from './helpers/video.js';
import { layoutControlStrip } from './helpers/layout.js';
import { createUnifiedControlStrip } from './components/UnifiedControlStrip.js';
import { createControlStrip, updatePlayPauseButton } from './components/ControlStrip.js';

/**
 * Default configuration
 */
const DEFAULT_CONFIG = {
  containerId: "main-video-droppable",
  videoSelector: "#main-video",
  autoCancelTimeout: 5000,
  debug: true,
  emojis: {
    quadrants: {
      topLeft: "🕊️",
      topRight: "🌟",
      bottomLeft: "🌧️",
      bottomRight: "💥"
    },
    directional: {
      up: "🚀",
      right: "👑",
      down: "⬇️",
      left: "🤫"
    },
    thoughts: {
      topLeft: ["🌸", "🎈", "🌦️", "🛤️"],
      topRight: ["🌈", "✨", "🌤️", "🎆"],
      bottomLeft: ["🍂", "🌙", "☔", "🗿"],
      bottomRight: ["⚖️", "🏆", "⛈️", "💣"]
    }
  },
  videoControls: {
    enabled: true,
    rewindTime: 30,
    forwardTime: 30
  },
  callbacks: {
    onOverlayActivate: null,
    onThrowDownInitiate: null,
    onThrowDownConfirm: null,
    onThrowDownCancel: null,
    onVideoControl: null
  }
};

/**
 * QuadTap class
 */
class QuadTap {
  /**
   * Constructor
   * @param {Object} customConfig - Custom configuration options
   */
  constructor(customConfig = {}) {
    // Merge custom config with defaults
    this.config = Object.assign({}, DEFAULT_CONFIG, customConfig);
    
    // Deep merge for nested objects
    if (customConfig.emojis) {
      this.config.emojis = Object.assign({}, DEFAULT_CONFIG.emojis, customConfig.emojis);
      
      if (customConfig.emojis.quadrants) {
        this.config.emojis.quadrants = Object.assign({}, DEFAULT_CONFIG.emojis.quadrants, customConfig.emojis.quadrants);
      }
      
      if (customConfig.emojis.directional) {
        this.config.emojis.directional = Object.assign({}, DEFAULT_CONFIG.emojis.directional, customConfig.emojis.directional);
      }
      
      if (customConfig.emojis.thoughts) {
        this.config.emojis.thoughts = Object.assign({}, DEFAULT_CONFIG.emojis.thoughts, customConfig.emojis.thoughts);
      }
    }
    
    if (customConfig.videoControls) {
      this.config.videoControls = Object.assign({}, DEFAULT_CONFIG.videoControls, customConfig.videoControls);
    }
    
    // Handle profile bubble settings
    if (customConfig.profileBubble) {
      this.config.profileBubble = Object.assign({}, {
        imageUrl: null,
        fallbackEmoji: '👤',
        size: '60px',
        borderColor: 'white',
        borderWidth: '2px',
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
      }, customConfig.profileBubble);
    } else {
      this.config.profileBubble = {
        imageUrl: null,
        fallbackEmoji: '👤',
        size: '60px',
        borderColor: 'white',
        borderWidth: '2px',
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
      };
    }
    
    // Handle color settings
    if (customConfig.colors) {
      this.config.colors = {
        overlay: {
          background: 'rgba(240, 240, 245, 0.5)', // Light background instead of black
          quadrantGradients: {
            topLeft: 'rgba(0, 255, 255, 1)', // Full opacity cyan
            topRight: 'rgba(255, 255, 0, 1)', // Full opacity yellow
            bottomLeft: 'rgba(0, 255, 0, 1)', // Full opacity green
            bottomRight: 'rgba(255, 0, 255, 1)' // Full opacity magenta
          }
        },
        lightbox: {
          background: 'rgba(20, 30, 40, 0.95)', // Improved dark blue background instead of black
          text: 'white',
          headerBackground: 'rgba(30, 40, 60, 0.8)', // Matching dark blue header
          buttonPrimary: '#4CAF50',
          buttonSecondary: '#f44336'
        }
      };
      
      // Deep merge overlay colors
      if (customConfig.colors.overlay) {
        this.config.colors.overlay = Object.assign({}, this.config.colors.overlay, customConfig.colors.overlay);
        
        // Deep merge quadrant gradients
        if (customConfig.colors.overlay.quadrantGradients) {
          this.config.colors.overlay.quadrantGradients = Object.assign(
            {}, 
            this.config.colors.overlay.quadrantGradients, 
            customConfig.colors.overlay.quadrantGradients
          );
        }
      }
      
      // Deep merge lightbox colors
      if (customConfig.colors.lightbox) {
        this.config.colors.lightbox = Object.assign({}, this.config.colors.lightbox, customConfig.colors.lightbox);
      }
    } else {
      this.config.colors = {
        overlay: {
          background: 'rgba(240, 240, 245, 0.5)', // Light background instead of black
          quadrantGradients: {
            topLeft: 'rgba(0, 255, 255, 1)', // Full opacity cyan
            topRight: 'rgba(255, 255, 0, 1)', // Full opacity yellow
            bottomLeft: 'rgba(0, 255, 0, 1)', // Full opacity green
            bottomRight: 'rgba(255, 0, 255, 1)' // Full opacity magenta
          }
        },
        lightbox: {
          background: 'rgba(20, 30, 40, 0.95)', // Improved dark blue background instead of black
          text: 'white',
          headerBackground: 'rgba(30, 40, 60, 0.8)', // Matching dark blue header
          buttonPrimary: '#4CAF50',
          buttonSecondary: '#f44336'
        }
      };
    }
    
    // State management
    this.state = {
      active: false,
      profileBubblePosition: { x: 0, y: 0 },
      currentQuadrant: null,
      autoCancelTimer: null,
      containerDimensions: { width: 0, height: 0 },
      videoPlaying: false,
      wasPlayingBefore: false,
      recording: false,
      mediaStream: null,
      mediaRecorder: null,
      recordingStartTime: 0,
      recordingIndicator: null
    };
    
    // Elements
    this.elements = {
      container: null,
      video: null,
      overlay: null,
      profileBubble: null,
      directionalEmojis: {},
      quadrantEmojis: {},
      videoControls: null,
      tooltip: null,
      lightBox: null,
      lightBoxContent: null,
      emojiGrid: null,
      commentBox: null
    };
    
    // Throttled functions
    this.throttledResize = throttle(this.handleResize.bind(this), 100);
    
    // Initialize
    this.init();
  }

  /**
   * Log events for debugging
   * @param {string} message - Log message
   * @param {*} data - Optional data to log
   */
  log(message, data) {
    if (this.config.debug) {
      console.log(`[QuadTap] ${message}`, data || '');
    }
  }

  /**
   * Initialize the component
   */
  init() {
    this.log('Initializing QuadTap');
    
    // Get container element
    const container = document.getElementById(this.config.containerId);
    if (!container) {
      this.log('Container not found', this.config.containerId);
      return;
    }
    
    this.elements.container = container;
    
    // Inject CSS styles
    injectStyles();
    
    // Create overlay elements
    this.createOverlayElements();
    
    // Create light-box elements
    this.createLightBoxElements();
    
    // Bind event handlers
    this.bindEventHandlers();
    
    this.log('QuadTap initialized successfully');
  }
  
  /**
   * Create overlay elements
   */
  createOverlayElements() {
    // Create overlay container with custom background color
    const overlayContainer = createElement('div', { 
      className: 'quad-tap-overlay',
      styles: { 
        display: 'none',
        backgroundColor: this.config.colors.overlay.background
      }
    });
    
    // Create close button for overlay
    const closeButton = createElement('div', {
      className: 'overlay-close-btn',
      html: '&times;',
      styles: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        width: '30px',
        height: '30px',
        borderRadius: '50%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '20px',
        cursor: 'pointer',
        zIndex: '1002'
      },
      events: {
        click: (evt) => {
          this.deactivateOverlay();
          evt.stopPropagation();
        }
      }
    });
    
    // Create quadrants with custom gradient colors
    const topLeftQuadrant = createElement('div', { 
      className: 'quadrant top-left',
      styles: {
        background: `radial-gradient(circle at 0% 0%, ${this.config.colors.overlay.quadrantGradients.topLeft}, transparent 70%)`
      }
    });
    
    const topRightQuadrant = createElement('div', { 
      className: 'quadrant top-right',
      styles: {
        background: `radial-gradient(circle at 100% 0%, ${this.config.colors.overlay.quadrantGradients.topRight}, transparent 70%)`
      }
    });
    
    const bottomLeftQuadrant = createElement('div', { 
      className: 'quadrant bottom-left',
      styles: {
        background: `radial-gradient(circle at 0% 100%, ${this.config.colors.overlay.quadrantGradients.bottomLeft}, transparent 70%)`
      }
    });
    
    const bottomRightQuadrant = createElement('div', { 
      className: 'quadrant bottom-right',
      styles: {
        background: `radial-gradient(circle at 100% 100%, ${this.config.colors.overlay.quadrantGradients.bottomRight}, transparent 70%)`
      }
    });
    
    // Create profile bubble with custom styling (initially hidden)
    const profileBubbleStyles = {
      display: 'none',
      width: this.config.profileBubble.size,
      height: this.config.profileBubble.size,
      borderColor: this.config.profileBubble.borderColor,
      borderWidth: this.config.profileBubble.borderWidth,
      backgroundColor: this.config.profileBubble.backgroundColor,
      borderStyle: 'solid',
      borderRadius: '50%',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '24px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
      cursor: 'pointer',
      zIndex: '1000'
    };
    
    // If profile image URL is provided, use it as background image
    if (this.config.profileBubble.imageUrl) {
      profileBubbleStyles.backgroundImage = `url(${this.config.profileBubble.imageUrl})`;
      profileBubbleStyles.backgroundSize = 'cover';
      profileBubbleStyles.backgroundPosition = 'center';
      profileBubbleStyles.fontSize = '0'; // Hide the emoji
    }
    
    const profileBubble = createElement('div', { 
      className: 'profile-bubble',
      text: this.config.profileBubble.imageUrl ? '' : this.config.profileBubble.fallbackEmoji,
      styles: profileBubbleStyles
    });
    
    // Create directional emojis
    const upEmoji = createElement('div', {
      className: 'directional-emoji up',
      text: this.config.emojis.directional.up,
      styles: { display: 'none' }
    });
    
    const rightEmoji = createElement('div', {
      className: 'directional-emoji right',
      text: this.config.emojis.directional.right,
      styles: { display: 'none' }
    });
    
    const downEmoji = createElement('div', {
      className: 'directional-emoji down',
      text: this.config.emojis.directional.down,
      styles: { display: 'none' }
    });
    
    const leftEmoji = createElement('div', {
      className: 'directional-emoji left',
      text: this.config.emojis.directional.left,
      styles: { display: 'none' }
    });
    
    // Create quadrant emojis
    const topLeftEmoji = createElement('div', {
      className: 'quadrant-emoji top-left',
      text: this.config.emojis.quadrants.topLeft,
      styles: { display: 'none' }
    });
    
    const topRightEmoji = createElement('div', {
      className: 'quadrant-emoji top-right',
      text: this.config.emojis.quadrants.topRight,
      styles: { display: 'none' }
    });
    
    const bottomLeftEmoji = createElement('div', {
      className: 'quadrant-emoji bottom-left',
      text: this.config.emojis.quadrants.bottomLeft,
      styles: { display: 'none' }
    });
    
    const bottomRightEmoji = createElement('div', {
      className: 'quadrant-emoji bottom-right',
      text: this.config.emojis.quadrants.bottomRight,
      styles: { display: 'none' }
    });
    
    // Create video controls
    const videoControls = this.createVideoControls();
    
    // Create tooltip
    const tooltip = createElement('div', {
      className: 'tooltip',
      text: 'Tap elsewhere to cancel',
      styles: { display: 'none' }
    });
    
    // Append elements to container
    overlayContainer.appendChild(closeButton);
    overlayContainer.appendChild(topLeftQuadrant);
    overlayContainer.appendChild(topRightQuadrant);
    overlayContainer.appendChild(bottomLeftQuadrant);
    overlayContainer.appendChild(bottomRightQuadrant);
    
    overlayContainer.appendChild(upEmoji);
    overlayContainer.appendChild(rightEmoji);
    overlayContainer.appendChild(downEmoji);
    overlayContainer.appendChild(leftEmoji);
    
    overlayContainer.appendChild(topLeftEmoji);
    overlayContainer.appendChild(topRightEmoji);
    overlayContainer.appendChild(bottomLeftEmoji);
    overlayContainer.appendChild(bottomRightEmoji);
    
    overlayContainer.appendChild(profileBubble);
    overlayContainer.appendChild(videoControls);
    overlayContainer.appendChild(tooltip);
    
    // Append overlay to container
    this.elements.container.appendChild(overlayContainer);
    
    // Store references
    this.elements.overlay = overlayContainer;
    this.elements.profileBubble = profileBubble;
    this.elements.directionalEmojis = {
      up: upEmoji,
      right: rightEmoji,
      down: downEmoji,
      left: leftEmoji
    };
    this.elements.quadrantEmojis = {
      topLeft: topLeftEmoji,
      topRight: topRightEmoji,
      bottomLeft: bottomLeftEmoji,
      bottomRight: bottomRightEmoji
    };
    this.elements.videoControls = videoControls;
    this.elements.tooltip = tooltip;
  }
  
  /**
   * Create video controls with enhanced state management
   * @param {boolean} isLightbox - Whether this is for the lightbox context
   * @returns {HTMLElement} The video controls element
   */
  createVideoControls(isLightbox = false) {
    if (!this.config.videoControls.enabled) {
      return createElement('div', { styles: { display: 'none' } });
    }
    
    // Use the imported createControlStrip function
    
    // Get video element
    const video = document.querySelector(this.config.videoSelector);
    
    // Create control strip using the original ControlStrip component
    const controlStrip = createControlStrip({
      overlay: isLightbox ? 
        (this.elements.lightBoxContent || document.createElement('div')) : 
        (this.elements.overlay || document.createElement('div')),
      onPlay: () => {
        if (video) {
          video.play();
        }
      },
      onPause: () => {
        if (video) {
          video.pause();
        }
      },
      onRewind: () => {
        if (video) {
          video.currentTime = Math.max(0, video.currentTime - this.config.videoControls.rewindTime);
        }
      },
      onForward: () => {
        if (video) {
          video.currentTime = Math.min(video.duration, video.currentTime + this.config.videoControls.forwardTime);
        }
      },
      rewindTime: this.config.videoControls.rewindTime,
      forwardTime: this.config.videoControls.forwardTime,
      debug: this.config.debug,
      showAllButtons: true, // Show all buttons in both overlay and lightbox
      isLightbox: isLightbox
    });
    
    // Initially hide the control strip if it's for the overlay
    if (!isLightbox) {
      controlStrip.style.display = 'none';
    }
    
    // Store reference to the control strip
    this.elements.videoControlsObj = {
      element: controlStrip,
      setMode: (mode, container) => {
        // Apply appropriate styles based on mode using the imported function
        layoutControlStrip(controlStrip, mode === 'lightbox', container || this.elements.container);
      },
      updateTimeDisplay: () => {
        // No-op as the original control strip doesn't have this method
      },
      updatePlayPauseButton: (isPlaying) => {
        // Update play/pause button state using the imported function
        updatePlayPauseButton(controlStrip, isPlaying);
      }
    };
    
    // Return the element for backward compatibility
    return controlStrip;
  }
  
  /**
   * Create control strip for lightbox
   * @returns {HTMLElement} The lightbox control strip element
   */
  createLightboxControlStrip() {
    if (!this.config.videoControls.enabled) {
      return createElement('div', { styles: { display: 'none' } });
    }
    
    // Create a container for the lightbox control strip
    const lightboxControlContainer = createElement('div', {
      className: 'td-lightbox-controls',
      styles: {
        width: '100%',
        padding: '10px 0',
        marginTop: '10px',
        marginBottom: '10px',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        flexDirection: 'column'
      }
    });
    
    // Use the imported createControlStrip and updatePlayPauseButton functions
    
    // Get video element
    const video = document.querySelector(this.config.videoSelector);
    
    // Create control strip using the original ControlStrip component
    const controlStrip = createControlStrip({
      overlay: this.elements.lightBoxContent || document.createElement('div'),
      onPlay: () => {
        if (video) {
          video.play();
        }
      },
      onPause: () => {
        if (video) {
          video.pause();
        }
      },
      onRewind: () => {
        if (video) {
          video.currentTime = Math.max(0, video.currentTime - this.config.videoControls.rewindTime);
        }
      },
      onForward: () => {
        if (video) {
          video.currentTime = Math.min(video.duration, video.currentTime + this.config.videoControls.forwardTime);
        }
      },
      rewindTime: this.config.videoControls.rewindTime,
      forwardTime: this.config.videoControls.forwardTime,
      debug: this.config.debug,
      showAllButtons: true, // Show all buttons in lightbox
      isLightbox: true
    });
    
    // Store reference to the control strip object
    this.elements.lightboxControlStripObj = {
      element: controlStrip,
      updateTimeDisplay: () => {
        // No-op as the original control strip doesn't have this method
      },
      updatePlayPauseButton: (isPlaying) => {
        // Update play/pause button state
        updatePlayPauseButton(controlStrip, isPlaying);
      }
    };
    
    // Store reference to the control strip element
    this.elements.lightboxControlStrip = controlStrip;
    
    // Append the control strip to the container
    lightboxControlContainer.appendChild(controlStrip);
    
    return lightboxControlContainer;
  }
  
  /**
   * Create light-box elements
   */
  createLightBoxElements() {
    // Create light-box modal
    const lightBoxModal = createElement('div', {
      id: 'throwdown-modal',
      className: 'td-modal'
    });
    
    const lightBoxContent = createElement('div', {
      className: 'td-modal-content',
      styles: {
        backgroundColor: this.config.colors.lightbox.background,
        color: this.config.colors.lightbox.text
      }
    });
    
    const lightBoxHeader = createElement('div', {
      className: 'td-modal-header',
      styles: {
        backgroundColor: this.config.colors.lightbox.headerBackground
      }
    });
    
    const lightBoxTitle = createElement('h4', {
      text: 'Share Your Thoughts'
    });
    
    const closeButton = createElement('button', {
      className: 'td-close-btn',
      html: '&times;',
      events: {
        click: (evt) => {
          this.closeLightBox();
          evt.stopPropagation();
        }
      }
    });
    
    // Create video info display
    const videoInfoDisplay = createElement('div', {
      className: 'td-video-info',
      styles: {
        fontSize: '14px',
        color: '#888',
        marginRight: '10px'
      }
    });
    
    lightBoxHeader.appendChild(lightBoxTitle);
    lightBoxHeader.appendChild(videoInfoDisplay);
    lightBoxHeader.appendChild(closeButton);
    
    // Create emoji grid with 2x2 table layout
    const emojiGrid = this.createEmojiGrid();
    
    // Create comment box
    const commentBox = createElement('div', {
      className: 'comment-box'
    });
    
    const commentTextarea = createElement('textarea', {
      placeholder: 'Add a comment (optional)',
      attributes: {
        'rows': 3,
        'maxlength': 500
      },
      events: {
        input: (evt) => {
          const comment = evt.target.value;
          
          // Extract URLs from comment text
          const extractedUrl = this.extractUrlFromText(comment);
          if (extractedUrl) {
            saveToStorage('extractedUrl', extractedUrl);
          }
          
          // Save comment to storage
          saveToStorage('comment', comment);
          
          // Save event to history immediately
          this.saveEventToHistory({
            type: 'comment_update',
            comment: comment,
            extractedUrl: extractedUrl
          });
        }
      }
    });
    
    commentBox.appendChild(commentTextarea);
    
    // Create video upload/capture buttons
    const mediaButtons = createElement('div', {
      className: 'media-buttons'
    });
    
    const uploadButton = createElement('button', {
      className: 'media-button upload-button',
      text: '📤 Upload Video',
      events: {
        click: (evt) => {
          // Create a file input element
          const fileInput = createElement('input', {
            attributes: {
              'type': 'file',
              'accept': 'video/*'
            },
            events: {
              change: (e) => {
                const file = e.target.files[0];
                if (file) {
                  this.log('Video file selected', file.name);
                  // Save file info to storage
                  saveToStorage('uploadedVideo', file.name);
                  
                  // Show file name in the UI
                  const fileNameDisplay = document.createElement('div');
                  fileNameDisplay.className = 'uploaded-file-name';
                  fileNameDisplay.textContent = `Selected: ${file.name}`;
                  mediaButtons.appendChild(fileNameDisplay);
                  
                  // Save event to history
                  this.saveEventToHistory({
                    type: 'video_upload',
                    fileName: file.name,
                    fileSize: file.size,
                    fileType: file.type
                  });
                }
              }
            }
          });
          
          // Trigger file selection dialog
          document.body.appendChild(fileInput);
          fileInput.click();
          document.body.removeChild(fileInput);
          
          evt.stopPropagation();
        }
      }
    });
    
    const captureButton = createElement('button', {
      className: 'media-button capture-button',
      text: '📹 Record Video',
      events: {
        click: (evt) => {
          // Toggle recording state
          if (this.state.recording) {
            // Stop recording
            this.stopRecording();
            captureButton.textContent = '📹 Record Video';
            
            // Show recording saved message
            const recordingMessage = document.createElement('div');
            recordingMessage.className = 'recording-message';
            recordingMessage.textContent = 'Recording saved';
            mediaButtons.appendChild(recordingMessage);
            
            // Remove message after 3 seconds
            setTimeout(() => {
              if (recordingMessage.parentNode) {
                recordingMessage.parentNode.removeChild(recordingMessage);
              }
            }, 3000);
          } else {
            // Start recording
            this.startRecording();
            captureButton.textContent = '⏹️ Stop Recording';
          }
          
          evt.stopPropagation();
        }
      }
    });
    
    mediaButtons.appendChild(uploadButton);
    mediaButtons.appendChild(captureButton);
    
    commentBox.appendChild(mediaButtons);
    
    // Create action buttons
    const actionButtons = createElement('div', {
      className: 'action-buttons'
    });
    
    const cancelButton = createElement('button', {
      className: 'action-button cancel-button',
      text: 'Cancel',
      styles: {
        backgroundColor: this.config.colors.lightbox.buttonSecondary,
        color: 'white'
      },
      events: {
        click: (evt) => {
          this.closeLightBox();
          evt.stopPropagation();
        }
      }
    });
    
    const saveButton = createElement('button', {
      className: 'action-button save-button',
      text: 'Save',
      styles: {
        backgroundColor: this.config.colors.lightbox.buttonPrimary,
        color: 'white'
      },
      events: {
        click: (evt) => {
          this.saveThrowDown();
          evt.stopPropagation();
        }
      }
    });
    
    actionButtons.appendChild(cancelButton);
    actionButtons.appendChild(saveButton);
    
    // Append elements to light-box in the correct order
    lightBoxContent.appendChild(lightBoxHeader);
    lightBoxContent.appendChild(emojiGrid);
    
    // Add a clear separator between emoji grid and control strip
    const separator = createElement('div', {
      styles: {
        width: '100%',
        height: '20px',
        clear: 'both'
      }
    });
    lightBoxContent.appendChild(separator);
    
    // Create integrated lightbox control strip with slider and all buttons
    const lightboxControlStrip = this.createLightboxControlStrip();
    lightBoxContent.appendChild(lightboxControlStrip);
  
  // Add comment box and action buttons
  lightBoxContent.appendChild(commentBox);
  lightBoxContent.appendChild(actionButtons);
  lightBoxModal.appendChild(lightBoxContent);
    
    // Append light-box to body
    document.body.appendChild(lightBoxModal);
    
    // Store references
    this.elements.lightBox = lightBoxModal;
    this.elements.lightBoxContent = lightBoxContent;
    this.elements.videoInfoDisplay = videoInfoDisplay;
    this.elements.emojiGrid = emojiGrid;
    this.elements.commentBox = commentBox;
  }
  
  /**
   * Create emoji grid with 2x2 table layout
   * @returns {HTMLElement} The emoji grid element
   */
  createEmojiGrid() {
    // Create emoji grid using CSS Grid for the main layout
    const emojiGrid = createElement('div', {
      className: 'emoji-grid',
      styles: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: '1fr 1fr',
        gap: '10px',
        width: '100%'
      }
    });
    
    // Create quadrants directly in the grid
    // Top-left quadrant (0,0) - Dove Quadrant
    const emojiTopLeftQuadrant = createElement('div', {
      className: 'emoji-quadrant top-left',
      styles: {
        gridRow: '1',
        gridColumn: '1'
      }
    });
    
    // Top-right quadrant (0,1) - Star Quadrant
    const emojiTopRightQuadrant = createElement('div', {
      className: 'emoji-quadrant top-right',
      styles: {
        gridRow: '1',
        gridColumn: '2'
      }
    });
    
    // Bottom-left quadrant (1,0) - Rain Cloud Quadrant
    const emojiBottomLeftQuadrant = createElement('div', {
      className: 'emoji-quadrant bottom-left',
      styles: {
        gridRow: '2',
        gridColumn: '1'
      }
    });
    
    // Bottom-right quadrant (1,1) - Collision Quadrant
    const emojiBottomRightQuadrant = createElement('div', {
      className: 'emoji-quadrant bottom-right',
      styles: {
        gridRow: '2',
        gridColumn: '2'
      }
    });
    
    // Add emojis to each quadrant using table layout (2 rows x 2 columns)
    // Top-left quadrant (Dove Quadrant)
    this.createEmojiTable(
      emojiTopLeftQuadrant, 
      this.config.emojis.thoughts.topLeft, 
      'top-left'
    );
    
    // Top-right quadrant (Star Quadrant)
    this.createEmojiTable(
      emojiTopRightQuadrant, 
      this.config.emojis.thoughts.topRight, 
      'top-right'
    );
    
    // Bottom-left quadrant (Rain Cloud Quadrant)
    this.createEmojiTable(
      emojiBottomLeftQuadrant, 
      this.config.emojis.thoughts.bottomLeft, 
      'bottom-left'
    );
    
    // Bottom-right quadrant (Collision Quadrant)
    this.createEmojiTable(
      emojiBottomRightQuadrant, 
      this.config.emojis.thoughts.bottomRight, 
      'bottom-right'
    );
    
    // Add all quadrants directly to the grid
    emojiGrid.appendChild(emojiTopLeftQuadrant);
    emojiGrid.appendChild(emojiTopRightQuadrant);
    emojiGrid.appendChild(emojiBottomLeftQuadrant);
    emojiGrid.appendChild(emojiBottomRightQuadrant);
    
    return emojiGrid;
  }
  
  /**
   * Create a 2x2 emoji table for a quadrant
   * @param {HTMLElement} quadrantElement - The quadrant element to add the table to
   * @param {Array} emojis - Array of emojis for this quadrant
   * @param {string} quadrantName - Name of the quadrant
   * @returns {HTMLElement} The emoji table element
   */
  createEmojiTable(quadrantElement, emojis, quadrantName) {
    // First row
    const firstRow = createElement('div', { className: 'emoji-row' });
    
    // First row, first cell
    const cell1 = createElement('div', { className: 'emoji-cell' });
    if (emojis[0]) {
      const emojiElement = createElement('div', { 
        className: 'thought-emoji', 
        text: emojis[0],
        attributes: {
          'data-emoji': emojis[0],
          'data-quadrant': quadrantName,
          'data-index': 0
        },
        events: {
          click: (evt) => {
            this.selectEmoji(emojiElement, emojis[0], quadrantName, 0);
          }
        }
      });
      cell1.appendChild(emojiElement);
    }
    
    // First row, second cell
    const cell2 = createElement('div', { className: 'emoji-cell' });
    if (emojis[1]) {
      const emojiElement = createElement('div', { 
        className: 'thought-emoji', 
        text: emojis[1],
        attributes: {
          'data-emoji': emojis[1],
          'data-quadrant': quadrantName,
          'data-index': 1
        },
        events: {
          click: (evt) => {
            this.selectEmoji(emojiElement, emojis[1], quadrantName, 1);
          }
        }
      });
      cell2.appendChild(emojiElement);
    }
    
    firstRow.appendChild(cell1);
    firstRow.appendChild(cell2);
    
    // Second row
    const secondRow = createElement('div', { className: 'emoji-row' });
    
    // Second row, first cell
    const cell3 = createElement('div', { className: 'emoji-cell' });
    if (emojis[2]) {
      const emojiElement = createElement('div', { 
        className: 'thought-emoji', 
        text: emojis[2],
        attributes: {
          'data-emoji': emojis[2],
          'data-quadrant': quadrantName,
          'data-index': 2
        },
        events: {
          click: (evt) => {
            this.selectEmoji(emojiElement, emojis[2], quadrantName, 2);
          }
        }
      });
      cell3.appendChild(emojiElement);
    }
    
    // Second row, second cell
    const cell4 = createElement('div', { className: 'emoji-cell' });
    if (emojis[3]) {
      const emojiElement = createElement('div', { 
        className: 'thought-emoji', 
        text: emojis[3],
        attributes: {
          'data-emoji': emojis[3],
          'data-quadrant': quadrantName,
          'data-index': 3
        },
        events: {
          click: (evt) => {
            this.selectEmoji(emojiElement, emojis[3], quadrantName, 3);
          }
        }
      });
      cell4.appendChild(emojiElement);
    }
    
    secondRow.appendChild(cell3);
    secondRow.appendChild(cell4);
    
    // Add rows to quadrant
    quadrantElement.appendChild(firstRow);
    quadrantElement.appendChild(secondRow);
  }
  
  /**
   * Extract the first URL from text
   * @param {string} text - The text to extract URL from
   * @returns {string|null} The extracted URL or null if none found
   */
  extractUrlFromText(text) {
    if (!text) return null;
    
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const matches = text.match(urlRegex);
    
    return matches && matches.length > 0 ? matches[0] : null;
  }
  
  /**
   * Save event to history in local storage
   * @param {Object} eventData - The event data to save
   */
  saveEventToHistory(eventData) {
    // Add timestamp to event data
    eventData.timestamp = new Date().toISOString();
    
    // Add current state context
    eventData.context = {
      profileBubblePosition: this.state.profileBubblePosition,
      currentQuadrant: this.state.currentQuadrant,
      containerDimensions: this.state.containerDimensions
    };
    
    // Get existing events or initialize empty array
    let events = [];
    try {
      const storedEvents = localStorage.getItem('quadTapEvents');
      if (storedEvents) {
        events = JSON.parse(storedEvents);
      }
    } catch (e) {
      this.log('Error parsing stored events', e);
    }
    
    // Add new event to history
    events.push(eventData);
    
    // Save back to local storage
    localStorage.setItem('quadTapEvents', JSON.stringify(events));
    
    // Also save current event separately for immediate access
    localStorage.setItem('quadTapCurrentEvent', JSON.stringify(eventData));
    
    this.log('Event saved to history', eventData);
  }
  
  /**
   * Select emoji in the grid
   * @param {HTMLElement} emojiElement - The emoji element that was clicked
   * @param {string} emoji - The emoji character
   * @param {string} quadrant - The quadrant name
   * @param {number} index - The index of the emoji in the quadrant
   */
  selectEmoji(emojiElement, emoji, quadrant, index) {
    this.log('Emoji selected', { emoji, quadrant, index });
    
    // Highlight the selected emoji
    const allEmojis = this.elements.emojiGrid.querySelectorAll('.thought-emoji');
    allEmojis.forEach(el => el.classList.remove('selected'));
    emojiElement.classList.add('selected');
    
    // Save selection to local storage
    saveToStorage('selectedEmoji', emoji);
    saveToStorage('selectedQuadrant', quadrant);
    saveToStorage('selectedIndex', index);
    
    // Save event to history immediately
    this.saveEventToHistory({
      type: 'emoji_selected',
      emoji: emoji,
      quadrant: quadrant,
      index: index
    });
    
    // Save video context
    const video = document.querySelector(this.config.videoSelector);
    if (video) {
      saveToStorage('videoTime', video.currentTime);
      saveToStorage('videoId', video.getAttribute('data-video-id') || 'unknown');
    }
    
    // Save position context
    saveToStorage('positionX', this.state.profileBubblePosition.x);
    saveToStorage('positionY', this.state.profileBubblePosition.y);
    
    // Call callback if provided
    if (this.config.callbacks.onThrowDownConfirm) {
      const videoInfo = video ? {
        currentTime: video.currentTime,
        videoId: video.getAttribute('data-video-id') || 'unknown',
        duration: video.duration
      } : null;
      
      this.config.callbacks.onThrowDownConfirm(
        quadrant, 
        this.state.profileBubblePosition.x, 
        this.state.profileBubblePosition.y,
        videoInfo
      );
    }
  }
  
  /**
   * Save throw-down with comment
   */
  saveThrowDown() {
    this.log('Saving throw-down');
    
    // Get comment from textarea
    const commentTextarea = this.elements.commentBox.querySelector('textarea');
    const comment = commentTextarea ? commentTextarea.value : '';
    
    // Extract URL from comment
    const extractedUrl = this.extractUrlFromText(comment);
    
    // Save comment and URL to storage
    saveToStorage('comment', comment);
    if (extractedUrl) {
      saveToStorage('extractedUrl', extractedUrl);
    }
    
    // Save timestamp
    saveToStorage('timestamp', Date.now());
    
    // Get video element and extract additional metadata
    const video = document.querySelector(this.config.videoSelector);
    const videoMetadata = {};
    
    if (video) {
      // Extract all data attributes from the video element
      Array.from(video.attributes)
        .filter(attr => attr.name.startsWith('data-'))
        .forEach(attr => {
          const key = attr.name.replace('data-', '');
          videoMetadata[key] = attr.value;
        });
      
      // Add additional video context
      videoMetadata.duration = video.duration || 0;
      videoMetadata.currentTime = video.currentTime || 0;
      videoMetadata.paused = video.paused;
      videoMetadata.muted = video.muted;
      videoMetadata.volume = video.volume;
      videoMetadata.playbackRate = video.playbackRate;
      videoMetadata.videoWidth = video.videoWidth;
      videoMetadata.videoHeight = video.videoHeight;
      videoMetadata.src = video.currentSrc || video.src;
    }
    
    // Create enhanced context object
    const context = {
      // User selection
      selectedEmoji: getFromStorage('selectedEmoji', ''),
      selectedQuadrant: getFromStorage('selectedQuadrant', ''),
      selectedIndex: getFromStorage('selectedIndex', -1),
      comment: comment,
      extractedUrl: extractedUrl || getFromStorage('extractedUrl', ''),
      
      // Position data
      positionX: this.state.profileBubblePosition.x,
      positionY: this.state.profileBubblePosition.y,
      quadrant: this.state.currentQuadrant,
      
      // Video data
      videoId: getFromStorage('videoId', video ? (video.getAttribute('data-video-id') || 'unknown') : 'unknown'),
      videoTime: getFromStorage('videoTime', video ? video.currentTime : 0),
      videoMetadata: videoMetadata,
      
      // Container data
      containerId: this.config.containerId,
      containerWidth: this.state.containerDimensions.width,
      containerHeight: this.state.containerDimensions.height,
      
      // Timestamp data
      timestamp: Date.now(),
      timezoneOffset: new Date().getTimezoneOffset(),
      locale: navigator.language || 'en-US',
      
      // User agent data (for device context)
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      
      // Page context
      url: window.location.href,
      referrer: document.referrer,
      title: document.title
    };
    
    // Save entire context
    saveThrowDownContext(context);
    
    // Close light-box
    this.closeLightBox();
    
    this.log('Throw-down saved', context);
  }
  
  /**
   * Bind event handlers
   */
  bindEventHandlers() {
    const self = this;
    
    // Get video element
    this.elements.video = document.querySelector(this.config.videoSelector);
    
    // Track touch/mouse movement to distinguish between taps and swipes
    this.state.touchStartX = 0;
    this.state.touchStartY = 0;
    this.state.isSwiping = false;
    this.state.swipeThreshold = 20; // Minimum distance to consider as a swipe
    this.state.swipeDirection = null; // 'up', 'down', 'left', 'right'
    
    // Touch/mouse start handler
    const touchStartHandler = function(evt) {
      // Get coordinates based on event type
      if (evt.type === 'touchstart') {
        const touch = evt.touches[0];
        self.state.touchStartX = touch.clientX;
        self.state.touchStartY = touch.clientY;
      } else if (evt.type === 'mousedown') {
        self.state.touchStartX = evt.clientX;
        self.state.touchStartY = evt.clientY;
      }
      
      self.state.isSwiping = false;
      self.state.swipeDirection = null;
    };
    
    // Touch/mouse move handler to detect swipes early
    const touchMoveHandler = function(evt) {
      // Skip if already determined to be swiping
      if (self.state.isSwiping) return;
      
      // Get current coordinates
      let currentX, currentY;
      if (evt.type === 'touchmove') {
        const touch = evt.touches[0];
        currentX = touch.clientX;
        currentY = touch.clientY;
      } else {
        currentX = evt.clientX;
        currentY = evt.clientY;
      }
      
      // Calculate distance moved
      const deltaX = currentX - self.state.touchStartX;
      const deltaY = currentY - self.state.touchStartY;
      const totalMovement = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      // If movement exceeds threshold, consider it a swipe
      if (totalMovement > self.state.swipeThreshold) {
        self.state.isSwiping = true;
        
        // Determine swipe direction
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          // Horizontal swipe
          self.state.swipeDirection = deltaX > 0 ? 'right' : 'left';
        } else {
          // Vertical swipe
          self.state.swipeDirection = deltaY > 0 ? 'down' : 'up';
        }
        
        self.log('Detected swipe during movement', { 
          direction: self.state.swipeDirection,
          deltaX, 
          deltaY, 
          totalMovement 
        });
        
        // Handle swipe based on current state
        self.handleSwipe(self.state.swipeDirection, evt);
      }
    };
    
    // Touch/mouse end handler
    const touchEndHandler = function(evt) {
      // Prevent the event from reaching the video element and toggling play/pause
      evt.preventDefault();
      evt.stopPropagation();
      
      // Skip if clicking on a video control button
      if (evt.target.closest('.video-control-button')) {
        return;
      }
      
      // Get current coordinates
      let currentX, currentY;
      if (evt.type === 'touchend') {
        const touch = evt.changedTouches[0];
        currentX = touch.clientX;
        currentY = touch.clientY;
      } else {
        currentX = evt.clientX;
        currentY = evt.clientY;
      }
      
      // Calculate distance moved
      const deltaX = currentX - self.state.touchStartX;
      const deltaY = currentY - self.state.touchStartY;
      const totalMovement = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      // If movement exceeds threshold and not already detected as swiping, consider it a swipe
      if (totalMovement > self.state.swipeThreshold && !self.state.isSwiping) {
        self.state.isSwiping = true;
        
        // Determine swipe direction
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          // Horizontal swipe
          self.state.swipeDirection = deltaX > 0 ? 'right' : 'left';
        } else {
          // Vertical swipe
          self.state.swipeDirection = deltaY > 0 ? 'down' : 'up';
        }
        
        self.log('Detected swipe at end', { 
          direction: self.state.swipeDirection,
          deltaX, 
          deltaY, 
          totalMovement,
          overlayActive: self.state.active
        });
        
        // Handle swipe based on current state
        self.handleSwipe(self.state.swipeDirection, evt);
        return;
      }
      
      // Only proceed with tap actions if not swiping
      if (!self.state.isSwiping) {
        const rect = self.elements.container.getBoundingClientRect();
        
        // Get coordinates relative to container
        let x, y;
        if (evt.type === 'touchend') {
          const touch = evt.changedTouches[0];
          x = touch.clientX - rect.left;
          y = touch.clientY - rect.top;
        } else {
          x = evt.clientX - rect.left;
          y = evt.clientY - rect.top;
        }
        
        self.log('Processing tap action', { x, y, overlayActive: self.state.active });
        
        if (!self.state.active) {
          // First tap - activate overlay
          self.activateOverlay(x, y);
        } else {
          // Second tap - check if on profile bubble
          const isOnBubble = evt.target === self.elements.profileBubble || 
                             self.elements.profileBubble.contains(evt.target);
          
          if (isOnBubble) {
            // Open light-box
            self.openLightBox();
          } else {
            // Deactivate overlay
            self.deactivateOverlay();
          }
        }
      }
    };
    
    // Add mouse event listeners
    this.elements.container.addEventListener('mousedown', touchStartHandler);
    this.elements.container.addEventListener('mousemove', touchMoveHandler);
    this.elements.container.addEventListener('mouseup', touchEndHandler);
    
    // Add touch event listeners for mobile
    this.elements.container.addEventListener('touchstart', touchStartHandler);
    this.elements.container.addEventListener('touchmove', touchMoveHandler);
    this.elements.container.addEventListener('touchend', touchEndHandler);
    
    // Backup direct click/touch handler for profile bubble
    const bubbleClickHandler = function(evt) {
      if (self.state.active) {
        self.openLightBox();
        evt.stopPropagation();
      }
    };
    
    this.elements.profileBubble.addEventListener('click', bubbleClickHandler);
    this.elements.profileBubble.addEventListener('touchend', bubbleClickHandler);
    
    // Close light-box when clicking/touching outside content
    const lightboxClickHandler = function(evt) {
      if (evt.target === self.elements.lightBox) {
        self.closeLightBox();
      }
    };
    
    this.elements.lightBox.addEventListener('click', lightboxClickHandler);
    this.elements.lightBox.addEventListener('touchend', lightboxClickHandler);
    
    // Add keyboard support for accessibility
    document.addEventListener('keydown', function(evt) {
      // ESC key
      if (evt.key === 'Escape') {
        if (self.elements.lightBox.classList.contains('active')) {
          self.closeLightBox();
        } else if (self.state.active) {
          self.deactivateOverlay();
        }
      }
    });
    
    // Track video play/pause state
    if (this.elements.video) {
      this.elements.video.addEventListener('play', function() {
        self.state.videoPlaying = true;
      });
      
      this.elements.video.addEventListener('pause', function() {
        self.state.videoPlaying = false;
      });
    }
    
    // Handle window resize
    window.addEventListener('resize', this.throttledResize);
    
    // Store initial container dimensions
    this.updateContainerDimensions();
  }
  
  /**
   * Handle window resize
   */
  handleResize() {
    if (this.state.active) {
      this.updateContainerDimensions();
      
      // Position all elements based on the new dimensions
      const pixelX = this.state.containerDimensions.width * this.state.profileBubblePosition.x;
      const pixelY = this.state.containerDimensions.height * this.state.profileBubblePosition.y;
      
      // Position profile bubble
      positionElementWithCenterMaintained(this.elements.profileBubble, pixelX, pixelY);
      
      // Position directional emojis
      this.positionDirectionalEmojis(pixelX, pixelY);
      
      // Position quadrant emojis
      this.positionQuadrantEmojis();
      
      // Position video controls
      this.positionVideoControls();
      
      // Position tooltip
      this.positionTooltip();
    }
  }
  
  /**
   * Update container dimensions
   */
  updateContainerDimensions() {
    if (this.elements.container) {
      const rect = this.elements.container.getBoundingClientRect();
      this.state.containerDimensions = {
        width: rect.width,
        height: rect.height
      };
    }
  }
  
  /**
   * Activate overlay
   * @param {number} x - X coordinate of the tap in pixels
   * @param {number} y - Y coordinate of the tap in pixels
   */
  activateOverlay(x, y) {
    this.log('Activating overlay', { x, y });
    
    // Convert pixel coordinates to percentages (0-1)
    const percentX = x / this.state.containerDimensions.width;
    const percentY = y / this.state.containerDimensions.height;
    
    // Store profile bubble position as percentages
    this.state.profileBubblePosition = { x: percentX, y: percentY };
    
    // Determine quadrant
    this.state.currentQuadrant = getQuadrant(x, y, this.elements.container);
    this.log('Current quadrant', this.state.currentQuadrant);
    
    // Show overlay - ensure both display and opacity/pointer-events are set
    this.elements.overlay.style.display = 'block';
    
    // Use setTimeout to ensure the display change has taken effect before adding the active class
    setTimeout(() => {
      this.elements.overlay.classList.add('active');
    }, 10);
    
    // Position and show profile bubble at tap location
    this.elements.profileBubble.style.display = 'flex';
    
    // Convert percentage coordinates back to pixels for positioning
    const pixelX = this.state.containerDimensions.width * this.state.profileBubblePosition.x;
    const pixelY = this.state.containerDimensions.height * this.state.profileBubblePosition.y;
    positionElementWithCenterMaintained(this.elements.profileBubble, pixelX, pixelY);
    
    // Position and show directional emojis
    this.positionDirectionalEmojis(x, y);
    
    // Position and show quadrant emojis
    this.positionQuadrantEmojis();
    
    // Position and show video controls
    this.positionVideoControls();
    
    // Position and show tooltip
    this.positionTooltip();
    
    // Set active state
    this.state.active = true;
    
    // Set auto-cancel timer
    if (this.config.autoCancelTimeout > 0) {
      this.state.autoCancelTimer = setTimeout(() => {
        this.deactivateOverlay();
      }, this.config.autoCancelTimeout);
    }
    
    // Call callback if provided
    if (this.config.callbacks.onOverlayActivate) {
      this.config.callbacks.onOverlayActivate(x, y);
    }
    
    // Pause video when overlay is activated
    pauseIfPlaying(this);
  }
  
  /**
   * Position directional emojis
   * @param {number} x - X coordinate of the tap
   * @param {number} y - Y coordinate of the tap
   */
  positionDirectionalEmojis(x, y) {
    const { width, height } = this.state.containerDimensions;
    
    // Calculate distances from edges
    const distanceFromTop = y;
    const distanceFromRight = width - x;
    const distanceFromBottom = height - y;
    const distanceFromLeft = x;
    
    // Calculate positions of directional emojis
    const upPosition = { x: width / 2, y: height * 0.1 };
    const rightPosition = { x: width * 0.9, y: height / 2 };
    const downPosition = { x: width / 2, y: height * 0.9 };
    const leftPosition = { x: width * 0.1, y: height / 2 };
    
    // Calculate distances from tap point to each directional emoji
    const distanceToUp = Math.sqrt(Math.pow(x - upPosition.x, 2) + Math.pow(y - upPosition.y, 2));
    const distanceToRight = Math.sqrt(Math.pow(x - rightPosition.x, 2) + Math.pow(y - rightPosition.y, 2));
    const distanceToDown = Math.sqrt(Math.pow(x - downPosition.x, 2) + Math.pow(y - downPosition.y, 2));
    const distanceToLeft = Math.sqrt(Math.pow(x - leftPosition.x, 2) + Math.pow(y - leftPosition.y, 2));
    
    // Calculate max possible distance (diagonal of container)
    const maxDistance = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
    
    // Calculate scaling factors (0.5 to 2.0)
    // The closer to the tap point, the larger the emoji
    // Also consider distance from edges for additional effect
    const upScale = 0.8 + Math.max(0, 1.2 * (1 - distanceToUp / maxDistance)) + 
                   Math.max(0, 0.8 * (1 - distanceFromTop / (height / 2)));
    
    const rightScale = 0.8 + Math.max(0, 1.2 * (1 - distanceToRight / maxDistance)) + 
                      Math.max(0, 0.8 * (1 - distanceFromRight / (width / 2)));
    
    const downScale = 0.8 + Math.max(0, 1.2 * (1 - distanceToDown / maxDistance)) + 
                     Math.max(0, 0.8 * (1 - distanceFromBottom / (height / 2)));
    
    const leftScale = 0.8 + Math.max(0, 1.2 * (1 - distanceToLeft / maxDistance)) + 
                     Math.max(0, 0.8 * (1 - distanceFromLeft / (width / 2)));
    
    // Position and scale up emoji
    const upEmoji = this.elements.directionalEmojis.up;
    upEmoji.style.display = 'block';
    upEmoji.style.position = 'absolute';
    upEmoji.style.top = '10%';
    upEmoji.style.left = '50%';
    upEmoji.style.transform = `translate(-50%, 0) scale(${upScale})`;
    upEmoji.style.fontSize = '2rem';
    upEmoji.style.opacity = '0.8';
    
    // Position and scale right emoji
    const rightEmoji = this.elements.directionalEmojis.right;
    rightEmoji.style.display = 'block';
    rightEmoji.style.position = 'absolute';
    rightEmoji.style.top = '50%';
    rightEmoji.style.right = '10%';
    rightEmoji.style.transform = `translate(0, -50%) scale(${rightScale})`;
    rightEmoji.style.fontSize = '2rem';
    rightEmoji.style.opacity = '0.8';
    
    // Position and scale down emoji
    const downEmoji = this.elements.directionalEmojis.down;
    downEmoji.style.display = 'block';
    downEmoji.style.position = 'absolute';
    downEmoji.style.bottom = '10%';
    downEmoji.style.left = '50%';
    downEmoji.style.transform = `translate(-50%, 0) scale(${downScale})`;
    downEmoji.style.fontSize = '2rem';
    downEmoji.style.opacity = '0.8';
    
    // Position and scale left emoji
    const leftEmoji = this.elements.directionalEmojis.left;
    leftEmoji.style.display = 'block';
    leftEmoji.style.position = 'absolute';
    leftEmoji.style.top = '50%';
    leftEmoji.style.left = '10%';
    leftEmoji.style.transform = `translate(0, -50%) scale(${leftScale})`;
    leftEmoji.style.fontSize = '2rem';
    leftEmoji.style.opacity = '0.8';
  }
  
  /**
   * Calculate responsive emoji size based on container dimensions
   * @returns {Object} Object containing font sizes for different states
   */
  calculateResponsiveEmojiSize() {
    const { width, height } = this.state.containerDimensions;
    const smallerDimension = Math.min(width, height);
    
    // Base size on the smaller dimension to ensure emojis fit on screen
    let defaultSize, enlargedSize;
    
    if (smallerDimension < 300) {
      // Very small screens (mobile portrait)
      defaultSize = '1.5rem';
      enlargedSize = '2.2rem';
    } else if (smallerDimension < 500) {
      // Small screens (mobile landscape)
      defaultSize = '2rem';
      enlargedSize = '2.8rem';
    } else if (smallerDimension < 800) {
      // Medium screens (tablets)
      defaultSize = '2.5rem';
      enlargedSize = '3.5rem';
    } else {
      // Large screens (desktop)
      defaultSize = '3rem';
      enlargedSize = '4rem';
    }
    
    return {
      defaultSize,
      enlargedSize,
      defaultOpacity: '0.6',
      enlargedOpacity: '0.8'
    };
  }

  /**
   * Position quadrant emojis
   */
  positionQuadrantEmojis() {
    // Get responsive sizes based on screen dimensions
    const { defaultSize, enlargedSize, defaultOpacity, enlargedOpacity } = this.calculateResponsiveEmojiSize();
    
    // Position top-left emoji
    const topLeftEmoji = this.elements.quadrantEmojis.topLeft;
    topLeftEmoji.style.display = 'block';
    topLeftEmoji.style.position = 'absolute';
    topLeftEmoji.style.top = '8%';
    topLeftEmoji.style.left = '8%';
    topLeftEmoji.style.transform = 'translate(-50%, -50%)';
    topLeftEmoji.style.fontSize = defaultSize;
    topLeftEmoji.style.opacity = defaultOpacity;
    
    // Position top-right emoji
    const topRightEmoji = this.elements.quadrantEmojis.topRight;
    topRightEmoji.style.display = 'block';
    topRightEmoji.style.position = 'absolute';
    topRightEmoji.style.top = '8%';
    topRightEmoji.style.right = '8%';
    topRightEmoji.style.transform = 'translate(50%, -50%)';
    topRightEmoji.style.fontSize = defaultSize;
    topRightEmoji.style.opacity = defaultOpacity;
    
    // Position bottom-left emoji
    const bottomLeftEmoji = this.elements.quadrantEmojis.bottomLeft;
    bottomLeftEmoji.style.display = 'block';
    bottomLeftEmoji.style.position = 'absolute';
    bottomLeftEmoji.style.bottom = '8%';
    bottomLeftEmoji.style.left = '8%';
    bottomLeftEmoji.style.transform = 'translate(-50%, 50%)';
    bottomLeftEmoji.style.fontSize = defaultSize;
    bottomLeftEmoji.style.opacity = defaultOpacity;
    
    // Position bottom-right emoji
    const bottomRightEmoji = this.elements.quadrantEmojis.bottomRight;
    bottomRightEmoji.style.display = 'block';
    bottomRightEmoji.style.position = 'absolute';
    bottomRightEmoji.style.bottom = '8%';
    bottomRightEmoji.style.right = '8%';
    bottomRightEmoji.style.transform = 'translate(50%, 50%)';
    bottomRightEmoji.style.fontSize = defaultSize;
    bottomRightEmoji.style.opacity = defaultOpacity;
    
    // Enlarge the emoji in the tapped quadrant
    if (this.state.currentQuadrant) {
      switch (this.state.currentQuadrant) {
        case 'top-left':
          topLeftEmoji.style.fontSize = enlargedSize;
          topLeftEmoji.style.opacity = enlargedOpacity;
          break;
        case 'top-right':
          topRightEmoji.style.fontSize = enlargedSize;
          topRightEmoji.style.opacity = enlargedOpacity;
          break;
        case 'bottom-left':
          bottomLeftEmoji.style.fontSize = enlargedSize;
          bottomLeftEmoji.style.opacity = enlargedOpacity;
          break;
        case 'bottom-right':
          bottomRightEmoji.style.fontSize = enlargedSize;
          bottomRightEmoji.style.opacity = enlargedOpacity;
          break;
      }
    }
  }
  
  /**
   * Position video controls
   */
  positionVideoControls() {
    if (!this.config.videoControls.enabled) {
      return;
    }
    
    const videoControls = this.elements.videoControls;
    videoControls.style.display = 'flex';
    
    // Ensure the control strip is vertically centered in the overlay
    videoControls.style.position = 'absolute';
    videoControls.style.top = '50%';
    videoControls.style.left = '50%';
    videoControls.style.transform = 'translate(-50%, -50%)';
    videoControls.style.zIndex = '1001';
  }
  
  /**
   * Position tooltip based on configuration
   */
  positionTooltip() {
    // Skip if tooltip is disabled in config
    if (!this.config.tooltip || this.config.tooltip.enabled === false) {
      return;
    }
    
    const tooltip = this.elements.tooltip;
    tooltip.style.display = 'block';
    tooltip.style.position = 'absolute';
    tooltip.style.zIndex = '1001'; // Ensure it's above other elements
    
    // Set tooltip text from config
    if (this.config.tooltip.text) {
      tooltip.textContent = this.config.tooltip.text;
    }
    
    // Apply tooltip position based on config
    const position = this.config.tooltip.position || 'above-controls';
    
    switch (position) {
      case 'above-controls':
        tooltip.style.top = '40%'; // Position above the control strip (which is at 50%)
        tooltip.style.left = '50%';
        tooltip.style.transform = 'translate(-50%, -50%)';
        break;
      case 'below-controls':
        tooltip.style.top = '60%'; // Position below the control strip
        tooltip.style.left = '50%';
        tooltip.style.transform = 'translate(-50%, -50%)';
        break;
      case 'on-bubble':
        // Position near the bubble
        const bubbleRect = this.elements.profileBubble.getBoundingClientRect();
        const overlayRect = this.elements.overlay.getBoundingClientRect();
        
        // Calculate position relative to the overlay
        const bubbleTop = (bubbleRect.top - overlayRect.top) / overlayRect.height * 100;
        
        tooltip.style.top = `${bubbleTop - 10}%`; // 10% above the bubble
        tooltip.style.left = '50%';
        tooltip.style.transform = 'translate(-50%, -100%)';
        break;
      default:
        // Default to above controls
        tooltip.style.top = '40%';
        tooltip.style.left = '50%';
        tooltip.style.transform = 'translate(-50%, -50%)';
    }
    
    // Apply tooltip styles from config
    if (this.config.tooltip.style) {
      const style = this.config.tooltip.style;
      
      if (style.backgroundColor) tooltip.style.backgroundColor = style.backgroundColor;
      if (style.color) tooltip.style.color = style.color;
      if (style.padding) tooltip.style.padding = style.padding;
      if (style.borderRadius) tooltip.style.borderRadius = style.borderRadius;
    } else {
      // Apply default styles
      tooltip.style.textAlign = 'center';
      tooltip.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
      tooltip.style.color = 'white';
      tooltip.style.padding = '8px 12px';
      tooltip.style.borderRadius = '4px';
    }
  }
  
  /**
   * Control video playback
   * @param {string} action - The action to perform (rewind, playpause, forward, share)
   */
  controlVideo(action) {
    this.log('Controlling video', action);
    
    const video = document.querySelector(this.config.videoSelector);
    if (!video) {
      this.log('Video element not found');
      return;
    }
    
    switch (action) {
      case 'rewind':
        video.currentTime = Math.max(0, video.currentTime - this.config.videoControls.rewindTime);
        break;
        
      case 'playpause':
        if (video.paused) {
          video.play();
        } else {
          video.pause();
        }
        break;
        
      case 'forward':
        video.currentTime = Math.min(video.duration, video.currentTime + this.config.videoControls.forwardTime);
        break;
        
      case 'share':
        // Implement share functionality
        if (navigator.share) {
          navigator.share({
            title: 'Shared Video',
            text: 'Check out this video!',
            url: window.location.href
          }).catch(err => {
            console.error('Share failed:', err);
          });
        } else {
          alert('Share feature not supported by your browser');
        }
        break;
    }
    
    // Call callback if provided
    if (this.config.callbacks.onVideoControl) {
      this.config.callbacks.onVideoControl(action, video.currentTime);
    }
  }
  
  /**
   * Handle swipe gestures based on current state
   * @param {string} direction - The direction of the swipe ('up', 'down', 'left', 'right')
   * @param {Event} evt - The original event
   * @returns {boolean} - Whether the swipe was handled
   */
  handleSwipe(direction, evt) {
    this.log('Handling swipe', { direction, overlayActive: this.state.active });
    
    // Different handling based on overlay state
    if (this.state.active) {
      // Overlay is active
      if (this.elements.lightBox && this.elements.lightBox.classList.contains('active')) {
        // Lightbox is open - handle lightbox swipes
        return this.handleLightboxSwipe(direction, evt);
      } else {
        // Only overlay is active - handle overlay swipes
        return this.handleOverlaySwipe(direction, evt);
      }
    } else {
      // Overlay is not active - handle regular swipes
      return this.handleRegularSwipe(direction, evt);
    }
  }
  
  /**
   * Handle swipe when overlay is active
   * @param {string} direction - The direction of the swipe
   * @param {Event} evt - The original event
   * @returns {boolean} - Whether the swipe was handled
   */
  handleOverlaySwipe(direction, evt) {
    this.log('Handling overlay swipe', { direction });
    
    // Handle swipe based on direction
    if (direction === 'left' || direction === 'right') {
      // Horizontal swipes should NOT deactivate the overlay
      this.log('Horizontal swipe - overlay remains active');
      return true;
    } else if (direction === 'up' || direction === 'down') {
      // Vertical swipes SHOULD deactivate the overlay
      this.log('Vertical swipe - deactivating overlay');
      this.deactivateOverlay({ reason: 'swipe' });
      return true;
    }
    
    // Return true to indicate the swipe was handled
    return true;
  }
  
  /**
   * Handle swipe when lightbox is open
   * @param {string} direction - The direction of the swipe
   * @param {Event} evt - The original event
   * @returns {boolean} - Whether the swipe was handled
   */
  handleLightboxSwipe(direction, evt) {
    this.log('Handling lightbox swipe', { direction });
    
    // For now, just prevent lightbox from being closed on swipe
    // In the future, this could be extended to handle different swipe directions differently
    
    // Return true to indicate the swipe was handled
    return true;
  }
  
  /**
   * Handle swipe when overlay is not active
   * @param {string} direction - The direction of the swipe
   * @param {Event} evt - The original event
   * @returns {boolean} - Whether the swipe was handled
   */
  handleRegularSwipe(direction, evt) {
    this.log('Handling regular swipe', { direction });
    
    // For now, just prevent overlay from being activated on swipe
    // In the future, this could be extended to handle different swipe directions differently
    
    // Return true to indicate the swipe was handled
    return true;
  }
  
  /**
   * Deactivate overlay
   * @param {Object} options - Options for deactivation
   */
  deactivateOverlay(options = {}) {
    this.log('Deactivating overlay', options);
    
    // Skip deactivation if this was triggered by a swipe
    if (this.state.isSwiping && (!options || !options.force)) {
      this.log('Skipping deactivation due to swipe');
      return;
    }
    
    // First remove the active class to trigger the opacity transition
    this.elements.overlay.classList.remove('active');
    
    // Then hide the overlay after the transition completes
    setTimeout(() => {
      // Only hide if still inactive (prevent race conditions)
      if (!this.state.active) {
        this.elements.overlay.style.display = 'none';
        
        // Hide all elements
        this.elements.profileBubble.style.display = 'none';
        
        Object.values(this.elements.directionalEmojis).forEach(emoji => {
          emoji.style.display = 'none';
        });
        
        Object.values(this.elements.quadrantEmojis).forEach(emoji => {
          emoji.style.display = 'none';
        });
        
        this.elements.videoControls.style.display = 'none';
        this.elements.tooltip.style.display = 'none';
      }
    }, 300); // Match the transition duration
    
    // Reset state
    this.state.active = false;
    
    // Clear auto-cancel timer
    if (this.state.autoCancelTimer) {
      clearTimeout(this.state.autoCancelTimer);
      this.state.autoCancelTimer = null;
    }
    
    // Resume video if it was playing before (unless this is from a swipe action)
    if (!options || !options.reason || options.reason !== 'swipe') {
      // Use a small timeout to ensure the video plays after the overlay is fully closed
      setTimeout(() => {
        resumeIfNeeded(this);
      }, 100);
    }
    
    // Call callback if provided
    if (this.config.callbacks.onThrowDownCancel) {
      this.config.callbacks.onThrowDownCancel(this.state.currentQuadrant);
    }
    
    this.log('Overlay deactivated');
  }
  
  /**
   * Create video time slider for lightbox
   * @returns {HTMLElement} The video slider container element
   * @deprecated This method is no longer used as the slider has been removed from the lightbox
   */
  createVideoTimeSlider() {
    // Return an empty div as this feature has been removed
    return createElement('div', { styles: { display: 'none' } });
  }
  
  /**
   * Open light-box
   */
  openLightBox() {
    this.log('Opening light-box');
    
    // Use the imported updatePlayPauseButton function
    
    // Show light-box
    this.elements.lightBox.classList.add('active');
    
    // Clear auto-cancel timer
    if (this.state.autoCancelTimer) {
      clearTimeout(this.state.autoCancelTimer);
      this.state.autoCancelTimer = null;
    }
    
    // Get adapter if available
    const adapter = this.config.videoPlayerApi && 
                   this.config.videoPlayerApi.enabled && 
                   this.config.videoPlayerApi.adapter;
    
    // Store current playing state
    this.state.wasPlayingBefore = adapter ? adapter.isPlaying() : false;
    
    // If no adapter, check DOM video element
    if (!adapter) {
      const video = document.querySelector(this.config.videoSelector);
      this.state.wasPlayingBefore = video ? !video.paused : false;
    }
    
    // Create or update the video slider if it doesn't exist
    if (!this.elements.videoSliderContainer) {
      this.elements.videoSliderContainer = this.createVideoTimeSlider();
      
      // Add the slider to the lightbox content before the control strip
      if (this.elements.lightboxControlStrip && this.elements.lightboxControlStrip.parentNode) {
        this.elements.lightboxControlStrip.parentNode.insertBefore(
          this.elements.videoSliderContainer, 
          this.elements.lightboxControlStrip
        );
      }
    }
    
    // Ensure the lightbox control strip is properly initialized and visible
    if (this.elements.lightboxControlStripObj && this.config.videoControls.enabled) {
      // Make sure the control strip is visible
      if (this.elements.lightboxControlStrip) {
        this.elements.lightboxControlStrip.style.display = 'flex';
      }
      
      // Update play/pause button state
      const video = document.querySelector(this.config.videoSelector);
      if (video) {
        try {
          // Use the updatePlayPauseButton function from the lightboxControlStripObj
          if (this.elements.lightboxControlStripObj.updatePlayPauseButton) {
            this.elements.lightboxControlStripObj.updatePlayPauseButton(!video.paused);
          } else {
            // Use the imported updatePlayPauseButton function
            updatePlayPauseButton(this.elements.lightboxControlStrip, !video.paused);
          }
        } catch (err) {
          this.log('Error updating play/pause button', err);
        }
      }
    }
    
    // Update video time display
    this.updateVideoTimeDisplay();
    
    // Set up interval to update video time display
    this.videoTimeUpdateInterval = setInterval(() => {
      this.updateVideoTimeDisplay();
    }, 1000);
    
    // Always pause video when lightbox opens (pauseOnLightboxOnly=true behavior)
    // This is the only place where we pause the video - not when overlay is activated
    pauseIfPlaying(this);
    
    // Update play/pause button state to reflect paused state
    if (this.elements.videoControls && this.elements.videoControlsObj) {
      try {
        // Use the updatePlayPauseButton method from the videoControlsObj
        if (this.elements.videoControlsObj.updatePlayPauseButton) {
          this.elements.videoControlsObj.updatePlayPauseButton(false);
        } else if (typeof updatePlayPauseButton === 'function') {
          // Use the imported updatePlayPauseButton function
          updatePlayPauseButton(this.elements.videoControls, false);
        } else {
          this.log('updatePlayPauseButton function not available');
        }
      } catch (err) {
        this.log('Error updating play/pause button', err);
      }
    }
    
    // Call callback if provided
    if (this.config.callbacks.onThrowDownInitiate) {
      this.config.callbacks.onThrowDownInitiate(
        this.state.currentQuadrant,
        this.state.profileBubblePosition.x,
        this.state.profileBubblePosition.y
      );
    }
  }
  
  /**
   * Close light-box
   */
  closeLightBox() {
    this.log('Closing light-box');
    
    // Hide light-box
    this.elements.lightBox.classList.remove('active');
    
    // Clear the video time update interval
    if (this.videoTimeUpdateInterval) {
      clearInterval(this.videoTimeUpdateInterval);
      this.videoTimeUpdateInterval = null;
    }
    
    // If we have a control strip object, update its mode back to overlay
    if (this.elements.videoControlsObj && this.config.videoControls.enabled) {
      // First, remove the element from its current parent
      if (this.elements.videoControls.parentNode) {
        this.elements.videoControls.parentNode.removeChild(this.elements.videoControls);
      }
      
      // Add it back to the overlay
      if (this.elements.overlay) {
        this.elements.overlay.appendChild(this.elements.videoControls);
        
        // Set to overlay mode
        this.elements.videoControlsObj.setMode('overlay', this.elements.container);
        
        // Hide it initially (it will be shown when needed)
        this.elements.videoControls.style.display = 'none';
      }
    }
    
    // Always resume video when lightbox is closed
    this.log('Always resuming video on lightbox close');
    
    // Use a small timeout to ensure the video plays after the lightbox is fully closed
    setTimeout(() => {
      alwaysResume(this);
      
      // Update play/pause button state to reflect playing state
      if (this.elements.videoControls && this.elements.videoControlsObj) {
        if (this.elements.videoControlsObj.updatePlayPauseButton) {
          this.elements.videoControlsObj.updatePlayPauseButton(true);
        } else if (typeof updatePlayPauseButton === 'function') {
          updatePlayPauseButton(this.elements.videoControls, true);
        } else {
          this.log('updatePlayPauseButton function not available');
        }
      }
    }, 100);
    
    // Reset the wasPlayingBefore state
    this.state.wasPlayingBefore = false;
    
    // Deactivate overlay
    this.deactivateOverlay();
  }
  
  /**
   * Update video time display in the lightbox
   */
  updateVideoTimeDisplay() {
    if (!this.elements.videoInfoDisplay) return;
    
    const video = document.querySelector(this.config.videoSelector);
    if (!video) return;
    
    // Format current time and duration
    const formatTime = (seconds) => {
      if (isNaN(seconds) || !isFinite(seconds)) return '0:00';
      
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };
    
    const currentTime = formatTime(video.currentTime);
    const duration = formatTime(video.duration);
    
    // Update the header display
    this.elements.videoInfoDisplay.textContent = `${currentTime} / ${duration}`;
    
    // Update the slider display if available
    if (this.elements.currentTimeElement) {
      this.elements.currentTimeElement.textContent = currentTime;
    }
    
    if (this.elements.durationElement) {
      this.elements.durationElement.textContent = duration;
    }
    
    // Update slider position without triggering the input event
    if (this.elements.videoSlider && video.duration) {
      const percent = (video.currentTime / video.duration) * 100;
      this.elements.videoSlider.value = percent;
    }
  }
  
  /**
   * Start video recording
   */
  startRecording() {
    this.log('Starting video recording');
    
    // Set recording state
    this.state.recording = true;
    
    // Check if MediaRecorder is available
    if (!navigator.mediaDevices || !window.MediaRecorder) {
      this.log('MediaRecorder API not supported');
      alert('Video recording is not supported in your browser');
      this.state.recording = false;
      return;
    }
    
    // Request user media
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        // Store stream
        this.state.mediaStream = stream;
        
        // Create recorder
        this.state.mediaRecorder = new MediaRecorder(stream);
        
        // Store recorded chunks
        const chunks = [];
        this.state.mediaRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) {
            chunks.push(e.data);
          }
        };
        
        // Handle recording stop
        this.state.mediaRecorder.onstop = () => {
          // Create blob from chunks
          const blob = new Blob(chunks, { type: 'video/webm' });
          
          // Save recording to storage
          saveToStorage('recordedVideo', URL.createObjectURL(blob));
          
          // Save event to history
          this.saveEventToHistory({
            type: 'video_recording',
            size: blob.size,
            duration: Date.now() - this.state.recordingStartTime
          });
          
          // Stop all tracks
          this.state.mediaStream.getTracks().forEach(track => track.stop());
          
          // Reset state
          this.state.mediaStream = null;
          this.state.mediaRecorder = null;
          this.state.recording = false;
        };
        
        // Start recording
        this.state.mediaRecorder.start();
        this.state.recordingStartTime = Date.now();
        
        // Show recording indicator
        const recordingIndicator = document.createElement('div');
        recordingIndicator.className = 'recording-indicator';
        recordingIndicator.textContent = '🔴 Recording...';
        recordingIndicator.style.position = 'absolute';
        recordingIndicator.style.top = '10px';
        recordingIndicator.style.right = '10px';
        recordingIndicator.style.backgroundColor = 'rgba(255, 0, 0, 0.7)';
        recordingIndicator.style.color = 'white';
        recordingIndicator.style.padding = '5px 10px';
        recordingIndicator.style.borderRadius = '4px';
        recordingIndicator.style.zIndex = '1002';
        
        this.elements.lightBoxContent.appendChild(recordingIndicator);
        this.state.recordingIndicator = recordingIndicator;
      })
      .catch(err => {
        this.log('Error accessing media devices', err);
        alert('Could not access camera and microphone');
        this.state.recording = false;
      });
  }
  
  /**
   * Stop video recording
   */
  stopRecording() {
    this.log('Stopping video recording');
    
    if (this.state.mediaRecorder && this.state.recording) {
      // Stop recording
      this.state.mediaRecorder.stop();
      
      // Remove recording indicator
      if (this.state.recordingIndicator && this.state.recordingIndicator.parentNode) {
        this.state.recordingIndicator.parentNode.removeChild(this.state.recordingIndicator);
      }
    }
  }
  
  /**
   * Toggle video pause/play state
   * This is used by the pause/play button in the lightbox
   */
  toggleVideoPause() {
    this.log('Toggling video pause/play state');
    
    // Get adapter if available
    const adapter = this.config.videoPlayerApi && 
                   this.config.videoPlayerApi.enabled && 
                   this.config.videoPlayerApi.adapter;
    
    // Get video element
    const video = document.querySelector(this.config.videoSelector);
    
    if (adapter) {
      // Use adapter to toggle play state
      adapter.isPlaying().then(isPlaying => {
        if (isPlaying) {
          adapter.pause();
          // Update button text
          const pausePlayButton = this.elements.lightBox.querySelector('.td-pause-play-btn');
          if (pausePlayButton) pausePlayButton.textContent = '▶️';
        } else {
          adapter.play();
          // Update button text
          const pausePlayButton = this.elements.lightBox.querySelector('.td-pause-play-btn');
          if (pausePlayButton) pausePlayButton.textContent = '⏸️';
        }
      });
    } else if (video) {
      // Use DOM video element to toggle play state
      if (video.paused) {
        video.play()
          .then(() => {
            // Update button text
            const pausePlayButton = this.elements.lightBox.querySelector('.td-pause-play-btn');
            if (pausePlayButton) pausePlayButton.textContent = '⏸️';
          })
          .catch(err => {
            this.log('Error playing video', err);
          });
      } else {
        video.pause();
        // Update button text
        const pausePlayButton = this.elements.lightBox.querySelector('.td-pause-play-btn');
        if (pausePlayButton) pausePlayButton.textContent = '▶️';
      }
    }
    
    // Call callback if provided
    if (this.config.callbacks.onVideoControl) {
      this.config.callbacks.onVideoControl('playpause', video ? video.currentTime : 0);
    }
  }
  
  /**
   * Destroy the component and clean up
   */
  destroy() {
    this.log('Destroying QuadTap');
    
    // Clear any timers
    if (this.state.autoCancelTimer) {
      clearTimeout(this.state.autoCancelTimer);
    }
    
    // Remove event listeners
    if (this.elements.container) {
      this.elements.container.removeEventListener('click', this.handleContainerClick);
    }
    
    if (this.elements.profileBubble) {
      this.elements.profileBubble.removeEventListener('click', this.handleBubbleClick);
    }
    
    if (this.elements.lightBox) {
      this.elements.lightBox.removeEventListener('click', this.handleLightBoxClick);
    }
    
    if (this.elements.video) {
      this.elements.video.removeEventListener('play', this.handleVideoPlay);
      this.elements.video.removeEventListener('pause', this.handleVideoPause);
    }
    
    window.removeEventListener('resize', this.throttledResize);
    document.removeEventListener('keydown', this.handleKeyDown);
    
    // Remove elements
    if (this.elements.overlay && this.elements.overlay.parentNode) {
      this.elements.overlay.parentNode.removeChild(this.elements.overlay);
    }
    
    if (this.elements.lightBox && this.elements.lightBox.parentNode) {
      this.elements.lightBox.parentNode.removeChild(this.elements.lightBox);
    }
    
    // Stop any active recording
    if (this.state.recording && this.state.mediaRecorder) {
      this.stopRecording();
    }
    
    // Release media stream if it exists
    if (this.state.mediaStream) {
      this.state.mediaStream.getTracks().forEach(track => track.stop());
    }
    
    // Reset state
    this.state = {
      active: false,
      profileBubblePosition: { x: 0, y: 0 },
      currentQuadrant: null,
      autoCancelTimer: null,
      containerDimensions: { width: 0, height: 0 },
      videoPlaying: false,
      recording: false,
      mediaStream: null,
      mediaRecorder: null,
      recordingStartTime: 0,
      recordingIndicator: null
    };
    
    this.log('QuadTap destroyed');
  }
}

export default QuadTap;

// Auto-initialization is now handled in index.js
// This ensures a single source of truth for initialization logic
