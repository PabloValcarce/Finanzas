import React from 'react';
import './TransactionsResults.css';

function TransactionsResults({ transactions }) {
    return (
        <div className="transactions-container">
            <h1>Transacciones</h1>
            <div className="transactions-table">
                <table>
                    <thead>
                        <tr>
                            <th>Concepto</th>
                            <th>Cantidad</th>
                            <th>Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction) => {
                            const amount = Number(transaction.amount); // Asegura que sea un número
                            const formattedDate = new Date(transaction.date).toLocaleDateString('en-GB', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                            });
                            return (
                                <tr key={transaction.id} // Usando 'id' como clave única
                                    className={amount < 0 ? 'negative-row' : 'positive-row'}>
                                    <td>{transaction.description}</td>
                                    <td>${amount.toFixed(2)}</td>
                                    <td>{formattedDate}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default TransactionsResults;
