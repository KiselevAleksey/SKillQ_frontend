import React, { useState } from 'react';
import VideoToGifPlayer from './VideoToGifPlayer';
import UserVideoRecorder from './UserVideoRecorder';

const SplitContainer = ({ videoSrc, onRef, setVideoStarted, setRecording,
                            setShowRegistrationModal, autoStart }) => {
  console.log('Rendering SplitContainer');

  const [showGif, setShowGif] = useState(false);

  // Callback when the video ends to show the GIF
  const handleVideoEnd = () => {
    console.log('Video in SplitContainer ended');
    setShowGif(true);
  };

  return (
    <div className="split-container" style={{ display: 'flex', width: '100%' }}>
      <div style={{ width: '50%' }}>
        <VideoToGifPlayer src={videoSrc} onVideoEnd={handleVideoEnd} />
      </div>
      <div style={{ width: '50%' }}>
        <UserVideoRecorder 
          onRef={onRef} 
          setVideoStarted={setVideoStarted}
          setRecording={setRecording}
          setShowRegistrationModal={setShowRegistrationModal}        />
      </div>
    </div>
  );
};

export default SplitContainer;
