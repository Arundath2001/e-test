import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const navigate = useNavigate();

  const placeOrder = () => {
    axios.post('http://localhost:5000/api/orders').then(() => {
      navigate('/');
    });
  };

  return (
    <div>
      <h1>Checkout</h1>
      <button onClick={placeOrder}>Place Order</button>
    </div>
  );
};

export default Checkout;
