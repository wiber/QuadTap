/**
 * SettingsBuilder provides a fluent interface for configuring QuadTap.
 * It allows you to easily customize all aspects of QuadTap's behavior.
 */
class SettingsBuilder {
  /**
   * Constructor
   */
  constructor() {
    // Initialize with default settings
    this.settings = {
      containerId: 'quad-tap-container',
      videoSelector: 'video',
      debug: false,
      autoCancelTimeout: 3000,
      autoInitialize: false, // Whether to automatically initialize on page load
      quadrantEmojis: {
        topLeft: '🌈',
        topRight: '🔥',
        bottomLeft: '💧',
        bottomRight: '🌪️'
      },
      directionalEmojis: {
        north: '⬆️',
        east: '➡️',
        south: '⬇️',
        west: '⬅️'
      },
      thoughtEmojis: {
        topLeft: ['🌈', '🦄', '🌟', '🌻'],
        topRight: ['🔥', '⚡', '💥', '🌋'],
        bottomLeft: ['💧', '🌊', '❄️', '☔'],
        bottomRight: ['🌪️', '🌩️', '⛈️', '🌀']
      },
      videoControls: {
        enabled: true,
        position: 'center',
        autoHide: true,
        autoHideDelay: 2000,
        pauseOnLightboxOnly: true
      },
      tooltip: {
        enabled: true,
        position: 'above-controls',
        text: 'Tap elsewhere to cancel',
        style: {
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
          padding: '8px 12px',
          borderRadius: '4px'
        }
      },
      swipeNavigation: {
        enabled: true,
        threshold: 50,
        direction: 'vertical'
      },
      northContextBar: {
        enabled: true,
        content: 'FROM'
      },
      southContextBar: {
        enabled: true,
        content: 'TO'
      },
      coordinateSystem: {
        type: 'percentage',
        storeMetadata: true
      },
      emojiSizes: {
        default: '24px',
        active: '36px'
      },
      profileBubble: {
        imageUrl: null, // URL to the profile image
        fallbackEmoji: '👤', // Fallback emoji if no image is provided
        size: '60px', // Size of the profile bubble
        borderColor: 'white', // Border color of the profile bubble
        borderWidth: '2px', // Border width of the profile bubble
        backgroundColor: 'rgba(0, 0, 0, 0.7)' // Background color of the profile bubble
      },
      colors: {
        overlay: {
          background: 'rgba(240, 240, 245, 0.5)', // Light overlay background color
          quadrantGradients: {
            topLeft: 'rgba(0, 255, 255, 0.8)', // Stronger cyan
            topRight: 'rgba(255, 255, 0, 0.8)', // Stronger yellow
            bottomLeft: 'rgba(0, 255, 0, 0.8)', // Stronger green
            bottomRight: 'rgba(255, 0, 255, 0.8)' // Stronger magenta
          }
        },
        lightbox: {
          background: 'rgba(0, 0, 0, 0.9)', // Lightbox background color
          text: 'white', // Lightbox text color
          headerBackground: 'rgba(50, 50, 50, 0.8)', // Lightbox header background
          buttonPrimary: '#4CAF50', // Primary button color (Save)
          buttonSecondary: '#f44336' // Secondary button color (Cancel)
        }
      },
      callbacks: {
        onOverlayActivate: null,
        onThrowDownInitiate: null,
        onThrowDownConfirm: null,
        onThrowDownCancel: null,
        onVideoControl: null
      },
      videoPlayerApi: {
        enabled: false,
        adapter: null
      }
    };
  }

  /**
   * Set the container ID
   * @param {string} containerId - The ID of the container element
   * @returns {SettingsBuilder} The builder instance for chaining
   */
  withContainer(containerId) {
    if (typeof containerId !== 'string') {
      console.warn('[SettingsBuilder] containerId should be a string');
    }
    this.settings.containerId = containerId;
    return this;
  }

  /**
   * Set the video selector
   * @param {string} videoSelector - The CSS selector for the video element
   * @returns {SettingsBuilder} The builder instance for chaining
   */
  withVideoSelector(videoSelector) {
    if (typeof videoSelector !== 'string') {
      console.warn('[SettingsBuilder] videoSelector should be a string');
    }
    this.settings.videoSelector = videoSelector;
    return this;
  }

