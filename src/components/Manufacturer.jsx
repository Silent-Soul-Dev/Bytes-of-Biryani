import PropTypes from 'prop-types';
import '../css/app.css';

const Manufacturer = ({ orders }) => {
  return (
    <div className="manufacturer-interface">
      <h1>Manufacturer Interface</h1>

      <h2>Received Orders</h2>
      <ul>
        {orders.length > 0 ? (
          orders.map((order) => (
            <li key={order.id}>
              {order.items.map((item) => item.name).join(', ')} - {order.status}
            </li>
          ))
        ) : (
          <p>No orders received yet</p>
        )}
      </ul>
    </div>
  );
};

Manufacturer.propTypes = {
  orders: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
        })
      ).isRequired,
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Manufacturer;
