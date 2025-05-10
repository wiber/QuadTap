/**
   * Position directional emojis
   * @param {number} x - X coordinate of the tap
   * @param {number} y - Y coordinate of the tap
   */
  positionDirectionalEmojis(x, y) {
    const { width, height } = this.state.containerDimensions;
    
    // Calculate distances from edges
    const distanceFromTop = y;
    const distanceFromRight = width - x;
    const distanceFromBottom = height - y;
    const distanceFromLeft = x;
    
    // Calculate scaling factors (0.5 to 2.0)
    // The closer to the edge, the larger the emoji
    const upScale = 2.0 - Math.min(1.5, distanceFromTop / (height / 2));
    const rightScale = 2.0 - Math.min(1.5, distanceFromRight / (width / 2));
    const downScale = 2.0 - Math.min(1.5, distanceFromBottom / (height / 2));
    const leftScale = 2.0 - Math.min(1.5, distanceFromLeft / (width / 2));
    
    // Position and scale up emoji
    const upEmoji = this.elements.directionalEmojis.up;
    upEmoji.style.display = 'block';
    upEmoji.style.position = 'absolute';
    upEmoji.style.top = '10%';
    upEmoji.style.left = '50%';
    upEmoji.style.transform = `translate(-50%, 0) scale(${upScale})`;
    upEmoji.style.fontSize = '2rem';
    upEmoji.style.opacity = '0.8';
    
    // Position and scale right emoji
    const rightEmoji = this.elements.directionalEmojis.right;
    rightEmoji.style.display = 'block';
    rightEmoji.style.position = 'absolute';
    rightEmoji.style.top = '50%';
    rightEmoji.style.right = '10%';
    rightEmoji.style.transform = `translate(0, -50%) scale(${rightScale})`;
    rightEmoji.style.fontSize = '2rem';
    rightEmoji.style.opacity = '0.8';
    
    // Position and scale down emoji
    const downEmoji = this.elements.directionalEmojis.down;
    downEmoji.style.display = 'block';
    downEmoji.style.position = 'absolute';
    downEmoji.style.bottom = '10%';
    downEmoji.style.left = '50%';
    downEmoji.style.transform = `translate(-50%, 0) scale(${downScale})`;
    downEmoji.style.fontSize = '2rem';
    downEmoji.style.opacity = '0.8';
    
    // Position and scale left emoji
    const leftEmoji = this.elements.directionalEmojis.left;
    leftEmoji.style.display = 'block';
    leftEmoji.style.position = 'absolute';
    leftEmoji.style.top = '50%';
    leftEmoji.style.left = '10%';
    leftEmoji.style.transform = `translate(0, -50%) scale(${leftScale})`;
    leftEmoji.style.fontSize = '2rem';
    leftEmoji.style.opacity = '0.8';
  }
  
  /**
   * Position quadrant emojis
   */
  positionQuadrantEmojis() {
    // Position top-left emoji
    const topLeftEmoji = this.elements.quadrantEmojis.topLeft;
    topLeftEmoji.style.display = 'block';
    topLeftEmoji.style.position = 'absolute';
    topLeftEmoji.style.top = '25%';
    topLeftEmoji.style.left = '25%';
    topLeftEmoji.style.transform = 'translate(-50%, -50%)';
    topLeftEmoji.style.fontSize = '3rem';
    topLeftEmoji.style.opacity = '0.6';
    
    // Position top-right emoji
    const topRightEmoji = this.elements.quadrantEmojis.topRight;
    topRightEmoji.style.display = 'block';
    topRightEmoji.style.position = 'absolute';
    topRightEmoji.style.top = '25%';
    topRightEmoji.style.right = '25%';
    topRightEmoji.style.transform = 'translate(50%, -50%)';
    topRightEmoji.style.fontSize = '3rem';
    topRightEmoji.style.opacity = '0.6';
    
    // Position bottom-left emoji
    const bottomLeftEmoji = this.elements.quadrantEmojis.bottomLeft;
    bottomLeftEmoji.style.display = 'block';
    bottomLeftEmoji.style.position = 'absolute';
    bottomLeftEmoji.style.bottom = '25%';
    bottomLeftEmoji.style.left = '25%';
    bottomLeftEmoji.style.transform = 'translate(-50%, 50%)';
    bottomLeftEmoji.style.fontSize = '3rem';
    bottomLeftEmoji.style.opacity = '0.6';
    
    // Position bottom-right emoji
    const bottomRightEmoji = this.elements.quadrantEmojis.bottomRight;
    bottomRightEmoji.style.display = 'block';
    bottomRightEmoji.style.position = 'absolute';
    bottomRightEmoji.style.bottom = '25%';
    bottomRightEmoji.style.right = '25%';
    bottomRightEmoji.style.transform = 'translate(50%, 50%)';
    bottomRightEmoji.style.fontSize = '3rem';
    bottomRightEmoji.style.opacity = '0.6';
  }
  
  /**
   * Position video controls
   */
  positionVideoControls() {
    if (!this.config.videoControls.enabled) {
      return;
    }
    
    const videoControls = this.elements.videoControls;
    videoControls.style.display = 'flex';
    videoControls.style.position = 'absolute';
    videoControls.style.bottom = '20%';
    videoControls.style.left = '50%';
    videoControls.style.transform = 'translateX(-50%)';
    videoControls.style.gap = '10px';
  }
  
  /**
   * Position tooltip
   */
  positionTooltip() {
    const tooltip = this.elements.tooltip;
    tooltip.style.display = 'block';
    tooltip.style.position = 'absolute';
    tooltip.style.bottom = '10%';
    tooltip.style.left = '50%';
    tooltip.style.transform = 'translateX(-50%)';
  }
  
  /**
   * Control video playback
   * @param {string} action - The action to perform (rewind, playpause, forward, share)
   */
  controlVideo(action) {
    this.log('Controlling video', action);
    
    const video = document.querySelector(this.config.videoSelector);
    if (!video) {
      this.log('Video element not found');
      return;
    }
    
    switch (action) {
      case 'rewind':
        video.currentTime = Math.max(0, video.currentTime - this.config.videoControls.rewindTime);
        break;
        
      case 'playpause':
        if (video.paused) {
          video.play();
        } else {
          video.pause();
        }
        break;
        
      case 'forward':
        video.currentTime = Math.min(video.duration, video.currentTime + this.config.videoControls.forwardTime);
        break;
        
      case 'share':
        // Implement share functionality
        if (navigator.share) {
          navigator.share({
            title: 'Shared Video',
            text: 'Check out this video!',
            url: window.location.href
          }).catch(err => {
            console.error('Share failed:', err);
          });
        } else {
          alert('Share feature not supported by your browser');
        }
        break;
    }
    
    // Call callback if provided
    if (this.config.callbacks.onVideoControl) {
      this.config.callbacks.onVideoControl(action, video.currentTime);
    }
  }
  
  /**
   * Deactivate overlay
   */
  deactivateOverlay() {
    this.log('Deactivating overlay');
    
    // First remove the active class to trigger the opacity transition
    this.elements.overlay.classList.remove('active');
    
    // Then hide the overlay after the transition completes
    setTimeout(() => {
      // Only hide if still inactive (prevent race conditions)
      if (!this.state.active) {
        this.elements.overlay.style.display = 'none';
        
        // Hide all elements
        this.elements.profileBubble.style.display = 'none';
        
        Object.values(this.elements.directionalEmojis).forEach(emoji => {
          emoji.style.display = 'none';
        });
        
        Object.values(this.elements.quadrantEmojis).forEach(emoji => {
          emoji.style.display = 'none';
        });
        
        this.elements.videoControls.style.display = 'none';
        this.elements.tooltip.style.display = 'none';
      }
    }, 300); // Match the transition duration
    
    // Reset state
    this.state.active = false;
    
    // Clear auto-cancel timer
    if (this.state.autoCancelTimer) {
      clearTimeout(this.state.autoCancelTimer);
      this.state.autoCancelTimer = null;
    }
    
    // Call callback if provided
    if (this.config.callbacks.onThrowDownCancel) {
      this.config.callbacks.onThrowDownCancel(this.state.currentQuadrant);
    }
    
    this.log('Overlay deactivated');
  }
  
  /**
   * Open light-box
   */
  openLightBox() {
    this.log('Opening light-box');
    
    // Show light-box
    this.elements.lightBox.classList.add('active');
    
    // Clear auto-cancel timer
    if (this.state.autoCancelTimer) {
      clearTimeout(this.state.autoCancelTimer);
      this.state.autoCancelTimer = null;
    }
    
    // Pause video if available
    const video = document.querySelector(this.config.videoSelector);
    if (video && !video.paused) {
      video.pause();
      this.state.videoPlaying = false;
    }
    
    // Call callback if provided
    if (this.config.callbacks.onThrowDownInitiate) {
      this.config.callbacks.onThrowDownInitiate(
        this.state.currentQuadrant,
        this.state.profileBubblePosition.x,
        this.state.profileBubblePosition.y
      );
    }
  }
  
  /**
   * Close light-box
   */
  closeLightBox() {
    this.log('Closing light-box');
    
    // Hide light-box
    this.elements.lightBox.classList.remove('active');
    
    // Deactivate overlay
    this.deactivateOverlay();
    
    // Resume video if it was playing before
    const video = document.querySelector(this.config.videoSelector);
    if (video && this.state.videoPlaying) {
      video.play();
    }
  }
  
  /**
   * Destroy the component and clean up
   */
  destroy() {
    this.log('Destroying QuadTap');
    
    // Clear any timers
    if (this.state.autoCancelTimer) {
      clearTimeout(this.state.autoCancelTimer);
    }
    
    // Remove event listeners
    if (this.elements.container) {
      this.elements.container.removeEventListener('click', this.handleContainerClick);
    }
    
    if (this.elements.profileBubble) {
      this.elements.profileBubble.removeEventListener('click', this.handleBubbleClick);
    }
    
    if (this.elements.lightBox) {
      this.elements.lightBox.removeEventListener('click', this.handleLightBoxClick);
    }
    
    if (this.elements.video) {
      this.elements.video.removeEventListener('play', this.handleVideoPlay);
      this.elements.video.removeEventListener('pause', this.handleVideoPause);
    }
    
    window.removeEventListener('resize', this.throttledResize);
    document.removeEventListener('keydown', this.handleKeyDown);
    
    // Remove elements
    if (this.elements.overlay && this.elements.overlay.parentNode) {
      this.elements.overlay.parentNode.removeChild(this.elements.overlay);
    }
    
    if (this.elements.lightBox && this.elements.lightBox.parentNode) {
      this.elements.lightBox.parentNode.removeChild(this.elements.lightBox);
    }
    
    // Reset state
    this.state = {
      active: false,
      profileBubblePosition: { x: 0, y: 0 },
      currentQuadrant: null,
      autoCancelTimer: null,
      containerDimensions: { width: 0, height: 0 },
      videoPlaying: false
    };
    
    this.log('QuadTap destroyed');
  }
}

export default QuadTap;
