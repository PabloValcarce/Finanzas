import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import './Transactions.css';

function Transactions() {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await api.get('/transactions'); // Asegúrate de que este endpoint exista en tu backend
                setTransactions(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchTransactions();
    }, []);

    return (
        <div className="transactions">
            <h1>Transactions</h1>
            <ul>
                {transactions.map((transaction) => (
                    <li key={transaction.id}>
                        {transaction.description}: ${transaction.amount}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Transactions;