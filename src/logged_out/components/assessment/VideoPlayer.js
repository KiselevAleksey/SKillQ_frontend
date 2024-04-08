import React, { useRef, useEffect } from 'react';

const VideoPlayer = ({ src, onVideoEnd }) => {
  const videoRef = useRef(null); // Reference to the video element

  // Effect to handle video play and end events
  useEffect(() => {
    const videoElement = videoRef.current;

    // When the video has ended, execute the onVideoEnd callback
    const handleVideoEnd = () => {
      if (onVideoEnd) {
        onVideoEnd();
      }
    };

    // Event listener for when the video ends
    videoElement.addEventListener('ended', handleVideoEnd);

    // Cleanup the event listener when the component unmounts
    return () => {
      videoElement.removeEventListener('ended', handleVideoEnd);
    };
  }, [onVideoEnd]); // Only re-run if onVideoEnd changes

  return (
    <div>
      <video ref={videoRef} src={src} controls autoPlay />
    </div>
  );
};

export default VideoPlayer;
