import React, { useMemo } from 'react';
import CheckboxGroup from '../SharedSignup/CheckboxGroup';
import { roleToSkillsMap } from './utilities/roleSkillsMap';

const SkillsSelection = ({ selectedSkills, onSelectSkill, selectedRole }) => {
  const sendGAEvent = ({ action, category, label }) => {
    if (window.gtag) {
      window.gtag('event', action, {
        'event_category': category,
        'event_label': label
      });
    }
  };

  const skillsOptions = useMemo(() => {
    let skillsSet = new Set();

    if (roleToSkillsMap[selectedRole]) {
      roleToSkillsMap[selectedRole].forEach(skill => skillsSet.add({ label: skill.toUpperCase(), value: skill }));
    }

    return Array.from(skillsSet);
  }, [selectedRole]); 

  const handleSkillsChange = (selectedOptions) => {
    onSelectSkill(selectedOptions);
    sendGAEvent({
      category: 'Skills Selection',
      action: 'Updated Skills',
      label: `Skills: ${selectedOptions.map(option => option.value).join(', ')}`
    });
  };

  return (
    <div className="content">
    <div className="card-container">
      <div className="card">
        <h1>Ваши навыки</h1>
        <CheckboxGroup
          label="Выберите ваши навыки (вы можете изменить их далее)"
          options={skillsOptions}
          selectedOptions={selectedSkills}
          // We pass the new handler to the onChange prop
          onChange={handleSkillsChange}
        />
        </div>
      </div>
    </div>
  );
};

export default SkillsSelection;
