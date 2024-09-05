import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../css/app.css';

const Yard = ({ franchiseOrders, sendOrderToManufacturer, removeOrderFromFranchise }) => {
  const [sentOrders, setSentOrders] = useState({}); // Store sent orders as an object {id: orderObj}

  // Load sent orders from localStorage
  useEffect(() => {
    const savedSentOrders = JSON.parse(localStorage.getItem('sentOrders')) || {};
    setSentOrders(savedSentOrders);
  }, []);

  // Save sent orders to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('sentOrders', JSON.stringify(sentOrders));
  }, [sentOrders]);

  // Send order to the manufacturer and update sent orders
  const sendOrder = (order, index) => {
    const orderId = Date.now();
    const newSentOrder = { id: orderId, items: order, status: 'Sent' };

    // Update sent orders state
    setSentOrders((prevOrders) => ({
      ...prevOrders,
      [orderId]: newSentOrder,
    }));

    // Send the order to the manufacturer
    sendOrderToManufacturer([newSentOrder]);

    // Remove the order from pending franchise orders
    removeOrderFromFranchise(index); // Call the parent function to remove the order
  };

  // Mark order as successful
  const markOrderSuccessful = (orderId) => {
    setSentOrders((prevOrders) => {
      const { [orderId]: removedOrder, ...remainingOrders } = prevOrders;
      return remainingOrders;
    });
  };

  return (
    <div className="yard-interface">
      <h1>Yard Interface</h1>

      {/* Pending Franchise Orders */}
      <h2>Pending Orders from Franchises</h2>
      <ul>
        {franchiseOrders.length > 0 ? (
          franchiseOrders.map((order, idx) => (
            <li key={idx}>
              {order.map((item) => item.name).join(', ')}
              <button onClick={() => sendOrder(order, idx)}>Send to Manufacturer</button>
            </li>
          ))
        ) : (
          <p>No pending orders from franchises</p>
        )}
      </ul>

      {/* Sent Orders with Status Tracking */}
      <h2>Sent Orders</h2>
      <ul>
        {Object.values(sentOrders).map((orderObj) => (
          <li key={orderObj.id}>
            {orderObj.items.map((item) => item.name).join(', ')} - {orderObj.status}
            {orderObj.status === 'Sent' && (
              <button onClick={() => markOrderSuccessful(orderObj.id)}>
                Mark as Successful
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

Yard.propTypes = {
  franchiseOrders: PropTypes.array.isRequired,
  sendOrderToManufacturer: PropTypes.func.isRequired,
  removeOrderFromFranchise: PropTypes.func.isRequired, // New prop for removing the order
};

export default Yard;
