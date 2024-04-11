import React from 'react';
import InputField from '../SharedSignup/InputField';

const sendGAEvent = ({ action, category, label, value }) => {
  if (window.gtag) {
    window.gtag('event', action, {
      'event_category': category,
      'event_label': label,
      'value': value
    });
  }
};

const ExperienceLevel = ({ experience, onExperienceChange }) => {

  const handleExperienceChange = (event) => {
    const newValue = event.target.value;
    if (newValue >= 0 && newValue <= 50) {
      onExperienceChange(event);
      sendGAEvent({
        category: 'Experience Level',
        action: 'Updated Experience',
        label: `Experience: ${newValue} years`
      });
    }
  };

  return (
    <div className="side-content">
      <div
        className="card"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <h1>Ваш опыт работы?</h1>
        <InputField
          label="Сколько лет вы работаете?"
          type="number"
          name="experience"
          value={experience}
          placeholder="Введите число лет"
          onChange={handleExperienceChange} // Updated to use handleExperienceChange
        />
      </div>
    </div>
  );
};

export default ExperienceLevel;
