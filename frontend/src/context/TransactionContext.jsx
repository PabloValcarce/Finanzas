import React, { createContext, useContext, useState, useCallback } from 'react';
import api from '../services/api';

// Crear el contexto
const TransactionsContext = createContext();

// Crear el proveedor
export const TransactionsProvider = ({ children }) => {
    const [transactions, setTransactions] = useState([]);

    // Método para actualizar las transacciones
    const updateTransactions = (newTransactions) => {
        setTransactions(newTransactions);
    };

    // Método para cargar las transacciones desde la API
    const loadTransactions = useCallback(async () => {
        try {
            const response = await api.get('/api/transactions', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Envío el token en el encabezado
                },
            });
            setTransactions(response.data);
        } catch (error) {
            console.error('Failed to load transactions:', error);
        }
    },[]);

    return (
        <TransactionsContext.Provider value={{ transactions, updateTransactions, loadTransactions }}>
            {children}
        </TransactionsContext.Provider>
    );
};

// Crear un hook personalizado para consumir el contexto
export const useTransactions = () => useContext(TransactionsContext);
