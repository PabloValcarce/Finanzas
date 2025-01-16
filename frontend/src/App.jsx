import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Home/Dashboard';
import Transaction from './pages/Transactions/TransactionsHome/Transaction';
import Savings from './pages/Transactions/Savings/SavingsPage';
import { TransactionsProvider } from './context/TransactionContext';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/transactions"
          element={
            <TransactionsProvider>
              <Transaction />
            </TransactionsProvider>} />
        <Route path="/transactions/savings" element={
          <TransactionsProvider>
            <Savings />
          </TransactionsProvider>
        } />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
