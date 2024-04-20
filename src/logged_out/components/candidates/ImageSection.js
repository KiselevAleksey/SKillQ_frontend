import React from 'react';
import { withStyles, useTheme } from '@mui/styles';
import { Card, Button, Typography, Container, useMediaQuery } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'; // Import the icon
import { Link } from 'react-router-dom';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(4),
  },
  header: {
    marginBottom: theme.spacing(2),
    textAlign: 'center',
  },
  card: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(3),
    textAlign: 'left',
    boxShadow: 'none',  // This removes any shadow.
    backgroundColor: 'transparent', // This ensures background is fully transparent.
    border: 'none'  // Ensures no border is visible.
  },
  button: {
    marginTop: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark,
    },
  },
  extraLargeButton: {
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
    [theme.breakpoints.up("xs")]: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    width: '100%',
    minWidth: 250,
    [theme.breakpoints.up("lg")]: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      width: 'auto', // or specific value like 300px
    },
  },
  imageWrapper: {
    margin: theme.spacing(2),
    backgroundColor: 'transparent', // Ensures no background color
  },
  image: {
    maxWidth: '100%',
    height: 'auto',
  },
  textContent: {
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(4),
  },
  headerText: {
    fontWeight: 'bold',
    paddingBottom: theme.spacing(4),
  },
  descriptionText: {
    marginTop: theme.spacing(4),
    fontSize: '1.1rem',
  },
});

function ImageSection({ classes }) {
  const theme = useTheme();
  const isWidthUpLg = useMediaQuery(theme.breakpoints.up('lg'));

  return (
    <Container maxWidth={isWidthUpLg ? "lg" : "sm"} className={classes.root}>
      <Typography variant={isWidthUpLg ? "h3" : "h4"} className={classes.header}>
        Introducing Our Assessment Engine
      </Typography>
      <Card className={classes.card}>
        <div className={classes.imageWrapper}>
          <img
            src={`${process.env.PUBLIC_URL}/images/logged_out/petals_photo_upd.webp`}
            alt="SkillQ Talent"
            className={classes.image}
          />
        </div>
        <div className={classes.textContent}>
        <Typography variant={isWidthUpLg ? "h5" : "h6"} gutterBottom fontWeight='bold'>
          Evaluate your skills in 15 minutes
        </Typography>
        <Typography variant="body1" gutterBottom className={classes.descriptionText}>
          SkillQ generates relevant questions, evaluates your answers in real time, and provides an unbiased assessment of your skill set.
        </Typography>
        <Typography variant="body1" gutterBottom className={classes.descriptionText}>
          Use this data as you see fit - track your continuous improvement or showcase your verified abilities to recruiters.
        </Typography>
          <Button
            variant="contained"
            color="secondary"
            className={classes.extraLargeButton}
            component={Link}
            to="/assessment"
            startIcon={<ArrowForwardIcon />}
          >
            Start Assessment
          </Button>
        </div>
      </Card>
    </Container>
  );
}

export default withStyles(styles)(ImageSection);
