import React, { useState } from 'react';
import './App.css'; // Import the CSS file

function App() {
  const [creditCardNumber, setCreditCardNumber] = useState('');
  const [isValid, setIsValid] = useState(null);

  const handleValidation = () => {
    console.log('validating')
    const apiUrl = 'http://localhost:5000/validate'; // Replace with your Express service URL
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ creditCardNumber }),
    };
  
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((data) => setIsValid(data.valid))
      .catch((error) => console.error(error));
  };
  
  const inputClass = isValid ? 'valid-input' : isValid === false ? 'invalid-input' : '';
  return (
    <div className="container">
      <h1>Credit Card Validation</h1>
      <form>
        <label>
          Enter Credit Card Number:
          <input
            type="text"
            value={creditCardNumber}
            onChange={(e) => setCreditCardNumber(e.target.value)}
            placeholder="1234-5678-9012-3456"
            className={inputClass}
          />
        </label>
        <button type="button" onClick={handleValidation}>
          Validate
        </button>
      </form>
      {isValid !== null && (
        <p className="result">
          Credit Card is {isValid ? 'valid' : 'invalid'}
        </p>
      )}
    </div>

  );
}

export default App;
