import React, { useState } from 'react';

const VideoToGifPlayer = ({ videoSrc = 'result_voice.mp4', gifSrc = 'slow_gif.gif'}) => {
  const [videoEnded, setVideoEnded] = useState(false);

  const handleVideoEnd = () => {
    setVideoEnded(true);
  };

  return (
    <div>
      {!videoEnded ? (
        <video src={videoSrc} onEnded={handleVideoEnd} autoPlay>
          Your browser does not support the video tag.
        </video>
      ) : (
        <img src={gifSrc} alt="Animated content" />
      )}
    </div>
  );
};

export default VideoToGifPlayer;

