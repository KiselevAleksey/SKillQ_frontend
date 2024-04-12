import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Stepper, Step, StepLabel } from '@mui/material';
import CvUploadComponent from './CvUploadComponent';
import FirebaseAuthComponent from './FirebaseAuthComponent';
import Button from '../SharedSignup/Button';
import '../SharedSignup/SharedSignup.css'
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";


const FreelancerSignup = () => {
  const [cvFile, setCvFile] = useState(null);
  const history = useHistory();
  const steps = ['Resume', 'Complete'];

  const nextStep = () => {
    // This would now be a simple toggle between the two steps, as there are only two.
    const nextStep = step === 1 ? 2 : 1;
    history.push(`?step=${nextStep}`);
    // Logic for sending a Google Analytics event can be updated here as needed
  };

  const step = parseInt(new URLSearchParams(window.location.search).get('step') || '1', 10);

  const handleCvUpload = (file) => {
    setCvFile(file);
    if (file) {
      nextStep(); // Automatically navigate to the next step after CV upload
    }
  };

  const handleSignupSuccess = async (user) => {
    if (window.gtag) {
      window.gtag('set', 'user_properties', {
        user_id: user.uid,
      });
    }
    try {
      const db = getFirestore();
      const storage = getStorage();
      let cvUrl = "";

      if (cvFile) {
        const storageRef = ref(storage, `user_cv/${user.uid}/${cvFile.name}`);
        await uploadBytes(storageRef, cvFile);
        cvUrl = await getDownloadURL(storageRef);
      }

      const userProfile = {
        // Replace the following properties with your actual data collection logic
        // as necessary for your application.
        cvUrl: cvUrl,
        // ...other user properties...
      };

      await setDoc(doc(db, "users", user.uid), userProfile);
      // Additional actions upon successful sign-up, such as navigation, can be added here
    } catch (error) {
      console.error("Signup error", error);
      alert("There was an issue with your signup. Please try again.");
    }
  };

  const handleSignupError = (error) => {
    console.error("Signup error", error);
    alert("There was an issue with your signup. Please try again.");
  };
  
  const stepsComponents = {
    1: <CvUploadComponent onCvUpload={handleCvUpload} />,
    2: <FirebaseAuthComponent onSignupSuccess={handleSignupSuccess} onSignupError={handleSignupError} />,
  };

  const renderStep = () => stepsComponents[step] || <div>Check the information</div>;

  return (
    <div className="freelancer-signup-content">
      <div className="stepper-container">
        <Stepper activeStep={step - 1} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
        
      {renderStep()}
      <div style={{ position: 'fixed', width: '100%', bottom: '20px', textAlign: 'center' }}>
        <Button onClick={nextStep}>{step === 1 ? 'Next' : 'Finish'}</Button>
      </div>
    </div>
  );  
}

export default FreelancerSignup;
