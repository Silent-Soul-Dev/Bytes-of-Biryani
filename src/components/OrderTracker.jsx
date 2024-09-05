// src/components/OrderTracker.jsx

// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import '../css/app.css';

const OrderTracker = ({ orders }) => {
  // Ensure orders is an array before using map
  if (!Array.isArray(orders)) {
    return <div>Invalid orders data</div>;
  }

  return (
    <div className="order-tracker">
      <h1>Order Tracker</h1>
      <ul>
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <li key={index}>
              <div>
                <strong>Order ID:</strong> {order.id || 'N/A'}
              </div>
              <div>
                <strong>Status:</strong> {order.status || 'Unknown'}
              </div>
              <div>
                <strong>Items:</strong> {order.items.map(item => item.name).join(', ')}
              </div>
            </li>
          ))
        ) : (
          <div>No orders to display</div>
        )}
      </ul>
    </div>
  );
};

// Props validation
OrderTracker.propTypes = {
  orders: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      status: PropTypes.string.isRequired,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
};

// Default props
OrderTracker.defaultProps = {
  orders: [],
};

export default OrderTracker;
