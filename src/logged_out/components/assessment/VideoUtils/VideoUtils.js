// VideoUtils/VideoUtils.js

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

export const stopVideo = (videoRef, setVideoStarted) => {
    console.log('Attempting to stop video');
    if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => {
            console.log(`Stopping ${track.kind} track`);
            track.stop();
        });

        videoRef.current.srcObject = null;
        setVideoStarted(false);
        console.log('Video stream and camera stopped');
    } else {
        console.log('No active video stream to stop');
    }
};

