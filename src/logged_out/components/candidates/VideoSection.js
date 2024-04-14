import React, { useState } from 'react';
import { withStyles } from '@mui/styles';
import { Grid, Box, Button, Typography, Card } from '@mui/material';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';

const styles = (theme) => ({
  card: {
    // boxShadow: theme.shadows[4],
    padding: theme.spacing(3),
    textAlign: 'center',
    // backgroundColor: theme.palette.background.paper,
    margin: theme.spacing(8),
  },
  button: {
    marginTop: theme.spacing(4),
    fontSize: theme.typography.body1.fontSize,
  },
  buttonCenter: {
    display: 'flex',
    flexDirection: 'column',
    // alignItems: 'center',
    justifyContent: 'center', // Center vertically
    width: '60%', // Full width
    marginTop: theme.spacing(4),
  },

  extraLargeButton: {
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
    [theme.breakpoints.up("xs")]: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    width: '100%', // for full width
    minWidth: 250,

    [theme.breakpoints.up("lg")]: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      width: 'auto', // or you can use a specific value like 300px

    },

  },

  playerWrapper: {
    position: 'relative',
    paddingTop: '56.25%', // Aspect ratio for 16:9
    padding: theme.spacing(2), // Added padding inside the container
  },
  reactPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: 'auto', // Centers the video in the padding
  },
  overlayText: {
    position: 'absolute',
    top: '5%', // Moved text to the top of the video
    left: '50%',
    transform: 'translateX(-50%)',
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 3, // Ensure the text is above the player controls
  },
});

function VideoSection({ classes }) {
  const [playVideo, setPlayVideo] = useState(false);

  const togglePlayVideo = () => {
    setPlayVideo(!playVideo);
  };

  return (
    <Grid container alignItems="center" justifyContent="space-around" spacing={3}>
      <Grid item xs={12} md={8}>
        <Card className={classes.card}>
          <div className={classes.playerWrapper}>
          <ReactPlayer
            url={`${process.env.PUBLIC_URL}/Welcome to the Team.mp4`}
            playing={playVideo}
            controls={true}
            className={classes.reactPlayer}
            width="100%"
            height="100%"
            onPlay={togglePlayVideo}
            onPause={togglePlayVideo}
          />
            {!playVideo && (
              <Typography variant="h4" className={classes.overlayText}>
                What is SkillQ for talent?
              </Typography>
            )}
          </div>
        </Card>
        </Grid>
      <Grid item xs={12} md={3}>
        <Typography variant="h4">
          Ready to try?
        </Typography>
        <div className={classes.buttonCenter}>
          <Button
            variant="contained"
            color="primary"
            className={(classes.button, classes.extraLargeButton)}
            fullWidth
            component={Link}
            to="/assessment"
            >
            Start Assessment
          </Button>
          </div>
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(VideoSection);

