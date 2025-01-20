import React, { useEffect } from 'react';
import { useTransactions } from '../../../context/TransactionContext'; // Asegúrate de importar el hook de contexto
import SavingsSummary from '../../../components/Savings/Summary/SavingsSummary';
import './SavingsPage.css';
import NavBarTransaction from '../../../components/Transactions/TransactionNavBar/TransactionNavBar';
import SavingsLineChart from '../../../components/Graphs/Savings/LineChart/SavingsLineChart';
import SavingsCircularChart from '../../../components/Graphs/Savings/CircularChart/SavingsCircularChart';
import useAuth  from '../../../hooks/useAuth';  // Importa el hook useAuth

function SavingsPage() {
  useAuth();
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
        <SavingsSummary transactions={transactions} />
        <div className="graphs">
          <div className='savings-line-chart'>
            <SavingsLineChart transactions={transactions} />
          </div>
          <div className="savings-circular-chart">
            <SavingsCircularChart transactions={transactions} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SavingsPage;
