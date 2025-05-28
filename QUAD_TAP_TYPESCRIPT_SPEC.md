# QuadTap-TypeScript Specification

**Version:** 0.1
**Date:** 2025-05-29

# QuadTap Interaction Specification

This document outlines the canonical user flow and behavior for the QuadTap video overlay system, implemented using React, TypeScript/TSX, and Material-UI (MUI) with a strict "zero custom CSS" policy.

## I. Core Concepts

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

(The user flows remain the same as they describe the desired behavior. Refer to the original `coffee.md` for Flows 1-9 details.)

## III. State Management Notes

*   **QuadTap States**: The `QuadTap` component will need to manage its internal state using React's `useState` hook, with state types defined using TypeScript interfaces (e.g., `'dormant'`, `'primed'`, `'throwdownPlaced'`, `'lightboxActive'`).
*   **Pointer Events**: Careful management of `pointer-events` using MUI's `sx` prop is crucial to allow interaction with underlying native controls when QuadTap is dormant or only primed.
    *   `dormant`: `pointer-events: none` on main overlay container.
    *   `primed`: May require dynamic `pointer-events` on the overlay or a sub-layer.
    *   `throwdownPlaced`/`lightboxActive`: `pointer-events: auto` on relevant QuadTap elements.
*   **Control Strip Play/Pause Button State**: Must accurately reflect the Video Player's true playback state and update in real-time using state and effects.
*   **Video Resume on Lightbox Close**: Video always attempts to resume playback when Lightbox is closed, managed within the state logic and adapter interaction.

## IV. Visual and Behavioral Details

*   **Lightbox Overlay**: Color `#17202A`, opacity ~70% (`rgba(23, 32, 42, 0.7)`), applied via MUI `sx` prop.
*   **Lightbox Modal Background**: Solid white (`#FFFFFF`), applied via MUI `sx` prop.
*   **Element Placement**: All QuadTap elements (Throwdown Marker, Control Strip, Heatmap, etc.) must be accurately positioned over or relative to the Video Player, updating dynamically with player size changes. Positioning will be handled using MUI's Box component and `sx` prop for absolute or relative positioning and layout (e.g., flexbox, grid).
*   **Transitions**: Smooth fade transitions can be implemented using MUI's capabilities or CSS transitions applied via the `sx` prop.
*   **Throwdown Marker Customization**: Configurable icon/image for the Throwdown Marker, passed as a prop.

## 1. Overview

`quad-tap-typescript` is a React component for adding interactive tap zones and controls to video or image content. It is a new implementation based on the QuadTap concept, built with React, TypeScript/TSX, and Material-UI (MUI). The primary goals are to leverage TypeScript's type safety, adopt a strict "zero custom CSS" policy by using MUI for all styling, and architect components in a functional manner, preparing for potential future database interactions.

## 2. Core Requirements & Philosophy

*   **React & MUI:** All components will be React functional components written in TypeScript/TSX. MUI will be the exclusive source for UI elements and styling.
*   **TypeScript & TSX:** The project will use TypeScript for type safety and TSX syntax for defining React component structures. `import` and `export` will be used for module management.
*   **Zero Custom CSS:** No separate CSS files (`.css`, `.scss`, etc.) or inline `style` attributes. All styling will be applied using MUI's `sx` prop, `styled()` API, or theme customization.
*   **Functional Components & Hooks:** Components will primarily use React hooks (`useState`, `useEffect`, `useRef`, `useCallback`, etc.) for state and lifecycle management. State should be managed by parent components and passed down via props where appropriate.
*   **Callback Issue Resolution:** The architecture must inherently prevent callback/control issues by adhering to React's paradigm for state and event handling.
*   **Modularity & Reusability:** Components should be designed for clarity and potential reuse.
*   **DB Interaction Readiness:** The structure should allow for easier integration of data persistence or fetching logic later.

## 3. Component Breakdown

The main component will be `QuadTap` (or `QuadTapTSX`).

### 3.1. `QuadTap` (Container Component)

