import React from 'react';

const VideoEndButton = ({ onReady }) => {
  return (
    <button type="button" onClick={onReady} aria-label="Start the assessment">
      Ready to start
    </button>
  );
};

export default VideoEndButton;
