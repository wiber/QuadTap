# QuadTap Specification

This document defines the canonical behavior, interaction patterns, and technical requirements for the QuadTap video overlay component.

## 0 · Purpose & Glossary

| Term                            | Meaning                                                                                                                          |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **Quad-Tap**                    | 3-tap interaction on a video: overlay → bubble → light-box (tap #4 = emojis).                                                    |
| **Wibe Connector**              | A triple-link object *(from → vector → to)* created from URL paste, throw-down, or share.                                        |
| **Ping**                        | An email/SMS invite generated from a connector that asks someone to "take a stand."                                              |
| **North / South / West / East** | UI compass bars: **north** = FROM context, **south** = comment/TO context, **west/east drawers** = incoming/outgoing connectors. |

## 1 · Core Quad-Tap Flow

1. **Tap-1** → overlay with quadrant gradients, axis emojis, grey *active* bubble at exact tap coords.
2. **Tap-2** → if on bubble → open light-box; else cancel overlay; vertical swipe also cancels & navigates feed.
3. **Light-box** pauses video, shows 16 thought-emojis (row = quadrant), comment box **with live URL-paste detection**, share/cancel.
4. **Sub-taps** on emojis, share, or record build the throw-down payload; ESC or out-click closes modal and resumes video.

## 2 · Canonical Flow

### First Tap

When a user taps on a video, the QuadTap overlay activates:

- Semi-transparent quadrant gradients appear, dividing the video into four sections.
- Axis emojis appear at the center of each edge (north, east, south, west).
- A grey bubble appears at the exact coordinates of the tap.
- Video-control strip (▶︎ ↻30 ⇢30 ⋯) animates in **centre-bottom** at 65% height, fades to 50% opacity after 2s.
- The overlay must have a z-index of at least `video.zIndex + 100` to ensure it appears above all video player controls.

### Second Interaction (tap or swipe)

**Option A – Tap on bubble**: Opens the light-box modal.

**Option B – Tap elsewhere**: Cancels the overlay, returning to the normal video view.

**Option C – Vertical swipe (up/down)**: closes overlay immediately and navigates to next/previous video. Bubble is **discarded**, not saved.

### Light-Box Modal

When the light-box opens:

- The video pauses.
- A modal appears with a 4×4 grid of thought-emojis (each row corresponds to a quadrant).
- The centre-bottom control strip remains visible in the modal and pauses/resumes the underlying video.
- The **context bar (north)** shows 'FROM' metadata; the **action bar (south)** shows 'TO / NEXT' metadata and the comment field.
- A "Reply Link" row appears at the top of the modal with a readonly input containing the auto-generated deep link and a copy button that uses the Clipboard API to write the link to the clipboard and shows a ✅ toast for 1 second.

### Emoji Selection

- Tapping an emoji selects it and highlights it.
- Multiple emojis can be selected.
- Selected emojis are included in the throw-down payload.

### Throw-Down Confirmation

- Tapping "Share" confirms the throw-down.
- The light-box closes, the video resumes (if it was playing before), and the throw-down is saved.
- The throw-down payload includes the selected emojis, comment, and video metadata.

## 3 · Conflict-Resolution

### Phase A - Core Behavior

1. The overlay should not interfere with normal video playback until the light-box is opened.
2. The light-box must pause the video and display the emoji grid.
3. Closing the light-box should resume the video if it was playing before.
4. Vertical swipe with overlay active should dismiss the overlay and navigate the feed.
5. The coordinate system must be consistent across all devices and screen sizes.
6. The control strip must be positioned consistently at the center-bottom of the overlay.

### Phase B - Specific Requirements

1. **Light-box fields**: Add "Reply Link" row at top of modal: `<input readonly value="{auto-link}">` and a ⧉ copy button. Deep-link format: `https://app/v/<vectorId>?reply=draft` (updated on every open).
2. **Play/pause behavior**: Core never calls `adapter.play/pause` during overlay show/hide—only `openLightBox()` pauses, `closeLightBox()` resumes **within 100ms using requestAnimationFrame** if `wasPlayingBefore`.
3. **Coordinate space**: Percentage coords returned by `onOverlayActivate` must be `x = tapX / width` (0→1 left→right), `y = 1 - tapY / height` (0 at bottom, 1 at top).
4. **Control bar anchoring**: Control strip center-aligned at `(50%, 50%)` of container (percentage coords after mapping rule above).

## 4 · Technical Requirements

### Coordinate System

- All coordinates must be stored and transmitted as normalized values (0-1) or percentages (0-100%).
- The coordinate origin (0,0) is at the **bottom-left** of the container.
- The coordinate (1,1) or (100%,100%) is at the top-right of the container.
- All coordinate-related methods must accept and return objects with both absolute and normalized coordinates.

### Video Player Integration

- The QuadTap component must integrate with various video player APIs through the VideoPlayerAdapter.
- The adapter must provide a consistent interface for play, pause, seek, and metadata operations.
- Video playback control must follow the rules specified in the conflict resolution section.
- Adapter **must bubble 'seeked' event** back to QuadTap so percentage calculations stay accurate when the user scrubs using the host player's controls.

### Settings Builder

- All configuration must be possible through the fluent SettingsBuilder interface.
- Default settings must be provided for all options.
- The builder must validate settings and provide helpful error messages.

### Event Handling

- All user interactions must be processed through a single event dispatcher.
- Event handlers must be properly bound to prevent memory leaks.
- The component must support touch and mouse events.
- Passive event listeners must be used for touch events to ensure smooth scrolling.

### Accessibility

- All interactive elements must have appropriate ARIA labels.
- The component must support keyboard navigation.
- Color contrast must meet WCAG 2.1 AA standards.

## 5 · State Diagram

```
     idle (video)
         │ tap
         ▼
     overlay
         │ tap on empty area
         ├─────────────────────────────────┐
         │ tap on bubble                    │
         ▼                                  │
overlay+bubble                              │
         │ tap on empty area                │
         ├─────────────────────────────────┤
         │ tap on bubble                    │
         ▼                                  │
     light-box                              │
         │ confirm/cancel                   │
         ├─────────────────────────────────┘
         │ swipe up/down
         ▼
next/prev video (idle)
```

## 6 · Key Functions

### activateOverlay(x, y)

Activates the overlay at the specified coordinates.

- Parameters:
  - `x`: The x-coordinate of the tap (absolute pixels)
  - `y`: The y-coordinate of the tap (absolute pixels)
- Returns: The quadrant id ('ne', 'nw', 'se', 'sw') so caller can log analytics.

### deactivateOverlay(options)

Deactivates the overlay.

- Parameters:
  - `options`: Optional object with properties:
    - `reason`: The reason for deactivation ('cancel' | 'swipe')
- Returns: void

### openLightBox()

Opens the light-box modal.

- Parameters: None
- Returns: The generated `replyLink` string
- Side effects:
  - Pauses the video
  - Stores the current playing state in `wasPlayingBefore`

### closeLightBox(confirm)

Closes the light-box modal.

- Parameters:
  - `confirm`: Whether to confirm the throw-down (boolean)
- Returns: void
- Side effects:
  - Resumes the video if `wasPlayingBefore` is true
  - If `confirm` is true, saves the throw-down payload

## 7 · Event Handling

```javascript
// Example event handling
containerElement.addEventListener('click', (evt) => {
  if (!state.overlayActive) { /* first tap */ }
  else {
    if (evt.target.closest('.profile-bubble')) { openLightBox(); }
    else { deactivateOverlay({reason:'cancel'}); }
  }
});
containerElement.addEventListener('touchend', (evt) => {
  if (state.overlayActive && isVerticalSwipe(evt)) {
    deactivateOverlay({reason:'swipe'});
    navigateFeed(evt);
  }
});
```

## 8 · Testing Strategy

### Unit Tests

- Test state transitions for all key functions
- Test coordinate conversion and quadrant determination
- Test event handling and dispatching
- Test adapter integration

### Integration Tests

- Test overlay activation and deactivation
- Test light-box opening and closing
- Test emoji selection and throw-down confirmation
- Test video player control
- Simulate copy-button click, assert `navigator.clipboard.readText()` equals generated link

### Visual Regression Tests

- Test overlay appearance
- Test light-box appearance
- Test emoji grid layout
- Test control strip positioning

## 9 · Changelog

| Date     | Author | Changes                                                                |
| -------- | ------ | ---------------------------------------------------------------------- |
| 5/3/2025 | Team   | Added vertical-swipe dismissal and clarified north/south context bars  |
| 5/4/2025 | Team   | Updated coordinate system and control bar positioning requirements     |
| 5/4/2025 | Team   | Added "Reply Link" row to light-box and fixed play/pause behavior      |
| 5/4/2025 | Team   | Added control positioning learnings and testing requirements           |

## 10 · Implementation Learnings

### Control Strip Positioning

After extensive testing, we've identified several critical factors that affect the reliable positioning of the control strip at center (50%, 50%):

1. **CSS Positioning Method**: 
   - **CORRECT**: Use `position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);`
   - **INCORRECT**: Using `bottom`, `margin-top`, or fixed pixel values

2. **DOM Structure**:
   - **CORRECT**: Control strip must be a direct child of the overlay container
   - **INCORRECT**: Nesting the control strip inside other elements with relative positioning

3. **Z-Index Management**:
   - **CORRECT**: Control strip must have `z-index` at least 10 higher than the overlay
   - **INCORRECT**: Relying on DOM order without explicit z-index

4. **Responsive Behavior**:
   - **CORRECT**: Use percentage-based positioning and width (e.g., `width: 80%; max-width: 400px;`)
   - **INCORRECT**: Fixed pixel widths or positions that don't scale with container

5. **Event Handling**:
   - **CORRECT**: Attach event listeners to the control strip with `stopPropagation()` to prevent overlay dismissal
   - **INCORRECT**: Allowing control strip clicks to bubble to the overlay

6. **Opacity Behavior**:
   - **CORRECT**: Start at full opacity (1.0) and fade to 50% opacity after 2 seconds of inactivity
   - **CORRECT**: Return to full opacity on hover/mouseenter
   - **INCORRECT**: Using fixed opacity or not providing visual feedback on hover

### Testing Requirements

To ensure proper control strip positioning, tests must verify:

1. **Exact Positioning**: The control strip center must be at exactly 50% horizontal and 50% vertical (center of the container)
2. **Responsive Behavior**: Position must remain correct when container is resized
3. **CSS Properties**: Must use the correct CSS properties as specified above
4. **Visual Verification**: Screenshots must be taken to visually verify positioning
5. **DOM Structure**: The control strip must be properly nested in the DOM
6. **Opacity Transitions**: Verify fade behavior after 2 seconds and on hover

### Common Issues and Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| Control strip not centered horizontally | Missing `transform: translateX(-50%)` | Add transform to center element when using `left: 50%` |
| Control strip not centered vertically | Missing `transform: translateY(-50%)` | Use `transform: translate(-50%, -50%)` for true centering |
| Position changes with window resize | Using fixed pixel values | Use percentage-based positioning exclusively |
| Control strip hidden | Z-index issues | Ensure proper z-index hierarchy |
| Click on control dismisses overlay | Event bubbling | Add `stopPropagation()` to control strip events |
| Control strip not fading | Missing timeout setup | Implement fade timeout with proper clearing on hover |

### Implementation Code

```javascript
/**
 * Creates a control strip element and positions it correctly
 * @param {HTMLElement} overlay - The overlay element to attach the control strip to
 * @returns {HTMLElement} The created control strip element
 */
function createControlStrip(overlay) {
  const controlStrip = document.createElement('div');
  controlStrip.className = 'quad-tap-controls';
  
  // Apply critical CSS for proper positioning
  controlStrip.style.position = 'absolute';
  controlStrip.style.top = '50%';    // Position at vertical center
  controlStrip.style.left = '50%';   // Center horizontally
  controlStrip.style.transform = 'translate(-50%, -50%)'; // Adjust for true centering
  
  // Ensure proper z-index (at least 10 higher than overlay)
  const overlayZIndex = parseInt(getComputedStyle(overlay).zIndex) || 1000;
  controlStrip.style.zIndex = (overlayZIndex + 10).toString();
  
  // Set width and other styles
  controlStrip.style.width = '80%';
  controlStrip.style.maxWidth = '400px';
  controlStrip.style.padding = '8px 12px';
  controlStrip.style.borderRadius = '24px';
  controlStrip.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
  controlStrip.style.display = 'flex';
  controlStrip.style.justifyContent = 'space-around';
  controlStrip.style.alignItems = 'center';
  controlStrip.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.3)';
  controlStrip.style.transition = 'opacity 0.3s ease';
  
  // Create control buttons
  const rewindButton = createButton('⟲30', 'Rewind 30 seconds', () => {
    // Rewind logic
  });
  
  const playPauseButton = createButton('▶', 'Play/Pause', () => {
    // Play/pause logic
    playPauseButton.textContent = playPauseButton.textContent === '▶' ? '❚❚' : '▶';
  });
  
  const forwardButton = createButton('⟳30', 'Forward 30 seconds', () => {
    // Forward logic
  });
  
  // Create share button
  const shareButton = createButton('⤴', 'Share', () => {
    // Generate a share URL
    const shareUrl = window.location.href;
    
    // Try to use the Web Share API if available
    if (navigator.share) {
      navigator.share({
        title: 'Check out this video moment',
        url: shareUrl
      });
    } else {
      // Fallback to copying to clipboard
      copyToClipboard(shareUrl);
      showTooltip(shareButton, 'Link copied!');
    }
  });
  
  // Create copy URL button
  const copyButton = createButton('⧉', 'Copy URL', () => {
    // Generate a URL for this specific moment
    const url = window.location.href;
    copyToClipboard(url);
    showTooltip(copyButton, 'Link copied!');
  });
  
  // Add buttons to control strip
  controlStrip.appendChild(rewindButton);
  controlStrip.appendChild(playPauseButton);
  controlStrip.appendChild(forwardButton);
  controlStrip.appendChild(shareButton);
  controlStrip.appendChild(copyButton);
  
  // Prevent clicks from dismissing overlay
  controlStrip.addEventListener('click', (evt) => {
    evt.stopPropagation();
  });
  
  // Add to overlay as direct child
  overlay.appendChild(controlStrip);
  
  // Set up auto-fade
  let fadeTimeout;
  const fadeControls = () => {
    controlStrip.style.opacity = '0.5';
  };
  
  // Show controls at full opacity on hover
  controlStrip.addEventListener('mouseenter', () => {
    clearTimeout(fadeTimeout);
    controlStrip.style.opacity = '1';
  });
  
  // Fade controls when mouse leaves
  controlStrip.addEventListener('mouseleave', () => {
    clearTimeout(fadeTimeout);
    fadeTimeout = setTimeout(fadeControls, 2000);
  });
  
  // Initial fade after 2 seconds
  controlStrip.style.opacity = '1';
  fadeTimeout = setTimeout(fadeControls, 2000);
  
  return controlStrip;
}

/**
 * Helper function to create a button for the control strip
 */
function createButton(text, ariaLabel, onClick) {
  const button = document.createElement('button');
  button.textContent = text;
  button.setAttribute('aria-label', ariaLabel);
  button.style.background = 'none';
  button.style.border = 'none';
  button.style.color = 'white';
  button.style.fontSize = '18px';
  button.style.padding = '8px';
  button.style.cursor = 'pointer';
  button.style.borderRadius = '50%';
  button.style.width = '40px';
  button.style.height = '40px';
  button.style.display = 'flex';
  button.style.justifyContent = 'center';
  button.style.alignItems = 'center';
  
  // Hover effect
  button.addEventListener('mouseenter', () => {
    button.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
  });
  
  button.addEventListener('mouseleave', () => {
    button.style.backgroundColor = 'transparent';
  });
  
  // Click handler
  button.addEventListener('click', onClick);
  
  return button;
}

/**
 * Helper function to show a tooltip
 */
function showTooltip(element, message) {
  const tooltip = document.createElement('div');
  tooltip.textContent = message;
  tooltip.style.position = 'absolute';
  tooltip.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  tooltip.style.color = 'white';
  tooltip.style.padding = '5px 10px';
  tooltip.style.borderRadius = '4px';
  tooltip.style.fontSize = '14px';
  tooltip.style.zIndex = '2000';
  tooltip.style.opacity = '0';
  tooltip.style.transition = 'opacity 0.3s ease';
  
  // Position the tooltip above the element
  const rect = element.getBoundingClientRect();
  tooltip.style.top = `${rect.top - 30}px`;
  tooltip.style.left = `${rect.left + rect.width / 2}px`;
  tooltip.style.transform = 'translateX(-50%)';
  
  // Add to document
  document.body.appendChild(tooltip);
  
  // Show tooltip
  setTimeout(() => {
    tooltip.style.opacity = '1';
  }, 10);
  
  // Hide and remove tooltip after 1.5 seconds
  setTimeout(() => {
    tooltip.style.opacity = '0';
    setTimeout(() => {
      document.body.removeChild(tooltip);
    }, 300);
  }, 1500);
}
```

## 11 · Interactive States

### Overlay active, light-box closed
- Video keeps playing, control-strip appears at bottom-centre of video container
- Profile bubble appears at the exact coordinates of the tap
- Quadrant gradients and directional emojis are visible
- Tapping on the profile bubble opens the light-box
- Tapping elsewhere or swiping vertically dismisses the overlay
- Control strip shows play/pause, rewind, and forward buttons
- Control strip fades to 50% opacity after 2 seconds of inactivity

### Light-box open, pauseOnLightboxOnly=true
- Video pauses automatically when light-box opens
- Both control strips (overlay and light-box) show "play" icon
- Video time slider is synced to currentTime
- Time display shows current time and total duration
- Emoji grid is displayed with quadrant-specific emojis
- Comment box is available with URL-paste detection
- Control strip in light-box shows all buttons including share and copy URL
- Control strip is positioned between emoji grid and comment box
- Closing the light-box resumes video playback if it was playing before

### Light-box open, pauseOnLightboxOnly=false
- Video continues playing when light-box opens
- Both control strips show "pause" icon
- All other elements behave the same as when pauseOnLightboxOnly=true

### Control strip in overlay
- Positioned at bottom-center of the overlay
- Uses absolute positioning with transform for centering
- Has z-index at least 10 higher than the overlay
- Shows rewind, play/pause, and forward buttons
- Fades to 50% opacity after 2 seconds
- Returns to full opacity on hover

### Control strip in light-box
- Positioned between emoji grid and comment box
- Uses static positioning (not absolute)
- Shows all buttons: rewind, play/pause, forward, share, copy URL
- Includes video time slider and time display
- Maintains full opacity (no fading)
- Uses the same button styles as the overlay control strip

## 12 · Critical Implementation Details

Based on extensive testing and user feedback, the following implementation details are critical for ensuring a consistent and reliable user experience:

1. **Overlay Z-Index**: The overlay must have a z-index of at least `video.zIndex + 100` to ensure it appears above all video player controls.

2. **Video Resume Timing**: When closing the light-box, the video must resume within 100ms using requestAnimationFrame if it was playing before, to ensure a smooth transition.

3. **URL Paste Detection**: The comment box must include live URL-paste detection to support the Reply Link functionality.

4. **Clipboard API Integration**: The copy button must use the Clipboard API to write the link to the clipboard and show a success toast for 1 second.

5. **Event Bubbling**: The VideoPlayerAdapter must bubble 'seeked' events back to QuadTap so percentage calculations stay accurate when the user scrubs using the host player's controls.

6. **Control Strip Positioning**: The control strip must be positioned exactly at center (50%, 50%) using the correct CSS properties as detailed in the Implementation Learnings section.

7. **Coordinate System**: All coordinates must use the normalized system (0-1) with (0,0) at the bottom-left to ensure consistency across different screen sizes and devices.

8. **Control Strip in Light-box**: When transplanting the control strip into the light-box, absolute positioning must be unset to allow proper flow layout. Use BEM/utility classes instead of inline styles for consistent styling.
Thought for a second


The spec is **readable and implementation-ready**—all critical rules are explicit, every term is defined once, and each function/ test has a clear success criterion. Below are just a few tweaks that will prevent edge-case ambiguity once devs start writing code:

| Section                          | Tiny adjustment                                                                                                                         | Why it helps                                            |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| **1 · Core Quad-Tap Flow #3**    | add “comment box **with live URL-paste detection**”                                                                                     | ties spec to the new ‘Reply Link’ use-case.             |
| **2 · First Tap**                | spell out overlay z-index (≥ `video.zIndex + 100`)                                                                                      | avoids “overlay hidden behind player” bug.              |
| **2 · Light-Box**                | clarify that copy button writes to **clipboard API** and shows ✅ toast for 1 s                                                          | defines UX feedback.                                    |
| **3 · Phase B #2**               | “…resumes **within 100 ms requestAnimationFrame** if…”                                                                                  | turns “resume” into a testable timing budget.           |
| **4 · Video Player Integration** | add bullet: “Adapter **must bubble ‘seeked’ event** back to QuadTap so percentage calcs stay accurate when user scrubs outside our UI.” | keeps coords valid if host player has its own scrubber. |
| **6 · Key Functions**            | list return value for `openLightBox()` (e.g., returns the generated `replyLink` string)                                                 | lets host log or pre-fill share UI.                     |
| **8 · Testing Strategy**         | under *Integration Tests* add: “simulate copy-button click, assert `navigator.clipboard.readText()` equals generated link”              | covers the new field.                                   |

If you patch those micro-details, the document becomes a **single source of truth** that QA, dev, and design can all run with confidently.
