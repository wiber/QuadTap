// Mock timers for testing
jest.useFakeTimers();

// Mock console methods to avoid cluttering test output
global.console = {
  ...console,
  log: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

// Create a mock for the QuadTap class if it doesn't exist
if (!global.QuadTap) {
  global.QuadTap = class QuadTap {
    constructor(settings) {
      this.settings = settings;
      this.state = {
        overlayActive: false,
        bubbleActive: false,
        lightBoxActive: false,
        videoPlaying: false
      };
    }

    openLightBox() {
      this.state.lightBoxActive = true;
      if (this.settings.videoPlayerApi && this.settings.videoPlayerApi.enabled && this.settings.videoPlayerApi.adapter) {
        this.state.videoPlaying = this.settings.videoPlayerApi.adapter.isPlaying();
        if (this.state.videoPlaying) {
          this.settings.videoPlayerApi.adapter.pause();
        }
      }
    }

    closeLightBox() {
      this.state.lightBoxActive = false;
      if (this.settings.videoPlayerApi && this.settings.videoPlayerApi.enabled && this.settings.videoPlayerApi.adapter) {
        if (this.state.videoPlaying) {
          setTimeout(() => {
            this.settings.videoPlayerApi.adapter.play();
          }, 100);
          this.state.videoPlaying = false;
        }
      }
    }

    destroy() {
      // Cleanup
    }
  };
}

// Create a mock for the SettingsBuilder class if it doesn't exist
if (!global.SettingsBuilder) {
  global.SettingsBuilder = class SettingsBuilder {
    constructor() {
      this.settings = {
        containerId: 'quad-tap-container',
        videoSelector: 'video',
        debug: false,
        videoControls: {
          enabled: true,
          position: 'center',
          autoHide: true,
          autoHideDelay: 2000,
          pauseOnLightboxOnly: false
        },
        videoPlayerApi: {
          enabled: false,
          adapter: null
        }
      };
    }

    withContainer(containerId) {
      this.settings.containerId = containerId;
      return this;
    }

    withVideoSelector(videoSelector) {
      this.settings.videoSelector = videoSelector;
      return this;
    }

    withDebug(debug) {
      this.settings.debug = debug;
      return this;
    }

    withVideoControls(videoControls) {
      this.settings.videoControls = {
        ...this.settings.videoControls,
        ...videoControls
      };
      return this;
    }

    withVideoPlayerAdapter(adapter) {
      this.settings.videoPlayerApi = {
        enabled: true,
        adapter: adapter
      };
      return this;
    }

    build() {
      return { ...this.settings };
    }
  };
}

// Create a mock for the VideoPlayerAdapter class if it doesn't exist
if (!global.VideoPlayerAdapter) {
  global.VideoPlayerAdapter = class VideoPlayerAdapter {
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

    async seek(time) {
      return this.api.seekMethod(this.videoElement, time);
    }

    async getCurrentTime() {
      return this.api.getCurrentTimeMethod(this.videoElement);
    }

    async getDuration() {
      return this.api.getDurationMethod(this.videoElement);
    }

    async isPlaying() {
      return this.api.isPlayingMethod(this.videoElement);
    }

    async getVideoId() {
      return this.api.getVideoIdMethod(this.videoElement);
    }

    async savePlayingState() {
      this.savedPlayingState = await this.isPlaying();
    }

    async restorePlayingState() {
      if (this.savedPlayingState) {
        await this.play();
      } else {
        await this.pause();
      }
    }

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

    static forYouTube(youtubePlayer, debug = false) {
      return new VideoPlayerAdapter({
        videoElement: youtubePlayer,
        api: {
          playMethod: (player) => player.playVideo(),
          pauseMethod: (player) => player.pauseVideo(),
          seekMethod: (player, time) => player.seekTo(time),
          getCurrentTimeMethod: (player) => player.getCurrentTime(),
          getDurationMethod: (player) => player.getDuration(),
          isPlayingMethod: (player) => player.getPlayerState() === 1,
          getVideoIdMethod: (player) => {
            const url = player.getVideoUrl();
            const match = url.match(/[?&]v=([^&]+)/);
            return match ? match[1] : '';
          }
        },
        debug
      });
    }

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
  };
}
