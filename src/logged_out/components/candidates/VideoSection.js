
import React, { useState, useEffect } from 'react';
import { withStyles, useTheme } from '@mui/styles';
import { Grid, Typography, Card, useMediaQuery } from '@mui/material';
import ReactPlayer from 'react-player';
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const styles = (theme) => ({
  card: {
    boxShadow: theme.shadows[4],
    padding: theme.spacing(3),
    textAlign: 'center',
    backgroundColor: theme.palette.background.paper,
    margin: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(4),
    fontSize: theme.typography.body1.fontSize,
  },
  buttonCenter: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: theme.spacing(4),
  },
  extraLargeButton: {
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
    width: '100%',
    minWidth: 250,
    [theme.breakpoints.up("lg")]: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      width: 'auto',
    },
  },
  playerWrapper: {
    position: 'relative',
    paddingTop: '56.25%', // Aspect ratio for 16:9
    overflow: 'hidden', // Prevents controls from overflowing
  },
  reactPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  overlayText: {
    position: 'absolute',
    top: '10%',
    left: '50%',
    transform: 'translateX(-50%)',
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 3,
    width: '90%', // Ensures text does not overflow video area
  },
});


function VideoSection({ classes }) {
  const [videoUrl, setVideoUrl] = useState('');
  const [playVideo, setPlayVideo] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchVideo = async () => {
      const storage = getStorage();
      const videoRef = ref(storage, '/public/Welcome to the Team.mp4'); // Update path as needed

      try {
        const url = await getDownloadURL(videoRef);
        setVideoUrl(url);
      } catch (error) {
        console.error('Failed to load video', error);
      }
    };

    fetchVideo();
  }, []);

  const togglePlayVideo = () => {
    setPlayVideo(!playVideo);
  };

  return (
    <Grid container alignItems="center" justifyContent="center">
      <Grid item xs={12} md={8}>
        <Card className={classes.card}>
          <div className={classes.playerWrapper}>
            <ReactPlayer
              url={videoUrl}
              playing={playVideo}
              controls={true}
              className={classes.reactPlayer}
              width="100%"
              height="100%"
              onPlay={togglePlayVideo}
              onPause={togglePlayVideo}
            />
            {!playVideo && (
              <Typography variant={isMobile ? "h6" : "h4"} className={classes.overlayText}>
                What is SkillQ for talent?
              </Typography>
            )}
          </div>
        </Card>
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(VideoSection);
