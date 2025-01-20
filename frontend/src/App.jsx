import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Home/Dashboard';
import Transactions from './pages/Transactions/TransactionsHome/TransactionHome';
import { TransactionsProvider } from './context/TransactionContext'; // Contexto de transacciones
import SavingsPage from './pages/Transactions/Savings/SavingsPage';
import TransactionsList from './pages/Transactions/TransactionsList/TransactionsList';

function App() {

  return (
    <Router>
      <Routes>
        {/* Rutas que no necesitan contexto */}
        <Route path="/" element={<Dashboard />} />

        {/* Rutas que comparten el contexto */}
        <Route
          path="/*"
          element={
            <TransactionsProvider> {/* Contexto */}
              <Routes>
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/transactions/savings" element={<SavingsPage />} />
                <Route path="/transactions/list" element={<TransactionsList />} />
              </Routes>
            </TransactionsProvider>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
