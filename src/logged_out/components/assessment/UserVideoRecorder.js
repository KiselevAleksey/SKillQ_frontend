import React, { useEffect, useRef, useState } from 'react';
import { startVideo, stopVideo } from './VideoUtils/VideoUtils';
import { startRecording, stopRecording } from './VideoUtils/RecordingUtils';

const UserVideoRecorder = ({ width, height, onRef }) => {
    const localVideoRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const [videoStarted, setVideoStarted] = useState(false);
    const [recording, setRecording] = useState(false);

    // Start video and recording as soon as the component mounts
    useEffect(() => {
        startVideo(localVideoRef, setVideoStarted);
        
        // Delay the start of the recording to ensure the video stream is ready
        const recordingDelay = setTimeout(() => {
            if (localVideoRef.current && localVideoRef.current.srcObject) {
                startRecording(localVideoRef, setRecording, mediaRecorderRef);
            }
        }, 1000); // Delay to ensure video stream is ready

        // Provide a method to stop video and recording from the parent component
        if (onRef) {
            onRef(() => {
                if (recording) {
                    stopRecording(mediaRecorderRef, setRecording);
                }
                stopVideo(localVideoRef, setVideoStarted);
            });
        }

        // Cleanup function to stop video and recording when component unmounts
        return () => {
            clearTimeout(recordingDelay);
            if (recording) {
                stopRecording(mediaRecorderRef, setRecording);
            }
            stopVideo(localVideoRef, setVideoStarted);
        };
    }, [onRef]);

    return (
        <div className="video-container">
            <video ref={localVideoRef} autoPlay muted style={{ width: `${width}px`, height: `${height}px` }} />
        </div>
    );
};

export default UserVideoRecorder;
