import React, { useState } from 'react';
import { Checkbox, FormControlLabel, Typography, Paper, Button, Grid, List, ListItem  } from '@mui/material';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles((theme) => ({
  assessmentBox: {
    padding: theme.spacing(4),
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    margin: theme.spacing(2),
    minWidth: '100%',
    overflow: 'hidden',
  },
  button: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
  },
  bulletPoints: {
    counterReset: 'itemCounter', // Initialize the counter
    listStyle: 'none', // Remove default list style
    padding: 0, // Remove default padding
    margin: 0, // Remove default margin
  },
  listItem: {
    counterIncrement: 'itemCounter', // Increment the counter
    position: 'relative',
    paddingLeft: theme.spacing(10),
    '&::before': {
      content: 'counter(itemCounter) "."', // Use the counter
      position: 'absolute',
      left: 0,
      top: 0,
      fontWeight: 'bold',
      fontSize: '1.5rem',
      color: theme.palette.primary.main,
    },
  },
  icon: {
    marginRight: theme.spacing(2),
  },
}));

const AgreementCheckbox = ({ label, linkLabel, linkHref, isChecked, onChange, error }) => {
  return (
    <>
      <FormControlLabel
        control={<Checkbox checked={isChecked} onChange={onChange} color="primary" />}
        label={
          <Typography variant="body2">
            I {label} the 
            <a href={linkHref} target="_blank" rel="noopener noreferrer">
              {linkLabel}
            </a>.
          </Typography>
        }
      />
      {error && (
        <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>
      )}
    </>
  );
};



const AssessmentRules = ({onButtonClick}) => {
  const [isDataProcessingAgreementChecked, setDataProcessingAgreementChecked] = useState(false);
  const [isVideoRecordingConsentChecked, setVideoRecordingConsentChecked] = useState(false);
  const classes = useStyles();

  const handleDataProcessingAgreementChange = (event) => {
    setDataProcessingAgreementChecked(event.target.checked);
  };

  const handleVideoRecordingConsentChange = (event) => {
    setVideoRecordingConsentChecked(event.target.checked);
  };

  const allAgreementsChecked = isDataProcessingAgreementChecked && isVideoRecordingConsentChecked;

  return (
    <Paper className={classes.assessmentBox}>
      <Typography variant="h5" component="h3">
        Assessment Process
      </Typography>
      <List className={classes.bulletPoints}>
        <ListItem className={classes.listItem}>Precise AI skill evaluation</ListItem>
        <ListItem className={classes.listItem}>Verified expertise visibility</ListItem>
        <ListItem className={classes.listItem}>Unique employee offers</ListItem>
      </List>
      <Grid container direction="column" spacing={2}>
        <Grid item>
        <AgreementCheckbox 
          label="agree to"
          linkLabel="Data Processing Agreement"
          linkHref='/legal/Video_Recording_Consent_Form.docx'
          isChecked={isDataProcessingAgreementChecked}
          onChange={handleDataProcessingAgreementChange}
        />
        <AgreementCheckbox 
          label="consent to Video"
          linkLabel="Recording"
          linkHref='/legal/Video_Recording_Consent_Form.docx'
          isChecked={isVideoRecordingConsentChecked}
          onChange={handleVideoRecordingConsentChange}
        />
        </Grid>
        <Grid item>
        <Button
            variant="contained"
            color="primary"
            size="large"
            disabled={!allAgreementsChecked}
            onClick={allAgreementsChecked ? onButtonClick : null}
          >
            Begin Assessment
          </Button>
          {!allAgreementsChecked && (
            <Typography color="error">
              Please read and agree to the agreements above to proceed.
            </Typography>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AssessmentRules;