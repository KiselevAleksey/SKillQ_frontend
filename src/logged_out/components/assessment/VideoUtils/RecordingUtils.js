// VideoUtils/RecordingUtils.js

// RecordingUtils.js
export const startRecording = (videoRef, setRecording, mediaRecorderRef) => {
    const stream = videoRef.current.srcObject;
    if (stream && stream.active && stream.getVideoTracks().length && stream.getAudioTracks().length) {
        console.log('Starting recording with an active stream');
        setRecording(true);
        mediaRecorderRef.current = new MediaRecorder(stream);

        mediaRecorderRef.current.ondataavailable = event => {
            if (event.data.size > 0) {
                const blob = new Blob([event.data], { type: 'video/webm' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'recorded_video.webm';
                a.click();
                window.URL.revokeObjectURL(url);
                console.log('Recording finished and video downloaded');
            }
        };
        mediaRecorderRef.current.start();
    } else {
        console.error('Stream is inactive or missing tracks');
    }
};

export const stopRecording = (mediaRecorderRef, setRecording) => {
    console.log('Stopping recording');
    if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
        setRecording(false);
    }
};
