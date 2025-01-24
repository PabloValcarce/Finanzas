import React, { useMemo } from 'react';
import './SpentSummary.css';

function SpentSummary({ transactions }) {
    // Filtrar solo las transacciones negativas (gastos)
    const totalSpent = useMemo(() => {
        return transactions
            .filter(transaction => transaction.amount < 0) // Solo las transacciones negativas (gastos)
            .reduce((sum, transaction) => sum + transaction.amount, 0); // Sumar todos los gastos
    }, [transactions]);

    if (transactions.length === 0) {
        return <p>No hay transacciones disponibles.</p>;
    }

    return (
        <div>
            <h1 className='spent-summary-title'>Total Gastado</h1>
            <p className='spent-summary-text'>Tus gastos totales: {Math.abs(totalSpent).toFixed(2)}€</p> {/* Mostrar el total gastado, con valor absoluto */}
        </div>
    );
}

export default SpentSummary;
