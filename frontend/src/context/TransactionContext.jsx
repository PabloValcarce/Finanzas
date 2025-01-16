import React, { createContext, useContext, useState } from 'react';

// Crear el contexto
const TransactionsContext = createContext();

// Crear el proveedor
export const TransactionsProvider = ({ children }) => {
    const [transactions, setTransactions] = useState([]);

    // Método para actualizar las transacciones
    const updateTransactions = (newTransactions) => {
        setTransactions(newTransactions);
    };

    return (
        <TransactionsContext.Provider value={{ transactions, updateTransactions }}>
            {children}
        </TransactionsContext.Provider>
    );
};

// Crear un hook personalizado para consumir el contexto
export const useTransactions = () => useContext(TransactionsContext);
