let recordedChunks = [];
let animationFrameId; // To keep track of the animation frame

export const startRecording = (videoRef, setRecording, mediaRecorderRef) => {
    recordedChunks = []; // Reset the recorded chunks array

    // Setup canvas for low-resolution recording
    const canvas = document.createElement('canvas');
    canvas.width = 320;  // Lower width for recording
    canvas.height = 240; // Lower height for recording
    const ctx = canvas.getContext('2d');

    // Draw the video onto the canvas at a lower resolution
    const drawVideoToCanvas = () => {
        if (videoRef.current && !videoRef.current.paused && !videoRef.current.ended) {
            ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
            animationFrameId = requestAnimationFrame(drawVideoToCanvas);
        }
    };
    drawVideoToCanvas();

    const outputStream = canvas.captureStream(15); // Capture the canvas as a stream at 15fps

    if (outputStream && outputStream.active) {
        console.log('Starting recording with an active stream');
        setRecording(true);
        mediaRecorderRef.current = new MediaRecorder(outputStream);

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
            cancelAnimationFrame(animationFrameId); // Stop the animation frame when recording stops
            const completeBlob = new Blob(recordedChunks, { type: "video/webm" });
            onComplete(completeBlob); // Pass the complete blob to the callback
        };
    } else {
        console.log('No active recording to stop');
    }
};
