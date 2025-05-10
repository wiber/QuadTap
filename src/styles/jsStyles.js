export const overlayContainerBaseStyles = {
  position: 'absolute',
  top: '0px',
  left: '0px',
  width: '100%',
  height: '100%',
  display: 'flex',
  opacity: '0',
  pointerEvents: 'none',
  transition: 'opacity 0.3s ease',
  zIndex: 1000, // Assuming zIndex can be a number, though JS style often takes string
  // backgroundColor will be applied from config: e.g., 'rgba(240, 240, 245, 0.5)'
};

export const overlayContainerActiveStyles = {
  opacity: '1',
  pointerEvents: 'auto',
};

export const overlayContainerActivePlusVideoStyles = {
  // This targets 'video' adjacent to '.overlay-container.active'
  // In JS, this would be handled by finding the video element and applying styles directly if needed,
  // or ensuring the video itself doesn't have pointer events when overlay is active.
  // For now, we'll note this behavior needs to be handled in QuadTap.js logic.
  // pointerEvents: 'none', // Applied to the video element itself
};

export const quadrantBaseStyles = {
  position: 'absolute',
  width: '50%',
  height: '50%',
  opacity: '0.9', // Increased opacity for stronger colors
  transition: 'opacity 0.3s ease',
};

export const quadrantTopLeftStyles = {
  top: '0px',
  left: '0px',
  // background will be applied from config: e.g., 'linear-gradient(135deg, rgba(0, 255, 255, 1) 0%, rgba(0, 200, 255, 0.8) 30%, rgba(0, 255, 255, 0) 70%)'
};

export const quadrantTopRightStyles = {
  top: '0px',
  right: '0px',
  // background will be applied from config
};

export const quadrantBottomLeftStyles = {
  bottom: '0px',
  left: '0px',
  // background will be applied from config
};

export const quadrantBottomRightStyles = {
  bottom: '0px',
  right: '0px',
  // background will be applied from config
};

export const profileBubbleBaseStyles = {
  position: 'absolute',
  // width, height, borderRadius, backgroundColor, border will come from config.profileBubble
  borderRadius: '50%', // Default if not in config
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
  display: 'flex', // Will be set to 'none' initially, then 'flex' by JS logic
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  zIndex: 1001,
  transform: 'translate(-50%, -50%)',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
};

export const profileBubbleHoverStyles = {
  transform: 'translate(-50%, -50%) scale(1.1)',
  boxShadow: '0 0 15px rgba(0, 0, 0, 0.7)',
};

export const tdModalBaseStyles = {
  display: 'none', // Initial state
  position: 'fixed',
  top: '0px',
  left: '0px',
  width: '100%',
  height: '100%',
  // backgroundColor will come from config.colors.lightbox.background e.g., 'rgba(0, 0, 0, 0.7)'
  zIndex: 2000,
  justifyContent: 'center', // Will be overridden by JS for mobile to 'flex-start'
  alignItems: 'center',   // Will be overridden by JS for mobile to 'flex-start'
  opacity: '0',
  transition: 'opacity 0.3s ease',
  // paddingTop: '5vh' will be applied by JS for mobile bezel
  // paddingLeft/Right for modal can also be set here or by JS if needed
  boxSizing: 'border-box',
};

export const tdModalActiveStyles = {
  display: 'flex',
  opacity: '1',
};

export const tdModalContentBaseStyles = {
  // backgroundColor, color will come from config.colors.lightbox
  padding: '20px',
  borderRadius: '10px',
  width: '95%', // Base width, JS will set maxWidth
  // maxWidth: '800px', // Original CSS, JS will now control this dynamically
  // maxHeight: '80vh', // Original CSS, JS will now control this dynamically
  overflowY: 'auto',
  position: 'relative',
  boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)',
  boxSizing: 'border-box',
  margin: '0 auto', // For horizontal centering when less than full width of .td-modal
};

export const tdModalHeaderBaseStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '20px',
  paddingBottom: '10px',
  borderBottom: '1px solid #eee',
  // backgroundColor will come from config.colors.lightbox.headerBackground
};

export const tdModalHeaderH4Styles = {
  margin: '0px',
  fontSize: '1.5rem',
  // color will come from config.colors.lightbox.text (or #333 as a fallback)
};

export const tdCloseBtnStyles = {
  background: 'none',
  border: 'none',
  fontSize: '1.5rem',
  cursor: 'pointer',
  color: '#999', // Default color
  transition: 'color 0.2s ease',
  marginLeft: '10px',
};

export const tdPausePlayBtnStyles = { // Assuming this is for lightbox
  background: 'none',
  border: 'none',
  fontSize: '1.5rem',
  cursor: 'pointer',
  color: '#999',
  transition: 'color 0.2s ease',
  marginLeft: 'auto',
};

export const tdCloseBtnHoverStyles = {
  color: '#333',
};

export const tdPausePlayBtnHoverStyles = {
  color: '#333',
};

export const emojiGridBaseStyles = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gridTemplateRows: '1fr 1fr',
  gap: '10px',
  width: '100%',
};

