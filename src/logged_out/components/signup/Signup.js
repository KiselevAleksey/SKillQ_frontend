import React from 'react';
import { useNavigate } from 'react-router-dom';
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
  },
}));

function Signup() {
  const classes = useStyles();
  let navigate = useNavigate();

  const navigateToSignupType = (type) => {
    navigate(`/${type}-signup`);
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
            onClick={() => navigateToSignupType('freelancer')}
          >
            Create Freelancer Profile
          </Button>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => navigateToSignupType('company')}
          >
            Find a Freelancer
          </Button>
        </div>
        <Link href="/login" variant="body2" className={classes.link}>
          Already have an account? Log in
        </Link>
      </Paper>
    </Container>
  );
}

export default Signup;
