import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import { auth } from './shared/firebase/firebase';
import { actionTypes } from './reducer';

function ProtectedRoute({ component: Component, allowedUsers, ...rest }) {
  const [{ user, accountType }, dispatch] = useStateValue();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      const localAccountType = localStorage.getItem('accountType');
      const personalInfo = localStorage.getItem('personalInfo');
      if (authUser) {
        // User is signed in, dispatch the user details
        dispatch({
          type: actionTypes.SET_USER,
          user: authUser,
          accountType: localAccountType,
          personalInfo: personalInfo,
        });
      } else {
        // User is signed out, clear the details
        dispatch({
          type: actionTypes.SET_USER,
          user: null,
          accountType: null,
          personalInfo: null,
        });
        localStorage.removeItem('accountType');
        localStorage.removeItem('personalInfo');
      }
      setIsLoading(false);
    });

    // Cleanup the subscription on unmount
    return () => unsubscribe();
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user || (allowedUsers && !allowedUsers.includes(accountType))) {
    return <Redirect to="/login" />;
  }

  return <Component {...rest} />;
}

export default ProtectedRoute;
