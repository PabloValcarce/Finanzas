import React from 'react';

function TransactionsList({ transactions }) {
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
