import React, { useRef, useEffect, useState } from 'react';
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const VideoPlayer = ({ videoPath, onVideoEnd }) => {
  const videoRef = useRef(null);
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    // Fetch the video URL from Firebase Storage
    const fetchVideo = async () => {
      const storage = getStorage();
      const videoRef = ref(storage, videoPath); // Use videoPath to refer to your video in storage

      try {
        const url = await getDownloadURL(videoRef);
        setVideoUrl(url);
      } catch (error) {
        console.error('Failed to load video', error);
      }
    };

    fetchVideo();
  }, [videoPath]);

  useEffect(() => {
    const videoElement = videoRef.current;

    // When the video has ended, execute the onVideoEnd callback
    const handleVideoEnd = () => {
      if (onVideoEnd) {
        onVideoEnd();
      }
    };

    // Event listener for when the video ends
    videoElement.addEventListener('ended', handleVideoEnd);

    // Cleanup the event listener when the component unmounts
    return () => {
      videoElement.removeEventListener('ended', handleVideoEnd);
    };
  }, [onVideoEnd]);

  return (
    <div>
      <video ref={videoRef} src={videoUrl} controls autoPlay />
    </div>
  );
};

export default VideoPlayer;