*   **Purpose:** The primary wrapper and orchestrator for the QuadTap functionality. Manages overall state, interacts with the video player adapter, and passes data/callbacks to children.
*   **File:** `src/QuadTap.tsx`
*   **Props (using TypeScript interfaces):**
    *   `mediaElement`: (Required) A React ref or direct instance of the video player API (with appropriate TypeScript type).
    *   `videoDomElement`: (Required) The actual DOM node of the video player (`HTMLVideoElement`, `HTMLIFrameElement`, etc.).
    *   `config`: (Required) Object defining configuration (typed with a TypeScript interface).
        *   `throwdownMarkerIcon`: (Optional) ReactNode (e.g., MUI Icon component) or string (image URL).
        *   `zones`: (Optional) Array of zone configurations (typed).
        *   `controlStrip`: Configuration for the control strip (typed).
        *   `lightboxContent`: ReactNode (content for the Lightbox).
        *   `activation`: `'directTap' | 'activationStrip'`.
        *   `timeouts`: `{ primed: number, throwdownPlaced: number }`.
    *   `onEvent`: (Optional) Callback for events (typed).
    *   `initialState`: (Optional) Object for initial player state (typed).
    *   `sx`: (Optional) MUI `SxProps` for the root container.
*   **Internal State (using `useState` with types):**
    *   `quadTapState`: `'dormant' | 'primed' | 'throwdownPlaced' | 'lightboxActive'`
    *   `throwdownMarkerPosition`: `{ x: number, y: number } | null`
    *   `isPlayerPlaying`, `currentTime`, etc. (typed)
    *   `isControlsVisible`: boolean
*   **Rendered Output (using TSX):**
    ```tsx
    <Box sx={rootStyles}>
      {/* Child components rendered based on state and config */}
      <InfoBarMUI />
      {config.useHeatmap && <HeatmapMUI />}
      {/* ... other components ... */}
      <LightboxMUI />
    </Box>
    ```
*   **Key Responsibilities:**
    *   Managing state machine and transitions.
    *   Handling events (taps, long press, swipes) on the video element.
    *   Managing visibility and props of child components.
    *   Interfacing with the video player adapter.
    *   Implementing timeouts.

### 3.2. `TapZoneLayerMUI` (Presentational Component)

*   **Purpose:** Renders interactive tap zones.
*   **File:** `src/components/TapZoneLayerMUI.tsx`
*   **(Details similar to coffee.md, adapted for TSX/MUI/TypeScript)**

### 3.3. `ControlStripMUI` (Presentational Component)

*   **Purpose:** Displays media playback controls.
*   **File:** `src/components/ControlStripMUI.tsx`
*   **(Details similar to coffee.md, adapted for TSX/MUI/TypeScript)**

### 3.4. `ThrowdownMarkerMUI` (Presentational Component)

*   **Purpose:** Renders the interactive Throwdown Marker.
*   **File:** `src/components/ThrowdownMarkerMUI.tsx`
*   **Props (using TypeScript interface):**
    *   `position`: `{ x: number, y: number }`.
    *   `icon`: ReactNode or string.
    *   `onClick`: `() => void`.
    *   `onDragStart`, `onDragging`, `onDragEnd`: Drag event handlers.
    *   `sx`: (Optional) MUI `SxProps`.
*   **Rendered Output (using TSX):** MUI `IconButton` or styled `Box`.

### 3.5. `LightboxMUI` (Container/Presentational Component)

*   **Purpose:** Manages and displays the full-page Lightbox modal.
*   **File:** `src/components/LightboxMUI.tsx`
*   **Props (using TypeScript interface):**
    *   `isOpen`: boolean.
    *   `onClose`: `() => void`.
    *   `content`: ReactNode.
    *   `onSave`: Callback for saving throwdown data.
    *   `emojisConfig`: Emojis configuration (typed).
    *   `throwdownPosition`: `{ x: number, y: number } | null`.
    *   `overlayColor`: string.
    *   `modalBackgroundColor`: string.
*   **Rendered Output (using TSX):** MUI `Modal` or custom Box structure.

### 3.6. `HeatmapMUI` (Presentational Component)

*   **Purpose:** Renders a visual heatmap of interactions.
*   **File:** `src/components/HeatmapMUI.tsx`
*   **Props (using TypeScript interface):**
    *   `throwdowns`: Array of throwdown data (typed).
    *   `onHeatmapInteraction`: Callback when a heatmap area is interacted with.
    *   `sx`: (Optional) MUI `SxProps`.
