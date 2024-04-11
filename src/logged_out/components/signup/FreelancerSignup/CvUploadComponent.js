import React, { useRef, useState } from 'react';
import { Button, FormControl, InputLabel, Typography, FormHelperText } from '@mui/material';

const CvUploadComponent = ({ onCvUpload }) => {
  const [cvFile, setCvFile] = useState(null);
  const [isFileValid, setIsFileValid] = useState(true);
  const [isUploaded, setIsUploaded] = useState(false);
  const fileInputRef = useRef(null); // Create a ref for the file input

  const sendGAEvent = ({ action, category, label, value }) => {
    if (window.gtag) {
      window.gtag('event', action, {
        'event_category': category,
        'event_label': label,
        'value': value
      });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setIsUploaded(false);
    if (file && file.type === 'application/pdf') {
      setCvFile(file);
      setIsFileValid(true);
      sendGAEvent({
        category: 'CV Upload',
        action: 'Selected CV File',
        label: 'CV Selection'
      });
    } else {
      setCvFile(null);
      setIsFileValid(false);
      sendGAEvent({
        category: 'CV Upload',
        action: 'CV File Selection Error',
        label: 'Invalid File Type'
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cvFile && isFileValid) {
      onCvUpload(cvFile);
      setIsUploaded(true);
      sendGAEvent({
        category: 'CV Upload',
        action: 'Uploaded CV',
        label: 'CV Upload Success'
      });
    }
  };

  return (
    <div className="card">
      <div style={{ textAlign: 'center' }}>
        <Typography variant="h5" style={{ marginBottom: '20px', marginTop: '20px' }}>Upload Your CV (Resume)</Typography>
        <form onSubmit={handleSubmit}>
          <FormControl error={!isFileValid} component="fieldset" style={{ marginBottom: '20px' }}>
            <Button
              variant="contained"
              component="label"
              color="primary"
            >
              Choose File
              <input
                type="file"
                hidden
                accept=".pdf"
                onChange={handleFileChange}
                ref={fileInputRef}
              />
            </Button>
            {cvFile && <div style={{ marginTop: '10px' }}>{cvFile.name}</div>}
            {!isFileValid && <FormHelperText>Please upload a PDF file.</FormHelperText>}
          </FormControl>
          <Button 
            variant="contained" 
            color="primary" 
            type="submit" 
            disabled={!cvFile || !isFileValid}
            style={{ marginTop: '20px' }}
          >
            {isUploaded ? 'Successfully Uploaded' : 'Upload'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CvUploadComponent;