  /**
   * Enable or disable debug mode
   * @param {boolean} enabled - Whether to enable debug mode
   * @returns {SettingsBuilder} The builder instance for chaining
   */
  withDebug(enabled) {
    if (typeof enabled !== 'boolean') {
      console.warn('[SettingsBuilder] debug should be a boolean');
    }
    this.settings.debug = enabled;
    return this;
  }

  /**
   * Set the auto-cancel timeout
   * @param {number} timeout - The timeout in milliseconds
   * @returns {SettingsBuilder} The builder instance for chaining
   */
  withAutoCancelTimeout(timeout) {
    if (typeof timeout !== 'number' || timeout < 0) {
      console.warn('[SettingsBuilder] autoCancelTimeout should be a positive number');
    }
    this.settings.autoCancelTimeout = timeout;
    return this;
  }

  /**
   * Set the quadrant emojis
   * @param {Object} quadrantEmojis - The quadrant emojis
   * @param {string} quadrantEmojis.topLeft - The top-left quadrant emoji
   * @param {string} quadrantEmojis.topRight - The top-right quadrant emoji
   * @param {string} quadrantEmojis.bottomLeft - The bottom-left quadrant emoji
   * @param {string} quadrantEmojis.bottomRight - The bottom-right quadrant emoji
   * @returns {SettingsBuilder} The builder instance for chaining
   */
  withQuadrantEmojis(quadrantEmojis) {
    if (typeof quadrantEmojis !== 'object') {
      console.warn('[SettingsBuilder] quadrantEmojis should be an object');
      return this;
    }
    
    this.settings.quadrantEmojis = {
      ...this.settings.quadrantEmojis,
      ...quadrantEmojis
    };
    
    return this;
  }

  /**
   * Set the directional emojis
   * @param {Object} directionalEmojis - The directional emojis
   * @param {string} directionalEmojis.north - The north directional emoji
   * @param {string} directionalEmojis.east - The east directional emoji
   * @param {string} directionalEmojis.south - The south directional emoji
   * @param {string} directionalEmojis.west - The west directional emoji
   * @returns {SettingsBuilder} The builder instance for chaining
   */
  withDirectionalEmojis(directionalEmojis) {
    if (typeof directionalEmojis !== 'object') {
      console.warn('[SettingsBuilder] directionalEmojis should be an object');
      return this;
    }
    
    this.settings.directionalEmojis = {
      ...this.settings.directionalEmojis,
      ...directionalEmojis
    };
    
    return this;
  }

  /**
   * Set the thought emojis for a specific quadrant
   * @param {string} quadrant - The quadrant ('topLeft', 'topRight', 'bottomLeft', 'bottomRight')
   * @param {string[]} emojis - The thought emojis for the quadrant
   * @returns {SettingsBuilder} The builder instance for chaining
   */
  withThoughtEmojisForQuadrant(quadrant, emojis) {
    if (!['topLeft', 'topRight', 'bottomLeft', 'bottomRight'].includes(quadrant)) {
      console.warn('[SettingsBuilder] quadrant should be one of: topLeft, topRight, bottomLeft, bottomRight');
      return this;
    }
    
    if (!Array.isArray(emojis)) {
      console.warn('[SettingsBuilder] emojis should be an array');
      return this;
    }
    
    this.settings.thoughtEmojis[quadrant] = emojis;
    return this;
  }

  /**
   * Set all thought emojis
   * @param {Object} thoughtEmojis - The thought emojis
   * @param {string[]} thoughtEmojis.topLeft - The top-left quadrant thought emojis
   * @param {string[]} thoughtEmojis.topRight - The top-right quadrant thought emojis
   * @param {string[]} thoughtEmojis.bottomLeft - The bottom-left quadrant thought emojis
   * @param {string[]} thoughtEmojis.bottomRight - The bottom-right quadrant thought emojis
   * @returns {SettingsBuilder} The builder instance for chaining
   */
  withThoughtEmojis(thoughtEmojis) {
    if (typeof thoughtEmojis !== 'object') {
      console.warn('[SettingsBuilder] thoughtEmojis should be an object');
      return this;
    }
    
    this.settings.thoughtEmojis = {
      ...this.settings.thoughtEmojis,
      ...thoughtEmojis
    };
    
    return this;
  }

