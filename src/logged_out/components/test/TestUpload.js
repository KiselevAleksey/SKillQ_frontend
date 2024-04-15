import React, { useState } from 'react';
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const TestUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadStorageSuccess, setUploadStorageSuccess] = useState(false);
  const [uploadFirestoreSuccess, setUploadFirestoreSuccess] = useState(false);

  const uploadFileToStorage = async () => {
    const storage = getStorage();

    // Create a dummy file to upload
    const dummyContent = new Blob(['Hello Firebase Storage!'], { type: 'text/plain' });
    const dummyFile = new File([dummyContent], "testfile.txt");

    try {
      setUploading(true);
      const storageRef = ref(storage, `test_uploads/${dummyFile.name}`);
      await uploadBytes(storageRef, dummyFile);
      console.log("File uploaded successfully to storage!");
      setUploadStorageSuccess(true);
    } catch (error) {
      console.error("Upload to storage error:", error);
      console.log(`Error code: ${error.code}`);
      console.log(`Error message: ${error.message}`);
      if (error.details) {
        console.log(`Error details: ${error.details}`);
      }
      alert("There was an issue with your file upload. Please try again.");
      setUploadStorageSuccess(false);
    } finally {
      setUploading(false);
    }
  };

  const uploadDataToFirestore = async () => {
    const db = getFirestore();

    // Create a dummy data object to upload
    const dummyData = {
      name: "John Doe",
      email: "johndoe@example.com",
      cvUrl: "http://example.com/cv/johndoe", // Dummy cvUrl
    };

    try {
      setUploading(true);
      const docRef = await addDoc(collection(db, "users"), dummyData);
      console.log("Document written with ID: ", docRef.id);
      setUploadFirestoreSuccess(true);
    } catch (error) {
      console.error("Upload to Firestore error:", error);
      console.log(`Error code: ${error.code}`);
      console.log(`Error message: ${error.message}`);
      if (error.details) {
        console.log(`Error details: ${error.details}`);
      }
      alert("There was an issue with your Firestore upload. Please try again.");
      setUploadFirestoreSuccess(false);
    } finally {
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
      <button onClick={uploadFileToStorage} disabled={uploading} style={{
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        marginBottom: '10px',
      }}>
        {uploading ? 'Uploading File...' : 'Upload File to Storage'}
      </button>
      {uploadStorageSuccess && <p>File upload successful!</p>}
      
      <button onClick={uploadDataToFirestore} disabled={uploading} style={{
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
      }}>
        {uploading ? 'Uploading Data...' : 'Upload Data to Firestore'}
      </button>
      {uploadFirestoreSuccess && <p>Data upload successful!</p>}
    </div>
  );
}

export default TestUpload;
