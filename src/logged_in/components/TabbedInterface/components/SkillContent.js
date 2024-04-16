import React, { useState, useEffect } from 'react';
import { useTheme, useMediaQuery } from '@mui/material';
import useStyles from '../styles/useStyles';

const SkillContent = ({ title, description, subSkills }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const styles = useStyles();
  const [selectedSubSkills, setSelectedSubSkills] = useState(() => {
    // Initialize state from localStorage if available
    const savedSelections = localStorage.getItem('selectedSubSkills');
    return savedSelections ? JSON.parse(savedSelections) : [];
  });

  useEffect(() => {
    // Persist to localStorage
    localStorage.setItem('selectedSubSkills', JSON.stringify(selectedSubSkills));
  }, [selectedSubSkills]);

  const handleSubSkillClick = (subSkill) => {
    setSelectedSubSkills((prevSelected) => {
      const isSelected = prevSelected.includes(subSkill);
      return isSelected ? prevSelected.filter((s) => s !== subSkill) : [...prevSelected, subSkill];
    });
  };

  // Make sure to adapt styles for mobile as needed
  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: theme.spacing(2) }}>
        {subSkills.map((skill) => (
          <div
            key={skill}
            className={`${styles.oval} ${selectedSubSkills.includes(skill) ? styles.selected : ''}`}
            onClick={() => handleSubSkillClick(skill)}
            style={{
              padding: theme.spacing(isMobile ? 1 : 2),
              fontSize: theme.typography.pxToRem(isMobile ? 14 : 16),
              cursor: 'pointer',
            }}
          >
            {skill}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillContent;
