import React, { useEffect, useRef, useState } from 'react';
import { Button, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { startVideo, stopVideo } from './VideoUtils/VideoUtils';
import { startRecording, stopRecording } from './VideoUtils/RecordingUtils';

const useStyles = makeStyles((theme) => ({
  videoContainer: {
    position: 'relative', // Needed to position the timer and button at the bottom
    width: '450px',
    height: '450px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  videoElement: {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'cover',
  },
  timerAndButton: {
    position: 'absolute', // This will place the timer and button at the bottom of the video container
    bottom: 0, // Align to the bottom
    width: '100%', // Match the width of the video container
    display: 'flex',
    justifyContent: 'space-between', // This will place the timer and button on opposite ends
    alignItems: 'center',
    padding: theme.spacing(1),
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background for better visibility
    color: 'white',
  },
}));

const UserVideoRecorder = ({ onRef, onNextQuestion }) => {
  const localVideoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [videoStarted, setVideoStarted] = useState(false);
  const [recording, setRecording] = useState(false);
  const [timer, setTimer] = useState(300); // Timer starts at 5 minutes (300 seconds)
  const classes = useStyles();

  const handleDataAvailable = (event) => {
    console.log('Data available from recording');
    if (event.data.size > 0) {
      downloadRecording(event.data);
    }
  };

  const downloadRecording = (blob) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'recorded_video.webm'; // Save as WebM but you could choose other formats
    a.click();
    window.URL.revokeObjectURL(url);
};

  useEffect(() => {
    // Start video and recording setup
    const startUp = async () => {
      console.log('Initializing video and recording setup');
      await startVideo(localVideoRef, setVideoStarted);
    
      const checkAndStartRecording = () => {
        console.log('Checking if stream is active for recording');
        if (localVideoRef.current && localVideoRef.current.srcObject && localVideoRef.current.srcObject.active) {
          console.log('Stream is active, starting recording');
          startRecording(localVideoRef, setRecording, mediaRecorderRef, handleDataAvailable);
        } else {
          console.log('Stream is not active, retrying in 1 second');
          setTimeout(checkAndStartRecording, 1000); // Retry after 1 second
        }
      };
    
      checkAndStartRecording();
    };    
    console.log('Video started, now checking stream status every 1 second to start recording if active');

    startUp();
  
    // Timer countdown
    const timerInterval = setInterval(() => {
      setTimer(prevTime => prevTime - 1);
    }, 1000);
  
    // Cleanup function to stop video and clear interval on component unmount
    return () => {
      clearInterval(timerInterval);
      console.log('Component unmounting, attempting to stop video');
      stopVideo(localVideoRef, setVideoStarted);
      if (mediaRecorderRef.current) {
          console.log('Clearing ondataavailable function from mediaRecorderRef');
          mediaRecorderRef.current.ondataavailable = null;
      }
    };
  }, []);

  // Function to handle "Next Question" button click
    const handleNextQuestion = () => {
        console.log('Next Question button clicked');
        if (recording) {
            console.log('Recording in progress, attempting to stop recording');
            stopRecording(mediaRecorderRef, setRecording, (completeBlob) => {
                downloadRecording(completeBlob);
                console.log('Recording stopped and downloaded, now stopping video');
                stopVideo(localVideoRef, setVideoStarted);
                onNextQuestion();
            });
        } else {
            console.log('Not recording, directly stopping video');
            stopVideo(localVideoRef, setVideoStarted);
            onNextQuestion();
        }
    };


  // Format the timer to display as mm:ss
  const formatTimer = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Check if timer has ended
  useEffect(() => {
    if (timer <= 0) {
      handleNextQuestion();
    }
  }, [timer]);

  return (
    <div className={classes.videoContainer}>
      <video ref={localVideoRef} autoPlay muted className={classes.videoElement} />
      <div className={classes.timerAndButton}>
        <Typography variant="body1">
          Please reply, next question in {formatTimer()}
        </Typography>
        <Button variant="contained" color="primary" onClick={handleNextQuestion} disabled={!videoStarted}>
          Next Question
        </Button>
      </div>
    </div>
  );
};

export default UserVideoRecorder;
