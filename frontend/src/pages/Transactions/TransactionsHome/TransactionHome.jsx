import React, { useEffect } from 'react';
import NavBarTransaction from '../../../components/Transactions/TransactionNavBar/TransactionNavBar';
import './TransactionHome.css'; 
import TransactionsList from '../../../components/Transactions/TransactionsList/TransactionsList';
import AddTransaction from '../../../components/Transactions/TransactionAdd/TransactionAdd';
import { useTransactions } from '../../../context/TransactionContext';

function Transaction() {
    const { transactions, loadTransactions } = useTransactions();
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        loadTransactions();
    }, [loadTransactions]);

    const handleTransactionAdded = (newTransaction) => {
        loadTransactions();
    };

    return (
        <div className="transactions-page">
            <NavBarTransaction />
            <AddTransaction userId={userId} onTransactionAdded={handleTransactionAdded} />
            <TransactionsList transactions={transactions} />
        </div>
    );
}

export default Transaction;