  /**
   * Configure video controls
   * @param {Object} videoControlsConfig - The video controls configuration
   * @param {boolean} videoControlsConfig.enabled - Whether to enable video controls
   * @param {string} videoControlsConfig.position - The position of the video controls ('center', 'bottom-center', 'top-center')
   * @param {boolean} videoControlsConfig.autoHide - Whether to auto-hide the video controls
   * @param {number} videoControlsConfig.autoHideDelay - The auto-hide delay in milliseconds
   * @param {boolean} videoControlsConfig.pauseOnLightboxOnly - Whether to pause video only when lightbox opens
   * @returns {SettingsBuilder} The builder instance for chaining
   */
  withVideoControls(videoControlsConfig) {
    if (typeof videoControlsConfig !== 'object') {
      console.warn('[SettingsBuilder] videoControlsConfig should be an object');
      return this;
    }
    
    this.settings.videoControls = {
      ...this.settings.videoControls,
      ...videoControlsConfig
    };
    
    return this;
  }

  /**
   * Configure tooltip
   * @param {Object} tooltipConfig - The tooltip configuration
   * @param {boolean} tooltipConfig.enabled - Whether to enable the tooltip
   * @param {string} tooltipConfig.position - The position of the tooltip ('above-controls', 'below-controls', 'on-bubble')
   * @param {string} tooltipConfig.text - The tooltip text
   * @param {Object} tooltipConfig.style - The tooltip style
   * @param {string} tooltipConfig.style.backgroundColor - The tooltip background color
   * @param {string} tooltipConfig.style.color - The tooltip text color
   * @param {string} tooltipConfig.style.padding - The tooltip padding
   * @param {string} tooltipConfig.style.borderRadius - The tooltip border radius
   * @returns {SettingsBuilder} The builder instance for chaining
   */
  withTooltip(tooltipConfig) {
    if (typeof tooltipConfig !== 'object') {
      console.warn('[SettingsBuilder] tooltipConfig should be an object');
      return this;
    }
    
    // Handle nested style object
    if (tooltipConfig.style && typeof tooltipConfig.style === 'object') {
      tooltipConfig.style = {
        ...this.settings.tooltip.style,
        ...tooltipConfig.style
      };
    }
    
    this.settings.tooltip = {
      ...this.settings.tooltip,
      ...tooltipConfig
    };
    
    return this;
  }

  /**
   * Configure swipe navigation
   * @param {Object} swipeConfig - The swipe navigation configuration
   * @param {boolean} swipeConfig.enabled - Whether to enable swipe navigation
   * @param {number} swipeConfig.threshold - The swipe threshold in pixels
   * @param {string} swipeConfig.direction - The swipe direction ('vertical' or 'horizontal')
   * @returns {SettingsBuilder} The builder instance for chaining
   */
  withSwipeNavigation(swipeConfig) {
    if (typeof swipeConfig !== 'object') {
      console.warn('[SettingsBuilder] swipeConfig should be an object');
      return this;
    }
    
    this.settings.swipeNavigation = {
      ...this.settings.swipeNavigation,
      ...swipeConfig
    };
    
    return this;
  }

  /**
   * Configure north context bar
   * @param {Object} northConfig - The north context bar configuration
   * @param {boolean} northConfig.enabled - Whether to enable the north context bar
   * @param {string} northConfig.content - The content of the north context bar
   * @returns {SettingsBuilder} The builder instance for chaining
   */
  withNorthContextBar(northConfig) {
    if (typeof northConfig !== 'object') {
      console.warn('[SettingsBuilder] northConfig should be an object');
      return this;
    }
    
    this.settings.northContextBar = {
      ...this.settings.northContextBar,
      ...northConfig
    };
    
    return this;
  }

  /**
   * Configure south context bar
   * @param {Object} southConfig - The south context bar configuration
   * @param {boolean} southConfig.enabled - Whether to enable the south context bar
   * @param {string} southConfig.content - The content of the south context bar
   * @returns {SettingsBuilder} The builder instance for chaining
   */
  withSouthContextBar(southConfig) {
    if (typeof southConfig !== 'object') {
      console.warn('[SettingsBuilder] southConfig should be an object');
      return this;
    }
    
    this.settings.southContextBar = {
      ...this.settings.southContextBar,
      ...southConfig
    };
    
    return this;
  }

