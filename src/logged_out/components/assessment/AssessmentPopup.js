import React, { useState, useRef, useCallback, useEffect } from 'react';
import VideoPlayer from './VideoPlayer';
import SplitContainer from './SplitContainer';
import VideoEndButton from './VideoEndButton';
import CategorySelector from './CategorySelector/CategorySelectorNew'; //CategorySelector

import { makeStyles } from '@mui/styles';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { stopVideo } from './VideoUtils/VideoUtils'; // Make sure to import the stopVideo function


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
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isVideoEnded, setIsVideoEnded] = useState(false);
  const [userIsReady, setUserIsReady] = useState(false);
  const stopVideoStreamRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isCategorySelected, setIsCategorySelected] = useState(false);
  const [questions, setQuestions] = useState([]);
  const localVideoRef = useRef(null); // Define localVideoRef
  const [videoStarted, setVideoStarted] = useState(false);

  // Cleanup the video stream when the component unmounts
  useEffect(() => {
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
    // Force stop the video stream
    if (localVideoRef.current && localVideoRef.current.srcObject) {
        console.log('handleClose stopping:', localVideoRef.current?.srcObject);
        stopVideo(localVideoRef, setVideoStarted);
    }

    if (onClose) onClose(); // Updated this line
  };

  const setStopVideoStream = useCallback((stopFunction) => {
    stopVideoStreamRef.current = stopFunction;
  }, []);

  const handleNextQuestion = () => {
    if (stopVideoStreamRef.current) {
      stopVideoStreamRef.current();
    }
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setUserIsReady(false); // Reset ready state for the next question
    } else {
      console.log('Assessment completed');
      if (onClose) onClose(); // Updated this line
    }
  };

  const handleCategorySubmit = (questionData) => {
    setIsCategorySelected(true);
    setQuestions([
      { questionText: questionData.firstQuestion.questionText, videoSrc: questionData.firstQuestion.videoURL },
      { questionText: questionData.secondQuestion.questionText, videoSrc: questionData.secondQuestion.videoURL }
    ]);
  };
  
  return (
    <div className={classes.popup}>
    <IconButton className={classes.closeButton} onClick={handleClose}>
      <CloseIcon />
    </IconButton>
      {!isCategorySelected ? (
        <CategorySelector
          categories={['Marketing', 'Strategy', 'Management']}
          onSubmit={handleCategorySubmit}
        />
      ) : (
        <>
          {!isVideoEnded && (
            <VideoPlayer onVideoEnd={handleVideoEnd} src={`${process.env.PUBLIC_URL}/intro_video.mp4`} />
          )}
          {isVideoEnded && !userIsReady && (
            <VideoEndButton 
            onReady={handleUserReady}
            currentQuestionIndex={currentQuestionIndex}  />
          )}
          {userIsReady && (
            <SplitContainer
              key={currentQuestionIndex} 
              videoSrc={questions[currentQuestionIndex]?.videoSrc}
              onRef={setStopVideoStream}
              autoStart={true}
              questionText={questions[currentQuestionIndex]?.questionText}
              onNextQuestion={handleNextQuestion}
            />
          )}
        </>
      )}
    </div>
  );  
};

export default AssessmentPopup;