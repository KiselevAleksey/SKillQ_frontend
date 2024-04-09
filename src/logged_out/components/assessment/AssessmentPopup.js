import React, { useState, useRef, useCallback, useEffect } from 'react';
import VideoPlayer from './VideoPlayer';
import SplitContainer from './SplitContainer';
import VideoEndButton from './VideoEndButton';
import { makeStyles } from '@mui/styles';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

// Define styles for the AssessmentPopup
const useStyles = makeStyles((theme) => ({
  popup: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: theme.zIndex.modal + 1, // This ensures the popup is above the Backdrop
    backgroundColor: theme.palette.background.paper, // Use the theme's background color for the paper
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    zIndex: theme.zIndex.modal + 2,
  },
}));


const AssessmentPopup = ({ onClose }) => {
  const classes = useStyles();
  const [isVideoEnded, setIsVideoEnded] = useState(false);
  const [userIsReady, setUserIsReady] = useState(false);
  const stopVideoStreamRef = useRef(null);

  useEffect(() => {
    // Cleanup the video stream when the component unmounts
    return () => {
      if (stopVideoStreamRef.current) {
        stopVideoStreamRef.current();
      }
    };
  }, []);

  const handleVideoEnd = () => {
    setIsVideoEnded(true);
  };

  const handleUserReady = () => {
    setUserIsReady(true);
  };

  const handleClose = () => {
    if (stopVideoStreamRef.current) {
      stopVideoStreamRef.current();
    }
    onClose?.();
  };

  const setStopVideoStream = useCallback((stopFunction) => {
    stopVideoStreamRef.current = stopFunction;
  }, []);

  return (
    <div className={classes.popup}>
      <IconButton className={classes.closeButton} onClick={handleClose}>
        <CloseIcon />
      </IconButton>
      {!isVideoEnded && (
        <VideoPlayer onVideoEnd={handleVideoEnd} src="intro_video.mp4" />
      )}
      {isVideoEnded && !userIsReady && (
        <VideoEndButton onReady={handleUserReady} />
      )}
      {userIsReady && (
        <SplitContainer
          videoSrc="result_voice.mp4"
          gifSrc="slow_gif.gif"
          onRef={setStopVideoStream}
          autoStart={true}
          questionText="What is the capital of France?"
        />
      )}
    </div>
  );
};

export default AssessmentPopup;