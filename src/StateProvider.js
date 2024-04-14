import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { auth } from './shared/firebase/firebase';
import reducer, { initialState, actionTypes } from './reducer';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const getAccountType = async (userId) => {
    const db = getFirestore();
    const userDocRef = doc(db, "users", userId);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
        return userDocSnap.data().accountType;
    } else {
        // Handle the case where the document does not exist
        console.error('User document does not exist');
        return null;
    }
};

const getUserPersonalInfo = async (userId) => {
    const db = getFirestore();
    const userDocRef = doc(db, "users", userId);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
        const personalInfo = userDocSnap.data().personalInfo;
        return { 
            firstName: personalInfo?.firstName || '',
            lastName: personalInfo?.lastName || '',
            photoURL: personalInfo?.photoURL || ''
        };
    } else {
        console.error('User document does not exist');
        return { firstName: '', lastName: '', photoURL: ''};
    }
};


// Prepare the Data layer
export const StateContext = createContext();

export const StateProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        console.log("Setting up auth state changed listener");
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
          if (user && user.emailVerified) {
            console.log("User is signed in: ", user);
    
            // Set user_id in Google Analytics
            if (window.gtag) {
              window.gtag('set', 'user_properties',
               {user_id: user.uid}); // Set the user ID using signed-in user_id.
            }
    
            const localAccountType = localStorage.getItem('accountType');
            let accountType = localAccountType;
            if (localAccountType) {
              console.log("Found account type in localStorage: ", localAccountType);
              accountType = localAccountType;
            } else {
              console.log("Account type not found in localStorage, fetching from Firestore");
              accountType = await getAccountType(user.uid);
              localStorage.setItem('accountType', accountType); // Save the account type to localStorage
            }

            const fetchedPersonalInfo = await getUserPersonalInfo(user.uid);
            dispatch({
                type: actionTypes.SET_USER,
                user: user,
                accountType: accountType,
                personalInfo: {
                    ...fetchedPersonalInfo, // Spread the fetched info directly
                    isLoading: false
                }
            });
          } else {
            console.log("User is signed out or auth state is null");
    
            // Clear user_id in Google Analytics
            if (window.gtag) {
                window.gtag('set', 'user_properties',
                 {user_id: undefined}); // Set the user ID using signed-in user_id.
              }
    
            dispatch({
              type: actionTypes.SET_USER,
              user: null,
              accountType: null,
              personalInfo: null,
            });
            console.log("Unauthenticated or unverified user");
            localStorage.removeItem('accountType'); // Ensure it's also cleared here
          } 
        });
    
        return () => {
          console.log("Unsubscribing auth listener");
          unsubscribe();
        };
      }, []);

    return (
        <StateContext.Provider value={[state, dispatch]}>
            {children}
        </StateContext.Provider>
    );
    };

// Custom hook to use the StateContext
export const useStateValue = () => useContext(StateContext);
