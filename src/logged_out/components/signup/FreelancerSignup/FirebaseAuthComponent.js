import React, { useState } from 'react';
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useHistory } from 'react-router-dom';
import InputField from '../SharedSignup/InputField';
import Button from '../SharedSignup/Button';
import { Checkbox, FormControlLabel } from '@mui/material';
import { doc, setDoc, getFirestore } from 'firebase/firestore';
import { auth } from '../../../../shared/firebase/firebase';

const sendGAEvent = ({ action, category, label, value }) => {
  if (window.gtag) {
    window.gtag('event', action, {
      'event_category': category,
      'event_label': label,
      'value': value
    });
  }
};

const FirebaseAuthComponent = ({ onSignupSuccess, onSignupError }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAgreed, setIsAgreed] = useState(false);
  const [error, setError] = useState('');
  const [showBanner, setShowBanner] = useState(false);
  const history = useHistory();


  const trackButtonEvent = (buttonName) => {
    sendGAEvent({
      category: 'User',
      action: `Clicked on ${buttonName} button`,
      label: 'Signup'
    });
  };

  const canSubmit = () => {
    return email.length > 0 && password.length > 0 && isAgreed;
  };

  function getErrorMessage(errorCode) {
    switch (errorCode) {
      case 'auth/email-already-in-use':
        return 'The email address is already in use by another account.';
      case 'auth/invalid-email':
        return 'The email address is invalid.';
      case 'auth/operation-not-allowed':
        return 'The operation is not allowed.';
      case 'auth/weak-password':
        return 'The password is weak.';
      default:
        return 'An unknown error occurred.';
    }
  }

  const createAccountWithEmail = async () => {
    trackButtonEvent('Email Signup');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCredential.user);
      onSignupSuccess(userCredential.user);

      setShowBanner(true);  // Show the banner on successful signup
      setTimeout(() => {
        setShowBanner(false); // Hide the banner after 6 seconds
        history.push('/login'); // Changed to history.push to navigate to the login page
      }, 6000);

    } catch (error) {
      console.error("Error in createAccountWithEmail:", error.message);
      const russianErrorMessage = getErrorMessage(error.code);
      setError(russianErrorMessage); // Set error message in Russian based on the error code
      onSignupError(error);
      // Track the failed account creation
      sendGAEvent({
        category: 'User',
        action: 'Failed Email Signup',
        label: error.code
      });
    }
  };



  const signInWithGoogle = async () => {
    if (!isAgreed) {
      setError("Please accept the terms of the Personal Data Processing Policy.");
      return;
    }
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      const result = await signInWithPopup(auth, provider);
      console.log("Google sign-in result obtained:", result);

      if (!result.user) {
        throw new Error('Failed to retrieve user data from Google.');
      }

      const { uid, displayName, email, photoURL } = result.user;
      console.log("User details - UID:", uid, "Name:", displayName, "Email:", email, "Photo URL:", photoURL);

      const db = getFirestore();
      const userRef = doc(db, 'users', uid);
      await setDoc(userRef, {
        name: displayName,
        email: email,
        photoURL: photoURL
      });
      console.log("User data saved to Firestore successfully.");

      onSignupSuccess(result.user);
    } catch (error) {
      console.error("Error in signInWithGoogle:", error);
      setError(error.message);
      onSignupError && onSignupError(error);
    }
  };

  return (
    <div className="side-content">
      <div
        className="card"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#fff',
          padding: '20px',
          borderRadius: '10px',
        }}
      >
        <h1 style={{ color: '#4285F4', fontSize: '24px' }}>Create Account</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <InputField
            label="Email"
            type="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              marginBottom: '10px',
            }}
          />
          <InputField
            label="Password"
            type="password"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              marginBottom: '10px',
            }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isAgreed}
                onChange={(e) => setIsAgreed(e.target.checked)}
                name="agreement"
                color="primary"
              />
            }
            label={
                <>
                  I have read and accept {" "}
                  <a href="https://firebasestorage.googleapis.com/v0/b/consultingx-d3b3a.appspot.com/o/public%2FCovista_privacy_policy.pdf?alt=media&token=c9a1415e-1633-469d-9a1c-ffc13f6dee32" target="_blank" rel="noopener noreferrer">
                    Personal Data Processing Policy
                  </a>
                </>
            }
          />
          {error && (
            <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>
          )}
          <Button
            onClick={createAccountWithEmail}
            disabled={!canSubmit()}
            style={{
              backgroundColor: '#4285F4',
              color: 'white',
              padding: '10px',
              border: 'none',
              borderRadius: '5px',
              width: '100%',
              marginBottom: '10px',
            }}
          >
            Register
          </Button>
          {showBanner && (
            <div className="verification-banner">
              A confirmation message has been sent to your email address. Please check your email.
            </div>
          )}
          <Button
            onClick={signInWithGoogle}
            disabled={!isAgreed}
            style={{
              backgroundColor: '#fff',
              color: '#4285F4',
              padding: '10px',
              border: '1px solid #4285F4',
              borderRadius: '5px',
              width: '100%',
              marginBottom: '10px',
            }}
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
              style={{ width: '20px', marginRight: '10px' }}
            />
            Google Sign-In
          </Button>
        </form>
      </div>
    </div>
  );  
};

export default FirebaseAuthComponent;
