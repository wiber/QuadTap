# SettingsBuilder Documentation

The `SettingsBuilder` provides a fluent interface for configuring QuadTap. It allows you to easily customize all aspects of QuadTap's behavior through a chainable API.

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Basic Usage](#basic-usage)
- [Configuration Options](#configuration-options)
  - [Container and Video](#container-and-video)
  - [Emojis](#emojis)
  - [Video Controls](#video-controls)
  - [Tooltip](#tooltip)
  - [Navigation](#navigation)
  - [Context Bars](#context-bars)
  - [Coordinate System](#coordinate-system)
  - [Video Player Integration](#video-player-integration)
  - [Callbacks](#callbacks)
- [Examples](#examples)
- [Default Settings](#default-settings)
- [Best Practices](#best-practices)

## Overview

The `SettingsBuilder` uses the builder pattern to create a configuration object for QuadTap. This approach offers several advantages:

- **Fluent Interface**: Chain method calls for a clean, readable configuration
- **Type Safety**: Each method accepts specific parameter types
- **Default Values**: Sensible defaults that you can override as needed
- **Validation**: Automatic validation of settings before they're used

## Installation

The `SettingsBuilder` is included with the QuadTap package. You can import it directly:

```javascript
// ES Modules
import SettingsBuilder from 'quad-tap/SettingsBuilder';

// CommonJS
const SettingsBuilder = require('quad-tap/SettingsBuilder');
```

## Basic Usage

```javascript
// Create a new settings builder
const builder = new SettingsBuilder();

// Configure settings
const settings = builder
  .withContainer('video-container')
  .withVideoSelector('#my-video')
  .withDebug(true)
  .withVideoControls({
    enabled: true,
    position: 'center',
    pauseOnLightboxOnly: true
  })
  .build();

// Initialize QuadTap with the settings
const quadTap = new QuadTap(settings);
```

## Configuration Options

### Container and Video

```javascript
// Set the container ID
builder.withContainer('video-container');

// Set the video selector
builder.withVideoSelector('#my-video');

// Enable debug mode
builder.withDebug(true);

// Set the auto-cancel timeout (in milliseconds)
builder.withAutoCancelTimeout(5000);
```

### Emojis

```javascript
// Set the quadrant emojis
builder.withQuadrantEmojis({
  topLeft: '🌈',
  topRight: '🔥',
  bottomLeft: '💧',
  bottomRight: '🌪️'
});

// Set the directional emojis
builder.withDirectionalEmojis({
  north: '⬆️',
  east: '➡️',
  south: '⬇️',
  west: '⬅️'
});

// Set the thought emojis for a specific quadrant
builder.withThoughtEmojisForQuadrant('topLeft', ['🌈', '🦄', '🌟', '🌻']);

// Set all thought emojis
builder.withThoughtEmojis({
  topLeft: ['🌈', '🦄', '🌟', '🌻'],
  topRight: ['🔥', '⚡', '💥', '🌋'],
  bottomLeft: ['💧', '🌊', '❄️', '☔'],
  bottomRight: ['🌪️', '🌩️', '⛈️', '🌀']
});

// Set emoji sizes
builder.withEmojiSizes({
  default: '24px',
  active: '36px'
});
```

### Video Controls

```javascript
// Configure video controls
builder.withVideoControls({
  enabled: true,
  position: 'center', // 'center', 'bottom-center', or 'top-center'
  autoHide: true,
  autoHideDelay: 2000,
  pauseOnLightboxOnly: true
});
```

### Tooltip

```javascript
// Configure tooltip
builder.withTooltip({
  enabled: true,
  position: 'above-controls', // 'above-controls', 'below-controls', or 'on-bubble'
  text: 'Tap elsewhere to cancel',
  style: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: 'white',
    padding: '8px 12px',
    borderRadius: '4px'
  }
});
```

### Navigation

```javascript
// Configure swipe navigation
builder.withSwipeNavigation({
  enabled: true,
  threshold: 50,
  direction: 'vertical' // 'vertical' or 'horizontal'
});
```

### Context Bars

```javascript
// Configure north context bar
builder.withNorthContextBar({
  enabled: true,
  content: 'FROM'
});

// Configure south context bar
builder.withSouthContextBar({
  enabled: true,
  content: 'TO'
});
```

### Coordinate System

```javascript
// Configure coordinate system
builder.withCoordinateSystem({
  type: 'percentage', // 'absolute', 'normalized', or 'percentage'
  storeMetadata: true
});
```

### Video Player Integration

```javascript
// Configure video player API integration
builder.withVideoPlayerApi({
  enabled: true,
  // ... other API configuration
});

// Configure with a VideoPlayerAdapter
const adapter = VideoPlayerAdapter.forHtml5Video(videoElement, true);
builder.withVideoPlayerAdapter(adapter);
```

### Callbacks

```javascript
// Set callback for overlay activation
builder.onOverlayActivate((quadrant, coordinates) => {
  console.log(`Overlay activated in ${quadrant} at ${coordinates.x}, ${coordinates.y}`);
});

// Set callback for throw-down initiation
builder.onThrowDownInitiate((data) => {
  console.log('Throw-down initiated', data);
});

// Set callback for throw-down confirmation
builder.onThrowDownConfirm((data) => {
  console.log('Throw-down confirmed', data);
});

// Set callback for throw-down cancellation
builder.onThrowDownCancel((reason) => {
  console.log(`Throw-down cancelled: ${reason}`);
});

// Set callback for video control actions
builder.onVideoControl((action) => {
  console.log(`Video control action: ${action}`);
});
```

## Examples

### Basic Configuration

```javascript
const settings = new SettingsBuilder()
  .withContainer('video-container')
  .withVideoSelector('#my-video')
  .build();

const quadTap = new QuadTap(settings);
```

### Advanced Configuration with Video Player Integration

```javascript
// Get the video element
const videoElement = document.querySelector('#my-video');

// Create an adapter for HTML5 video
const adapter = VideoPlayerAdapter.forHtml5Video(videoElement, true);

// Configure QuadTap
const settings = new SettingsBuilder()
  .withContainer('video-container')
  .withVideoSelector('#my-video')
  .withDebug(true)
  .withVideoControls({
    enabled: true,
    position: 'center',
    autoHide: true,
    autoHideDelay: 2000,
    pauseOnLightboxOnly: true
  })
  .withTooltip({
    enabled: true,
    position: 'above-controls',
    text: 'Tap elsewhere to cancel'
  })
  .withSwipeNavigation({
    enabled: true,
    direction: 'vertical'
  })
  .withNorthContextBar({
    enabled: true,
    content: 'FROM'
  })
  .withSouthContextBar({
    enabled: true,
    content: 'TO'
  })
  .withVideoPlayerAdapter(adapter)
  .onThrowDownConfirm((data) => {
    saveThrowDown(data);
  })
  .build();

const quadTap = new QuadTap(settings);
```

### Custom Emojis

```javascript
const settings = new SettingsBuilder()
  .withContainer('video-container')
  .withVideoSelector('#my-video')
  .withQuadrantEmojis({
    topLeft: '😀',
    topRight: '😍',
    bottomLeft: '😎',
    bottomRight: '🤔'
  })
  .withThoughtEmojis({
    topLeft: ['😀', '😃', '😄', '😁'],
    topRight: ['😍', '🥰', '😘', '😗'],
    bottomLeft: ['😎', '🤩', '😏', '😌'],
    bottomRight: ['🤔', '🤨', '😐', '😑']
  })
  .build();

const quadTap = new QuadTap(settings);
```

## Default Settings

The `SettingsBuilder` initializes with the following default settings:

```javascript
{
  containerId: 'quad-tap-container',
  videoSelector: 'video',
  debug: false,
  autoCancelTimeout: 3000,
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
    pauseOnLightboxOnly: false
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
}
```

## Best Practices

1. **Start with Defaults**: The default settings are designed to work well for most use cases. Only override the settings you need to change.

2. **Container and Video**: Always set the container ID and video selector to match your HTML structure.

3. **Debug Mode**: Enable debug mode during development to see helpful logs in the console.

4. **Video Player Integration**: Use the `VideoPlayerAdapter` to integrate with your video player for the best experience.

5. **Validation**: The `SettingsBuilder` validates your settings when you call `build()`. Check the console for warnings if something doesn't work as expected.

6. **Callbacks**: Use callbacks to integrate QuadTap with your application logic, such as saving throw-downs or tracking analytics.

7. **Customization**: Customize the emojis, tooltip, and other visual elements to match your application's style.
