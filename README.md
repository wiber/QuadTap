# QuadTap

A pure JavaScript implementation of the Quad-Tap overlay interaction design for videos with advanced video player API integration. A wibe coders dream? Maybe.

## Introduction to WHY



## Features

- **Quad-Tap Interaction**: Tap on a video to activate an overlay with quadrant gradients, axis emojis, and a bubble at the tap coordinates.
- **Throw-Down Flow**: Tap on the bubble to open a light-box with thought emojis, comment box, and share/cancel options.
- **Video Controls**: Built-in video controls that appear when the overlay is active.
- **Swipe Navigation**: Vertical swipe to navigate between videos.
- **Context Bars**: North (FROM) and South (TO) context bars for additional information.
- **Video Player Integration**: Seamless integration with HTML5, YouTube, Vimeo, and custom video players.
- **Customizable**: Extensive configuration options through the SettingsBuilder.
- **Responsive**: Works on all screen sizes and devices.
- **Accessible**: Keyboard navigation and screen reader support.

## Installation

```bash
https://github.com/wiber/QuadTap.git
```
Or
```bash
npm install quad-tap
```

## Basic Usage

```javascript
import QuadTap from 'quad-tap';
import SettingsBuilder from 'quad-tap/SettingsBuilder';

// Create a new settings builder
const settings = new SettingsBuilder()
  .withContainer('video-container')
  .withVideoSelector('#my-video')
  .build();

// Initialize QuadTap
const quadTap = new QuadTap(settings);
```

## Advanced Usage with Video Player Integration

```javascript
import QuadTap from 'quad-tap';
import SettingsBuilder from 'quad-tap/SettingsBuilder';
import VideoPlayerAdapter from 'quad-tap/adapters/VideoPlayerAdapter';

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
  .withVideoPlayerAdapter(adapter)
  .onThrowDownConfirm((data) => {
    saveThrowDown(data);
  })
  .build();

const quadTap = new QuadTap(settings);
```

## Video Player Adapters

QuadTap provides adapters for various video players:

### HTML5 Video

```javascript
const adapter = VideoPlayerAdapter.forHtml5Video(videoElement, debug);
```

### YouTube

```javascript
const adapter = VideoPlayerAdapter.forYouTube(youtubePlayer, debug);
```

### Vimeo

```javascript
const adapter = VideoPlayerAdapter.forVimeo(vimeoPlayer, debug);
```

### Custom Player

```javascript
const adapter = VideoPlayerAdapter.custom({
  videoElement: customPlayer,
  api: {
    playMethod: (player) => player.play(),
    pauseMethod: (player) => player.pause(),
    seekMethod: (player, time) => player.seekTo(time),
    getCurrentTimeMethod: (player) => player.getCurrentTime(),
    getDurationMethod: (player) => player.getDuration(),
    isPlayingMethod: (player) => player.isPlaying(),
    getVideoIdMethod: (player) => player.getVideoId()
  },
  debug: true
});
```

## Configuration Options

QuadTap can be extensively configured using the SettingsBuilder. Here are some of the available options:

### Container and Video

```javascript
builder.withContainer('video-container');
builder.withVideoSelector('#my-video');
builder.withDebug(true);
builder.withAutoCancelTimeout(5000);
```

### Emojis

```javascript
builder.withQuadrantEmojis({
  topLeft: '🌈',
  topRight: '🔥',
  bottomLeft: '💧',
  bottomRight: '🌪️'
});

builder.withThoughtEmojis({
  topLeft: ['🌈', '🦄', '🌟', '🌻'],
  topRight: ['🔥', '⚡', '💥', '🌋'],
  bottomLeft: ['💧', '🌊', '❄️', '☔'],
  bottomRight: ['🌪️', '🌩️', '⛈️', '🌀']
});
```

### Video Controls

```javascript
builder.withVideoControls({
  enabled: true,
  position: 'center',
  autoHide: true,
  autoHideDelay: 2000,
  pauseOnLightboxOnly: true
});
```

### Navigation

```javascript
builder.withSwipeNavigation({
  enabled: true,
  threshold: 50,
  direction: 'vertical'
});
```

### Context Bars

```javascript
builder.withNorthContextBar({
  enabled: true,
  content: 'FROM'
});

builder.withSouthContextBar({
  enabled: true,
  content: 'TO'
});
```

### Styling Options

```javascript
// Configure overlay colors
builder.withOverlayColors({
  background: 'rgba(240, 240, 245, 0.5)', // Light background
  quadrantGradients: {
    topLeft: 'rgba(0, 255, 255, 0.8)',    // Cyan
    topRight: 'rgba(255, 255, 0, 0.8)',   // Yellow
    bottomLeft: 'rgba(0, 255, 0, 0.8)',   // Green
    bottomRight: 'rgba(255, 0, 255, 0.8)' // Magenta
  }
});

// Configure lightbox colors
builder.withLightboxColors({
  background: 'rgba(0, 0, 0, 0.9)',
  text: 'white',
  headerBackground: 'rgba(50, 50, 50, 0.8)',
  buttonPrimary: '#4CAF50',
  buttonSecondary: '#f44336'
});
```

For a complete list of configuration options, see the [SettingsBuilder documentation](./docs/SETTINGS_BUILDER.md).

## Mobile Support

QuadTap is designed to work seamlessly on mobile devices with touch events:

