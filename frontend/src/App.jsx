import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Home/Dashboard';
import Transactions from './pages/Transactions/TransactionsHome/TransactionHome';
import SavingsPage from './pages/Transactions/Savings/SavingsPage';
import SpentPage from './pages/Transactions/Spent/SpentPage';
import TransactionsList from './pages/Transactions/TransactionsList/TransactionsList';
import AppContextProvider from './context/AppContextProvider'; // Importa el nuevo proveedor

function App() {
  return (
    <Router>
      <AppContextProvider>  {/* Usa el AppContextProvider que incluye ambos contextos */}
        <Routes>
          {/* Rutas que no necesitan contexto */}
          <Route path="/" element={<Dashboard />} />

          {/* Rutas que comparten el contexto de transacciones y categorías */}
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/transactions/savings" element={<SavingsPage />} />
          <Route path="/transactions/spent" element={<SpentPage />} />
          <Route path="/transactions/list" element={<TransactionsList />} />
        </Routes>
      </AppContextProvider>
    </Router>
  );
}

export default App;
