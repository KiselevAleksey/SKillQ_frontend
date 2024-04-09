import React, { useState } from 'react';
import VideoToGifPlayer from './VideoToGifPlayer';
import UserVideoRecorder from './UserVideoRecorder';
import { Typography } from '@mui/material';

const SplitContainer = ({ videoSrc, onRef, setVideoStarted, setRecording,
                            setShowRegistrationModal, autoStart, questionText }) => {
  console.log('Rendering SplitContainer');

  const [showGif, setShowGif] = useState(false);

  // Callback when the video ends to show the GIF
  const handleVideoEnd = () => {
    console.log('Video in SplitContainer ended');
    setShowGif(true);
  };

  return (
    <div className="split-container" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ display: 'flex', flexGrow: 1 }}>
        <div style={{ width: '50%', height: '100%' }}>
          <VideoToGifPlayer src={videoSrc} onVideoEnd={handleVideoEnd} />
        </div>
        <div style={{ width: '50%', height: '100%' }}>
          <UserVideoRecorder 
            onRef={onRef} 
            setVideoStarted={setVideoStarted}
            setRecording={setRecording}
            setShowRegistrationModal={setShowRegistrationModal}
          />
        </div>
      </div>
      <div style={{ padding: '16px' }}> {/* Add padding for the question */}
        <Typography variant="h6">{questionText}</Typography>
      </div>
    </div>
  );
};

export default SplitContainer;
