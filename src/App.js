// src/App.js
import React from 'react';
import GPayButton from './components/GpayButton';

const App = () => {
  return (
    <div className="App">
      <h1>Test Product</h1>
      <p>Price: $10.00</p>
      <GPayButton />
    </div>
  );
};

export default App;