*   **Rendered Output (using TSX):** MUI Box or other elements to visualize heatmap data.

## 4. Event Handling and State Management

*   **React's Synthetic Event System**: Utilize React's event handlers (`onClick`, `onTouchStart`, etc.) on the main container or specific elements. For events directly on the video DOM node not managed by React (e.g., `timeupdate`), use `useEffect` to add and clean up listeners.
*   **State Updates**: Use `useState` setter functions. For complex state updates or logic dependent on previous state, use the functional update form (`setMyState(prevState => ...)`) or `useReducer` for more complex state logic.
*   **Refs**: Use `useRef` for accessing DOM nodes (`videoDomElement`) or mutable values that don't trigger re-renders.
*   **Callbacks**: Use `useCallback` to memoize event handlers and prevent unnecessary re-renders of child components.

## 5. Styling with MUI

*   **`sx` Prop:** Use the `sx` prop on MUI components for most instance-specific styles. This supports direct CSS values, theme values, and responsive styles.
*   **`styled()` API:** Use MUI's `styled()` utility for creating reusable components with custom styles based on other components or HTML elements.
*   **Theme:** Define a custom MUI theme (or use the default) for consistent styling across the application. Use `ThemeProvider` to provide the theme.
*   **Zero Custom CSS:** Absolutely no separate `.css` or `.scss` files. No direct `style` attributes on HTML elements unless strictly necessary for dynamic, non-MUI-supported styles (and such cases should be documented).

## 6. TypeScript and TSX Conventions

*   **File Extensions**: Use `.tsx` for files containing React components and JSX, and `.ts` for utility files, hooks, or interfaces that don't contain JSX.
*   **Interfaces and Types**: Define TypeScript interfaces (`interface`) or types (`type`) for component props, state, and complex object structures to ensure type safety and provide clear documentation.
*   **Functional Components**: Define components as arrow functions or standard function declarations with types for props:
    ```typescript
    interface MyComponentProps {
      name: string;
      items: Item[];
    }

    const MyComponent: React.FC<MyComponentProps> = ({ name, items }) => {
      // ... logic ...
      return ( /* ... TSX ... */ );
    };
    ```
*   **JSX Syntax**: Use standard JSX syntax for rendering components and HTML elements.
    ```tsx
    <Box sx={{ /* ... */ }}>
      <h1>Hello, {name}</h1>
      <ul>
        {items?.map(item => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    </Box>
    ```
*   **Imports**: Use ES6 `import` statements.
*   **Exporting**: Use ES6 `export default` for the primary export (e.g., the main component) and named exports (`export const ...`) for other utilities or types.

## 7. Build System Considerations

*   Webpack or Vite configured with:
    *   A TypeScript loader (like `ts-loader` or `@babel/preset-typescript`) for `.ts` and `.tsx` files.
    *   A Babel loader with `@babel/preset-react` and `@babel/preset-env` if using Babel.
    *   MUI tree-shaking configuration.
    *   Source map generation for debugging.

## 8. Addressing Callback Issues

(This section remains conceptually the same, focusing on using React's paradigm for state and event handling. Refer to the original `coffee.md` for details.)

## 9. Directory Structure (Proposed)

```
quad-tap-typescript/
├── package.json
├── webpack.config.js (or vite.config.js)
├── tsconfig.json (TypeScript configuration)
├── .babelrc (if using Babel)
├── QUAD_TAP_TYPESCRIPT_SPEC.md
└── src/
    ├── QuadTap.tsx
    ├── components/
    │   ├── TapZoneLayerMUI.tsx
    │   ├── ControlStripMUI.tsx
    │   ├── LightboxMUI.tsx
    │   ├── ThrowdownMarkerMUI.tsx
    │   ├── HeatmapMUI.tsx
    │   └── common/ (e.g., shared MUI styled components or utility hooks)
    ├── hooks/ (custom React hooks)
    ├── theme/ (default MUI theme configuration)
    ├── types/ (TypeScript interfaces and types)
    └── utils/ (utility functions)
```

This specification outlines the approach for implementing QuadTap using React, TypeScript/TSX, and MUI with a strict no-custom-CSS rule. 