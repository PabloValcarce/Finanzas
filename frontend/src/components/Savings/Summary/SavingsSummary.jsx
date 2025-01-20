import React, { useMemo } from 'react';

function SavingsSummary({ transactions }) {
    const totalSavings = useMemo(() => {
        return transactions
            .reduce((sum, transaction) => sum + transaction.amount, 0); // Sumar todas las transacciones, sin importar si son negativas
    }, [transactions]);

    if (transactions.length === 0) {
        return <p>No transactions available.</p>;
    }

    return (
        <div>
            <h1>Total Savings</h1>
            <p>Your total savings: ${totalSavings.toFixed(2)}</p>
        </div>
    );
}

export default SavingsSummary;
