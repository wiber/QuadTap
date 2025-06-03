import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, createTheme, CssBaseline, Box, Typography, Paper, Switch, FormControlLabel } from '@mui/material';

import QuadTap from './QuadTap.tsx'; // Explicitly import the .tsx React component

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

const App: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoElement, setVideoElement] = useState<HTMLVideoElement | null>(null);
  const [log, setLog] = useState<string[]>([]); 
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      setVideoElement(videoRef.current);
    }
  }, []);

  const handleQuadTapEvent = (eventName: string, data?: any) => {
    const logMessage = `QuadTap Event: ${eventName} ${data ? JSON.stringify(data) : ''}`;
    console.log(logMessage);
    setLog(prevLog => [logMessage, ...prevLog.slice(0, 19)]); // Keep last 20 logs
  };

  const quadTapConfig = {
    debug: true,
    videoControls: {
        pauseOnLightboxOnly: true,
    },
    timeouts: {
        longPress: 700, 
        primed: 3000, 
        throwdownPlaced: 7000 
    },
    colors: {
        lightbox: {
            overlay: 'rgba(10, 10, 30, 0.8)',
            background: '#2c3e50' 
        }
    },
    lightboxContent: ({ closeLightbox, throwdownPosition }: any) => (
        <Box sx={{ padding: 2, color: 'white' }}>
            <Typography variant="h5">Custom Lightbox</Typography>
            <Typography>Opened from throwdown at: {JSON.stringify(throwdownPosition)}</Typography>
            <button onClick={closeLightbox} style={{ marginTop: '10px' }}>Close MUI Lightbox</button>
        </Box>
    ),
    // Example zones (optional)
    zones: [
        { x: 0, y: 0, width: 50, height: 50, action: 'Top-Left Zone Action' },
        { x: 50, y: 0, width: 50, height: 50, action: 'Top-Right Zone Action' },
    ],
  };

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <CssBaseline />
      <Paper elevation={3} sx={{ padding: 3, margin: 2 }}>
        <Typography variant="h4" gutterBottom>
          QuadTap MUI Debug Page
        </Typography>
        <FormControlLabel 
            control={<Switch checked={isDarkTheme} onChange={() => setIsDarkTheme(!isDarkTheme)} />} 
            label="Toggle Dark Mode"
        />

        <Box className="video-wrapper" sx={{ my: 2, border: '1px solid grey', height: 'auto' }}>
          {/* The video element QuadTap will attach to */}
          <video 
            ref={videoRef} 
            controls 
            width="640" 
            height="360" 
            style={{maxWidth: '100%', display: 'block'}}
            // crossOrigin="anonymous" // Important for some video sources if drawing to canvas
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            // src="https://www.w3schools.com/html/mov_bbb.mp4" // Alternative test video
          >
            Your browser does not support the video tag.
          </video>
          {/* QuadTap Component */}
          {videoElement && (
            <QuadTap 
              videoDomElement={videoElement} 
              config={quadTapConfig}
              onEvent={handleQuadTapEvent}
            />
          )}
        </Box>

        <Box sx={{ mt: 2 }}>
            <Typography variant="h6">Event Log:</Typography>
            <Box component="pre" sx={{ maxHeight: '200px', overflowY: 'auto', backgroundColor: 'action.hover', padding: 1, borderRadius: 1}}>
                {log.length > 0 ? log.join('\n') : 'No events yet...'}
            </Box>
        </Box>
      </Paper>
    </ThemeProvider>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error('Failed to find the root element. The MUI debug app will not run.');
} 