import React, { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash/debounce';
import InputField from '../SharedSignup/InputField';
import RadioGroup from '../SharedSignup/RadioGroup';
import { CircularProgress } from '@mui/material';

const RoleSelection = ({ onSelectRole, selectedRole, firstName, lastName }) => {
  const [userInput, setUserInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendGAEvent = ({ action, category, label }) => {
    if (window.gtag) {
      window.gtag('event', action, {
        'event_category': category,
        'event_label': label
      });
    }
  };

  const fetchSuggestions = async (input) => {
    setIsLoading(true); // Set loading to true before fetching
    try {
      const response = await fetch('https://suggest-roles-function-7f66zsal7a-uc.a.run.app', {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_input: input }),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setSuggestions(data.suggestions.map(suggestion => ({ label: suggestion, value: suggestion })));
    } catch (error) {
      console.error('Failed to fetch suggestions:', error);
    }
    setIsLoading(false); // Set loading to false after fetching
  };

  const debouncedFetchSuggestions = useCallback(debounce((input) => {
    fetchSuggestions(input);
  }, 350), []); // Adjust debounce time as needed

  useEffect(() => {
    if (userInput) {
      debouncedFetchSuggestions(userInput);
    }
  }, [userInput, debouncedFetchSuggestions]);

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleRadioChange = (selectedOption) => {
    onSelectRole(selectedOption); // Update the selected role
  };

  return (
    <div>
      {isLoading && (
        <div style={{ position: 'absolute', zIndex: 1000 }}>
          <CircularProgress />
        </div>
      )}
      <div className="card">
        <h1>Your Profession</h1>
        <InputField
          label="Tell us what you do"
          type="text"
          name="role"
          value={userInput}
          placeholder="Enter your specialty..."
          onChange={handleInputChange}
        />
        {suggestions.length > 0 && (
          <div style={{ marginTop: '20px', width: '100%' }}>
            <RadioGroup
              options={suggestions}
              selectedOption={selectedRole}
              onChange={handleRadioChange}
              label="Choose your main specialty"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default RoleSelection;
