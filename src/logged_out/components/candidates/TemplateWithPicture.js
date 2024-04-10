import React from 'react';
import { Typography, Button, Grid, Card, CardContent } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3), // Adjust the padding here for spacing from the screen border
    background: '#fff',
  },
  image: {
    width: '100%', // Adjust as needed
    height: 'auto', // Adjust as needed
    borderRadius: theme.shape.borderRadius,
  },
  textBlock: {
    marginBottom: theme.spacing(3),
  },
  card: {
    boxShadow: 'none',
    backgroundColor: 'transparent',
  },
  button: {
    marginTop: theme.spacing(2),
  },
  content: {
    padding: theme.spacing(3), // Adjust the padding here for spacing within the card
    maxWidth: '100%', // Ensure content does not exceed the width of its container
    overflow: 'hidden', // Prevent content from overflowing
  },
  heading: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(2),
    wordWrap: 'break-word', // Ensures text breaks to prevent overflow
  },
  responsiveText: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.875rem', // Smaller font size on small screens
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '1rem', // Larger font size on medium screens and up
    },
  },
}));

const TemplateWithPicture = () => {
  const classes = useStyles();

  return (
    <div> {/* Add padding around the entire section */}
      <Grid container spacing={4} className={classes.root}>
        <Grid item xs={12} md={6}>
        <img
            src={`${process.env.PUBLIC_URL}/images/logged_out/image_2.png`}
            alt="Your Alt Text"
            className={classes.image}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Card className={classes.card}>
            <CardContent className={classes.content}>
              <Typography variant="h4" className={`${classes.heading} ${classes.textBlock}`}>
                Unlock Potential with AI-Assisted Self-Assessment
              </Typography>
              <Typography className={classes.textBlock}>
                <b>Instant Self-Analysis</b>
                <br />
                Engage in a conversational AI-driven assessment that comprehensively evaluates your strengths and areas for growth.
              </Typography>
              <Typography className={classes.textBlock}>
                <b>Convenience at Your Fingertips</b>
                <br />
                Experience a seamless self-assessment via a 10-minute video call with our intelligent AI bot, anytime, anywhere.
              </Typography>
              <Link to="/assessment">
                <Button variant="contained" color="primary" className={classes.button}>
                Begin Your Assessment
                </Button>
            </Link>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default TemplateWithPicture;
