import React from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import { Button, Typography, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';

// Define custom styles
const useStyles = makeStyles((theme) => ({
  modalContent: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80vw', // Slightly larger width for the modal
    maxWidth: '700px', // Adjusted maximum width
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(6), // Slightly larger padding for a spacious feel
    boxShadow: theme.shadows[5],
    outline: 'none',
  },
    modalOverlay: {
        position: 'fixed', // Ensure the overlay covers the whole screen
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the opacity to make it darker
        zIndex: theme.zIndex.modal + 1, // Ensure it covers the entire screen under the modal
    },
  content: {
    backgroundColor: '#f4f4f4',
  },
  registerButton: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(1.5), // Increase button padding for a larger button
  },
}));


const RegistrationModal = ({ isOpen, onClose }) => {
  const classes = useStyles();

  return (
      <Modal
          isOpen={isOpen}
          onRequestClose={onClose}  // Changed to onClose
          contentLabel="Complete Registration"
          ariaHideApp={false}
          className={classes.modalContent}
          overlayClassName={classes.modalOverlay}
      >
          <Typography variant="h4" gutterBottom align="center">
              Great! The assessment is finished.
          </Typography>
          <Typography variant="body1" paragraph align="center">
              To dive into the insights and get your personalized assessment, let's get you started with a quick registration. Ready to unlock the power of your video?
          </Typography>
          <Box textAlign="center">
              <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to="/login"
                  onClick={onClose}  // Changed to onClose
                  className={classes.registerButton}
              >
                  Register Now
              </Button>
          </Box>
      </Modal>
  );
};

export default RegistrationModal;
