import React from 'react';
import SelectDropdown from '../SharedSignup/SelectDropdown';

const workPreferences = [
  { label: "Очно", value: "online" },
  { label: "Удаленно", value: "offline" },
  // ... other preferences
];

const LocationPreference = ({ selectedPreference, onSelectPreference }) => {
  const sendGAEvent = ({ action, category, label }) => {
    if (window.gtag) {
      window.gtag('event', action, {
        'event_category': category,
        'event_label': label
      });
    }
  };

  const handleLocationPreferenceChange = (event) => {
    onSelectPreference(event);
    sendGAEvent({
      category: 'Location Preference',
      action: 'Updated Location Preference',
      label: `Preference: ${event.target.value}`
    });
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
        <h1>Предпочтительный режим работы</h1>
        <SelectDropdown
          label="Работа из офиса или удаленно?"
          name="workPreference"
          options={workPreferences}
          value={selectedPreference}
          onChange={handleLocationPreferenceChange}
        />
      </div>
    </div>
  );
};

export default LocationPreference;

