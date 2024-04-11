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

const DailyRate = ({ rate, onRateChange }) => {
  const handleRateChange = (event) => {
    onRateChange(event);
    sendGAEvent({
      category: 'Daily Rate',
      action: 'Updated Daily Rate',
      label: `Daily Rate: ${event.target.value} RUB`
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
      <h1>Desired Daily Rate</h1>
      <InputField
        label="Daily Rate (RUB)"
        type="number"
        name="dailyRate"
        value={rate}
        placeholder="Enter your daily rate"
        onChange={handleRateChange}
      />
      </div>
    </div>
  );
};

export default DailyRate;
