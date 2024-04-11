import React, { useState } from 'react';
import { Container, Grid, Typography, Backdrop } from '@mui/material';
import { makeStyles } from '@mui/styles';
import BenefitsOfAssessment from './BenefitsOfAssessment';
import AssessmentRules from './AssessmentRules';
import AssessmentPopup from './AssessmentPopup';
import RegistrationModal from './RegistrationModal'; 

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(10),
  },
  header: {
    marginBottom: theme.spacing(3),
  },
  gridContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
}));

const AssessmentPage = () => {
  const classes = useStyles();
  const [showAssessmentPopup, setShowAssessmentPopup] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);

  const openAssessmentPopup = () => setShowAssessmentPopup(true);

  const handleCloseAssessmentPopup = () => {
    setShowAssessmentPopup(false);
    setShowRegistrationModal(true); // Open registration modal after assessment popup is closed
  };

  const handleCloseRegistrationModal = () => {
    setShowRegistrationModal(false);
  };

  return (
    <>
    <Container maxWidth="lg" className={classes.root}>
        <Typography variant="h4" align="center" className={classes.header}>
          Personal Assessment
        </Typography>
        <Grid container spacing={5} className={classes.gridContainer}>
          <Grid item xs={12} md={6}>
            <BenefitsOfAssessment />
          </Grid>
          <Grid item xs={12} md={6}>
            <AssessmentRules onButtonClick={openAssessmentPopup} />
          </Grid>
        </Grid>
      </Container>
      <Backdrop className={classes.backdrop} open={showAssessmentPopup} />
      {showAssessmentPopup && (
        <AssessmentPopup onClose={handleCloseAssessmentPopup} />
      )}
      <RegistrationModal 
        isOpen={showRegistrationModal} 
        onRequestClose={handleCloseRegistrationModal} 
      />
    </>
  );
};

export default AssessmentPage;