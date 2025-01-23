import React, { useEffect } from 'react';
import TransactionsResults from '../../../components/TransactionsResults/TransactionsResults';
import { useTransactions } from '../../../context/TransactionContext';
import NavBarTransaction from '../../../components/Transactions/TransactionNavBar/TransactionNavBar';
import AddTransaction from '../../../components/Transactions/AddTransaction/AddTransaction';
import useAuth from '../../../hooks/useAuth';
import './TransactionsList.css';

function TransactionsList() {
    useAuth();
    const { transactions, loadTransactions } = useTransactions();
    const userId = localStorage.getItem('userId');
    useEffect(() => {
        if (transactions.length === 0) {
            loadTransactions();
        }
    }, [transactions.length, loadTransactions]);

    console.log(transactions.length > 0 ? transactions[0].id : 'No transactions available');
    
    return (
        <div className="list-page">
            <NavBarTransaction />
            <div className="list-content">
                <div className="button-add">
                    <AddTransaction userId={userId} />
                </div>
                <TransactionsResults transactions={transactions} />
            </div>
        </div>
    );
}

export default TransactionsList;
