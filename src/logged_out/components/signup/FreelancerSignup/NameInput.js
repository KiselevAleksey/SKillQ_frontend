import React from 'react';
import InputField from '../SharedSignup/InputField';

const NameInput = ({ firstName, lastName, onNameChange }) => {
  const handleNameChange = (event) => {
    onNameChange(event.target.value, lastName);
  };

  const handleSurnameChange = (event) => {
    onNameChange(firstName, event.target.value);
  };

  return (
    
    <div className="card">
    <h1 style={{ marginBottom: '6px' }}>Мы рады вас видеть!</h1>
    <h3 style={{ marginBottom: '6px' }}>Давайте знакомиться</h3>
      <InputField
        label="Имя"
        type="text"
        name="firstName"
        value={firstName}
        placeholder="Введите ваше имя..."
        onChange={handleNameChange}
      />
      <div style={{ marginBottom: '6px' }}></div>
      <InputField
        label="Фамилия"
        type="text"
        name="lastName"
        value={lastName}
        placeholder="Введите вашу фамилию..."
        onChange={handleSurnameChange}
      />
    </div>
  );
};

export default NameInput;
