# QuadTap-Coffee Specification

**Version:** 0.2
**Date:** 2025-05-28

# QuadTap Interaction Specification

This document outlines the canonical user flow and behavior for the QuadTap video overlay system.
Destructure the DOM and simply do

{div} = React.DOM

div
  className: 'app'
  'Hello World!
## I. Core Concepts

The law is to stay as close to the left margin as possible - each component is added to a dot notation namespace even when redundant to avoid nesting too deep.

*   **Video Player**: The underlying video element (e.g., HTML5 `<video>`, YouTube iframe).
*   **Respectful Overlay Principle**: QuadTap aims to enhance, not obstruct. Native player controls should remain accessible when QuadTap is not actively engaged by the user.
*   **QuadTap Overlay**: A layer that sits directly on top of the Video Player, sized to match. Its visibility and interactivity change based on its state.
    *   **Dormant State**: Initially, the overlay is invisible or minimally intrusive (`pointer-events: none`), allowing full interaction with the underlying player.
    *   **Primed State**: A user interaction (e.g., a tap anywhere on the video area) transitions the overlay to a "Primed State." In this state:
        *   The overlay becomes sensitive to a "Throwdown Tap" (`pointer-events: auto` on a specific, minimal interaction layer if needed, or on the main overlay if it's styled to be non-obtrusive).
        *   Native player controls may still be partially visible/accessible depending on styling.
*   **Throwdown Tap & Marker**: 
    *   **Throwdown Tap**: The first significant tap on the video area *while the overlay is in the Primed State*. 
    *   **Throwdown Marker**: This tap places a visual marker (e.g., user's profile picture, a designated emoji/icon) at the tap location. This marker is the primary interactive element for further QuadTap actions.
*   **Tap Zones (Optional/Contextual)**: While the primary interaction shifts to the Throwdown Marker, traditional Tap Zones (e.g., for directional input or specific actions) can still be configured. They might become visible or active only after the Throwdown Marker is placed, or be part of the Lightbox content.
*   **QuadTap Control Strip**: A set of custom video controls (play/pause, seek, volume). Its visibility is typically tied to the overlay being in an active state (e.g., after the Throwdown Marker is placed or during Lightbox interaction).
*   **Lightbox Mode**: A modal view triggered by interacting with the **Throwdown Marker**. It overlays the entire page, pauses the video, and displays richer content or interactions.
*   **Activation Strip (Optional/Configurable)**: As an alternative to priming via a direct video tap, a thin, persistent strip (typically at the bottom of the video player) can be configured to prime the QuadTap overlay on hover or tap.

## II. User Flows

### Flow 1: Priming QuadTap, Placing Throwdown Marker, and Lightbox Activation

1.  **Initial (Dormant) State**:
    *   Video is playing or paused.
    *   QuadTap Overlay is essentially invisible and inactive (`pointer-events: none`).
    *   User can interact freely with native Video Player controls (e.g., YouTube controls).

2.  **User Action (Priming)**: User taps anywhere on the video player area.
    *   *(Alternative: If Activation Strip is configured and used, user hovers/taps the strip.)*
    *   **System Response (Overlay Primed)**:
        *   QuadTap Overlay transitions to the "Primed State."
        *   The overlay itself remains largely transparent but is now listening for the "Throwdown Tap."
        *   No immediate visual change, or a very subtle cue (e.g., a brief shimmer or border effect on the video) might indicate QuadTap is primed.
        *   Native player controls remain accessible.

3.  **User Action (Throwdown Tap)**: While QuadTap is primed, user taps again on the video area. This is the "Throwdown Tap."
    *   **System Response**:
        *   A **Throwdown Marker** (e.g., user's profile image or a specific icon) appears at the precise location of this tap.
        *   The QuadTap Overlay might now show more visual cues or become more generally interactive. The QuadTap Control Strip may become visible.
        *   If the Throwdown Tap inadvertently lands on a native player control the user *intended* to use, the native control should still function if possible (requires careful event handling and `pointer-events` management).

4.  **User Action (Repositioning Throwdown Marker - Optional)**: If the user is unsatisfied with the Throwdown Marker's position (e.g., it obscures something):
    *   User taps on a different, empty "whitespace" area of the video *while the Throwdown Marker is visible*.
    *   **System Response**: The Throwdown Marker moves to this new tap location.

5.  **User Action (Activating Lightbox)**: User taps directly on the visible **Throwdown Marker**.
    *   **System Response (Lightbox Mode - See Flow 2)**:
        *   The Video Player **pauses**.
        *   The Lightbox appears, overlaying the entire page.

6.  **User Action (Interacting with QuadTap Controls)**: While the Throwdown Marker is visible (before or after Lightbox use, if Lightbox is closed):
    *   User interacts with the **QuadTap Control Strip** (if visible).
    *   **System Response**: Standard control actions (play/pause, seek, volume) are performed on the Video Player via the adapter. The Control Strip updates its state accordingly.

7.  **System Action (Deactivation/Timeout)**:
    *   If the overlay is Primed, but no Throwdown Tap occurs within a configured timeout (e.g., 5-10 seconds), the overlay returns to the Dormant State.
    *   If a Throwdown Marker is visible, but no interaction (repositioning, tap on marker, control strip interaction) occurs within a configured timeout (e.g., 10-15 seconds), the Throwdown Marker and any active QuadTap visuals (like Control Strip) fade out, and the overlay returns to the Dormant State.

### Flow 2: Lightbox Mode Details

1.  **Pre-condition**: A Throwdown Marker is visible, and the user has tapped it (as per Flow 1, Step 5).

2.  **System Response (Lightbox Activation)**:
    *   The Video Player **pauses** playback (if not already paused).
    *   The main QuadTap Overlay elements (Throwdown Marker, Control Strip if visible) may temporarily hide or become less prominent.
    *   A Lightbox element appears:
        *   It overlays the *entire browser viewport*.
        *   Background: Semi-opaque (e.g., `rgba(23, 32, 42, 0.7)`).
        *   Modal Content Area: Solid background (e.g., `#FFFFFF`).
        *   Content defined for this Lightbox instance is displayed.
        *   Page scroll may be disabled.

3.  **User Action**: User interacts with content or controls within the Lightbox modal.
    *   **System Response**: Dependent on the Lightbox content.

4.  **User Action**: User closes the Lightbox (e.g., close button 'X', Escape key, click on semi-opaque background).
    *   **System Response**:
        *   Lightbox element is removed/hidden.
        *   Page scroll re-enabled.
        *   Video Player **resumes playback** from where it was paused.
        *   The QuadTap **Throwdown Marker** and **Control Strip** (if previously visible) reappear. The overlay returns to the state it was in before the Lightbox opened (typically, Throwdown Marker visible, ready for interaction or timeout).

### Flow 3: Repositioning the Throwdown Marker

1.  **Pre-condition**: A Throwdown Marker is visible.
2.  **User Action**: User taps on an empty "whitespace" area of the video (i.e., not on the Throwdown Marker itself or a native control).
3.  **System Response**: The Throwdown Marker is moved to the new tap location. This can be repeated.

### Flow 4: Interacting with the QuadTap Control Strip

1.  **Pre-condition**: The QuadTap Control Strip is visible (typically after the Throwdown Marker is placed or in certain active states).
2.  **User Action**: User clicks or interacts with controls on the Control Strip (e.g., Play/Pause button, Seek bar, Volume slider, Mute button, Fullscreen button).
3.  **System Response**: The corresponding action is performed on the underlying Video Player via the adapter. The Control Strip updates its UI state (e.g., Play becomes Pause).

### Flow 5: Interacting within the Lightbox

1.  **Pre-condition**: The Lightbox is active (as per Flow 1, Step 5). The video is paused.
2.  **User Action (Optional - Select Emoji)**: User clicks on one of the emojis displayed in the emoji grid within the Lightbox modal.
    *   **System Response**: The selected emoji is visually highlighted. The emoji character is added to the beginning of the comment text area. The selection is stored temporarily.
3.  **User Action (Optional - Add Comment)**: User types text into the comment text area within the Lightbox modal.
    *   **System Response**: The text is captured. URLs within the text may be extracted.
4.  **User Action (Optional - Add Media)**: User interacts with the media upload or video recording buttons within the Lightbox modal.
    *   **System Response**: Depending on the interaction, a file picker may open, or video recording may start/stop. Selected or recorded media is associated with the current throwdown.
5.  **User Action (Save Throwdown)**: User clicks the "Save" button within the Lightbox modal.
    *   **System Response**: The selected emoji (if any), comment text (if any), media (if any), the throwdown position, and current video context (time, video ID, etc.) are bundled into a "Throwdown" event object. This object is saved (e.g., to local storage or sent via a callback). The Lightbox closes, and the video resumes playback.
6.  **User Action (Cancel Throwdown)**: User clicks the "Cancel" button within the Lightbox modal, clicks the close button ('X'), presses the Escape key, or clicks the semi-opaque background outside the modal.
    *   **System Response**: The Lightbox closes. Any unsaved inputs (emoji selection, comment, media) are discarded. The video resumes playback from where it was paused.

### Flow 6: Smooth Swipe Navigation

1.  **Pre-condition**: Swipe navigation is configured and enabled.
2.  **User Action**: User performs a vertical swipe gesture on the video player area.
3.  **System Response**: The QuadTap system detects the swipe gesture. Depending on the specific configuration and implementation, this may trigger navigation to the previous or next video in a playlist or a defined sequence. Visual feedback (e.g., a loading spinner, a transition effect) may be provided.

### Flow 7: Viewing Contextual Information Bars

1.  **Pre-condition**: Contextual Information Bars (North and/or South) are configured and enabled.
2.  **User Action**: The user is viewing a video where these bars are active.
3.  **System Response**: The QuadTap overlay displays the North (FROM) and/or South (TO) information bars over the video player area. These bars present additional contextual information related to the video or its sequence.

### Flow 8: Activating Overlay or Viewing Interactions via Heatmap (YouTube Context)

1.  **Pre-condition**: A heatmap element is displayed below the YouTube video player (or similar embedded player with interaction limitations), and QuadTap is initialized to work with this setup.
2.  **User Action**: User taps or clicks on a specific point or area within the heatmap element below the video.
3.  **System Response**: The QuadTap system detects the interaction on the heatmap and the corresponding video timestamp. This action serves one of two primary purposes:
    *   **Priming for New Interaction**: It can trigger the transition of the QuadTap Overlay to the "Primed State" (similar to Flow 1, Step 2), making it ready for a Throwdown Tap at the associated video time. This is useful for initiating a new interaction when direct video taps are restricted.
    *   **Viewing Existing Interactions**: If there are existing interactions (Throwdowns) associated with or near the tapped timestamp on the heatmap, the system may directly reveal these interactions on the video overlay (e.g., display the Throwdown Markers) and potentially seek the video to that time. This allows users to jump to moments with existing community input.
    This interaction specifically caters to scenarios where direct taps on embedded players (like YouTube's iframe) are restricted, using the heatmap as an alternative activation surface for both initiating new throwdowns and exploring existing ones.

### Flow 9: Long Press to Open Lightbox Directly

1.  **Pre-condition**: The QuadTap overlay is in the Dormant state, or no Throwdown Marker is currently placed.
2.  **User Action**: User performs a long press gesture on the video player area (typically on touch-enabled devices).
3.  **System Response**: The QuadTap system detects the long press. It calculates the position of the long press and directly opens the Lightbox modal at that position. The video is paused. The Lightbox is pre-filled with the coordinates and quadrant of the long press, ready for the user to add an emoji, comment, or media and save the throwdown (Flow 5). This bypasses the intermediate 'primed' and 'throwdownPlaced' states.

## III. State Management Notes

*   **QuadTap States**: The `QuadTapCoffee` component will need to manage its internal state: `dormant`, `primed`, `throwdownPlaced` (marker visible), `lightboxActive`.
*   **Pointer Events**: Careful management of `pointer-events` on the overlay and its child elements is crucial to allow interaction with underlying native controls when QuadTap is dormant or only primed.
    *   `dormant`: `pointer-events: none` on main overlay.
    *   `primed`: A thin interaction layer might get `pointer-events: auto` to catch the throwdown tap, or the main overlay gets it but is styled to be non-obtrusive.
    *   `throwdownPlaced`/`lightboxActive`: `pointer-events: auto` on relevant QuadTap elements.
*   **Control Strip Play/Pause Button State**: Must accurately reflect the Video Player's true playback state and update in real-time.
*   **Video Resume on Lightbox Close**: Video always attempts to resume playback when Lightbox is closed.

## IV. Visual and Behavioral Details

*   **Lightbox Overlay**: Color `#17202A`, opacity ~70% (`rgba(23, 32, 42, 0.7)`).
*   **Lightbox Modal Background**: Solid white (`#FFFFFF`).
*   **Element Placement**: All QuadTap elements (Throwdown Marker, Control Strip, Tap Zones if used) must be accurately positioned over the Video Player, updating dynamically with player size changes. The **QuadTap Control Strip** is typically positioned in the center-bottom area of the video overlay when visible, and is also present within the Lightbox modal.
*   **Transitions**: Smooth fade transitions for activation/deactivation of overlay states, marker, control strip, and Lightbox.
*   **Throwdown Marker Customization**: Configurable icon/image for the Throwdown Marker.

## 1. Overview

`quad-tap-coffee` is a React component for adding interactive tap zones and controls to video or image content. It is a fork of the original `QuadTap` library, rebuilt with React, Material-UI (MUI), and a mix of CoffeeScript and JavaScript. The primary goals are to resolve callback issues experienced when embedding in React applications, adopt a "zero custom CSS" policy by leveraging MUI for all styling, and architect components in a functional, stateless manner where feasible, preparing for potential future database interactions.

## 2. Core Requirements & Philosophy

*   **React & MUI:** All components will be React functional components. MUI will be the exclusive source for UI elements and styling.
*   **CoffeeScript & `React.createElement`**: All React elements in `.coffee` files will be constructed using `React.createElement` directly. No JSX transpilation will be used for CoffeeScript files.
*   **Zero Custom CSS:** No separate CSS files or inline `style` attributes (unless an unavoidable, documented exception for dynamic styles not easily achievable with MUI's `sx` prop).
*   **Functional & Stateless:** Components should be stateless by default. State will be managed by parent components and passed down via props. Callbacks will be used for child-to-parent communication. Local component state (via `useState`) should only be used for UI-specific concerns that don't affect the application's global state or parent components. This principle applies to both CoffeeScript and JavaScript components within the project.
*   **Callback Issue Resolution:** The architecture must inherently prevent the callback/control issues seen in the original version when embedded in React.
*   **Modularity & Reusability:** Components should be designed for clarity and potential reuse.
*   **DB Interaction Readiness:** While not implementing DB features initially, the structure should allow for easier integration of data persistence or fetching logic later (e.g., by separating UI from business logic/data handling).

## 3. Component Breakdown

The main component will be `QuadTapCoffee`.

### 3.1. `QuadTapCoffee` (Container Component)

*   **Purpose:** The primary wrapper and orchestrator for the QuadTap functionality. It will manage the overall state (e.g., current media time, play/pause state, volume, fullscreen status, QuadTap interaction state like `primed`, `throwdownPlaced`) if not controlled externally, and pass data and callbacks to child components.
*   **File:** `src/QuadTapCoffee.coffee`
*   **Props:**
    *   `mediaElement`: (Required) A React ref or direct instance of the video player API (e.g., YouTube Player instance).
    *   `videoDomElement`: (Required) The actual DOM node of the video player (e.g., the `<iframe>` or `<video>` tag) for sizing and positioning calculations.
    *   `config`: (Required) Object defining tap zones, control strip appearance, behavior, etc.
        *   `throwdownMarkerIcon`: (Optional) MUI Icon component or image URL for the throwdown marker.
        *   `zones`: (Optional) Array of zone configurations (position, action, MUI styling) - secondary to throwdown marker interaction.
        *   `controlStrip`: Configuration for the control strip.
        *   `lightboxContent`: (Function or ReactNode) Content to be displayed in the Lightbox. Receives props like `closeLightbox`.
        *   `activation`: (Optional) `'directTap'` (default) or `'activationStrip'`.
        *   `timeouts`: (Optional) `{ primed: 5000, throwdownPlaced: 10000 }` in milliseconds.
    *   `onEvent`: (Optional) Callback for events like `onLightboxOpen`, `onLightboxClose`, `onPlayerStateChange`.
    *   `initialState`: (Optional) Object for initial player state.
    *   `style`: (Optional) Style object for the root QuadTap container.
*   **Internal State (Examples):**
    *   `quadTapState`: (`'dormant'`, `'primed'`, `'throwdownPlaced'`, `'lightboxActive'`)
    *   `throwdownMarkerPosition`: `{ x, y }`
    *   `isPlayerPlaying`, `currentTime`, `duration`, `volume`, `isMuted`, `isFullscreen` (mirrors player state)
    *   `isControlsVisible`
*   **Rendered Output:**
    *   A root `Box` acting as the main overlay container.
    *   `ThrowdownMarkerMUI` (new component) - if state is `throwdownPlaced`.
    *   `TapZoneLayerMUI` (if zones configured and relevant to current state).
    *   `ControlStripMUI` (if relevant to current state).
    *   `LightboxMUI` (new component for modal) - if state is `lightboxActive`.
*   **Key Responsibilities:**
    *   Managing QuadTap interaction state machine (`dormant` -> `primed` -> etc.).
    *   Handling taps on the video area to prime or place throwdown marker.
    *   Managing visibility and props of child UI components based on state.
    *   Interfacing with the video player adapter.
    *   Implementing timeouts for state transitions.

### 3.2. `TapZoneLayerMUI` (Presentational Component)

*   **Purpose:** Renders traditional interactive tap zones if configured. May be less central with the new Throwdown Marker flow but still useful for specific fixed interaction points, perhaps within the Lightbox or as secondary interactions.
*   ...(Props and responsibilities largely as before, but its visibility will be more conditional based on `QuadTapCoffee`'s state and config)

### 3.3. `ControlStripMUI` (Presentational Component)

*   **Purpose:** Displays media playback controls. Visibility is conditional.
*   ...(Props and responsibilities largely as before, but its visibility will be more conditional)

### 3.4. `OverlayMUI` (Presentational Component - Refocused)

*   **Purpose:** This component might be refocused or renamed. The main page-covering Lightbox overlay logic will likely be in a new `LightboxMUI` component. `OverlayMUI` could be used for *subtle visual cues* on the main video player (e.g., a brief shimmer on priming, or displaying the Throwdown Marker itself if not a separate component).
*   **Consider merging into `ThrowdownMarkerMUI` or a new `VisualCuesMUI` if its role becomes too small.**

### 3.5. `ThrowdownMarkerMUI` (New Presentational Component)

*   **Purpose:** Renders the interactive Throwdown Marker at a given position.
*   **File:** `src/components/ThrowdownMarkerMUI.coffee` (new)
*   **Props:**
    *   `position`: `{ x, y }` (absolute coordinates within the video overlay area).
    *   `icon`: MUI Icon component or image URL.
    *   `onClick`: Callback when the marker is tapped (to trigger Lightbox).
    *   `muiProps`: For styling the marker.
*   **Rendered Output:** An MUI `IconButton` or styled `Box` displaying the icon/image at the specified position.

### 3.6. `LightboxMUI` (New Container/Presentational Component)

*   **Purpose:** Manages and displays the full-page Lightbox modal.
*   **File:** `src/components/LightboxMUI.coffee` (new)
*   **Props:**
    *   `isOpen`: boolean
    *   `onClose`: Callback to request closing the Lightbox.
    *   `content`: ReactNode (the content to display inside the modal, passed from `QuadTapCoffee` `config.lightboxContent`).
    *   `overlayColor`: string (e.g., `rgba(23, 32, 42, 0.7)`).
    *   `modalBackgroundColor`: string (e.g., `#FFFFFF`).
*   **Rendered Output:** An MUI `Modal` or custom Box structure for the full-screen overlay and centered content area.

## 4. Event Handling and State Management

*   **`QuadTapCoffee` as State Machine:** It will manage the primary interaction states.
*   **Pointer Events for Coexistence**: Critical for allowing native controls to work when QuadTap is dormant/primed.
    *   The main overlay container in `QuadTapCoffee` will need its `pointer-events` style dynamically changed.
    *   When `dormant`, `pointer-events: none`.
    *   When `primed` to detect the first tap for marker placement, it might briefly become `pointer-events: auto` for the entire surface, or a specific sub-layer handles this to avoid completely obscuring everything.
    *   When `throwdownPlaced`, the marker itself is `pointer-events: auto`. The rest of the overlay might be `none` or selectively `auto` for the control strip.

## 5. Styling with MUI

*   **`sx` Prop:** Preferred for instance-specific styling.
*   **`styled()` API:** For creating reusable styled MUI components if needed.
*   **Theme:** `QuadTapCoffee` can accept an MUI theme prop to customize appearance. A default theme can be provided.
*   **No Global CSS Pollution:** Styles will be scoped to components.

## 6. CoffeeScript + `React.createElement` Conventions

This project embraces CoffeeScript's expressive and minimal syntax, particularly when writing React components using `React.createElement`. The goal is to maximize readability and leverage CoffeeScript's strengths while ensuring clarity and avoiding parser ambiguities.

*   **Minimalist Syntax (The "Stripping Rule")**: Aggressively remove optional syntactic characters. This includes:
    *   Parentheses `()` for function calls and definitions *unless* they are necessary to resolve ambiguity or improve readability for complex signatures. A key exception is for React component props definition/destructuring, where parentheses are preferred for clarity: `ComponentName = (props) -> ...` or `MyFunction = ({ prop1, prop2 }) -> ...`.
    *   Curly braces `{}` for object literals. Use indentation to define object structure.
    *   Commas `,` at the end of lines in multi-line arrays or objects where unambiguous.
*   **`React.createElement` in CoffeeScript**: Explicitly use `React.createElement` for defining React element structures.
    ```coffeescript
    # Preferred for React components
    MyComponent = (props) ->
      { name, items } = props # Props destructuring with braces, inside parens
      log 'Rendering MyComponent with name:', name

      React.createElement 'div', null, # Using React.createElement explicitly
        React.createElement 'h1', null, "Hello, #{name}"
        React.createElement 'ul', null,
          items?.map (item) ->
            React.createElement 'li', { key: item.id }, item.text
    ```
*   **Function Definitions and Calls**: Prefer no parentheses for simple cases.
    ```coffeescript
    # Function definition
    add = x, y -> x + y
    # Function call
    sum = add 1, 2
    ```
*   **Object Literals (Braceless)**: Always use indentation.
    ```coffeescript
    myStyle =
      color: 'blue'
      fontSize: '16px'
      padding:
        top: 10
        left: 5
    ```
*   **Arrays**: Use newlines for elements in arrays of objects or complex structures. Commas are optional at line-ends if structure is clear.
    ```coffeescript
    myArray = [
      { id: 1, name: "Item 1" }
      {
        id: 2
        name: "Item 2"
      }
    ]
    ```

### 6.1. Namespace and Structure Conventions (Dot Notation)

To manage complexity, improve readability, and reduce deep indentation which can be problematic for CoffeeScript parsers, the following namespacing conventions are strictly adopted:

*   **Main Export Object per File**: Each CoffeeScript file defining a module (e.g., a React component and its related logic) MUST define a primary container object (namespace). This object is the default export.
    *   Example: `MyModule = {}` or `QT_ComponentNamespace = {}`.
*   **Dot Notation for All Properties**: All functions, helper utilities, React component definitions, constants, and sub-objects related to the module MUST be assigned as properties of this main container object using dot notation.
    *   This helps keep the code structure flat and logic organized into manageable, testable units.
    *   Example:
        ```coffeescript
        # In MyComponent.coffee
        MyComponentNamespace = {}

        MyComponentNamespace.utils = {}
        MyComponentNamespace.utils.calculateSomething = (value) -> value * 2

        MyComponentNamespace.Component = (props) ->
          { data } = props
          processedData = MyComponentNamespace.utils.calculateSomething data
          React.createElement 'div', null, "Processed: #{processedData}"
        
        module.exports = MyComponentNamespace
        ```
*   **Reduced Indentation Focus**: The primary motivation for dot notation is to avoid excessive indentation. If a helper function is only used by one other function within the namespace and is short, it might be acceptable as a local nested function if it doesn't increase the indent level beyond 2-3 levels. However, the default should be to flatten using the namespace.

### 6.2. React Component Rendering (The "Combine Step" / "Box Model")

When defining the rendering logic of a React component (especially a container component that assembles other components), the structure should clearly represent the hierarchy and relationship of these components—conceptually, its "box model."

*   **Functional and Stateless Style**: Child components receive data and callbacks via props. State is primarily managed by container components.
*   **Explicit `React.createElement`**: For consistency and clarity within CoffeeScript files, always use `React.createElement` directly.
*   **Clarity in Composition**: The final `return` statement of a component's render logic, especially when using `React.createElement`, should be structured to make the composition of child elements evident. Assigning children to a `componentChildren` array before passing to the main parent `React.createElement` call is a good pattern.

    ```coffeescript
    # QuadTap.Component example snippet
    QuadTap.Component = (props) ->
      # ... (state, logic, handlers) ...

      # Define children elements first, conditionally
      tapZoneLayerElement = if someCondition
        React.createElement TapZoneLayerMUI.Component, { zones: processedZones }
      
      controlStripElement = if anotherCondition
        React.createElement ControlStripMUI.Component, { playerState: playerState }

      # Assemble children for the main layout Box
      componentChildren = []
      if tapZoneLayerElement then componentChildren.push tapZoneLayerElement
      if controlStripElement then componentChildren.push controlStripElement

      # Main layout Box - clear hierarchy
      React.createElement Box, {
        ref: containerRef,
        sx: rootStyle
      }, componentChildren # Pass children array
    ```
*   **Avoid Deep Nesting in Render Logic**: If render logic becomes too complex with many nested conditional `React.createElement` calls, consider breaking it down into smaller helper functions within the component's namespace (e.g., `MyNamespace.renderSectionA = (data) -> ...`) or into separate sub-components.

This approach ensures that the visual structure of the UI is discernible from the code, aiding maintainability and understanding, even without traditional JSX syntax.

## 7. Build System Considerations

*   Webpack or Vite configured with:
    *   `coffee-loader` for `.coffee` files.
    *   MUI tree-shaking.

## 8. Addressing Callback Issues

The original callback issues are suspected to arise from direct DOM manipulation or event listener management clashing with React's virtual DOM and event system.
*   **Solution Approach:**
    *   All interactions will flow through React's state and prop system.
    *   No direct DOM manipulation outside of React's lifecycle for elements managed by React.
    *   Event listeners on the `mediaElement` will be carefully managed by `QuadTapCoffee` using `useEffect` for setup and cleanup.
    *   MUI components handle their own internal eventing, exposing interactions via React-friendly props (e.g., `onClick`).

## 9. Directory Structure (Initial Proposal)

```
quad-tap-coffee/
├── package.json
├── webpack.config.js (or vite.config.js)
├── .babelrc (if using Babel)
├── .coffeescriptrc (if needed)
├── QUAD_TAP_COFFEE_SPEC.md
└── src/
    ├── QuadTapCoffee.coffee
    ├── components/
    │   ├── TapZoneLayerMUI.coffee
    │   ├── ControlStripMUI.coffee
    │   ├── OverlayMUI.coffee
    │   └── common/ (e.g., shared MUI styled components or utility hooks)
    ├── hooks/ (custom React hooks, e.g., useMediaControls)
    ├── theme/ (default MUI theme configuration)
    └── utils/ (general utility functions)
```

This specification will be updated as development progresses and new insights are gained.
