import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useTransactions } from '../../../context/TransactionContext';
import './SpentPage.css';
import NavBarTransaction from '../../../components/Transactions/TransactionNavBar/TransactionNavBar';
import useAuth from '../../../hooks/useAuth';
import SpentSummary from '../../../components/Spent/SpentSummary/SpentSummary';
import SpentBarChart from '../../../components/Graphs/Spent/BarChart/SpentBarChart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
import SpentResults from '../../../components/Spent/SpentResults/SpentResults';

function SpentPage() {
  useAuth();
  const { transactions, loadTransactions } = useTransactions();

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  console.log("All Transactions:", transactions);

  const handleStartDateChange = (date) => {
    setStartDate(date);
    console.log("Start Date selected:", date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    console.log("End Date selected:", date);
  };

  const normalizeDate = (date) => {
    if (date) {
      const normalizedDate = new Date(date);
      // Ajustamos la hora para que sea medianoche, lo que elimina el posible desfase de zona horaria
      normalizedDate.setHours(0, 0, 0, 0);
      return normalizedDate;
    }
    return null;
  };

  const filterTransactionsByDate = () => {
    if (!startDate || !endDate) return transactions;

    // Normaliza las fechas de inicio y fin
    const normalizedStartDate = normalizeDate(startDate);
    const normalizedEndDate = normalizeDate(endDate);
    // Establecemos la hora de la fecha final a 23:59:59.999 para incluir todo el día
    normalizedEndDate.setHours(23, 59, 59, 999);

    // Filtra las transacciones por la fecha
    const filteredTransactions = transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      // Normalizamos la fecha de la transacción también
      const normalizedTransactionDate = normalizeDate(transactionDate);

      // Compara si la transacción está dentro del rango de fechas
      const isInDateRange = normalizedTransactionDate >= normalizedStartDate && normalizedTransactionDate <= normalizedEndDate;
      return isInDateRange;
    }).filter(transaction => transaction.amount < 0); // Solo gastos

    return filteredTransactions;
  };

  const spentTransactions = filterTransactionsByDate();

  return (
    <div className="spent-page">
      <NavBarTransaction />
      <div className="spent-content">
        <div className="date-filter">
          <label htmlFor="date-range">Filtro entre fechas :</label>
          <div className="date-picker">
            <DatePicker
              selected={startDate}
              onChange={handleStartDateChange}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              dateFormat="dd/MM/yyyy" // Formato europeo
              placeholderText="Fecha inicial"
            />
            <DatePicker
              selected={endDate}
              onChange={handleEndDateChange}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              dateFormat="dd/MM/yyyy" // Formato europeo
              placeholderText="Fecha final"
            />
            <button
              type="button"
              className="reset-dates-button"
              onClick={() => {
                setStartDate(null);
                setEndDate(null);
                console.log("Fechas reiniciadas");
              }}
            >
              <FontAwesomeIcon icon={faRotateRight} />
            </button>
          </div>
        </div>
        <div className="spent-data">
          <SpentSummary transactions={spentTransactions} />
          <div className="spent-graphs">
            <div className="spent-bar-chart">
              <SpentBarChart transactions={spentTransactions} />
            </div>
          </div>
          <div className="spent-list">
            <SpentResults expenses={spentTransactions} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpentPage;
