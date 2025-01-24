import React, { useMemo } from 'react';
import './SavingsSummary.css';

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
            <h1 className='saving-summary-title'>Total Ahorrado</h1>
            <p className='saving-summary-text'>Tu dinero ahorrado: ${totalSavings.toFixed(2)}</p>
        </div>
    );
}

export default SavingsSummary;