  /**
   * Configure coordinate system
   * @param {Object} coordinateConfig - The coordinate system configuration
   * @param {string} coordinateConfig.type - The coordinate system type ('absolute', 'normalized', or 'percentage')
   * @param {boolean} coordinateConfig.storeMetadata - Whether to store container dimensions in the coordinate data
   * @returns {SettingsBuilder} The builder instance for chaining
   */
  withCoordinateSystem(coordinateConfig) {
    if (typeof coordinateConfig !== 'object') {
      console.warn('[SettingsBuilder] coordinateConfig should be an object');
      return this;
    }
    
    this.settings.coordinateSystem = {
      ...this.settings.coordinateSystem,
      ...coordinateConfig
    };
    
    return this;
  }

  /**
   * Enable or disable auto-initialization
   * @param {boolean} enabled - Whether to enable auto-initialization
   * @returns {SettingsBuilder} The builder instance for chaining
   */
  withAutoInitialize(enabled) {
    if (typeof enabled !== 'boolean') {
      console.warn('[SettingsBuilder] autoInitialize should be a boolean');
    }
    this.settings.autoInitialize = enabled;
    return this;
  }

  /**
   * Configure profile bubble
   * @param {Object} bubbleConfig - The profile bubble configuration
   * @param {string} bubbleConfig.imageUrl - URL to the profile image
   * @param {string} bubbleConfig.fallbackEmoji - Fallback emoji if no image is provided
   * @param {string} bubbleConfig.size - Size of the profile bubble (CSS value)
   * @param {string} bubbleConfig.borderColor - Border color of the profile bubble
   * @param {string} bubbleConfig.borderWidth - Border width of the profile bubble
   * @param {string} bubbleConfig.backgroundColor - Background color of the profile bubble
   * @returns {SettingsBuilder} The builder instance for chaining
   */
  withProfileBubble(bubbleConfig) {
    if (typeof bubbleConfig !== 'object') {
      console.warn('[SettingsBuilder] bubbleConfig should be an object');
      return this;
    }
    
    this.settings.profileBubble = {
      ...this.settings.profileBubble,
      ...bubbleConfig
    };
    
    return this;
  }

  /**
   * Configure overlay colors
   * @param {Object} overlayColors - The overlay color configuration
   * @param {string} overlayColors.background - Overlay background color
   * @param {Object} overlayColors.quadrantGradients - Quadrant gradient colors
   * @param {string} overlayColors.quadrantGradients.topLeft - Top-left quadrant gradient color
   * @param {string} overlayColors.quadrantGradients.topRight - Top-right quadrant gradient color
   * @param {string} overlayColors.quadrantGradients.bottomLeft - Bottom-left quadrant gradient color
   * @param {string} overlayColors.quadrantGradients.bottomRight - Bottom-right quadrant gradient color
   * @returns {SettingsBuilder} The builder instance for chaining
   */
  withOverlayColors(overlayColors) {
    if (typeof overlayColors !== 'object') {
      console.warn('[SettingsBuilder] overlayColors should be an object');
      return this;
    }
    
    // Handle nested quadrantGradients object
    if (overlayColors.quadrantGradients && typeof overlayColors.quadrantGradients === 'object') {
      overlayColors.quadrantGradients = {
        ...this.settings.colors.overlay.quadrantGradients,
        ...overlayColors.quadrantGradients
      };
    }
    
    this.settings.colors.overlay = {
      ...this.settings.colors.overlay,
      ...overlayColors
    };
    
    return this;
  }

  /**
   * Configure lightbox colors
   * @param {Object} lightboxColors - The lightbox color configuration
   * @param {string} lightboxColors.background - Lightbox background color
   * @param {string} lightboxColors.text - Lightbox text color
   * @param {string} lightboxColors.headerBackground - Lightbox header background color
   * @param {string} lightboxColors.buttonPrimary - Primary button color
   * @param {string} lightboxColors.buttonSecondary - Secondary button color
   * @returns {SettingsBuilder} The builder instance for chaining
   */
  withLightboxColors(lightboxColors) {
    if (typeof lightboxColors !== 'object') {
      console.warn('[SettingsBuilder] lightboxColors should be an object');
      return this;
    }
    
    this.settings.colors.lightbox = {
      ...this.settings.colors.lightbox,
      ...lightboxColors
    };
    
    return this;
  }

