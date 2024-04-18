import React, { useState } from 'react';
import { Container, Typography, Checkbox, FormControlLabel, Button, Box, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AssessmentPopup from './AssessmentPopup';
import RegistrationModal from './RegistrationModal';
import { Backdrop } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(10),
  },
  header: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(3),
    fontWeight: 'bold',
  },
  processStep: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
  },
  stepCircle: {
    marginRight: theme.spacing(2),
    borderRadius: '50%',
    width: theme.spacing(6),
    height: theme.spacing(6),
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.main,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumber: {
    fontWeight: 'bold',
    fontSize: '1rem',
  },
  stepText: {
    fontSize: '1.125rem',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
  },
  startButton: {
    marginTop: theme.spacing(3),
    color: theme.palette.common.white,
    backgroundColor: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark,
    },
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  termsText: {
    marginTop: theme.spacing(2),
  },
}));

const AssessmentPage = () => {
  const classes = useStyles();
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [isDataProcessingAccepted, setIsDataProcessingAccepted] = useState(false);
  const [showAssessmentPopup, setShowAssessmentPopup] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);

  console.log('AssessmentPage rendered');

  const handleAcceptTerms = (event) => {
    console.log('Terms checkbox changed:', event.target.checked);
    setIsTermsAccepted(event.target.checked);
  };

  const handleAcceptDataProcessing = (event) => {
    console.log('Data processing checkbox changed:', event.target.checked);
    setIsDataProcessingAccepted(event.target.checked);
  };

  const handleStartAssessment = () => {
    console.log('Start assessment button clicked');
    if (isTermsAccepted && isDataProcessingAccepted) {
      console.log('Terms and data processing accepted, showing assessment popup');
      setShowAssessmentPopup(true); // This will trigger the popup to show
    } else {
      console.log('Terms and/or data processing not accepted, cannot start assessment');
      // Notify user to accept the terms
    }
  };

  const handleCloseAssessmentPopup = () => {
    console.log('Assessment popup closed, opening registration modal');
    setShowAssessmentPopup(false);
    setShowRegistrationModal(true); // Directly set the modal to show without delay
  };

  const handleCloseRegistrationModal = () => {
    console.log('Registration modal closed');
    setShowRegistrationModal(false);
  };

  return (
    <>
      <Container maxWidth="lg" className={classes.root}>
        <Typography variant="h4" align="center" className={classes.header}>
          Assessment Process
        </Typography>
        <Box>
          {['Select skills you would like to be assessed on', 'SkillQ will generate appropriate questions accordingly: one expertise question and one case study', 'Grant us access to your camera and microphone so that SkillQ can conduct a thorough assessment by seeing and hearing you'].map((text, index) => (
            <div key={index} className={classes.processStep}>
              <Paper elevation={4} className={classes.stepCircle}>
                <Typography className={classes.stepNumber}>{index + 1}</Typography>
              </Paper>
              <Typography className={classes.stepText}>{text}</Typography>
            </div>
          ))}
            <FormControlLabel
              control={<Checkbox checked={isTermsAccepted} onChange={handleAcceptTerms} />}
              label={
                <Typography className={classes.label}>
                  I agree to the{' '}
                  <a href={`${process.env.PUBLIC_URL}/legal/Data_Processing_Agreement_SkillQ.pdf`} target="_blank" className={classes.link}>
                    Data Processing agreement
                  </a>
                </Typography>
              }
              className={classes.checkboxLabel}
            />

            <FormControlLabel
              control={<Checkbox checked={isDataProcessingAccepted} onChange={handleAcceptDataProcessing} />}
              label={
                <Typography className={classes.label}>
                  I accept the{' '}
                  <a href={`${process.env.PUBLIC_URL}/legal/Video_Recording_Consent_Form.pdf`} target="_blank" className={classes.link}>
                    Terms & conditions
                  </a>
                </Typography>
              }
              className={classes.checkboxLabel}
            />
          <Typography variant="caption" display="block" color="error" className={classes.termsText}>
            Please accept terms & conditions and data processing agreement to proceed
          </Typography>
            <Button
              variant="contained"
              className={classes.startButton}
              endIcon={<ArrowForwardIosIcon />}
              onClick={handleStartAssessment}
              disabled={!isTermsAccepted || !isDataProcessingAccepted}
            >
              Start assessment
            </Button>
        </Box>
      </Container>

      <Backdrop
      style={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={showAssessmentPopup}
    >
    </Backdrop>

      {showAssessmentPopup && (
        <AssessmentPopup
          onClose={handleCloseAssessmentPopup}
        />
      )}

      <RegistrationModal
        isOpen={showRegistrationModal}
        onClose={handleCloseRegistrationModal}
      />
    </>
  );
};

export default AssessmentPage;

