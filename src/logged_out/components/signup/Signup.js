import React from 'react';
import { useHistory } from 'react-router-dom'; // Import useHistory instead of useNavigate
import { Container, Paper, Typography, Button, Link } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    marginTop: theme.spacing(1),
    color: 'black'
  },
}));

function Signup() {
  const classes = useStyles();
  let history = useHistory(); // Use useHistory instead of useNavigate

  const navigateToSignupType = (type) => {
    history.push(`/${type}-signup`); // Use push method to navigate
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.root}>
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h5">Sign Up</Typography>
        <div className={classes.form}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => history.push(`/Register`)}
          >
            Create a Talant Profile
          </Button>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            onClick={() => history.push(`/Register`)}
          >
            Find a Talant
          </Button>
        </div>
      <a href="/login" className="forgot-password-link" style={{ textAlign: 'center', color: 'black'}}>Already have an account? Log in</a>
      </Paper>
    </Container>
  );
}

export default Signup;