  /**
   * Configure all colors at once
   * @param {Object} colorConfig - The color configuration
   * @param {Object} colorConfig.overlay - Overlay color configuration
   * @param {Object} colorConfig.lightbox - Lightbox color configuration
   * @returns {SettingsBuilder} The builder instance for chaining
   */
  withColors(colorConfig) {
    if (typeof colorConfig !== 'object') {
      console.warn('[SettingsBuilder] colorConfig should be an object');
      return this;
    }
    
    // Handle nested overlay object
    if (colorConfig.overlay && typeof colorConfig.overlay === 'object') {
      // Handle nested quadrantGradients object
      if (colorConfig.overlay.quadrantGradients && typeof colorConfig.overlay.quadrantGradients === 'object') {
        colorConfig.overlay.quadrantGradients = {
          ...this.settings.colors.overlay.quadrantGradients,
          ...colorConfig.overlay.quadrantGradients
        };
      }
      
      colorConfig.overlay = {
        ...this.settings.colors.overlay,
        ...colorConfig.overlay
      };
    }
    
    // Handle nested lightbox object
    if (colorConfig.lightbox && typeof colorConfig.lightbox === 'object') {
      colorConfig.lightbox = {
        ...this.settings.colors.lightbox,
        ...colorConfig.lightbox
      };
    }
    
    this.settings.colors = {
      ...this.settings.colors,
      ...colorConfig
    };
    
    return this;
  }

  /**
   * Configure emoji sizes
   * @param {Object} sizeConfig - The emoji size configuration
   * @param {string} sizeConfig.default - The default emoji size (CSS value)
   * @param {string} sizeConfig.active - The active emoji size (CSS value)
   * @returns {SettingsBuilder} The builder instance for chaining
   */
  withEmojiSizes(sizeConfig) {
    if (typeof sizeConfig !== 'object') {
      console.warn('[SettingsBuilder] sizeConfig should be an object');
      return this;
    }
    
    this.settings.emojiSizes = {
      ...this.settings.emojiSizes,
      ...sizeConfig
    };
    
    return this;
  }

  /**
   * Configure video player API integration
   * @param {Object} apiConfig - The API configuration
   * @param {boolean} apiConfig.enabled - Whether to enable video player API integration
   * @param {Function} apiConfig.playMethod - Method to play the video
   * @param {Function} apiConfig.pauseMethod - Method to pause the video
   * @param {Function} apiConfig.seekMethod - Method to seek the video
   * @param {Function} apiConfig.getCurrentTimeMethod - Method to get current time
   * @param {Function} apiConfig.getDurationMethod - Method to get duration
   * @param {Function} apiConfig.getVideoIdMethod - Method to get video ID
   * @returns {SettingsBuilder} The builder instance for chaining
   */
  withVideoPlayerApi(apiConfig) {
    if (typeof apiConfig !== 'object') {
      console.warn('[SettingsBuilder] apiConfig should be an object');
      return this;
    }
    
    this.settings.videoPlayerApi = {
      ...this.settings.videoPlayerApi,
      ...apiConfig
    };
    
    return this;
  }

  /**
   * Configure with a VideoPlayerAdapter
   * @param {VideoPlayerAdapter} adapter - The video player adapter instance
   * @returns {SettingsBuilder} The builder instance for chaining
   */
  withVideoPlayerAdapter(adapter) {
    if (!adapter) {
      console.warn('[SettingsBuilder] adapter should be a valid VideoPlayerAdapter instance');
      return this;
    }
    
    this.settings.videoPlayerApi = {
      ...this.settings.videoPlayerApi,
      enabled: true,
      adapter: adapter
    };
    
    return this;
  }

  /**
   * Set callback for overlay activation
   * @param {Function} callback - The callback function
   * @returns {SettingsBuilder} The builder instance for chaining
   */
  onOverlayActivate(callback) {
    if (typeof callback !== 'function') {
      console.warn('[SettingsBuilder] callback should be a function');
      return this;
    }
    
    this.settings.callbacks.onOverlayActivate = callback;
    return this;
  }

