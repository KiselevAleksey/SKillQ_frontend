import React, { useState } from 'react';
import { Button, CircularProgress, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const CategorySelector = ({ categories, onSubmit }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const firestore = getFirestore();
  const storage = getStorage();

  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const fetchRandomQuestions = async (category) => {
    setLoading(true);

    // Fetch the first random question
    const categoryRef = doc(firestore, 'interview_questions', category);
    const docSnap = await getDoc(categoryRef);
    if (!docSnap.exists()) {
      console.error('No such document!');
      setLoading(false);
      return;
    }

    const data = docSnap.data();
    let questionIDs = Object.keys(data);
    let randomIndex = Math.floor(Math.random() * questionIDs.length);
    let randomQuestionID = questionIDs[randomIndex];
    let questionText = data[randomQuestionID];

    const videoRef = ref(storage, `/video_questions_for_assessment/Question_1/${category}/${randomQuestionID}.mp4`);
    const videoURL = await getDownloadURL(videoRef).catch(error => {
      console.error('Failed to fetch video:', error);
      setLoading(false);
      return;
    });

    // Fetch the second random question from ${category}_case
    const caseCategoryRef = doc(firestore, 'interview_questions', `${category}_case`);
    const caseDocSnap = await getDoc(caseCategoryRef);
    if (!caseDocSnap.exists()) {
      console.error('No such document!');
      setLoading(false);
      return;
    }

    const caseData = caseDocSnap.data();
    questionIDs = Object.keys(caseData);
    randomIndex = Math.floor(Math.random() * questionIDs.length);
    randomQuestionID = questionIDs[randomIndex];
    const caseQuestionText = caseData[randomQuestionID];

    const caseVideoRef = ref(storage, `/video_questions_for_assessment/Question_1/${category}_case/${randomQuestionID}.mp4`);
    const caseVideoURL = await getDownloadURL(caseVideoRef).catch(error => {
      console.error('Failed to fetch video:', error);
      setLoading(false);
      return;
    });

    setLoading(false);
    return {
      firstQuestion: { questionText, videoURL },
      secondQuestion: { questionText: caseQuestionText, videoURL: caseVideoURL }
    };
  };

  const handleSubmit = async () => {
    console.log('Selected category:', selectedCategory);
    const questionData = await fetchRandomQuestions(selectedCategory);
    if (questionData) {
      onSubmit(questionData);
    } else {
      console.error('Error fetching question data');
    }
  };

  return (
    <div>
      <Typography variant="h6">
        Please choose the category to make an assessment on.
      </Typography>
      <FormControl component="fieldset">
        <RadioGroup
          aria-label="category"
          name="category"
          value={selectedCategory}
          onChange={handleChange}
        >
          {categories.map((cat, index) => (
            <FormControlLabel
              key={index}
              value={cat}
              control={<Radio />}
              label={cat}
            />
          ))}
        </RadioGroup>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={!selectedCategory || loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Submit'}
        </Button>
      </FormControl>
    </div>
  );
};

export default CategorySelector;
