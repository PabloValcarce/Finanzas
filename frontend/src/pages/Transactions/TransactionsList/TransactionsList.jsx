import React, { useEffect } from 'react';
import TransactionsResults from '../../../components/TransactionsResults/TransactionsResults'; 
import { useTransactions } from '../../../context/TransactionContext';
import NavBarTransaction from '../../../components/Transactions/TransactionNavBar/TransactionNavBar';
import AddTransaction from '../../../components/Transactions/AddTransaction/AddTransaction';
import useAuth  from '../../../hooks/useAuth';  

function TransactionsList() {
    useAuth();  
    const { transactions, loadTransactions } = useTransactions();  
    const userId = localStorage.getItem('userId');
    useEffect(() => {
        if (transactions.length === 0) {
            loadTransactions();
        }
    }, [transactions, loadTransactions]);

    return (
        <div className="list-page">
            <NavBarTransaction />
            <AddTransaction userId={userId} />
            <TransactionsResults transactions={transactions} />
        </div>
    );
}

export default TransactionsList;
