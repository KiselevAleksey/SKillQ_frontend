// VideoUtils/VideoUtils.js

// VideoUtils.js
export const startVideo = (videoRef, setVideoStarted, onStreamReady) => {
  console.log('Starting video');
  setVideoStarted(true);
  navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
          if (videoRef.current) {
              videoRef.current.srcObject = stream;
              videoRef.current.muted = true;
              if (onStreamReady) onStreamReady(); // Call the callback when stream is ready
          }
      })
      .catch(e => {
          console.error('Error setting up video:', e);
          if (onStreamReady) onStreamReady(); // Consider calling onStreamReady even on failure
      });
};


// VideoUtils.js
// VideoUtils.js
export const stopVideo = (videoRef, setVideoStarted) => {
  console.log('Stopping video');
  if (videoRef.current && videoRef.current.srcObject) {
      // Get all tracks from the video stream and stop each one
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());

      // Clear the srcObject of the video element
      videoRef.current.srcObject = null;

      setVideoStarted(false);
  }
  console.log('Video is stopped');
};
