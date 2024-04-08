import React, { useState, useRef, useCallback, useEffect } from 'react';
import VideoPlayer from './VideoPlayer';
import SplitContainer from './SplitContainer';
import VideoEndButton from './VideoEndButton';

const AssessmentPopup = ({ onClose }) => {
  console.log('Rendering AssessmentPopup');
  
  const [isVideoEnded, setIsVideoEnded] = useState(false);
  const [userIsReady, setUserIsReady] = useState(false);
  const stopVideoStreamRef = useRef(null);
  const [videoStarted, setVideoStarted] = useState(false);
  const [recording, setRecording] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);

  useEffect(() => {
    if (stopVideoStreamRef.current) {
      stopVideoStreamRef.current();
    }
  }, []);

  // Function to handle the video ending
  const handleVideoEnd = () => {
    console.log('Video ended');
    setIsVideoEnded(true);
  };

  // Function to handle user readiness
  const handleUserReady = () => {
    console.log('User is ready');
    setUserIsReady(true);
  };

  // Function to handle closing the assessment popup
    const handleClose = () => {
        console.log('Closing assessment popup');

        // Call the stop function stored in the ref
        if (stopVideoStreamRef.current) {
            stopVideoStreamRef.current();
        }

        if (typeof onClose === 'function') {
            onClose();
        }
    };

  // Function to pass to child components to allow them to set the stopVideoStreamRef
  const setStopVideoStream = useCallback((stopFunction) => {
    stopVideoStreamRef.current = stopFunction;
  }, []);

  return (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={handleClose}>×</button>
        {!isVideoEnded && (
          <VideoPlayer onVideoEnd={handleVideoEnd} src="intro_video.mp4" /> //"intro_video"
        )}
        {isVideoEnded && !userIsReady && (
          <VideoEndButton onReady={handleUserReady} />
        )}
        {userIsReady && (
                    <SplitContainer
                        videoSrc="result_voice.mp4"
                        gifSrc="slow_gif.gif"
                        onRef={setStopVideoStream}
                        autoStart={true} // Start video and recording automatically
                    />
                )}
      </div>
    </div>
  );
};

export default AssessmentPopup;
