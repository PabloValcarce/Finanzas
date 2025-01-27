import React, { useEffect, useState } from 'react';
import TransactionsResults from '../../../components/TransactionsResults/TransactionsResults';
import { useTransactions } from '../../../context/TransactionContext';
import NavBarTransaction from '../../../components/Transactions/TransactionNavBar/TransactionNavBar';
import AddTransaction from '../../../components/Transactions/AddTransaction/AddTransaction';
import useAuth from '../../../hooks/useAuth';
import './TransactionsList.css';
import DateRangePicker from '../../../components/DateRangePicker/DateRangePicker';

function TransactionsList() {
    useAuth();
    const { transactions, loadTransactions } = useTransactions();
    const userId = localStorage.getItem('userId');
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
        <div className="list-page">
            <NavBarTransaction />
            <div className="head">
                <div className="head-date-picker">
                    <label htmlFor="date-range">Filtro entre fechas :</label>

                </div>
                <div className="head-filter-add">
                    <DateRangePicker
                        startDate={dateRange.startDate}
                        endDate={dateRange.endDate}
                        onDateRangeChange={setDateRange}
                        onReset={handleResetDates}
                    />
                    <AddTransaction userId={userId} />
                </div>
            </div>
            <div className="list-content">
                <div className="transactions-results">
                    <TransactionsResults transactions={filteredTransactions} />
                </div>
            </div>
        </div>
    );
}

export default TransactionsList;
