# QuadTap: Intuitive Video Interaction Reimagined

**QuadTap is a pure JavaScript library that revolutionizes video engagement with a unique quad-tap overlay, designed for advanced video player integration and a richer user experience.**

<!-- TODO: Add a compelling GIF here demonstrating QuadTap in action! -->
![QuadTap Demo](https://htmlpreview.github.io/?https://github.com/wiber/QuadTap/blob/main/docs/QuadTapDemo2.gif)

## Live Demo

**[Try the Live QuadTap Demo](https://htmlpreview.github.io/?https://github.com/wiber/QuadTap/blob/main/dist/index.html)** - Interactive demo with swipeable functionality and full QuadTap features.

## Why QuadTap? The Motivation

In an increasingly video-driven world, standard video player interactions often fall short of providing deep, nuanced engagement. QuadTap was born from the need for a more intuitive, expressive, and ultimately more human way to interact with video content. It serves as a sophisticated interaction layer, enabling users to not just consume, but to react, comment, and connect with video moments in a uniquely spatial and contextual manner. This project is the first step towards a future where digital interactions are richer and more meaningful.

## Key Features

- **Intuitive Quad-Tap Interaction**: Tap anywhere on a video to activate an elegant overlay with quadrant gradients, contextual axis emojis, and an interactive bubble at the tap coordinates.
- **Expressive Throw-Down Flow**: Tap the bubble to open a "Throw-Down" lightbox with thought emojis, a comment box, and share/cancel options, allowing for nuanced feedback.
- **Integrated Video Controls**: Seamlessly access video controls when the overlay is active.
- **Smooth Swipe Navigation**: Effortlessly navigate between videos with vertical swipes.
- **Contextual Information Bars**: Optional North (FROM) and South (TO) bars for additional context.
- **Broad Video Player Compatibility**: Adapters for HTML5, YouTube, Vimeo, and easy integration with custom players.
- **Highly Customizable**: Extensive configuration options via the `SettingsBuilder` to tailor the experience.
- **Responsive & Accessible**: Designed for all screen sizes and with accessibility in mind.

## Installation

Get QuadTap via npm:
```bash
npm install quad-tap
```
Or clone the repository:
```bash
git clone https://github.com/wiber/QuadTap.git
```

## Basic Usage

```javascript
import QuadTap from 'quad-tap';
import SettingsBuilder from 'quad-tap/SettingsBuilder';

// Configure your settings
const settings = new SettingsBuilder()
  .withContainer('video-container') // Your video container ID
  .withVideoSelector('#my-video')    // Your video element selector
  .build();

// Initialize QuadTap
const quadTap = new QuadTap(settings);
```

## Advanced Usage & Video Player Integration

QuadTap shines with its powerful adapter system.

```javascript
import QuadTap from 'quad-tap';
import SettingsBuilder from 'quad-tap/SettingsBuilder';
import VideoPlayerAdapter from 'quad-tap/adapters/VideoPlayerAdapter';

const videoElement = document.querySelector('#my-video');
// Example: HTML5 video adapter
const adapter = VideoPlayerAdapter.forHtml5Video(videoElement, true /* debug */);

const settings = new SettingsBuilder()
  .withContainer('video-container')
  .withVideoSelector('#my-video')
  .withVideoPlayerAdapter(adapter)
  .withDebug(true)
  .withVideoControls({ enabled: true, position: 'center', autoHide: true })
  .onThrowDownConfirm((data) => {
    console.log('ThrowDown confirmed!', data);
    // Your logic to save/process the throwdown data
  })
  .build();

const quadTap = new QuadTap(settings);
```
See [Video Player Adapters](#video-player-adapters) for more.

## Documentation

Dive deeper into QuadTap's capabilities:

- **[Full Configuration Options (SettingsBuilder)](./docs/SETTINGS_BUILDER.md)**
- **[VideoPlayerAdapter Guide](./docs/VIDEO_ADAPTER.md)**
- **[Project Specification](./docs/SPEC.md)**

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
Integrate with any player using the custom adapter:
```javascript
const adapter = VideoPlayerAdapter.custom({
  videoElement: customPlayer,
  api: { /* ... your player's API methods ... */ },
  debug: true
});
```
Refer to the [VideoPlayerAdapter Documentation](./docs/VIDEO_ADAPTER.md) for details.

## Configuration Highlights

Tailor QuadTap to your needs using the `SettingsBuilder`:

```javascript
// Example: Customizing emojis
builder.withQuadrantEmojis({ topLeft: '💡', topRight: '🚀', bottomLeft: '🤔', bottomRight: '🎉' });

// Example: Styling overlay colors
builder.withOverlayColors({
  background: 'rgba(0, 0, 0, 0.6)',
  quadrantGradients: {
    topLeft: 'rgba(74, 144, 226, 0.7)',  // Blue
    topRight: 'rgba(245, 166, 35, 0.7)', // Orange
    bottomLeft: 'rgba(126, 211, 33, 0.7)',// Green
    bottomRight: 'rgba(189, 16, 224, 0.7)'// Purple
  }
});
```
For all options, see the [SettingsBuilder Documentation](./docs/SETTINGS_BUILDER.md).

## Swiping API
QuadTap offers robust swipe gesture support. Configure custom behaviors for vertical and horizontal swipes on the video or overlay.
Refer to the `withSwipeNavigation` and `withSwipeHandlers` options in the [SettingsBuilder Documentation](./docs/SETTINGS_BUILDER.md).

## Browser Support

QuadTap supports all modern browsers: Chrome, Firefox, Safari, and Edge (latest versions).

## Contributing to QuadTap

We welcome contributions to QuadTap! Whether you're fixing bugs, improving documentation, or adding new features, your help is appreciated.

**Ways to Contribute:**
- **Report Issues**: Encounter a bug? Have a suggestion? Open an issue on GitHub.
- **Submit Pull Requests**: Follow the development setup below, make your changes, and submit a PR.
- **Improve Documentation**: Help us make our docs clearer and more comprehensive.

**Development Setup:**
```bash
# Clone the repository
git clone https://github.com/wiber/QuadTap.git
cd QuadTap

# Install dependencies
npm install

# Start development server (often watches for changes and rebuilds)
npm start

# Build for production
npm run build

# Run tests
npm test
```
Please ensure your code adheres to the project's linting standards (if applicable) and that all tests pass before submitting a pull request.

## Future Development Roadmap

QuadTap is actively evolving. Here's a glimpse of what's planned:

- **Enhanced Swiping API**: More granular control and visual feedback for swipe gestures.
- **Advanced Mobile Experience**: Haptic feedback, improved gesture recognition.
- **Lightbox Upgrades**: Dynamic emoji grids, refined UI/UX.
- **Deeper Customization**: Theme support, animation controls.
- **Broader Integrations**: More player adapters, component wrappers for frameworks like React/Vue.
- **Accessibility Improvements**: Continued focus on ARIA standards and keyboard navigation.

Our vision extends beyond these features, aiming to build foundational technologies for richer, more interactive digital experiences.

## Join the Development Team

Excited by the future of video interaction and building meaningful digital tools? QuadTap is part of a larger vision to create intuitive and powerful human-computer interfaces. If you're passionate about clean code, innovative UX, and pushing the boundaries of web technology, we'd love to hear from you.

Visit [ThetaHire.com](https://www.ThetaHire.com) to explore opportunities and help shape the future of interaction.

## License

MIT
