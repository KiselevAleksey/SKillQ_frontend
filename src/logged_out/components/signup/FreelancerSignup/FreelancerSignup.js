import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Stepper, Step, StepLabel } from '@mui/material';
import CvUploadComponent from './CvUploadComponent';
import FirebaseAuthComponent from './FirebaseAuthComponent';
import Button from '../SharedSignup/Button';
import '../SharedSignup/SharedSignup.css';
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const FreelancerSignup = () => {
  const [cvFile, setCvFile] = useState(null);
  const history = useHistory();
  const steps = ['Resume', 'Complete'];
  const [accountType, setAccountType] = useState('freelancer'); // Assuming default account type is 'freelancer'

  const nextStep = () => {
    const nextStep = step === 1 ? 2 : 1;
    history.push(`?step=${nextStep}`);
  };

  const step = parseInt(new URLSearchParams(window.location.search).get('step') || '1', 10);

  const handleCvUpload = (file) => {
    setCvFile(file);
    if (file) {
      nextStep(); 
    }
  };

  const handleSignupSuccess = async (user) => {
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
        cvUrl: cvUrl,
        accountType: accountType, // Include account type
      };

      await setDoc(doc(db, "users", user.uid), userProfile);
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
    2: <FirebaseAuthComponent onSignupSuccess={handleSignupSuccess} onSignupError={handleSignupError} accountType={accountType} />,
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
};

export default FreelancerSignup;
