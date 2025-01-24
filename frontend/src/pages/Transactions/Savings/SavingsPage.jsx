import React, { useEffect } from 'react';
import { useTransactions } from '../../../context/TransactionContext'; // Asegúrate de importar el hook de contexto
import SavingsSummary from '../../../components/Savings/Summary/SavingsSummary';
import './SavingsPage.css';
import NavBarTransaction from '../../../components/Transactions/TransactionNavBar/TransactionNavBar';
import SavingsLineChart from '../../../components/Graphs/Savings/LineChart/SavingsLineChart';
import SavingsCircularChart from '../../../components/Graphs/Savings/CircularChart/SavingsCircularChart';
import useAuth from '../../../hooks/useAuth'; // Importa el hook useAuth

function SavingsPage() {
  useAuth(); // Verifica la autenticación del usuario
  const { transactions, loadTransactions } = useTransactions(); // Accedemos a las transacciones del contexto

  // Cargar transacciones al montar el componente
  useEffect(() => {
    loadTransactions(); // Llama a la API una sola vez al montar el componente
  }, [loadTransactions]);

  // Renderiza la página con transacciones
  return (
    <div className="savings-page">
      <NavBarTransaction />
      <div className="savings-content">
        <SavingsSummary transactions={transactions} />
        <div className="savings-graphs">
          <div className="savings-line-chart">
            <SavingsLineChart transactions={transactions} />
          </div>
          <div className="savings-circular-chart">
            <h1 className="savings-circular-chart-title">Ahorro este mes</h1>
            <SavingsCircularChart transactions={transactions} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SavingsPage;
