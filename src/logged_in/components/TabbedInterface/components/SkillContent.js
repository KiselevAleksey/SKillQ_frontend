import React, { useState, useEffect } from 'react';
import useStyles from '../styles/useStyles';

const SkillContent = ({ title, description, subSkills }) => {
  const styles = useStyles();
  const [selectedSubSkills, setSelectedSubSkills] = useState(() => {
    // Initialize state from localStorage if available
    const savedSelections = localStorage.getItem('selectedSubSkills');
    return savedSelections ? JSON.parse(savedSelections) : [];
  });

  // Effect for localStorage persistence
  useEffect(() => {
    localStorage.setItem('selectedSubSkills', JSON.stringify(selectedSubSkills));
  }, [selectedSubSkills]);

  const handleSubSkillClick = (subSkill) => {
    setSelectedSubSkills((prevState) => {
      if (prevState.includes(subSkill)) {
        return prevState.filter((s) => s !== subSkill); // Deselect
      } else {
        return [...prevState, subSkill]; // Select
      }
    });
  };

  return (
    <div className={styles.tabContent}>
      <h2 className={styles.tabTitle}>{title}</h2>
      <p className={styles.tabParagraph}>{description}</p>
      {subSkills.map((subSkill) => (
        <div
          key={subSkill}
          className={`${styles.oval} ${selectedSubSkills.includes(subSkill) ? 'selected' : ''}`}
          onClick={() => handleSubSkillClick(subSkill)}
        >
          {subSkill}
        </div>
      ))}
    </div>
  );
};

export default SkillContent;
