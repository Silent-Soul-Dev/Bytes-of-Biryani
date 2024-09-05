// src/App.jsx
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FranchiseStore from './components/FranchiseStore';
import Yard from './components/Yard';
import Manufacturer from './components/Manufacturer';

function App() {
  const [manufacturerOrders, setManufacturerOrders] = useState([]);
  const [franchiseOrders, setFranchiseOrders] = useState([]);

  useEffect(() => {
    const savedFranchiseOrders = JSON.parse(localStorage.getItem('franchiseOrders')) || [];
    setFranchiseOrders(savedFranchiseOrders);
  }, []);

  const handleSendOrderToYard = (orders) => {
    const newFranchiseOrders = [...franchiseOrders, orders];
    setFranchiseOrders(newFranchiseOrders);
    localStorage.setItem('franchiseOrders', JSON.stringify(newFranchiseOrders));
  };

  const handleSendOrderToManufacturer = (orders) => {
    setManufacturerOrders([...manufacturerOrders, ...orders]);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/franchise"
          element={<FranchiseStore sendOrderToYard={handleSendOrderToYard} />}
        />
        <Route
          path="/yard"
          element={
            <Yard
              franchiseOrders={franchiseOrders}
              sendOrderToManufacturer={handleSendOrderToManufacturer}
            />
          }
        />
        <Route
          path="/manufacturer"
          element={<Manufacturer orders={manufacturerOrders} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
