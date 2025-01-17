import React, { useEffect } from 'react';
import { useTransactions } from '../../../context/TransactionContext'; // Asegúrate de importar el hook de contexto
import SavingsSummary from '../../../components/Savings/Summary/SavingsSummary';
import './SavingsPage.css';
import NavBarTransaction from '../../../components/Transactions/TransactionNavBar/TransactionNavBar';
import SavingsLineChart from '../../../components/Graphs/Savings/LineChart/SavingsLineChart';

function SavingsPage() {
  const { transactions, loadTransactions } = useTransactions();  // Accedemos a las transacciones del contexto

  // Si las transacciones no están cargadas, las cargamos
  useEffect(() => {
    if (transactions.length === 0) {
      loadTransactions();
    }
  }, [transactions, loadTransactions]);

  // Renderiza las transacciones solo si están disponibles
  return (
    <div className="savings-page">
      <NavBarTransaction />
      <div className="savings-content">
        <div className='savings-line-chart'>
          <SavingsLineChart transactions={transactions} />
        </div>
        <SavingsSummary transactions={transactions} />
      </div>
    </div>
  );
}

export default SavingsPage;
