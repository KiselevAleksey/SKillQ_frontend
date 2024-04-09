import React, { useState } from 'react';

const VideoToGifPlayer = ({ videoSrc = 'result_voice.mp4', gifSrc = 'slow_gif.gif' }) => {
  const [videoEnded, setVideoEnded] = useState(false);

  const handleVideoEnd = () => {
    setVideoEnded(true);
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
