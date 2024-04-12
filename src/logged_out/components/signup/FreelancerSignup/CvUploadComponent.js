import React, { useRef, useState } from 'react';
import { Typography, Button, FormControl, FormHelperText, TextField } from '@mui/material';

const CvUploadComponent = ({ onCvUpload }) => {
  const [cvFile, setCvFile] = useState(null);
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [isFileValid, setIsFileValid] = useState(true);
  const [isLinkedinUrlValid, setIsLinkedinUrlValid] = useState(true);
  const [isUploaded, setIsUploaded] = useState(false);
  const fileInputRef = useRef(null);

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

  const handleLinkedinUrlChange = (e) => {
    const url = e.target.value;
    setLinkedinUrl(url);
    setIsLinkedinUrlValid(validateLinkedinUrl(url));
  };

  const validateLinkedinUrl = (url) => {
    const pattern = /^https?:\/\/(www\.)?linkedin\.com\/.*$/;
    return pattern.test(url);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validLinkedinUrl = validateLinkedinUrl(linkedinUrl);
  
    if (cvFile && isFileValid) {
      if (validLinkedinUrl) {
        onCvUpload(cvFile, linkedinUrl);
        setIsUploaded(true);
        sendGAEvent({
          category: 'CV Upload',
          action: 'Uploaded CV and LinkedIn URL',
          label: 'CV and LinkedIn Upload Success'
        });
      } else {
        setIsLinkedinUrlValid(false);
        sendGAEvent({
          category: 'CV Upload',
          action: 'Invalid LinkedIn URL',
          label: 'LinkedIn URL Validation Error'
        });
      }
    } else if (!cvFile) {
      sendGAEvent({
        category: 'CV Upload',
        action: 'No CV File',
        label: 'CV File Missing'
      });
    } else if (!isFileValid) {
      sendGAEvent({
        category: 'CV Upload',
        action: 'Invalid CV File',
        label: 'CV File Validation Error'
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
          <FormControl error={!isLinkedinUrlValid} component="fieldset" fullWidth>
            <TextField
              label="LinkedIn Profile URL"
              variant="outlined"
              value={linkedinUrl}
              onChange={handleLinkedinUrlChange}
              required
              error={!isLinkedinUrlValid}
              helperText={!isLinkedinUrlValid && "Please enter a valid LinkedIn URL."}
              style={{ marginBottom: '20px' }}
            />
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
