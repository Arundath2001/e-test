import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/cart').then(response => {
      setCartItems(response.data);
    });
  }, []);

  const checkout = () => {
    navigate('/checkout');
  };

  return (
    <div>
      <h1>Shopping Cart</h1>
      <div>
        {cartItems.map(item => (
          <div key={item.id}>
            <h2>{item.product.name}</h2>
            <p>Quantity: {item.quantity}</p>
          </div>
        ))}
      </div>
      <button onClick={checkout}>Proceed to Checkout</button>
    </div>
  );
};

export default Cart;
