/**
 * VideoPlayerAdapter provides a unified interface for interacting with different video player APIs.
 * This allows QuadTap to work with various video players like HTML5 video, YouTube, Vimeo, or custom players.
 */
class VideoPlayerAdapter {
  /**
   * Constructor
   * @param {Object} config - The adapter configuration
   * @param {HTMLVideoElement|Object} config.videoElement - The video element or player object
   * @param {Object} config.api - API configuration
   * @param {Function} config.api.playMethod - Method to play the video
   * @param {Function} config.api.pauseMethod - Method to pause the video
   * @param {Function} config.api.seekMethod - Method to seek the video
   * @param {Function} config.api.getCurrentTimeMethod - Method to get current time
   * @param {Function} config.api.getDurationMethod - Method to get duration
   * @param {Function} config.api.isPlayingMethod - Method to check if video is playing
   * @param {Function} config.api.getVideoIdMethod - Method to get video ID
   * @param {boolean} config.debug - Whether to enable debug logging
   */
  constructor(config) {
    this.videoElement = config.videoElement;
    this.api = config.api;
    this.debug = config.debug || false;
    this.savedPlayingState = false;
    
    this.log('VideoPlayerAdapter initialized');
  }

  /**
   * Log a message if debug is enabled
   * @param {string} message - The message to log
   * @private
   */
  log(message) {
    if (this.debug) {
      console.log(`[VideoPlayerAdapter] ${message}`);
    }
  }

  /**
   * Play the video
   * @returns {Promise<void>} A promise that resolves when the video starts playing
   */
  async play() {
    try {
      this.log('Playing video');
      const result = this.api.playMethod(this.videoElement);
      return result instanceof Promise ? await result : result;
    } catch (error) {
      this.log(`Error playing video: ${error.message}`);
      throw error;
    }
  }

  /**
   * Pause the video
   * @returns {Promise<void>} A promise that resolves when the video is paused
   */
  async pause() {
    try {
      this.log('Pausing video');
      const result = this.api.pauseMethod(this.videoElement);
      return result instanceof Promise ? await result : result;
    } catch (error) {
      this.log(`Error pausing video: ${error.message}`);
      throw error;
    }
  }

