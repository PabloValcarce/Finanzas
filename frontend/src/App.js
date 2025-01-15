import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Home/Dashboard';
import Transactions from './pages/Transactions/Transactions';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
