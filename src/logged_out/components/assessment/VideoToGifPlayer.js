import React, { useState } from 'react';

const VideoToGifPlayer = ({ videoSrc, gifSrc = 'slow_gif.gif', onVideoEnd }) => {
  const [videoEnded, setVideoEnded] = useState(false);

  const handleVideoEnd = () => {
    setVideoEnded(true);
    onVideoEnd();  // Notify the parent component that the video has ended
  };

  return (
    <div>
      {!videoEnded ? (
        <video
          src={videoSrc}
          onEnded={handleVideoEnd}
          autoPlay
          style={{ width: '450px', height: '450px' }} // Set the size of the video element
        >
          Your browser does not support the video tag.
        </video>
      ) : (
        <img
          src={gifSrc}
          alt="Animated content"
          style={{ width: '450px', height: '450px' }} // Set the size of the image element
        />
      )}
    </div>
  );
};

export default VideoToGifPlayer;
