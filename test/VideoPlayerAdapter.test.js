/**
 * @jest-environment jsdom
 */

import VideoPlayerAdapter from '../src/adapters/VideoPlayerAdapter';

describe('VideoPlayerAdapter', () => {
  // HTML5 Video Adapter Tests
  describe('HTML5 Video Adapter', () => {
    let videoElement;
    let adapter;

    beforeEach(() => {
      // Create a mock video element using a plain object instead of HTMLVideoElement
      videoElement = {
        play: jest.fn().mockResolvedValue(),
        pause: jest.fn(),
        currentTime: 0,
        duration: 100,
        paused: true,
        src: 'test-video.mp4'
      };
      
      // Create the adapter
      adapter = VideoPlayerAdapter.forHtml5Video(videoElement, true);
    });

    test('should create an adapter for HTML5 video', () => {
      expect(adapter).toBeInstanceOf(VideoPlayerAdapter);
      expect(adapter.videoElement).toBe(videoElement);
    });

    test('should play the video', async () => {
      await adapter.play();
      expect(videoElement.play).toHaveBeenCalled();
    });

    test('should pause the video', async () => {
      await adapter.pause();
      expect(videoElement.pause).toHaveBeenCalled();
    });

    test('should seek to a specific time', async () => {
      await adapter.seek(50);
      expect(videoElement.currentTime).toBe(50);
    });

    test('should get the current time', async () => {
      videoElement.currentTime = 25;
      const time = await adapter.getCurrentTime();
      expect(time).toBe(25);
    });

    test('should get the duration', async () => {
      const duration = await adapter.getDuration();
      expect(duration).toBe(100);
    });

    test('should check if the video is playing', async () => {
      videoElement.paused = false;
      const isPlaying = await adapter.isPlaying();
      expect(isPlaying).toBe(true);
      
      videoElement.paused = true;
      const isNotPlaying = await adapter.isPlaying();
      expect(isNotPlaying).toBe(false);
    });

    test('should get the video ID', async () => {
      const videoId = await adapter.getVideoId();
      expect(videoId).toBe('test-video.mp4');
    });

    test('should save and restore playing state', async () => {
      // Test when video is paused
      videoElement.paused = true;
      await adapter.savePlayingState();
      expect(adapter.savedPlayingState).toBe(false);
      
      await adapter.restorePlayingState();
      expect(videoElement.play).not.toHaveBeenCalled();
      
      // Test when video is playing
      videoElement.paused = false;
      await adapter.savePlayingState();
      expect(adapter.savedPlayingState).toBe(true);
      
      await adapter.restorePlayingState();
      expect(videoElement.play).toHaveBeenCalled();
    });
  });

  // YouTube Adapter Tests
  describe('YouTube Adapter', () => {
    let youtubePlayer;
    let adapter;

    beforeEach(() => {
      // Create a mock YouTube player
      youtubePlayer = {
        playVideo: jest.fn(),
        pauseVideo: jest.fn(),
        seekTo: jest.fn(),
        getCurrentTime: jest.fn().mockReturnValue(30),
        getDuration: jest.fn().mockReturnValue(120),
        getPlayerState: jest.fn().mockReturnValue(1), // 1 = playing
        getVideoUrl: jest.fn().mockReturnValue('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
      };
      
      // Create the adapter
      adapter = VideoPlayerAdapter.forYouTube(youtubePlayer, true);
    });

    test('should create an adapter for YouTube', () => {
      expect(adapter).toBeInstanceOf(VideoPlayerAdapter);
      expect(adapter.videoElement).toBe(youtubePlayer);
    });

    test('should play the video', async () => {
      await adapter.play();
      expect(youtubePlayer.playVideo).toHaveBeenCalled();
    });

    test('should pause the video', async () => {
      await adapter.pause();
      expect(youtubePlayer.pauseVideo).toHaveBeenCalled();
    });

    test('should seek to a specific time', async () => {
      await adapter.seek(50);
      expect(youtubePlayer.seekTo).toHaveBeenCalledWith(50);
    });

    test('should get the current time', async () => {
      const time = await adapter.getCurrentTime();
      expect(time).toBe(30);
    });

    test('should get the duration', async () => {
      const duration = await adapter.getDuration();
      expect(duration).toBe(120);
    });

    test('should check if the video is playing', async () => {
      youtubePlayer.getPlayerState.mockReturnValue(1); // 1 = playing
      const isPlaying = await adapter.isPlaying();
      expect(isPlaying).toBe(true);
      
      youtubePlayer.getPlayerState.mockReturnValue(2); // 2 = paused
      const isNotPlaying = await adapter.isPlaying();
      expect(isNotPlaying).toBe(false);
    });

    test('should get the video ID', async () => {
      const videoId = await adapter.getVideoId();
      expect(videoId).toBe('dQw4w9WgXcQ');
    });
  });

  // Vimeo Adapter Tests
  describe('Vimeo Adapter', () => {
    let vimeoPlayer;
    let adapter;

    beforeEach(() => {
      // Create a mock Vimeo player
      vimeoPlayer = {
        play: jest.fn().mockResolvedValue(),
        pause: jest.fn().mockResolvedValue(),
        setCurrentTime: jest.fn().mockResolvedValue(),
        getCurrentTime: jest.fn().mockResolvedValue(30),
        getDuration: jest.fn().mockResolvedValue(120),
        getPaused: jest.fn().mockResolvedValue(false),
        getVideoId: jest.fn().mockResolvedValue('123456789')
      };
      
      // Create the adapter
      adapter = VideoPlayerAdapter.forVimeo(vimeoPlayer, true);
    });

    test('should create an adapter for Vimeo', () => {
      expect(adapter).toBeInstanceOf(VideoPlayerAdapter);
      expect(adapter.videoElement).toBe(vimeoPlayer);
    });

    test('should play the video', async () => {
      await adapter.play();
      expect(vimeoPlayer.play).toHaveBeenCalled();
    });

    test('should pause the video', async () => {
      await adapter.pause();
      expect(vimeoPlayer.pause).toHaveBeenCalled();
    });

    test('should seek to a specific time', async () => {
      await adapter.seek(50);
      expect(vimeoPlayer.setCurrentTime).toHaveBeenCalledWith(50);
    });

    test('should get the current time', async () => {
      const time = await adapter.getCurrentTime();
      expect(time).toBe(30);
    });

    test('should get the duration', async () => {
      const duration = await adapter.getDuration();
      expect(duration).toBe(120);
    });

    test('should check if the video is playing', async () => {
      vimeoPlayer.getPaused.mockResolvedValue(false);
      const isPlaying = await adapter.isPlaying();
      expect(isPlaying).toBe(true);
      
      vimeoPlayer.getPaused.mockResolvedValue(true);
      const isNotPlaying = await adapter.isPlaying();
      expect(isNotPlaying).toBe(false);
    });

    test('should get the video ID', async () => {
      const videoId = await adapter.getVideoId();
      expect(videoId).toBe('123456789');
    });
  });

  // Custom Adapter Tests
  describe('Custom Adapter', () => {
    let customPlayer;
    let adapter;

    beforeEach(() => {
      // Create a mock custom player
      customPlayer = {
        play: jest.fn(),
        pause: jest.fn(),
        seekTo: jest.fn(),
        getCurrentTime: jest.fn().mockReturnValue(30),
        getDuration: jest.fn().mockReturnValue(120),
        isPlaying: jest.fn().mockReturnValue(true),
        getVideoId: jest.fn().mockReturnValue('custom-video-123')
      };
      
      // Create the adapter
      adapter = VideoPlayerAdapter.custom({
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
    });

    test('should create a custom adapter', () => {
      expect(adapter).toBeInstanceOf(VideoPlayerAdapter);
      expect(adapter.videoElement).toBe(customPlayer);
    });

    test('should play the video', async () => {
      await adapter.play();
      expect(customPlayer.play).toHaveBeenCalled();
    });

    test('should pause the video', async () => {
      await adapter.pause();
      expect(customPlayer.pause).toHaveBeenCalled();
    });

    test('should seek to a specific time', async () => {
      await adapter.seek(50);
      expect(customPlayer.seekTo).toHaveBeenCalledWith(50);
    });

    test('should get the current time', async () => {
      const time = await adapter.getCurrentTime();
      expect(time).toBe(30);
    });

    test('should get the duration', async () => {
      const duration = await adapter.getDuration();
      expect(duration).toBe(120);
    });

    test('should check if the video is playing', async () => {
      customPlayer.isPlaying.mockReturnValue(true);
      const isPlaying = await adapter.isPlaying();
      expect(isPlaying).toBe(true);
      
      customPlayer.isPlaying.mockReturnValue(false);
      const isNotPlaying = await adapter.isPlaying();
      expect(isNotPlaying).toBe(false);
    });

    test('should get the video ID', async () => {
      const videoId = await adapter.getVideoId();
      expect(videoId).toBe('custom-video-123');
    });
  });
});
