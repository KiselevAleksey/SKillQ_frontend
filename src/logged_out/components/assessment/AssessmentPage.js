import React from 'react';
import AssessmentPopup from './AssessmentPopup';
import { Typography, Box, Button, Paper, Container, Grid, List, ListItem } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(10),
  },
  header: {
    marginBottom: theme.spacing(3),
  },
  description: {
    marginBottom: theme.spacing(4),
  },
  button: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(4),
    textAlign: 'center',
  },
  assessmentBox: {
    padding: theme.spacing(4),
    textAlign: 'center',
    display: 'flex', // This makes the Paper component a flex container
    flexDirection: 'column', // Stacks the children vertically
    justifyContent: 'space-between', // Distributes space around the items
    height: '100%', // This makes the Paper component fill the flex container
    margin: theme.spacing(2),
    minWidth: '100%'
  },
  gridContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch', // This ensures that the items stretch to fill the container
  },
  gridItem: {
    display: 'flex', // This turns the grid item into a flex container
  },
  bulletPoints: {
    textAlign: 'left',
    listStyle: 'disc', // This will apply the bullet points
    paddingLeft: theme.spacing(4), // Adjust padding to align bullets correctly
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

const BulletPointDescription = ({ items }) => {
    const classes = useStyles();
    return (
      <ul className={classes.bulletPoints}>
        {items.map((item, index) => (
          <li key={index} className={classes.listItem}>
            <Typography>{item}</Typography>
          </li>
        ))}
      </ul>
    );
  };
  
  const AssessmentBox = ({ header, bulletPoints, buttonText, onButtonClick }) => {
    const classes = useStyles();
  
    return (
      <Paper className={classes.assessmentBox}>
        <Typography variant="h6" gutterBottom>
          {header}
        </Typography>
        <BulletPointDescription items={bulletPoints} />
        {buttonText && (
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={onButtonClick}
            className={classes.button}
          >
            {buttonText}
          </Button>
        )}
      </Paper>
    );
  };
  
  
  const AssessmentPage = () => {
    const classes = useStyles();
    const [showAssessmentPopup, setShowAssessmentPopup] = React.useState(false);
  
    const openAssessmentPopup = () => setShowAssessmentPopup(true);
    const closeAssessmentPopup = () => setShowAssessmentPopup(false);
  
    return (
        <Container maxWidth="lg" className={classes.root}>
        <Grid container spacing={2} className={classes.gridContainer}>
          <Grid item xs={12} md={6} className={classes.gridItem}>
            <AssessmentBox
                header="Benefits of Assessment"
                bulletPoints={[
                'Evaluate presentation skills',
                'Assess technical expertise',
                'Structure of thought process',
                'Option to share results with HR'
                ]}
            />
            </Grid>
            <Grid item xs={12} md={6} className={classes.gridItem}>
            <AssessmentBox
              header="Assessment Rules"
              bulletPoints={[
                'Video and audio recording is required',
                'One case question to solve',
                'One general question related to the field'
              ]}
              buttonText="See Rules"
              onButtonClick={openAssessmentPopup}
            />
          </Grid>
        </Grid>
        {showAssessmentPopup && <AssessmentPopup onClose={closeAssessmentPopup} />}
      </Container>
    );
  };
  
  export default AssessmentPage;