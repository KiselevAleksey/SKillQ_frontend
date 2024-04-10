import React, { useState } from 'react';
import VideoToGifPlayer from './VideoToGifPlayer';
import UserVideoRecorder from './UserVideoRecorder';
import { Typography } from '@mui/material';

const SplitContainer = ({ videoSrc, onRef, setVideoStarted, setRecording,
                          setShowRegistrationModal, autoStart, questionText, onNextQuestion }) => {
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
          {!showGif ? (
            <VideoToGifPlayer videoSrc={videoSrc} onVideoEnd={handleVideoEnd} autoStart={autoStart} />
          ) : (
            <div style={{ width: '450px', height: '450px' }}> {/* Adjust the style as needed */}
              {/* You can place your GIF or any other content here */}
            </div>
          )}
        </div>
        <div style={{ width: '50%', height: '100%' }}>
          <UserVideoRecorder 
            onRef={onRef} 
            setVideoStarted={setVideoStarted}
            setRecording={setRecording}
            setShowRegistrationModal={setShowRegistrationModal}
            onNextQuestion={onNextQuestion} // Pass the onNextQuestion handler
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
