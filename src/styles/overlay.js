/**
 * Overlay Styles
 * CSS styles for the Quad-Tap overlay
 */

/**
 * Inject all styles for the Quad-Tap component
 */
export function injectStyles() {
  // Check if styles are already injected
  if (document.getElementById('quad-tap-styles')) {
    return;
  }
  
  // Create style element
  const styleElement = document.createElement('style');
  styleElement.id = 'quad-tap-styles';
  
  // Add CSS rules
  styleElement.textContent = `
    /* Overlay Container */
    .overlay-container {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s ease;
      z-index: 1000;
      background-color: rgba(240, 240, 245, 0.5);
    }
    
    .overlay-container.active {
      opacity: 1;
      pointer-events: auto;
    }
    
    /* Block pointer events on video when overlay is active */
    .overlay-container.active + video,
    .quad-tap-overlay.active + video {
      pointer-events: none;
    }
    
    /* Quadrants */
    .quadrant {
      position: absolute;
      width: 50%;
      height: 50%;
      opacity: 0.9; /* Increased opacity for stronger colors */
      transition: opacity 0.3s ease;
    }
    
    .quadrant.top-left {
      top: 0;
      left: 0;
      background: linear-gradient(135deg, rgba(0, 255, 255, 1) 0%, rgba(0, 200, 255, 0.8) 30%, rgba(0, 255, 255, 0) 70%);
    }
    
    .quadrant.top-right {
      top: 0;
      right: 0;
      background: linear-gradient(225deg, rgba(255, 255, 0, 1) 0%, rgba(255, 200, 0, 0.8) 30%, rgba(255, 255, 0, 0) 70%);
    }
    
    .quadrant.bottom-left {
      bottom: 0;
      left: 0;
      background: linear-gradient(45deg, rgba(0, 255, 0, 1) 0%, rgba(0, 200, 0, 0.8) 30%, rgba(0, 255, 0, 0) 70%);
    }
    
    .quadrant.bottom-right {
      bottom: 0;
      right: 0;
      background: linear-gradient(315deg, rgba(255, 0, 255, 1) 0%, rgba(200, 0, 255, 0.8) 30%, rgba(255, 0, 255, 0) 70%);
    }
    
    /* Profile Bubble */
    .profile-bubble {
      position: absolute;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background-color: rgba(128, 128, 128, 0.8);
      border: 2px solid white;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      z-index: 1001;
      transform: translate(-50%, -50%);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    
    .profile-bubble:hover {
      transform: translate(-50%, -50%) scale(1.1);
      box-shadow: 0 0 15px rgba(0, 0, 0, 0.7);
    }
    
    /* Light-Box Modal */
    .td-modal {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(23, 32, 42, 0.7);
      z-index: 2000;
      justify-content: center;
      align-items: center;
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    .td-modal.active {
      display: flex;
      opacity: 1;
    }
    
    .td-modal-content {
      background-color: white;
      padding: 20px;
      border-radius: 10px;
      width: 95%;
      max-width: 800px;
      max-height: 80vh;
      overflow-y: auto;
      position: relative;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
    }
    
    .td-modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 1px solid #eee;
    }
    
    .td-modal-header h4 {
      margin: 0;
      font-size: 1.5rem;
      color: #333;
    }
    
    .td-close-btn, .td-pause-play-btn {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      color: #999;
      transition: color 0.2s ease;
    }
    
    .td-close-btn {
      margin-left: 10px;
    }
    
    .td-pause-play-btn {
      margin-left: auto;
    }
    
    .td-close-btn:hover, .td-pause-play-btn:hover {
      color: #333;
    }
    
    /* Emoji Grid */
    .emoji-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr;
      gap: 10px;
      width: 100%;
    }
    
    .emoji-quadrant {
      padding: 10px;
      border-radius: 8px;
    }
    
    .emoji-quadrant.top-left {
      background-color: rgba(0, 255, 0, 0.2);
    }
    
    .emoji-quadrant.top-right {
      background-color: rgba(255, 255, 0, 0.2);
    }
    
    .emoji-quadrant.bottom-left {
      background-color: rgba(0, 255, 255, 0.2);
    }
    
    .emoji-quadrant.bottom-right {
      background-color: rgba(255, 0, 255, 0.2);
    }
    
    .emoji-row {
      display: flex;
      justify-content: space-around;
      margin-bottom: 10px;
      background-color: transparent;
    }
    
    .emoji-cell {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: transparent;
    }
    
    .thought-emoji {
      font-size: 2rem;
      cursor: pointer;
      padding: 5px;
      border-radius: 5px;
      transition: transform 0.2s ease, background-color 0.2s ease;
    }
    
    .thought-emoji:hover {
      transform: scale(1.2);
      background-color: rgba(255, 255, 255, 0.5);
    }
    
    .thought-emoji.selected {
      background-color: rgba(255, 255, 255, 0.8);
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    }
    
    /* Tooltip */
    .tooltip {
      position: absolute;
      background-color: rgba(0, 0, 0, 0.7);
      color: white;
      padding: 5px 10px;
      border-radius: 5px;
      font-size: 0.8rem;
      pointer-events: none;
      z-index: 1002;
      transition: opacity 0.3s ease;
    }
    
    /* Comment Box */
    .comment-box {
      margin-top: 20px;
      width: 100%;
    }
    
    .comment-box textarea {
      width: 100%;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 5px;
      resize: vertical;
      min-height: 80px;
      font-family: inherit;
    }
    
    /* Media Buttons */
    .media-buttons {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 10px;
      margin-bottom: 10px;
    }
    
    .media-button {
      padding: 8px 12px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-weight: bold;
      transition: background-color 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .upload-button {
      background-color: #3498db;
      color: white;
    }
    
    .upload-button:hover {
      background-color: #2980b9;
    }
    
    .capture-button {
      background-color: #e74c3c;
      color: white;
    }
    
    .capture-button:hover {
      background-color: #c0392b;
    }
    
    .uploaded-file-name {
      margin-top: 5px;
      padding: 5px;
      background-color: #f1f1f1;
      border-radius: 3px;
      font-size: 0.9rem;
      width: 100%;
    }
    
    .recording-message {
      margin-top: 5px;
      padding: 5px;
      background-color: #f8d7da;
      color: #721c24;
      border-radius: 3px;
      font-size: 0.9rem;
      width: 100%;
    }
    
    .recording-indicator {
      animation: pulse 1.5s infinite;
    }
    
    @keyframes pulse {
      0% { opacity: 1; }
      50% { opacity: 0.5; }
      100% { opacity: 1; }
    }
    
    /* Action Buttons */
    .action-buttons {
      display: flex;
      justify-content: flex-end;
      margin-top: 20px;
      gap: 10px;
    }
    
    .action-button {
      padding: 8px 16px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-weight: bold;
      transition: background-color 0.2s ease;
    }
    
    .save-button {
      background-color: #4CAF50;
      color: white;
    }
    
    .save-button:hover {
      background-color: #45a049;
    }
    
    .cancel-button {
      background-color: #f44336;
      color: white;
    }
    
    .cancel-button:hover {
      background-color: #d32f2f;
    }
  `;
  
  // Append style element to head
  document.head.appendChild(styleElement);
}

/**
 * Remove all injected styles
 */
export function removeStyles() {
  const styleElement = document.getElementById('quad-tap-styles');
  if (styleElement) {
    styleElement.parentNode.removeChild(styleElement);
  }
}
