// VideoModal.js
import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

function VideoModal({ open, handleClose, videoSrc }) {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxHeight: '80%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    outline: 'none',
    display: 'flex',
    flexDirection: 'column',
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="video-modal-title"
      aria-describedby="video-modal-description"
    >
      <Box sx={style}>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 16,
            top: 16,
            color: 'grey.500',
          }}
        >
          <CloseIcon />
        </IconButton>
        {/* You can embed a YouTube video or use a <video> tag with local/remote source */}
        <iframe
          width="100%"
          height="100%"
          src={videoSrc}
          title="Video title"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </Box>
    </Modal>
  );
}

export default VideoModal;