- Tap on video to activate overlay
- Tap on bubble to open lightbox
- Tap elsewhere to dismiss overlay
- Swipe vertically to navigate between videos
- Swipe horizontally for additional interactions (configurable)

The lightbox is responsive and adapts to different screen sizes, ensuring a consistent experience across devices.

## Percentage Rating System

The lightbox includes a percentage rating system that allows users to provide more nuanced feedback:

- 0-5 scale with 3 as the center point
- Visual indicators using emojis (rockets for vertical rating, crowns for horizontal)
- Percentage boxes show exact position values
- Allows users to fine-tune their throwdown with precise positioning

## Documentation

- [SettingsBuilder Documentation](./docs/SETTINGS_BUILDER.md)
- [VideoPlayerAdapter Documentation](./docs/VIDEO_ADAPTER.md)
- [Specification](./docs/SPEC.md)

## Examples

See the [examples directory](./test) for complete examples of using QuadTap with different video players.

## Browser Support

QuadTap supports all modern browsers:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Run it
npm run

# Run visual tests
npm run test:visual

# Just open it
open dist-test/auto-init-test.html    
open ./dist-test/overlay-swipe-test.html
open ./dist-test/swipe-test.html 
```

## Swiping API

QuadTap provides comprehensive support for swipe gestures in all four directions (up, down, left, right), both on the video and when the overlay is active.

### Swipe Directions and Default Behaviors

| Direction | On Video | On Overlay | Default Action |
|-----------|----------|------------|----------------|
| **Up** | Activates overlay | Dismisses overlay | Navigates to previous video |
| **Down** | Activates overlay | Dismisses overlay | Navigates to next video |
| **Left** | Activates overlay | Custom action | Configurable (e.g., rewind) |
| **Right** | Activates overlay | Custom action | Configurable (e.g., fast-forward) |

### Configuring Swipe Behavior

```javascript
// Configure swipe behavior using SettingsBuilder
const settings = new SettingsBuilder()
  .withSwipeNavigation({
    enabled: true,
    threshold: 50,         // Minimum distance in pixels to trigger a swipe
    direction: 'vertical', // 'vertical', 'horizontal', or 'both'
    onVerticalSwipe: (direction, quadTap) => {
      // Custom handler for vertical swipes (up/down)
      if (direction === 'up') {
        // Navigate to previous video
        previousVideo();
      } else {
        // Navigate to next video
        nextVideo();
      }
    },
    onHorizontalSwipe: (direction, quadTap) => {
      // Custom handler for horizontal swipes (left/right)
      if (direction === 'left') {
        // Rewind video
        quadTap.getVideoPlayerAdapter().seek(
          quadTap.getVideoPlayerAdapter().getCurrentTime() - 10
        );
      } else {
        // Fast-forward video
        quadTap.getVideoPlayerAdapter().seek(
          quadTap.getVideoPlayerAdapter().getCurrentTime() + 10
        );
      }
    }
  })
  .build();
```

### Swipe Detection on Overlay

When the overlay is active, QuadTap detects swipes in all four directions:

1. **Vertical Swipes (Up/Down)**: By default, vertical swipes dismiss the overlay and navigate to the previous/next video in the feed.
2. **Horizontal Swipes (Left/Right)**: By default, horizontal swipes trigger custom actions defined by the host application.

### Customizing Swipe Handlers

You can provide custom handlers for swipe events to implement specific behaviors:

```javascript
const settings = new SettingsBuilder()
  .withSwipeHandlers({
    onSwipeUp: (quadTap) => {
      console.log('Swiped up');
      // Custom behavior for swipe up
    },
    onSwipeDown: (quadTap) => {
      console.log('Swiped down');
      // Custom behavior for swipe down
    },
    onSwipeLeft: (quadTap) => {
      console.log('Swiped left');
      // Custom behavior for swipe left
    },
    onSwipeRight: (quadTap) => {
      console.log('Swiped right');
      // Custom behavior for swipe right
    }
  })
  .build();
```

### Testing Swipe Functionality

QuadTap includes test pages for verifying swipe functionality:

- **Basic Swipe Test**: Tests swipe detection in all four directions.
- **Overlay Swipe Test**: Tests swipe interactions specifically when the overlay is active.

These test pages provide visual feedback on detected swipe directions and detailed event logs.

## Future Development Roadmap

The following features are planned for future releases:

### Swiping API Enhancements
- Swipe gesture visualization with directional indicators
- Explanation in lightbox of how it was opened (tap vs. swipe)

### Mobile Experience Improvements
- Enhanced touch event handling
- Haptic feedback support
- Improved gesture recognition
- Better support for various screen sizes and orientations

### Lightbox Enhancements
- Full-width responsive design
- Dynamic emoji grid layout
- Improved percentage indicators with visual feedback
- Better integration with host applications

### Styling and Customization
- Option to use CSS classes instead of inline styles
- Theme support with predefined color schemes
- Animation customization options
- Custom emoji sets and icon support

### Integration Improvements
- Enhanced event system for better host application integration
- More video player adapters
- React and Vue component wrappers
- TypeScript type definitions

### Accessibility Enhancements
- Improved keyboard navigation
- Better screen reader support
- High contrast mode
- Reduced motion option

## Join the Development Team

Want to contribute to the development of QuadTap or build similar value added or interactive video experiences? Visit [ThetaHire.com](https://www.ThetaHire.com) to join our team and help build the future of ... semantic parallelisation? - I mean video interaction. Definately that.

## License

MIT
