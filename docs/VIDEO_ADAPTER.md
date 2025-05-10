# VideoPlayerAdapter Documentation

The `VideoPlayerAdapter` provides a unified interface for interacting with different video player APIs. This allows QuadTap to work seamlessly with various video players like HTML5 video, YouTube, Vimeo, or custom players.

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Usage](#usage)
  - [HTML5 Video](#html5-video)
  - [YouTube](#youtube)
  - [Vimeo](#vimeo)
  - [Custom Player](#custom-player)
- [API Reference](#api-reference)
- [Examples](#examples)
- [Troubleshooting](#troubleshooting)

## Overview

The `VideoPlayerAdapter` provides a consistent interface for:

- Playing and pausing videos
- Seeking to specific times
- Getting current time and duration
- Checking if a video is playing
- Saving and restoring playing state
- Getting video metadata

This allows QuadTap to interact with the video player without needing to know the specific API details of each player.

## Installation

The `VideoPlayerAdapter` is included with the QuadTap package. You can import it directly:

```javascript
// ES Modules
import VideoPlayerAdapter from 'quad-tap/adapters/VideoPlayerAdapter';

// CommonJS
const VideoPlayerAdapter = require('quad-tap/adapters/VideoPlayerAdapter');
```

## Usage

### HTML5 Video

```javascript
// Get the video element
const videoElement = document.querySelector('video');

// Create an adapter for HTML5 video
const adapter = VideoPlayerAdapter.forHtml5Video(videoElement, true);

// Use the adapter with QuadTap
const settings = new SettingsBuilder()
  .withContainer('video-container')
  .withVideoSelector('video')
  .withVideoPlayerAdapter(adapter)
  .build();

const quadTap = new QuadTap(settings);
```

### YouTube

```javascript
// Assuming you have a YouTube player instance
const youtubePlayer = new YT.Player('youtube-player', {
  videoId: 'VIDEO_ID',
  events: {
    'onReady': onPlayerReady,
    'onStateChange': onPlayerStateChange
  }
});

// Create an adapter for YouTube
const adapter = VideoPlayerAdapter.forYouTube(youtubePlayer, true);

// Use the adapter with QuadTap
const settings = new SettingsBuilder()
  .withContainer('youtube-container')
  .withVideoSelector('#youtube-player')
  .withVideoPlayerAdapter(adapter)
  .build();

const quadTap = new QuadTap(settings);
```

### Vimeo

```javascript
// Assuming you have a Vimeo player instance
const vimeoPlayer = new Vimeo.Player('vimeo-player', {
  id: VIDEO_ID,
  width: 640
});

// Create an adapter for Vimeo
const adapter = VideoPlayerAdapter.forVimeo(vimeoPlayer, true);

// Use the adapter with QuadTap
const settings = new SettingsBuilder()
  .withContainer('vimeo-container')
  .withVideoSelector('#vimeo-player')
  .withVideoPlayerAdapter(adapter)
  .build();

const quadTap = new QuadTap(settings);
```

### Custom Player

```javascript
// Create a custom adapter for your video player
const customPlayer = {
  // Your custom player object or API
  play: function() { console.log('Custom player: play'); },
  pause: function() { console.log('Custom player: pause'); },
  getCurrentTime: function() { return 30; },
  getDuration: function() { return 120; },
  isPlaying: function() { return true; }
};

const adapter = VideoPlayerAdapter.custom({
  videoElement: customPlayer,
  api: {
    playMethod: (player) => player.play(),
    pauseMethod: (player) => player.pause(),
    seekMethod: (player, time) => player.seekTo(time),
    getCurrentTimeMethod: (player) => player.getCurrentTime(),
    getDurationMethod: (player) => player.getDuration(),
    isPlayingMethod: (player) => player.isPlaying(),
    getVideoIdMethod: (player) => 'custom-video-123'
  },
  debug: true
});

// Use the adapter with QuadTap
const settings = new SettingsBuilder()
  .withContainer('custom-container')
  .withVideoSelector('#custom-player')
  .withVideoPlayerAdapter(adapter)
  .build();

const quadTap = new QuadTap(settings);
```

## API Reference

### Constructor

```javascript
new VideoPlayerAdapter(config)
```

- `config` (Object): The adapter configuration
  - `videoElement` (HTMLVideoElement|Object): The video element or player object
  - `api` (Object): API configuration
    - `playMethod` (Function): Method to play the video
    - `pauseMethod` (Function): Method to pause the video
    - `seekMethod` (Function): Method to seek the video
    - `getCurrentTimeMethod` (Function): Method to get current time
    - `getDurationMethod` (Function): Method to get duration
    - `isPlayingMethod` (Function): Method to check if video is playing
    - `getVideoIdMethod` (Function): Method to get video ID
  - `debug` (boolean): Whether to enable debug logging

### Static Methods

#### `forHtml5Video(videoElement, debug = false)`

Creates an adapter for a standard HTML5 video element.

- `videoElement` (HTMLVideoElement): The video element
- `debug` (boolean): Whether to enable debug logging
- Returns: A new VideoPlayerAdapter instance

#### `forYouTube(youtubePlayer, debug = false)`

Creates an adapter for a YouTube player.

- `youtubePlayer` (Object): The YouTube player instance
- `debug` (boolean): Whether to enable debug logging
- Returns: A new VideoPlayerAdapter instance

#### `forVimeo(vimeoPlayer, debug = false)`

Creates an adapter for a Vimeo player.

- `vimeoPlayer` (Object): The Vimeo player instance
- `debug` (boolean): Whether to enable debug logging
- Returns: A new VideoPlayerAdapter instance

#### `custom(config)`

Creates a custom adapter.

- `config` (Object): The adapter configuration
  - `videoElement` (Object): The video element or player object
  - `api` (Object): API configuration
    - `playMethod` (Function): Method to play the video
    - `pauseMethod` (Function): Method to pause the video
    - `seekMethod` (Function): Method to seek the video
    - `getCurrentTimeMethod` (Function): Method to get current time
    - `getDurationMethod` (Function): Method to get duration
    - `isPlayingMethod` (Function): Method to check if video is playing
    - `getVideoIdMethod` (Function): Method to get video ID
  - `debug` (boolean): Whether to enable debug logging
- Returns: A new VideoPlayerAdapter instance

### Instance Methods

#### `play()`

Plays the video.

- Returns: A promise that resolves when the video starts playing

#### `pause()`

Pauses the video.

- Returns: A promise that resolves when the video is paused

#### `seek(time)`

Seeks to a specific time in the video.

- `time` (number): The time to seek to in seconds
- Returns: A promise that resolves when the seek operation is complete

#### `getCurrentTime()`

Gets the current time of the video.

- Returns: A promise that resolves with the current time in seconds

#### `getDuration()`

Gets the duration of the video.

- Returns: A promise that resolves with the duration in seconds

#### `isPlaying()`

Checks if the video is currently playing.

- Returns: A promise that resolves with true if the video is playing, false otherwise

#### `getVideoId()`

Gets the video ID.

- Returns: A promise that resolves with the video ID

#### `savePlayingState()`

Saves the current playing state.

- Returns: A promise that resolves when the state is saved

#### `restorePlayingState()`

Restores the last saved playing state.

- Returns: A promise that resolves when the state is restored

#### `getMetadata()`

Gets video metadata.

- Returns: A promise that resolves with the video metadata

## Examples

See the [examples directory](../test/video-adapter-example.html) for complete examples of using the VideoPlayerAdapter with different video players.

## Troubleshooting

### Common Issues

#### Video doesn't pause when lightbox opens

Make sure you've configured the `pauseOnLightboxOnly` option correctly:

```javascript
const settings = new SettingsBuilder()
  .withVideoControls({
    enabled: true,
    pauseOnLightboxOnly: true
  })
  .withVideoPlayerAdapter(adapter)
  .build();
```

#### Adapter methods not working with custom player

Ensure that your custom player API methods match the expected signatures. For example, if your player's play method returns a promise, the adapter will wait for that promise to resolve.

#### Debug logs not showing

Make sure you've enabled debug mode when creating the adapter:

```javascript
const adapter = VideoPlayerAdapter.forHtml5Video(videoElement, true);
```

### Getting Help

If you encounter issues not covered here, please:

1. Check the [QuadTap documentation](./README.md)
2. Open an issue on the [GitHub repository](https://github.com/yourusername/quad-tap/issues)
