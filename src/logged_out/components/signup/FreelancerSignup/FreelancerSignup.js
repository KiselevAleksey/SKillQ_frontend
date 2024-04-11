import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Stepper, Step, StepLabel } from '@mui/material';
import FirebaseAuthComponent from './FirebaseAuthComponent';
import NameInput from './NameInput';
import RoleSelection from './RoleSelection';
import ExperienceLevel from './ExperienceLevel';
import SkillsSelection from './SkillsSelection';
import DailyRate from './DailyRate';
import LocationPreference from './LocationPreference';
import CvUploadComponent from './CvUploadComponent';
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Button from '../SharedSignup/Button';
import '../SharedSignup/SharedSignup.css'

const sendGAEvent = ({ action, category, label, value }) => {
  if (window.gtag) {
    window.gtag('event', action, {
      'event_category': category,
      'event_label': label,
      'value': value
    });
  }
};

const FreelancerSignup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('');
  const [experience, setExperience] = useState('');
  const [skills, setSkills] = useState([]);
  const [dailyRate, setDailyRate] = useState('');
  const [locationPreference, setLocationPreference] = useState('');
  const [cvFile, setCvFile] = useState(null);
  const history = useHistory();
  const location = useLocation();
  const step = parseInt(new URLSearchParams(location.search).get('step') || '1', 10);
  const steps = ['Personal Info', 'Role', 'Experience', 'Skills', 'Rate', 'Location', 'Resume', 'Complete'];

  const navigateAndTrack = (isValid, currentStep, direction) => {
    if (isValid) {
      const nextStep = direction === 'next' ? currentStep + 1 : currentStep - 1;
      history.push(`?step=${nextStep}`);
      sendGAEvent({
        category: 'Signup Form',
        action: `Moved to step ${nextStep}`,
        label: `Step ${currentStep}`
      });
    } else {
      alert("Please fill in the required information.");
    }
  };

  const nextStep = () => {
    let inputIsValid = true;
  
    switch (step) {
      case 1:
        inputIsValid = firstName.trim().length > 0 && lastName.trim().length > 0;
        break;
      case 2:
        inputIsValid = role.trim().length > 0;
        break;
      case 3:
        inputIsValid = experience.trim().length > 0;
        break;
      case 4:
        inputIsValid = skills.length > 0;
        break;
      case 5:
        inputIsValid = dailyRate.trim().length > 0;
        break;
      case 6:
        inputIsValid = locationPreference.trim().length > 0;
        break;
      case 7:
        break;
      case 8:
        break;
      default:
        inputIsValid = true;
    }
  
    if (inputIsValid) {
      const nextStepNumber = step + 1;
      history.push(`?step=${nextStepNumber}`);
      sendGAEvent({
        category: 'Signup Form',
        action: `Moved to step ${nextStepNumber}`,
        label: `Step ${step}`
      });
    } else {
      alert("Please fill in the required information.");
    }
  };

  const onSelectName = (updatedFirstName, updatedLastName) => {
    setFirstName(updatedFirstName);
    setLastName(updatedLastName);
  };

  const onSelectRole = (selectedRole) => {
    setRole(selectedRole);
  };

  const handleExperienceChange = (event) => {
    setExperience(event.target.value);
  };  

  const prevStep = () => {
    if (step > 1) {
      history.push(`?step=${step - 1}`);
    }
  };

  const handleDailyRateChange = (event) => {
    setDailyRate(event.target.value);
  };

  const db = getFirestore();

  const uploadCvToFirebase = async (userId) => {
    if (!cvFile) return null;
  
    const storage = getStorage();
    const storageRef = ref(storage, `user_cv/${userId}/${cvFile.name}`);
    await uploadBytes(storageRef, cvFile);
    return await getDownloadURL(storageRef);
  };

  const handleSignupSuccess = async (user) => {
    if (window.gtag) {
      window.gtag('set', 'user_properties', {
        user_id: user.uid,
      });
    }    
    try {
      const cvUrl = await uploadCvToFirebase(user.uid) || ""; 
  
      const userProfile = {
        accountType: "freelancer",
        personalInfo: {
          address: {
            city: "City",
            country: "Country",
          },
          firstName: firstName || "First Name",
          lastName: lastName || "Last Name",
          photoURL: "path_to_storage.photo.jpg",
        },
        profile: {
          cvUrl: cvUrl,
          dailyRate: dailyRate || "XXX, currency",
          experienceLevel: experience || "Experience",
          jobTitle: role || "Job Title",
        },
        locationPreference: locationPreference || "Location Preference",
        skills: skills.length > 0 ? skills : ["Skills"],
        settings: {
          newsletterSubscription: "Provided",
          privacySettings: {
            showProfile: true,
            enableNotifications: false,
            darkMode: false,
          }
        },
        timestampCreated: new Date().toISOString(),
      };
  
      await setDoc(doc(db, "users", user.uid), userProfile);
    } catch (error) {
      console.error("Signup error", error);
      alert("There was an issue with your signup. Please try again.");
    }
  };
  
  const handleSignupError = (error) => {
    console.error("Signup error", error);
  };

  const stepsComponents = {
    1: <NameInput firstName={firstName} lastName={lastName} onNameChange={onSelectName} />,
    2: <RoleSelection selectedRole={role} onSelectRole={setRole} />,
    3: <ExperienceLevel experience={experience} onExperienceChange={handleExperienceChange} />,
    4: <SkillsSelection selectedSkills={skills} onSelectSkill={setSkills} selectedRole={role} />,
    5: <DailyRate rate={dailyRate} onRateChange={handleDailyRateChange} />,
    6: <LocationPreference selectedPreference={locationPreference} onSelectPreference={(e) => setLocationPreference(e.target.value)} />,
    7: <CvUploadComponent onCvUpload={setCvFile} />,
    8: <FirebaseAuthComponent onSignupSuccess={handleSignupSuccess} onSignupError={handleSignupError} />,
  };

  const renderStep = () => stepsComponents[step] || <div>Check the information</div>;

  return (
    <div className="freelancer-signup-content">
      <div className="stepper-container">
        <Stepper activeStep={step - 1} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
        
      {renderStep()}
      <div style={{ position: 'fixed', width: '100%', bottom: '20px', textAlign: 'center' }}>
        {step > 1 && (
          <span style={{ marginRight: '10px' }}>
            <Button onClick={prevStep} className="secondary">Back</Button>
          </span>
        )}
        {step < 8 ? (
          <Button onClick={nextStep}>Next</Button>
        ) : null}
      </div>
    </div>
  );  
}

export default FreelancerSignup;