  /**
   * Seek to a specific time in the video
   * @param {number} time - The time to seek to in seconds
   * @returns {Promise<void>} A promise that resolves when the seek operation is complete
   */
  async seek(time) {
    try {
      this.log(`Seeking to ${time} seconds`);
      const result = this.api.seekMethod(this.videoElement, time);
      return result instanceof Promise ? await result : result;
    } catch (error) {
      this.log(`Error seeking video: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get the current time of the video
   * @returns {Promise<number>} A promise that resolves with the current time in seconds
   */
  async getCurrentTime() {
    try {
      const result = this.api.getCurrentTimeMethod(this.videoElement);
      return result instanceof Promise ? await result : result;
    } catch (error) {
      this.log(`Error getting current time: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get the duration of the video
   * @returns {Promise<number>} A promise that resolves with the duration in seconds
   */
  async getDuration() {
    try {
      const result = this.api.getDurationMethod(this.videoElement);
      return result instanceof Promise ? await result : result;
    } catch (error) {
      this.log(`Error getting duration: ${error.message}`);
      throw error;
    }
  }

  /**
   * Check if the video is currently playing
   * @returns {Promise<boolean>} A promise that resolves with true if the video is playing, false otherwise
   */
  async isPlaying() {
    try {
      const result = this.api.isPlayingMethod(this.videoElement);
      return result instanceof Promise ? await result : result;
    } catch (error) {
      this.log(`Error checking if video is playing: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get the video ID
   * @returns {Promise<string>} A promise that resolves with the video ID
   */
  async getVideoId() {
    try {
      const result = this.api.getVideoIdMethod(this.videoElement);
      return result instanceof Promise ? await result : result;
    } catch (error) {
      this.log(`Error getting video ID: ${error.message}`);
      throw error;
    }
  }

  /**
   * Save the current playing state
   * @returns {Promise<void>} A promise that resolves when the state is saved
   */
  async savePlayingState() {
    try {
      this.log('Saving playing state');
      this.savedPlayingState = await this.isPlaying();
      this.log(`Saved playing state: ${this.savedPlayingState}`);
    } catch (error) {
      this.log(`Error saving playing state: ${error.message}`);
      throw error;
    }
  }

  /**
   * Restore the last saved playing state
   * @returns {Promise<void>} A promise that resolves when the state is restored
   */
  async restorePlayingState() {
    try {
      this.log(`Restoring playing state: ${this.savedPlayingState}`);
      if (this.savedPlayingState) {
        await this.play();
      } else {
        await this.pause();
      }
    } catch (error) {
      this.log(`Error restoring playing state: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get video metadata
   * @returns {Promise<Object>} A promise that resolves with the video metadata
   */
  async getMetadata() {
    try {
      const [currentTime, duration, videoId] = await Promise.all([
        this.getCurrentTime(),
        this.getDuration(),
        this.getVideoId()
      ]);
      
      return {
        currentTime,
        duration,
        videoId,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      this.log(`Error getting metadata: ${error.message}`);
      throw error;
    }
  }

  /**
   * Create an adapter for a standard HTML5 video element
   * @param {HTMLVideoElement} videoElement - The video element
   * @param {boolean} debug - Whether to enable debug logging
   * @returns {VideoPlayerAdapter} A new VideoPlayerAdapter instance
   * @static
   */
  static forHtml5Video(videoElement, debug = false) {
    return new VideoPlayerAdapter({
      videoElement,
      api: {
        playMethod: (video) => video.play(),
        pauseMethod: (video) => video.pause(),
        seekMethod: (video, time) => { video.currentTime = time; },
        getCurrentTimeMethod: (video) => video.currentTime,
        getDurationMethod: (video) => video.duration,
        isPlayingMethod: (video) => !video.paused,
        getVideoIdMethod: (video) => video.src || video.currentSrc || video.id
      },
      debug
    });
  }

  /**
   * Create an adapter for YouTube player
   * @param {Object} youtubePlayer - The YouTube player instance
   * @param {boolean} debug - Whether to enable debug logging
   * @returns {VideoPlayerAdapter} A new VideoPlayerAdapter instance
   * @static
   */
  static forYouTube(youtubePlayer, debug = false) {
    return new VideoPlayerAdapter({
      videoElement: youtubePlayer,
      api: {
        playMethod: (player) => player.playVideo(),
        pauseMethod: (player) => player.pauseVideo(),
        seekMethod: (player, time) => player.seekTo(time),
        getCurrentTimeMethod: (player) => player.getCurrentTime(),
        getDurationMethod: (player) => player.getDuration(),
        isPlayingMethod: (player) => player.getPlayerState() === 1, // 1 = playing
        getVideoIdMethod: (player) => {
          // Extract video ID from URL
          const url = player.getVideoUrl();
          const match = url.match(/[?&]v=([^&]+)/);
          return match ? match[1] : '';
        }
      },
      debug
    });
  }

  /**
   * Create an adapter for Vimeo player
   * @param {Object} vimeoPlayer - The Vimeo player instance
   * @param {boolean} debug - Whether to enable debug logging
   * @returns {VideoPlayerAdapter} A new VideoPlayerAdapter instance
   * @static
   */
  static forVimeo(vimeoPlayer, debug = false) {
    return new VideoPlayerAdapter({
      videoElement: vimeoPlayer,
      api: {
        playMethod: (player) => player.play(),
        pauseMethod: (player) => player.pause(),
        seekMethod: (player, time) => player.setCurrentTime(time),
        getCurrentTimeMethod: (player) => player.getCurrentTime(),
        getDurationMethod: (player) => player.getDuration(),
        isPlayingMethod: async (player) => {
          const paused = await player.getPaused();
          return !paused;
        },
        getVideoIdMethod: (player) => player.getVideoId()
      },
      debug
    });
  }

  /**
   * Create a custom adapter
   * @param {Object} config - The adapter configuration
   * @returns {VideoPlayerAdapter} A new VideoPlayerAdapter instance
   * @static
   */
  static custom(config) {
    return new VideoPlayerAdapter({
      videoElement: config.videoElement,
      api: {
        playMethod: config.api.playMethod,
        pauseMethod: config.api.pauseMethod,
        seekMethod: config.api.seekMethod,
        getCurrentTimeMethod: config.api.getCurrentTimeMethod,
        getDurationMethod: config.api.getDurationMethod,
        isPlayingMethod: config.api.isPlayingMethod || (() => false),
        getVideoIdMethod: config.api.getVideoIdMethod || (() => '')
      },
      debug: config.debug || false
    });
  }
}

export default VideoPlayerAdapter;
