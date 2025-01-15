import React, { useState, useEffect } from 'react';
import NavBarTransaction from '../../../components/Transactions/NavBarTransaction/NavBarTransaction';
import './Transaction.css'; 
import TransactionsList from '../../../components/Transactions/TransactionsList/TransactionsList';
import AddTransaction from '../../../components/Transactions/AddTransaction/AddTransaction';
import axios from 'axios';

function Transaction() {
    const [transactions, setTransactions] = useState([]);
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get('/transactions');
                setTransactions(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchTransactions();
    }, []);

    const handleTransactionAdded = (newTransaction) => {
        setTransactions([...transactions, newTransaction]);
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