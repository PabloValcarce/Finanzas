import React, { useEffect } from 'react';
import { useTransactions } from '../../../context/TransactionContext'; // Asegúrate de importar el hook de contexto
import './SpentPage.css';
import NavBarTransaction from '../../../components/Transactions/TransactionNavBar/TransactionNavBar';
import useAuth from '../../../hooks/useAuth'; // Importa el hook useAuth

function SpentPage() {
  useAuth(); // Verifica la autenticación del usuario
  const { transactions, loadTransactions } = useTransactions(); // Accedemos a las transacciones del contexto

  // Cargar transacciones al montar el componente
  useEffect(() => {
    loadTransactions(); // Llama a la API una sola vez al montar el componente
  }, [loadTransactions]);

  // Filtrar las transacciones solo para gastos (suponiendo que tienes una categoría para gastos)
  const spentTransactions = transactions.filter(transaction => transaction.amount < 0); // Filtrar solo los gastos

  // Renderiza la página con transacciones
  return (
    <div className="spent-page">
      <NavBarTransaction />
      
    </div>
  );
}

export default SpentPage;
