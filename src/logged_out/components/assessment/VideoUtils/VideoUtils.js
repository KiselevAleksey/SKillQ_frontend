// VideoUtils/VideoUtils.js

export const startVideo = (videoRef, setVideoStarted, onStreamReady) => {
    console.log('Starting video');
    setVideoStarted(true);
    const displayConstraints = {
        video: {
            width: { ideal: 1280 },  // Higher display resolution width
            height: { ideal: 720 },  // Higher display resolution height
            frameRate: { ideal: 30 } // Higher frame rate for smoother display
        },
        audio: true
    };

    navigator.mediaDevices.getUserMedia(displayConstraints)
        .then(stream => {
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.muted = true;
                if (onStreamReady) onStreamReady(); // Call the callback when the stream is ready
            }
        })
        .catch(e => {
            console.error('Error setting up video:', e);
            if (onStreamReady) onStreamReady(); // Consider calling onStreamReady even on failure
        });
};


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