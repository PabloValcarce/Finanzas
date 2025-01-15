import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Home/Dashboard';
import Transaction from './pages/Transactions/TransactionsHome/Transaction';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/transactions" element={<Transaction />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
