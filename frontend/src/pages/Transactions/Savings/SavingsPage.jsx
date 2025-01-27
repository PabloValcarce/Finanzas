import React, { useEffect, useState } from 'react';
import { useTransactions } from '../../../context/TransactionContext';
import SavingsSummary from '../../../components/Savings/Summary/SavingsSummary';
import './SavingsPage.css';
import NavBarTransaction from '../../../components/Transactions/TransactionNavBar/TransactionNavBar';
import SavingsLineChart from '../../../components/Graphs/Savings/LineChart/SavingsLineChart';
import SavingsCircularChart from '../../../components/Graphs/Savings/CircularChart/SavingsCircularChart';
import useAuth from '../../../hooks/useAuth';
import DateRangePicker from '../../../components/DateRangePicker/DateRangePicker';

function SavingsPage() {
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
    });
  };

  const handleResetDates = () => {
    setDateRange({ startDate: null, endDate: null });
  };

  const filteredTransactions = filterTransactionsByDate();

  return (
    <div className="savings-page">
      <NavBarTransaction />
      <div className="savings-content">
        <div className="date-filter">
          <label htmlFor="date-range">Filtro entre fechas :</label>
          <DateRangePicker
            startDate={dateRange.startDate}
            endDate={dateRange.endDate}
            onDateRangeChange={setDateRange}
            onReset={handleResetDates}
          />
        </div>
        <div className="savings-data">
          <SavingsSummary transactions={filteredTransactions} />
          <div className="savings-graphs">
            <div className="savings-line-chart">
              <SavingsLineChart transactions={filteredTransactions} />
            </div>
            <div className="savings-circular-chart">
              <SavingsCircularChart transactions={transactions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SavingsPage;
