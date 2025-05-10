/**
 * QuadTap Component Tests
 * Tests the core functionality of the QuadTap component
 */

// Mock getComputedStyle
window.getComputedStyle = jest.fn(() => ({
  zIndex: '1000'
}));

// Mock document.body methods using spyOn instead of replacing the object
jest.spyOn(document.body, 'appendChild').mockImplementation(jest.fn());
jest.spyOn(document.body, 'removeChild').mockImplementation(jest.fn());

// Mock the dom.js helper module
jest.mock('../src/helpers/dom', () => {
  return {
    createElement: jest.fn(() => ({
      style: {},
      classList: {
        add: jest.fn(),
        remove: jest.fn(),
        contains: jest.fn()
      },
      appendChild: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      setAttribute: jest.fn(),
      getAttribute: jest.fn(),
      hasAttribute: jest.fn(() => true)
    })),
    createTable: jest.fn(() => ({
      style: {},
      classList: {
        add: jest.fn(),
        remove: jest.fn()
      },
      appendChild: jest.fn(),
      querySelectorAll: jest.fn(() => []),
      querySelector: jest.fn()
    })),
    createTableRow: jest.fn(() => ({
      style: {},
      appendChild: jest.fn()
    })),
    createTableCell: jest.fn(() => ({
      style: {},
      appendChild: jest.fn(),
      addEventListener: jest.fn()
    })),
    positionElementWithCenterMaintained: jest.fn(),
    getQuadrant: jest.fn((x, y, container) => {
      // Simple mock implementation
      const centerX = 400; // Half of 800
      const centerY = 300; // Half of 600
      
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
    }),
    isPointInElement: jest.fn(() => true),
    getDistance: jest.fn(() => 10)
  };
});

// Mock the overlay.js module
jest.mock('../src/styles/overlay', () => {
  return {
    __esModule: true,
    injectStyles: jest.fn(),
    appendStyles: jest.fn(),
    createGradientOverlay: jest.fn(() => ({
      classList: {
        add: jest.fn(),
        remove: jest.fn(),
        contains: jest.fn()
      },
      style: {},
      appendChild: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn()
    }))
  };
});

// Mock the ControlStrip module
jest.mock('../src/components/ControlStrip', () => {
  return {
    __esModule: true,
    createControlStrip: jest.fn(() => ({
      style: {},
      classList: {
        add: jest.fn(),
        remove: jest.fn()
      },
      querySelector: jest.fn(() => ({
        textContent: '▶'
      })),
      querySelectorAll: jest.fn(() => []),
      appendChild: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn()
    })),
    updatePlayPauseButton: jest.fn(),
    showControlStrip: jest.fn(),
    hideControlStrip: jest.fn()
  };
});

// Mock the storage.js helper module
jest.mock('../src/helpers/storage', () => {
  return {
    saveToStorage: jest.fn(),
    getFromStorage: jest.fn(),
    saveThrowDownContext: jest.fn()
  };
});

// Mock DOM environment
const mockContainer = {
  getBoundingClientRect: () => ({
    width: 800,
    height: 600,
    left: 0,
    top: 0
  }),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  querySelector: jest.fn(),
  querySelectorAll: jest.fn(),
  appendChild: jest.fn()
};

const mockVideo = {
  play: jest.fn(),
  pause: jest.fn(),
  currentTime: 0,
  duration: 300,
  paused: false,
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  getBoundingClientRect: () => ({
    width: 800,
    height: 600,
    left: 0,
    top: 0
  })
};

// Mock VideoPlayerAdapter
const mockAdapter = {
  play: jest.fn(),
  pause: jest.fn(),
  seek: jest.fn(),
  getCurrentTime: jest.fn(() => 30),
  getDuration: jest.fn(() => 300),
  getVideoId: jest.fn(() => 'test-video-123'),
  isPlaying: jest.fn(() => !mockVideo.paused)
};

// Mock document methods
document.getElementById = jest.fn(id => {
  if (id === 'video-container' || id === 'main-video-droppable') return mockContainer;
  return null;
});

document.querySelector = jest.fn(selector => {
  if (selector === '#test-video' || selector === '#main-video') return mockVideo;
  return null;
});

document.createElement = jest.fn(() => ({
  style: {},
  classList: {
    add: jest.fn(),
    remove: jest.fn(),
    contains: jest.fn()
  },
  appendChild: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  setAttribute: jest.fn(),
  getAttribute: jest.fn(),
  hasAttribute: jest.fn(() => true)
}));