  /**
   * Set callback for throw-down initiation
   * @param {Function} callback - The callback function
   * @returns {SettingsBuilder} The builder instance for chaining
   */
  onThrowDownInitiate(callback) {
    if (typeof callback !== 'function') {
      console.warn('[SettingsBuilder] callback should be a function');
      return this;
    }
    
    this.settings.callbacks.onThrowDownInitiate = callback;
    return this;
  }

  /**
   * Set callback for throw-down confirmation
   * @param {Function} callback - The callback function
   * @returns {SettingsBuilder} The builder instance for chaining
   */
  onThrowDownConfirm(callback) {
    if (typeof callback !== 'function') {
      console.warn('[SettingsBuilder] callback should be a function');
      return this;
    }
    
    this.settings.callbacks.onThrowDownConfirm = callback;
    return this;
  }

  /**
   * Set callback for throw-down cancellation
   * @param {Function} callback - The callback function
   * @returns {SettingsBuilder} The builder instance for chaining
   */
  onThrowDownCancel(callback) {
    if (typeof callback !== 'function') {
      console.warn('[SettingsBuilder] callback should be a function');
      return this;
    }
    
    this.settings.callbacks.onThrowDownCancel = callback;
    return this;
  }

  /**
   * Set callback for video control actions
   * @param {Function} callback - The callback function
   * @returns {SettingsBuilder} The builder instance for chaining
   */
  onVideoControl(callback) {
    if (typeof callback !== 'function') {
      console.warn('[SettingsBuilder] callback should be a function');
      return this;
    }
    
    this.settings.callbacks.onVideoControl = callback;
    return this;
  }

  /**
   * Build the settings object
   * @returns {Object} The settings object
   */
  build() {
    // Validate settings
    this.validateSettings();
    
    // Return a copy of the settings to prevent modification
    return JSON.parse(JSON.stringify(this.settings));
  }

  /**
   * Validate settings
   * @private
   */
  validateSettings() {
    // Check required settings
    if (!this.settings.containerId) {
      console.warn('[SettingsBuilder] containerId is required, using default: "quad-tap-container"');
      this.settings.containerId = 'quad-tap-container';
    }
    
    if (!this.settings.videoSelector) {
      console.warn('[SettingsBuilder] videoSelector is required, using default: "video"');
      this.settings.videoSelector = 'video';
    }
    
    // Validate video controls position
    const validPositions = ['center', 'bottom-center', 'top-center'];
    if (this.settings.videoControls.enabled && !validPositions.includes(this.settings.videoControls.position)) {
      console.warn(`[SettingsBuilder] Invalid video controls position: ${this.settings.videoControls.position}, using default: "center"`);
      this.settings.videoControls.position = 'center';
    }
    
    // Validate tooltip position
    const validTooltipPositions = ['above-controls', 'below-controls', 'on-bubble'];
    if (this.settings.tooltip.enabled && !validTooltipPositions.includes(this.settings.tooltip.position)) {
      console.warn(`[SettingsBuilder] Invalid tooltip position: ${this.settings.tooltip.position}, using default: "above-controls"`);
      this.settings.tooltip.position = 'above-controls';
    }
    
    // Validate swipe direction
    const validSwipeDirections = ['vertical', 'horizontal'];
    if (this.settings.swipeNavigation.enabled && !validSwipeDirections.includes(this.settings.swipeNavigation.direction)) {
      console.warn(`[SettingsBuilder] Invalid swipe direction: ${this.settings.swipeNavigation.direction}, using default: "vertical"`);
      this.settings.swipeNavigation.direction = 'vertical';
    }
    
    // Validate coordinate system type
    const validCoordinateTypes = ['absolute', 'normalized', 'percentage'];
    if (!validCoordinateTypes.includes(this.settings.coordinateSystem.type)) {
      console.warn(`[SettingsBuilder] Invalid coordinate system type: ${this.settings.coordinateSystem.type}, using default: "percentage"`);
      this.settings.coordinateSystem.type = 'percentage';
    }
  }
}

export default SettingsBuilder;
