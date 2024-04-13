import React, { useState } from 'react';
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { setLogLevel } from "firebase/firestore"; 
setLogLevel('debug');


const TestUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadFirestoreSuccess, setUploadFirestoreSuccess] = useState(false);
  const [uploadFirestoreError, setUploadFirestoreError] = useState('');

  const uploadDataToFirestore = async () => {
    const db = getFirestore();

    // Create a dummy data object to upload
    const dummyData = {
      name: "John Doe",
      email: "johndoe@example.com",
      cvUrl: "http://example.com/cv/johndoe", // Dummy cvUrl
    };

    try {
      console.log("Starting upload to Firestore...");
      setUploading(true);
      const docRef = await addDoc(collection(db, "users"), dummyData);
      console.log("Document written with ID: ", docRef.id);
      setUploadFirestoreSuccess(true);
    } catch (error) {
      console.error("Upload to Firestore error", error);
      setUploadFirestoreError('Upload to Firestore failed: ' + error.message);
    } finally {
      console.log("Upload process finished (success or fail)");
      setUploading(false);
    }
  };

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <button onClick={uploadDataToFirestore} disabled={uploading} style={{
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
      }}>
        {uploading ? 'Uploading Data...' : 'Upload Data to Firestore'}
      </button>
      {uploadFirestoreSuccess && <p>Data upload successful!</p>}
      {uploadFirestoreError && <p style={{ color: 'red' }}>{uploadFirestoreError}</p>}
    </div>
  );
}

export default TestUpload;
