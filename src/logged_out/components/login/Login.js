import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './Login.css';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../../shared/firebase/firebase';
import { actionTypes } from '../../../reducer';
import { useStateValue } from '../../../StateProvider';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { Container, Paper, Grid, TextField, Button, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { sendPasswordResetEmail } from 'firebase/auth';
import InfoIcon from '@mui/icons-material/Info'; 

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
  errorText: {
    color: theme.palette.error.main,
  },
}));

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const stateValue = useStateValue();
  console.log(stateValue);
  const [{ user, personalInfo }, dispatch] = useStateValue();
  const classes = useStyles();
  const [cancel, setCancel] = useState(false);



  const sendGAEvent = (action, category, label) => {
    if (window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
      });
    }
  };

  useEffect(() => {
    // Check if the user is already authenticated and email is verified
    if (user && user.emailVerified) {
      const storedAccountType = localStorage.getItem('accountType');
      navigateBasedOnAccountType(storedAccountType || 'default');
    }
    return () => {
      setCancel(true);
    };
  }, [user]);

  const handleRegisterRedirect = () => {
    history.push('/register'); // Redirect to the registration page
  };

  const navigateBasedOnAccountType = (accountType) => {
    console.log("Account type received:", accountType); // Debug log
  
    if (cancel) return;
  
    accountType = accountType.trim().toLowerCase(); // Trim and convert to lower case
  
    if (accountType === 'freelancer') {
      history.push('/c/user-profile'); // Navigate to user profile for freelancers
    } else if (accountType === 'company') {
      history.push('/companydashboard'); // Navigate to company dashboard
    } else {
      console.error('Invalid account type:', accountType); // More informative error
      setError('The user is not registered');
      history.push('/register'); // Redirect to the registration page
    }
  }; 


  const signInWithEmail = async (e) => {
    e.preventDefault();
    sendGAEvent('Sign-in Attempt', 'Authentication', 'Attempted to sign in with email');
    if (cancel) return;
  
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (cancel) return;
  
      // Check if the email is verified
      if (!userCredential.user.emailVerified) {
        setError("Please confirm your email address.");
        return;
      }
  
      const db = getFirestore();
      const userDocRef = doc(db, "users", userCredential.user.uid);
      const userDocSnap = await getDoc(userDocRef);
  
      if (userDocSnap.exists() && userCredential.user.emailVerified) {
        const accountType = userDocSnap.data().accountType;
        const personalInfo = userDocSnap.data().personalInfo;
        dispatchUserDetails(userCredential.user, accountType, personalInfo);
        navigateBasedOnAccountType(accountType);
      } else {
        if (!cancel) setError('No user data found');
      }
    } catch (error) {
      if (!cancel) setError(error.message);
    }
  };
  

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      if (cancel) return;

      const db = getFirestore();
      const userDocRef = doc(db, "users", result.user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const accountType = userDocSnap.data().accountType;
        dispatchUserDetails(result.user, accountType);
        navigateBasedOnAccountType(accountType);
      } else {
        if (!cancel) setError('Account not found. Please sign up.');
      }
    } catch (error) {
      if (!cancel) setError(error.message);
    }
  };

  const dispatchUserDetails = (user, accountType) => {
    if (!cancel) {
      dispatch({
        type: actionTypes.SET_USER,
        user: user,
        accountType: accountType,
        personalInfo: personalInfo
      });
      localStorage.setItem('accountType', accountType);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    sendGAEvent('Password Reset Request', 'Authentication', 'User requested password reset');
    if (cancel) return;
    if (!email) {
      setError("Please enter your email address.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      if (!cancel) {
        setError("Password reset instructions have been sent to your email.");
      }
    } catch (error) {
      if (!cancel) {
        setError("Error resetting password: " + error.message);
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.root}>
      <Paper className={classes.paper}>
      <Grid container direction="column" alignItems="center" justify="center" style={{ minHeight: '60vh' }}>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<InfoIcon />}
          onClick={handleRegisterRedirect}
          style={{ marginBottom: 20 }}
        >
          Don't have an account? Register
        </Button>
        <Typography component="h1" variant="h5">Login</Typography>
        <form className={classes.form} onSubmit={signInWithEmail} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Login with Email
          </Button>
  
          {/* Google login button */}
          <Button
            fullWidth
            variant="contained"
            style={{ backgroundColor: '#fff', color: '#4285F4' }}
            className={classes.submit}
            onClick={signInWithGoogle}
            startIcon={
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google"
                style={{ width: '20px' }}
              /> // Google Logo
            }
          >
            Login with Google
          </Button>
  
          {error && <Typography className={classes.errorText}>{error}</Typography>}
        </form>
        <a href="#" className="forgot-password-link" style={{ textAlign: 'center', color: 'black'}} onClick={handleForgotPassword}>Forgot password? Reset.</a>
        </Grid>
      </Paper>
    </Container>
  );
  }  

export default Login;
