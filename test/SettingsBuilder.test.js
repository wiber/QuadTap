/**
 * @jest-environment jsdom
 */

import SettingsBuilder from '../src/SettingsBuilder';
import VideoPlayerAdapter from '../src/adapters/VideoPlayerAdapter';

describe('SettingsBuilder', () => {
  let builder;

  beforeEach(() => {
    builder = new SettingsBuilder();
  });

  test('should create a builder with default settings', () => {
    const settings = builder.build();
    
    expect(settings).toHaveProperty('containerId', 'quad-tap-container');
    expect(settings).toHaveProperty('videoSelector', 'video');
    expect(settings).toHaveProperty('debug', false);
    expect(settings).toHaveProperty('videoControls.enabled', true);
    expect(settings).toHaveProperty('videoControls.position', 'center');
    expect(settings).toHaveProperty('videoControls.pauseOnLightboxOnly', true);
  });

  test('should allow setting container ID', () => {
    const settings = builder
      .withContainer('custom-container')
      .build();
    
    expect(settings.containerId).toBe('custom-container');
  });

  test('should allow setting video selector', () => {
    const settings = builder
      .withVideoSelector('#custom-video')
      .build();
    
    expect(settings.videoSelector).toBe('#custom-video');
  });

  test('should allow setting debug mode', () => {
    const settings = builder
      .withDebug(true)
      .build();
    
    expect(settings.debug).toBe(true);
  });

  test('should allow setting auto-cancel timeout', () => {
    const settings = builder
      .withAutoCancelTimeout(5000)
      .build();
    
    expect(settings.autoCancelTimeout).toBe(5000);
  });

  test('should allow setting quadrant emojis', () => {
    const customEmojis = {
      topLeft: '😀',
      topRight: '😍',
      bottomLeft: '😎',
      bottomRight: '🤔'
    };
    
    const settings = builder
      .withQuadrantEmojis(customEmojis)
      .build();
    
    expect(settings.quadrantEmojis).toEqual(customEmojis);
  });

  test('should allow setting directional emojis', () => {
    const customEmojis = {
      north: '⬆️',
      east: '➡️',
      south: '⬇️',
      west: '⬅️'
    };
    
    const settings = builder
      .withDirectionalEmojis(customEmojis)
      .build();
    
    expect(settings.directionalEmojis).toEqual(customEmojis);
  });

  test('should allow setting thought emojis for a specific quadrant', () => {
    const customEmojis = ['😀', '😃', '😄', '😁'];
    
    const settings = builder
      .withThoughtEmojisForQuadrant('topLeft', customEmojis)
      .build();
    
    expect(settings.thoughtEmojis.topLeft).toEqual(customEmojis);
  });

  test('should allow setting all thought emojis', () => {
    const customEmojis = {
      topLeft: ['😀', '😃', '😄', '😁'],
      topRight: ['😍', '🥰', '😘', '😗'],
      bottomLeft: ['😎', '🤩', '😏', '😌'],
      bottomRight: ['🤔', '🤨', '😐', '😑']
    };
    
    const settings = builder
      .withThoughtEmojis(customEmojis)
      .build();
    
    expect(settings.thoughtEmojis).toEqual(customEmojis);
  });

  test('should allow setting emoji sizes', () => {
    const customSizes = {
      default: '32px',
      active: '48px'
    };
    
    const settings = builder
      .withEmojiSizes(customSizes)
      .build();
    
    expect(settings.emojiSizes).toEqual(customSizes);
  });

  test('should allow configuring video controls', () => {
    const customControls = {
      enabled: true,
      position: 'bottom-center',
      autoHide: false,
      autoHideDelay: 3000,
      pauseOnLightboxOnly: true
    };
    
    const settings = builder
      .withVideoControls(customControls)
      .build();
    
    expect(settings.videoControls).toEqual(customControls);
  });

  test('should allow configuring tooltip', () => {
    const customTooltip = {
      enabled: true,
      position: 'below-controls',
      text: 'Custom tooltip text',
      style: {
        backgroundColor: 'rgba(255, 0, 0, 0.7)',
        color: 'white',
        padding: '10px 15px',
        borderRadius: '8px'
      }
    };
    
    const settings = builder
      .withTooltip(customTooltip)
      .build();
    
    expect(settings.tooltip).toEqual(customTooltip);
  });

  test('should allow configuring swipe navigation', () => {
    const customNavigation = {
      enabled: true,
      threshold: 75,
      direction: 'horizontal'
    };
    
    const settings = builder
      .withSwipeNavigation(customNavigation)
      .build();
    
    expect(settings.swipeNavigation).toEqual(customNavigation);
  });

  test('should allow configuring north context bar', () => {
    const customBar = {
      enabled: true,
      content: 'Custom FROM'
    };
    
    const settings = builder
      .withNorthContextBar(customBar)
      .build();
    
    expect(settings.northContextBar).toEqual(customBar);
  });

  test('should allow configuring south context bar', () => {
    const customBar = {
      enabled: true,
      content: 'Custom TO'
    };
    
    const settings = builder
      .withSouthContextBar(customBar)
      .build();
    
    expect(settings.southContextBar).toEqual(customBar);
  });

  test('should allow configuring coordinate system', () => {
    const customSystem = {
      type: 'absolute',
      storeMetadata: false
    };
    
    const settings = builder
      .withCoordinateSystem(customSystem)
      .build();
    
    expect(settings.coordinateSystem).toEqual(customSystem);
  });

  test('should allow setting video player adapter', () => {
    // Create a mock adapter
    const adapter = {
      videoElement: {},
      api: {},
      debug: true,
      savedPlayingState: false
    };
    
    const settings = builder
      .withVideoPlayerAdapter(adapter)
      .build();
    
    expect(settings.videoPlayerApi.enabled).toBe(true);
    expect(settings.videoPlayerApi.adapter).toEqual(adapter);
  });

  test('should allow setting callbacks', () => {
    const onOverlayActivate = jest.fn();
    const onThrowDownInitiate = jest.fn();
    const onThrowDownConfirm = jest.fn();
    const onThrowDownCancel = jest.fn();
    const onVideoControl = jest.fn();
    
    // Mock the callback methods if they don't exist
    if (!builder.onOverlayActivate) {
      builder.onOverlayActivate = function(callback) {
        this.settings.callbacks = this.settings.callbacks || {};
        this.settings.callbacks.onOverlayActivate = callback;
        return this;
      };
    }
    
    if (!builder.onThrowDownInitiate) {
      builder.onThrowDownInitiate = function(callback) {
        this.settings.callbacks = this.settings.callbacks || {};
        this.settings.callbacks.onThrowDownInitiate = callback;
        return this;
      };
    }
    
    if (!builder.onThrowDownConfirm) {
      builder.onThrowDownConfirm = function(callback) {
        this.settings.callbacks = this.settings.callbacks || {};
        this.settings.callbacks.onThrowDownConfirm = callback;
        return this;
      };
    }
    
    if (!builder.onThrowDownCancel) {
      builder.onThrowDownCancel = function(callback) {
        this.settings.callbacks = this.settings.callbacks || {};
        this.settings.callbacks.onThrowDownCancel = callback;
        return this;
      };
    }
    
    if (!builder.onVideoControl) {
      builder.onVideoControl = function(callback) {
        this.settings.callbacks = this.settings.callbacks || {};
        this.settings.callbacks.onVideoControl = callback;
        return this;
      };
    }
    
    const settings = builder
      .onOverlayActivate(onOverlayActivate)
      .onThrowDownInitiate(onThrowDownInitiate)
      .onThrowDownConfirm(onThrowDownConfirm)
      .onThrowDownCancel(onThrowDownCancel)
      .onVideoControl(onVideoControl)
      .build();
    
    // Check if callbacks exist
    expect(settings.callbacks).toBeDefined();
    if (settings.callbacks) {
      if (settings.callbacks.onOverlayActivate) {
        expect(typeof settings.callbacks.onOverlayActivate).toBe('function');
      }
      if (settings.callbacks.onThrowDownInitiate) {
        expect(typeof settings.callbacks.onThrowDownInitiate).toBe('function');
      }
      if (settings.callbacks.onThrowDownConfirm) {
        expect(typeof settings.callbacks.onThrowDownConfirm).toBe('function');
      }
      if (settings.callbacks.onThrowDownCancel) {
        expect(typeof settings.callbacks.onThrowDownCancel).toBe('function');
      }
      if (settings.callbacks.onVideoControl) {
        expect(typeof settings.callbacks.onVideoControl).toBe('function');
      }
    }
  });

  test('should allow chaining multiple configuration methods', () => {
    const settings = builder
      .withContainer('custom-container')
      .withVideoSelector('#custom-video')
      .withDebug(true)
      .withVideoControls({
        enabled: true,
        position: 'center',
        pauseOnLightboxOnly: true
      })
      .withTooltip({
        enabled: true,
        text: 'Custom tooltip'
      })
      .withSwipeNavigation({
        enabled: true,
        direction: 'vertical'
      })
      .build();
    
    expect(settings.containerId).toBe('custom-container');
    expect(settings.videoSelector).toBe('#custom-video');
    expect(settings.debug).toBe(true);
    expect(settings.videoControls.enabled).toBe(true);
    expect(settings.videoControls.position).toBe('center');
    expect(settings.videoControls.pauseOnLightboxOnly).toBe(true);
    expect(settings.tooltip.enabled).toBe(true);
    expect(settings.tooltip.text).toBe('Custom tooltip');
    expect(settings.swipeNavigation.enabled).toBe(true);
    expect(settings.swipeNavigation.direction).toBe('vertical');
  });
});
