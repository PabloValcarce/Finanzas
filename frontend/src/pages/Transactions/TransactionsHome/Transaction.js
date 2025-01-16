import React, { useState, useEffect } from 'react';
import NavBarTransaction from '../../../components/Transactions/NavBarTransaction/NavBarTransaction';
import './Transaction.css'; 
import TransactionsList from '../../../components/Transactions/TransactionsList/TransactionsList';
import AddTransaction from '../../../components/Transactions/AddTransaction/AddTransaction';
import api from '../../../services/api';

function Transaction() {
    const [transactions, setTransactions] = useState([]);
    const userId = localStorage.getItem('userId'); // Obtienes el ID del usuario del localStorage

    const fetchTransactions = async () => {
        try {
            const response = await api.get('/api/transactions', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Envío el token en el encabezado
                },
            });
            setTransactions(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchTransactions(); 
    }, []);

    const handleTransactionAdded = async () => {
        await fetchTransactions(); 
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