export const emojiQuadrantBaseStyles = {
  padding: '10px',
  borderRadius: '8px',
  // backgroundColor will be applied per quadrant, e.g., 'rgba(0, 255, 255, 0.2)'
};

// Specific quadrant background colors can be defined here if not dynamic
// Or they can be merged in QuadTap.js from config

export const emojiRowStyles = {
  display: 'flex',
  justifyContent: 'space-around',
  marginBottom: '10px',
  backgroundColor: 'transparent',
};

export const emojiCellStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'transparent',
};

export const thoughtEmojiBaseStyles = {
  fontSize: '2rem',
  cursor: 'pointer',
  padding: '5px',
  borderRadius: '5px',
  transition: 'transform 0.2s ease, background-color 0.2s ease',
};

export const thoughtEmojiHoverStyles = {
  transform: 'scale(1.2)',
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
};

export const thoughtEmojiSelectedStyles = {
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)',
};

export const tooltipBaseStyles = {
  position: 'absolute',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  color: 'white',
  padding: '5px 10px',
  borderRadius: '5px',
  fontSize: '0.8rem',
  pointerEvents: 'none',
  zIndex: 1002,
  transition: 'opacity 0.3s ease',
  display: 'none', // Initial state
};

export const commentBoxBaseStyles = {
  marginTop: '20px',
  width: '100%',
};

export const commentBoxTextareaStyles = {
  width: '100%',
  padding: '10px',
  border: '1px solid #ddd',
  borderRadius: '5px',
  resize: 'vertical',
  minHeight: '80px',
  fontFamily: 'inherit', // Ensure it inherits body/modal font
};

export const mediaButtonsBaseStyles = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '10px',
  marginTop: '10px',
  marginBottom: '10px',
};

export const mediaButtonBaseStyles = {
  padding: '8px 12px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontWeight: 'bold',
  transition: 'background-color 0.2s ease',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export const uploadButtonStyles = {
  ...mediaButtonBaseStyles, // Spread base styles
  backgroundColor: '#3498db',
  color: 'white',
};
export const uploadButtonHoverStyles = {
  backgroundColor: '#2980b9',
};

export const captureButtonStyles = {
  ...mediaButtonBaseStyles,
  backgroundColor: '#e74c3c',
  color: 'white',
};
export const captureButtonHoverStyles = {
  backgroundColor: '#c0392b',
};

export const uploadedFileNameStyles = {
  marginTop: '5px',
  padding: '5px',
  backgroundColor: '#f1f1f1',
  borderRadius: '3px',
  fontSize: '0.9rem',
  width: '100%',
};

export const recordingMessageStyles = {
  marginTop: '5px',
  padding: '5px',
  backgroundColor: '#f8d7da',
  color: '#721c24',
  borderRadius: '3px',
  fontSize: '0.9rem',
  width: '100%',
};

export const recordingIndicatorStyles = {
  // animation: 'pulse 1.5s infinite', // JS will handle this if needed, or use a class
  // Base styles for the indicator (positioning, etc. done in QuadTap.js)
  backgroundColor: 'rgba(255, 0, 0, 0.7)',
  color: 'white',
  padding: '5px 10px',
  borderRadius: '4px',
  // zIndex: 1002, // Set in QuadTap.js where it's appended
};

// @keyframes pulse would need to be handled differently if not using CSS classes.
// One way is to use JS to toggle opacity, or accept a small CSS class for this animation.

export const actionButtonsBaseStyles = {
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: '20px',
  gap: '10px',
};

export const actionButtonBaseStyles = {
  padding: '8px 16px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontWeight: 'bold',
  transition: 'background-color 0.2s ease',
};

export const saveButtonStyles = {
  ...actionButtonBaseStyles,
  // backgroundColor will come from config.colors.lightbox.buttonPrimary e.g. '#4CAF50'
  color: 'white',
};
export const saveButtonHoverStyles = {
  // backgroundColor will be a slightly darker shade of buttonPrimary
};

export const cancelButtonStyles = {
  ...actionButtonBaseStyles,
  // backgroundColor will come from config.colors.lightbox.buttonSecondary e.g. '#f44336'
  color: 'white',
};
export const cancelButtonHoverStyles = {
  // backgroundColor will be a slightly darker shade of buttonSecondary
};

// Note: Styles for ControlStrip (.qt-control-strip--overlay, .qt-control-strip--lightbox)
// would also need to be defined if ControlStrip.js itself doesn't handle its own styling internally via JS.
// For now, assuming ControlStrip component might manage its own styles or we'll address it separately.

// Add a helper for keyframes if we absolutely must do animations without CSS classes
// This is complex and generally less performant than CSS animations/transitions.
// Example (very basic and might not be needed if transitions suffice):
/*
export function applyKeyframeAnimation(element, animationName, keyframesStyle) {
  // This is a placeholder for a more complex implementation
  // Actual JS keyframe animation is much more involved or uses Web Animations API
  console.warn('applyKeyframeAnimation is a placeholder and not fully implemented.');
  // For 'pulse', one might toggle opacity with setInterval/setTimeout
}
*/ 