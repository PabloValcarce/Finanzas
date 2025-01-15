import React, { useEffect, useState } from 'react';
import api from '../../../services/api'; // Asegúrate de que el módulo api esté importado correctamente

function TransactionsList() {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await api.get('/transactions');
                setTransactions(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchTransactions();
    }, []);

    return (
        <div className="transactions-container">
            <h1>Transactions</h1>
            <div className="transactions-list">
                <ul>
                    {transactions.map((transaction) => (
                        <li key={transaction.id}>
                            {transaction.description}: ${transaction.amount}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default TransactionsList;