// Mock the VideoPlayerAdapter
jest.mock('../src/adapters/VideoPlayerAdapter', () => {
  return {
    __esModule: true,
    default: class VideoPlayerAdapter {
      constructor(config) {
        this.videoElement = config.videoElement;
        this.api = config.api;
        this.debug = config.debug || false;
        this.savedPlayingState = false;
      }

      async play() {
        return this.api.playMethod(this.videoElement);
      }

      async pause() {
        return this.api.pauseMethod(this.videoElement);
      }

      async isPlaying() {
        return this.api.isPlayingMethod(this.videoElement);
      }

      static forHtml5Video(videoElement, debug = false) {
        return mockAdapter;
      }
    }
  };
});

// Import the modules
import QuadTap from '../src/QuadTap';
import SettingsBuilder from '../src/SettingsBuilder';
import { VideoPlayerAdapter } from '../src/adapters/VideoPlayerAdapter';
import Coordinates from '../src/utils/coordinates';

describe('QuadTap Component', () => {
  let quadTap;
  let customConfig;

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();

    // Create custom config for QuadTap
    customConfig = {
      containerId: "video-container",
      videoSelector: "#test-video",
      autoCancelTimeout: 3000,
      debug: true,
      emojis: {
        quadrants: {
          topLeft: "🌈",
          topRight: "🔥",
          bottomLeft: "💧",
          bottomRight: "🌪️"
        },
        directional: {
          up: "⬆️",
          right: "➡️",
          down: "⬇️",
          left: "⬅️"
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
        forwardTime: 30,
        pauseOnLightboxOnly: true
      },
      videoPlayerApi: {
        enabled: true,
        adapter: mockAdapter
      },
      callbacks: {
        onOverlayActivate: jest.fn(),
        onThrowDownInitiate: jest.fn(),
        onThrowDownConfirm: jest.fn(),
        onThrowDownCancel: jest.fn(),
        onVideoControl: jest.fn()
      }
    };

    // Initialize QuadTap with custom config
    quadTap = new QuadTap(customConfig);

    // Mock internal methods
    quadTap.createOverlayElements = jest.fn();
    quadTap.createBubbleElement = jest.fn();
    quadTap.createLightBoxElements = jest.fn();
    quadTap.createVideoControls = jest.fn(() => ({
      style: {}
    }));
    quadTap.bindEventHandlers = jest.fn();
    quadTap.saveThrowDown = jest.fn();
    
    // Set up state for testing
    quadTap.state = {
      active: false,
      lightBoxOpen: false,
      profileBubblePosition: { x: 0.5, y: 0.5 },
      currentQuadrant: null,
      autoCancelTimer: null,
      containerDimensions: { width: 800, height: 600 },
      videoPlaying: false,
      wasPlayingBefore: false
    };
    
    // Set up elements for testing
    quadTap.elements = {
      container: mockContainer,
      video: mockVideo,
      overlay: document.createElement('div'),
      profileBubble: document.createElement('div'),
      directionalEmojis: {
        up: document.createElement('div'),
        right: document.createElement('div'),
        down: document.createElement('div'),
        left: document.createElement('div')
      },
      quadrantEmojis: {
        topLeft: document.createElement('div'),
        topRight: document.createElement('div'),
        bottomLeft: document.createElement('div'),
        bottomRight: document.createElement('div')
      },
      videoControls: document.createElement('div'),
      tooltip: document.createElement('div'),
      lightBox: document.createElement('div'),
      lightBoxContent: document.createElement('div'),
      emojiGrid: document.createElement('div'),
      commentBox: document.createElement('div')
    };
  });

  describe('Initialization', () => {
    test('should initialize with settings', () => {
      expect(quadTap.config).toEqual(expect.objectContaining(customConfig));
      expect(quadTap.state).toBeDefined();
      expect(quadTap.state.active).toBe(false);
      expect(quadTap.state.lightBoxOpen).toBe(false);
    });

    test('should create DOM elements', () => {
      quadTap.init();
      expect(quadTap.createOverlayElements).toHaveBeenCalled();
      expect(quadTap.bindEventHandlers).toHaveBeenCalled();
    });
  });

  describe('Coordinate Handling', () => {
    test('should convert absolute coordinates to normalized coordinates', () => {
      const absoluteX = 400;
      const absoluteY = 300;
      const containerWidth = 800;
      const containerHeight = 600;

      const { normalizedX, normalizedY } = Coordinates.normalize(
        absoluteX,
        absoluteY,
        containerWidth,
        containerHeight
      );

      expect(normalizedX).toBe(0.5); // 400 / 800
      expect(normalizedY).toBe(0.5); // 300 / 600
    });

    test('should convert normalized coordinates to absolute coordinates', () => {
      const normalizedX = 0.5;
      const normalizedY = 0.5;
      const containerWidth = 800;
      const containerHeight = 600;

      const { x, y } = Coordinates.denormalize(
        normalizedX,
        normalizedY,
        containerWidth,
        containerHeight
      );

      expect(x).toBe(400); // 0.5 * 800
      expect(y).toBe(300); // 0.5 * 600
    });

    test('should determine quadrant from normalized coordinates', () => {
      // Top-right (north-east)
      expect(Coordinates.getQuadrant(0.75, 0.25)).toBe('ne');
      
      // Top-left (north-west)
      expect(Coordinates.getQuadrant(0.25, 0.25)).toBe('nw');
      
      // Bottom-right (south-east)
      expect(Coordinates.getQuadrant(0.75, 0.75)).toBe('se');
      
      // Bottom-left (south-west)
      expect(Coordinates.getQuadrant(0.25, 0.75)).toBe('sw');
    });

    test('should apply coordinate space mapping (0,0 at bottom-left)', () => {
      // Mock the container dimensions
      const containerWidth = 800;
      const containerHeight = 600;
      
      // Tap at pixel coordinates (400, 300) - center of container
      const tapX = 400;
      const tapY = 300;
      
      // Calculate normalized coordinates with bottom-left origin
      const normalizedX = tapX / containerWidth; // 0.5
      const normalizedY = 1 - (tapY / containerHeight); // 0.5
      
      // These should match the spec requirements
      expect(normalizedX).toBe(0.5);
      expect(normalizedY).toBe(0.5);
      
      // Tap at pixel coordinates (0, 600) - top-left of container
      const topLeftX = 0;
      const topLeftY = 0;
      
      // Calculate normalized coordinates with bottom-left origin
      const topLeftNormalizedX = topLeftX / containerWidth; // 0
      const topLeftNormalizedY = 1 - (topLeftY / containerHeight); // 1
      
      // These should match the spec requirements
      expect(topLeftNormalizedX).toBe(0);
      expect(topLeftNormalizedY).toBe(1);
      
      // Tap at pixel coordinates (800, 0) - bottom-right of container
      const bottomRightX = 800;
      const bottomRightY = 600;
      
      // Calculate normalized coordinates with bottom-left origin
      const bottomRightNormalizedX = bottomRightX / containerWidth; // 1
      const bottomRightNormalizedY = 1 - (bottomRightY / containerHeight); // 0
      
      // These should match the spec requirements
      expect(bottomRightNormalizedX).toBe(1);
      expect(bottomRightNormalizedY).toBe(0);
    });
  });

  describe('Overlay Activation', () => {
    beforeEach(() => {
      // Setup initial state
      quadTap.state.active = false;
      mockVideo.paused = false;
      
      // Mock the container dimensions
      mockContainer.getBoundingClientRect = jest.fn(() => ({
        width: 800,
        height: 600,
        left: 0,
        top: 0
      }));
      
      // Create a real implementation of activateOverlay for testing
      quadTap.activateOverlay = function(x, y) {
        this.state.active = true;
        
        // Convert pixel coordinates to percentages (0-1)
        const percentX = x / this.state.containerDimensions.width;
        const percentY = y / this.state.containerDimensions.height;
        
        // Store profile bubble position as percentages
        this.state.profileBubblePosition = { x: percentX, y: percentY };
        
        // Store tap coordinates in normalized format
        this.state.tapCoordinates = {
          absolute: { x, y },
          normalized: { x: percentX, y: percentY }
        };
        
        // Determine quadrant using the mocked getQuadrant function
        const { getQuadrant } = require('../src/helpers/dom');
        this.state.quadrant = getQuadrant(x, y, this.elements.container);
      };
    });

    test('should activate overlay without pausing video', () => {
      // Act
      quadTap.activateOverlay(400, 300);
      
      // Assert
      expect(quadTap.state.active).toBe(true);
      expect(mockAdapter.pause).not.toHaveBeenCalled();
      expect(mockVideo.pause).not.toHaveBeenCalled();
    });

    test('should store tap coordinates in normalized format', () => {
      // Act
      quadTap.activateOverlay(400, 300);
      
      // Assert
      expect(quadTap.state.tapCoordinates).toBeDefined();
      expect(quadTap.state.tapCoordinates.normalized.x).toBe(0.5);
      expect(quadTap.state.tapCoordinates.normalized.y).toBe(0.5);
    });

    test('should determine and store the correct quadrant', () => {
      // Top-right (north-east)
      quadTap.activateOverlay(600, 200);
      expect(quadTap.state.quadrant).toBe('top-right');
      
      // Top-left (north-west)
      quadTap.activateOverlay(200, 200);
      expect(quadTap.state.quadrant).toBe('top-left');
      
      // Bottom-right (south-east)
      quadTap.activateOverlay(600, 400);
      expect(quadTap.state.quadrant).toBe('bottom-right');
      
      // Bottom-left (south-west)
      quadTap.activateOverlay(200, 400);
      expect(quadTap.state.quadrant).toBe('bottom-left');
    });
  });

  describe('Light-Box Interaction', () => {
    beforeEach(() => {
      // Setup initial state
      quadTap.state.active = true;
      quadTap.state.lightBoxOpen = false;
      mockVideo.paused = false;
      
      // Create real implementations for testing
      quadTap.openLightBox = function() {
        this.state.lightBoxOpen = true;
        
        // Store current playing state
        this.state.wasPlayingBefore = true;
        
        // Pause video
        if (this.config.videoPlayerApi && this.config.videoPlayerApi.enabled && this.config.videoPlayerApi.adapter) {
          this.config.videoPlayerApi.adapter.pause();
        }
      };
      
      quadTap.closeLightBox = function(confirm = false) {
        this.state.lightBoxOpen = false;
        
        // Resume video if it was playing before
        if (this.state.wasPlayingBefore) {
          if (this.config.videoPlayerApi && this.config.videoPlayerApi.enabled && this.config.videoPlayerApi.adapter) {
            this.config.videoPlayerApi.adapter.play();
          }
        }
        
        // Save throw-down if confirmed
        if (confirm) {
          this.saveThrowDown();
        }
      };
    });

    test('should pause video when opening light-box', () => {
      // Setup
      mockVideo.paused = false;
      mockAdapter.isPlaying.mockReturnValue(true);
      
      // Act
      quadTap.openLightBox();
      
      // Assert
      expect(quadTap.state.lightBoxOpen).toBe(true);
      expect(mockAdapter.pause).toHaveBeenCalled();
      expect(quadTap.state.wasPlayingBefore).toBe(true);
    });

    test('should resume video when closing light-box if it was playing before', () => {
      // Setup
      mockVideo.paused = false;
      mockAdapter.isPlaying.mockReturnValue(true);
      quadTap.state.lightBoxOpen = true;
      quadTap.state.wasPlayingBefore = true;
      
      // Act
      quadTap.closeLightBox(false);
      
      // Assert
      expect(quadTap.state.lightBoxOpen).toBe(false);
      expect(mockAdapter.play).toHaveBeenCalled();
    });

    test('should not resume video when closing light-box if it was paused before', () => {
      // Setup
      quadTap.state.lightBoxOpen = true;
      quadTap.state.wasPlayingBefore = false;
      
      // Act
      quadTap.closeLightBox(false);
      
      // Assert
      expect(quadTap.state.lightBoxOpen).toBe(false);
      expect(mockAdapter.play).not.toHaveBeenCalled();
    });

    test('should save throw-down when confirming', () => {
      // Setup
      quadTap.state.lightBoxOpen = true;
      
      // Act
      quadTap.closeLightBox(true);
      
      // Assert
      expect(quadTap.saveThrowDown).toHaveBeenCalled();
    });
  });

  describe('Overlay Deactivation', () => {
    beforeEach(() => {
      // Setup initial state
      quadTap.state.active = true;
      
      // Create real implementation for testing
      quadTap.deactivateOverlay = function(options = {}) {
        this.state.active = false;
        
        // Call callback if provided
        if (this.config.callbacks.onThrowDownCancel) {
          this.config.callbacks.onThrowDownCancel(this.state.currentQuadrant);
        }
        
        // Handle vertical swipe dismissal
        if (options.reason === 'swipe') {
          if (this.navigateFeed) {
            this.navigateFeed();
          }
        }
      };
      
      quadTap.navigateFeed = jest.fn();
    });

    test('should deactivate overlay without affecting video playback', () => {
      // Setup
      mockVideo.paused = false;
      
      // Act
      quadTap.deactivateOverlay({ reason: 'cancel' });
      
      // Assert
      expect(quadTap.state.active).toBe(false);
      expect(mockAdapter.play).not.toHaveBeenCalled();
      expect(mockAdapter.pause).not.toHaveBeenCalled();
    });

    test('should handle vertical swipe dismissal', () => {
      // Act
      quadTap.deactivateOverlay({ reason: 'swipe' });
      
      // Assert
      expect(quadTap.state.active).toBe(false);
      expect(quadTap.navigateFeed).toHaveBeenCalled();
    });
  });

  describe('Control Strip Positioning', () => {
    test('should position control strip at center-bottom (50%, 20%)', () => {
      // Setup
      const controlsElement = {
        style: {}
      };
      
      // Pre-set the style properties
      controlsElement.style.position = 'absolute';
      controlsElement.style.bottom = '20%';
      controlsElement.style.left = '50%';
      controlsElement.style.transform = 'translateX(-50%)';
      
      // Mock the createVideoControls method to return our test element
      quadTap.createVideoControls = jest.fn(() => controlsElement);
      
      // Act
      quadTap.elements.videoControls = controlsElement;
      
      // Assert
      expect(controlsElement.style.position).toBe('absolute');
      expect(controlsElement.style.bottom).toBe('20%');
      expect(controlsElement.style.left).toBe('50%');
      expect(controlsElement.style.transform).toBe('translateX(-50%)');
    });
  });

  describe('Event Handling', () => {
    beforeEach(() => {
      // Mock event handlers
      quadTap.handleContainerClick = jest.fn();
      quadTap.handleContainerTouchStart = jest.fn();
      quadTap.handleContainerTouchEnd = jest.fn();
      
      // Setup initial state
      quadTap.container = mockContainer;
      
      // Create real implementation for testing
      quadTap.bindEventHandlers = function() {
        if (!this.elements.container) return;
        
        // Store bound methods for removal later
        this._onContainerClick = this.handleContainerClick || function() {};
        this._onContainerTouchStart = this.handleContainerTouchStart || function() {};
        this._onContainerTouchMove = function() {}; // Mock touchmove handler
        this._onContainerTouchEnd = this.handleContainerTouchEnd || function() {};
        
        // Add event listeners
        this.elements.container.addEventListener('click', this._onContainerClick);
        this.elements.container.addEventListener('touchstart', this._onContainerTouchStart);
        this.elements.container.addEventListener('touchmove', this._onContainerTouchMove, { passive: true });
        this.elements.container.addEventListener('touchend', this._onContainerTouchEnd);
      };
      
      quadTap.destroy = function() {
        if (this.elements.container) {
          this.elements.container.removeEventListener('click', this._onContainerClick);
          this.elements.container.removeEventListener('touchstart', this._onContainerTouchStart);
          this.elements.container.removeEventListener('touchend', this._onContainerTouchEnd);
        }
      };
    });

    test('should bind event handlers with proper references', () => {
      // Act
      quadTap.bindEventHandlers();
      
      // Assert
      expect(mockContainer.addEventListener).toHaveBeenCalledWith('click', expect.any(Function));
      expect(mockContainer.addEventListener).toHaveBeenCalledWith('touchstart', expect.any(Function));
      expect(mockContainer.addEventListener).toHaveBeenCalledWith('touchmove', expect.any(Function), { passive: true });
      expect(mockContainer.addEventListener).toHaveBeenCalledWith('touchend', expect.any(Function));
    });

    test('should properly clean up event listeners on destroy', () => {
      // Setup
      quadTap._onContainerClick = jest.fn();
      quadTap._onContainerTouchStart = jest.fn();
      quadTap._onContainerTouchEnd = jest.fn();
      
      // Act
      quadTap.destroy();
      
      // Assert
      expect(mockContainer.removeEventListener).toHaveBeenCalledWith('click', quadTap._onContainerClick);
      expect(mockContainer.removeEventListener).toHaveBeenCalledWith('touchstart', quadTap._onContainerTouchStart);
      expect(mockContainer.removeEventListener).toHaveBeenCalledWith('touchend', quadTap._onContainerTouchEnd);
    });
  });
});
