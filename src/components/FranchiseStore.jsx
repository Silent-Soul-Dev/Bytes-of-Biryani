// src/components/FranchiseStore.jsx
import { useState } from 'react';
import PropTypes from 'prop-types';
import { products } from '../data';
import ProductCard from './ProductCard';
import '../css/app.css';

const FranchiseStore = ({ sendOrderToYard }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const placeOrder = () => {
    if (cart.length > 0) {
      sendOrderToYard(cart); // Send order to Yard component
      setCart([]); // Clear cart after placing the order
      localStorage.setItem('franchiseOrders', JSON.stringify([...JSON.parse(localStorage.getItem('franchiseOrders') || '[]'), cart]));
    } else {
      alert('Cart is empty!');
    }
  };

  return (
    <div className="franchise-store">
      <h1>Franchise Store</h1>
      <div className="products-list">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>
      <div className="cart">
        <h2>Cart</h2>
        {cart.length > 0 ? (
          <ul>
            {cart.map((item, idx) => (
              <li key={idx}>{item.name}</li>
            ))}
          </ul>
        ) : (
          <p>Cart is empty</p>
        )}
        <button onClick={placeOrder} disabled={cart.length === 0}>Place Order</button>
      </div>
    </div>
  );
};

FranchiseStore.propTypes = {
  sendOrderToYard: PropTypes.func.isRequired,
};

export default FranchiseStore;
