import React, { useEffect, useState } from 'react';
import { useTransactions } from '../../../context/TransactionContext';
import './SpentPage.css';
import NavBarTransaction from '../../../components/Transactions/TransactionNavBar/TransactionNavBar';
import useAuth from '../../../hooks/useAuth';
import SpentSummary from '../../../components/Spent/SpentSummary/SpentSummary';
import SpentBarChart from '../../../components/Graphs/Spent/BarChart/SpentBarChart';
import SpentResults from '../../../components/Spent/SpentResults/SpentResults';
import DateRangePicker from '../../../components/DateRangePicker/DateRangePicker';

function SpentPage() {
  useAuth();
  const { transactions, loadTransactions } = useTransactions();
  const [dateRange, setDateRange] = useState({ startDate: null, endDate: null });

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  const filterTransactionsByDate = () => {
    const { startDate, endDate } = dateRange;
    if (!startDate || !endDate) return transactions;

    return transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      return transactionDate >= startDate && transactionDate <= endDate;
    }).filter(transaction => transaction.amount < 0); // Solo gastos
  };

  const handleResetDates = () => {
    setDateRange({ startDate: null, endDate: null });
  };

  const filteredTransactions = filterTransactionsByDate();

  return (
    <div className="spent-page">
      <NavBarTransaction />
      <div className="spent-content">
        <div className="date-filter">
          <label htmlFor="date-range">Filtro entre fechas :</label>
          <DateRangePicker
            startDate={dateRange.startDate}
            endDate={dateRange.endDate}
            onDateRangeChange={setDateRange}
            onReset={handleResetDates}
          />
        </div>
        <div className="spent-data">
          <SpentSummary transactions={filteredTransactions} />
          <div className="spent-graphs">
            <div className="spent-bar-chart">
              <SpentBarChart transactions={filteredTransactions} />
            </div>
          </div>
          <div className="spent-list">
            <SpentResults expenses={filteredTransactions} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpentPage;
