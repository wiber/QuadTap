/**
 * Video Helper Functions
 * Utilities for controlling video playback
 */

/**
 * Always resume video playback
 * @param {Object} quadTap - The QuadTap instance
 * @returns {Promise<void>}
 */
export async function alwaysResume(quadTap) {
  const { video } = quadTap.elements;
  const adapter = quadTap.config.videoPlayerApi?.enabled && 
                 quadTap.config.videoPlayerApi.adapter;
  
  if (adapter) {
    await adapter.play();
  } else if (video) {
    try {
      await video.play();
    } catch (err) {
      console.error('Error resuming video playback:', err);
    }
  }
}

/**
 * Pause video if it's currently playing
 * @param {Object} quadTap - The QuadTap instance
 * @returns {Promise<void>}
 */
export async function pauseIfPlaying(quadTap) {
  const { video } = quadTap.elements;
  const adapter = quadTap.config.videoPlayerApi?.enabled && 
                 quadTap.config.videoPlayerApi.adapter;
  
  if (adapter) {
    quadTap.state.wasPlayingBefore = await adapter.isPlaying();
    if (quadTap.state.wasPlayingBefore) await adapter.pause();
  } else if (video && !video.paused) {
    quadTap.state.wasPlayingBefore = true;
    video.pause();
  } else {
    quadTap.state.wasPlayingBefore = false;
  }
}

/**
 * Resume video if it was playing before
 * @param {Object} quadTap - The QuadTap instance
 * @returns {Promise<void>}
 */
export async function resumeIfNeeded(quadTap) {
  const { video } = quadTap.elements;
  const adapter = quadTap.config.videoPlayerApi?.enabled && 
                 quadTap.config.videoPlayerApi.adapter;
  
  if (!quadTap.state.wasPlayingBefore) return;

  if (adapter) {
    await adapter.play();
  } else if (video) {
    try {
      await video.play();
    } catch (err) {
      console.error('Error resuming video playback:', err);
    }
  }

  quadTap.state.wasPlayingBefore = false;
}
