// VideoUtils/RecordingUtils.js
let recordedChunks = [];

export const startRecording = (videoRef, setRecording, mediaRecorderRef) => {
    recordedChunks = []; // Reset the recorded chunks array
    const stream = videoRef.current.srcObject;
    if (stream && stream.active) {
        console.log('Starting recording with an active stream');
        setRecording(true);
        mediaRecorderRef.current = new MediaRecorder(stream);

        mediaRecorderRef.current.ondataavailable = event => {
            if (event.data.size > 0) {
                recordedChunks.push(event.data);
            }
        };
        mediaRecorderRef.current.start();
    } else {
        console.error('Stream is inactive or missing');
    }
};

export const stopRecording = (mediaRecorderRef, setRecording, onComplete) => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
        setRecording(false);
        mediaRecorderRef.current.onstop = () => {
            const completeBlob = new Blob(recordedChunks, { type: "video/webm" });
            onComplete(completeBlob); // Pass the complete blob to the callback
        };
    } else {
        console.log('No active recording to stop');
    }
};
