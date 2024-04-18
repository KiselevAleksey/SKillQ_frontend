import React, { useState, useEffect } from 'react';
import VideoToGifPlayer from './VideoToGifPlayer';
import UserVideoRecorder from './UserVideoRecorder';
import { Typography, Button } from '@mui/material';

const SplitContainer = ({ videoSrc, onRef, setVideoStarted, setRecording,
                          setShowRegistrationModal, autoStart, questionText, onNextQuestion, currentQuestionIndex }) => {
  console.log('Rendering SplitContainer');

  const [videoHasEnded, setVideoHasEnded] = useState(false);
  const [readyToRecord, setReadyToRecord] = useState(false);
  const [countdown, setCountdown] = useState(0); // Initialize countdown

  // Different delays for question 1 and question 2
  const delayTime = currentQuestionIndex === 0 ? 30 : 180;

  const handleVideoEnd = () => {
    console.log('Video in SplitContainer ended');
    setVideoHasEnded(true);
    setCountdown(delayTime); // Set the countdown
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setReadyToRecord(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Allow the user to manually mark themselves as ready before the timer expires
  const handleReadyClick = () => {
    setCountdown(0); // Clear the countdown
    setReadyToRecord(true);
  };

  // Function to format countdown time
  const formatCountdown = () => {
    const minutes = Math.floor(countdown / 60);
    const seconds = countdown % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Common style for video container elements
  const videoContainerStyle = {
    position: 'relative',
    width: '450px',
    height: '450px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    color: 'black'  // Text color set to black
  };

  return (
    <div className="split-container" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ display: 'flex', flexGrow: 1 }}>
        <div style={{ width: '50%', height: '100%' }}>
          <VideoToGifPlayer 
            videoSrc={videoSrc} 
            onVideoEnd={handleVideoEnd} 
            autoStart={autoStart} 
          />
        </div>
        <div style={{ width: '50%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {videoHasEnded && readyToRecord ? (
            <UserVideoRecorder 
              onRef={onRef} 
              setVideoStarted={setVideoStarted}
              setRecording={setRecording}
              setShowRegistrationModal={setShowRegistrationModal}
              onNextQuestion={onNextQuestion}
              currentQuestionIndex={currentQuestionIndex}
            />
          ) : (
            <div style={videoContainerStyle}>
              {videoHasEnded && !readyToRecord && (
                <>
                  <Typography variant="h6" style={{ textAlign: 'center' }}>
                    Please, prepare to answer: {formatCountdown()}
                  </Typography>
                  <Button variant="contained" color="primary" onClick={handleReadyClick} style={{ marginTop: 20 }}>
                    I'm Ready
                  </Button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
      <div style={{ padding: '16px' }}>
        <Typography variant="h6">{questionText}</Typography>
      </div>
    </div>
  );
};

export default SplitContainer;
