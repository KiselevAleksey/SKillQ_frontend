import React, { useState } from 'react';
import { Box, Button, CircularProgress, Checkbox, FormControl, FormControlLabel, FormGroup, Radio, RadioGroup, Typography } from '@mui/material';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const CategorySelector = ({ categories, onSubmit }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const firestore = getFirestore();
  const storage = getStorage();

  // Placeholder subcategories data structure
  const subcategories = {
    Marketing: ['Social Media Marketing', 'Email Marketing', 'Marketing Strategy', 'Content Marketing', 'SEO'],
    Strategy: ['Business Strategy', 'Operational Efficiency', 'Growth Planning'],
    Management: ['Team Leadership', 'Resource Allocation', 'Performance Measurement']
  };

  const handleChangeCategory = (event) => {
    setSelectedCategory(event.target.value);
    setSelectedSubCategories([]); // Reset subcategories when changing category
  };

  const handleSelectSubCategory = (event) => {
    const value = event.target.value;
    setSelectedSubCategories((prevSelected) =>
      prevSelected.includes(value)
        ? prevSelected.filter((sub) => sub !== value)
        : [...prevSelected, value]
    );
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
    const questionData = await fetchRandomQuestions(selectedCategory);
    if (questionData) {
      onSubmit(questionData);
    } else {
      console.error('Error fetching question data');
    }
  };

  const renderSubCategories = (category) => {
    return (
      <>
          <Typography 
            variant="subtitle1" 
            fontWeight='bold' 
            sx={{ pt: 2 }} // This adds padding-top with the theme's spacing multiplier
            gutterBottom
          >
            Please pick sub-categories:
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 2 }}>
            {subcategories[category].map((subcat) => (
              <FormControlLabel
                key={subcat}
                control={
                  <Checkbox
                    checked={selectedSubCategories.includes(subcat)}
                    onChange={handleSelectSubCategory}
                    value={subcat}
                  />
                }
                label={subcat}
              />
            ))}
          </Box>
      </>
    );
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Please choose the category to make an assessment on.
      </Typography>
      <FormControl component="fieldset">
        <RadioGroup
          aria-label="category"
          name="category"
          value={selectedCategory}
          onChange={handleChangeCategory}
        >
          {categories.map((category, index) => (
            <FormControlLabel
              key={category}
              value={category}
              control={<Radio />}
              label={category}
            />
          ))}
        </RadioGroup>
        {selectedCategory && (
          <FormGroup>
            {renderSubCategories(selectedCategory)}
          </FormGroup>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={!selectedCategory || !selectedSubCategories.length || loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Submit'}
        </Button>
      </FormControl>
    </div>
  );
};

export default CategorySelector;