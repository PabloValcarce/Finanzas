import React, { createContext, useState, useContext, useEffect,useCallback } from 'react';
import api from '../services/api';  // Asegúrate de que api es donde haces las solicitudes HTTP

const TransactionContext = createContext();

export const useTransactions = () => {
    return useContext(TransactionContext);
};

export const TransactionProvider = ({ children }) => {
    const [transactions, setTransactions] = useState([]);
    const [loading] = useState(true);

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

    // Función para agregar una nueva transacción
    const addTransaction = async (newTransaction) => {
        try {
            // Enviar la transacción al backend
            await api.post('/api/transactions', newTransaction, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            // Después de agregar la transacción, obtén todas las transacciones
            const userId = localStorage.getItem('userId');
            if (userId) {
                loadTransactions(userId);  // Llamar a loadTransactions con el userId
            }
        } catch (error) {
            console.error('Error adding transaction', error);
            throw error;  // Lanza el error para manejarlo en el componente
        }
    };

    useEffect(() => {
        // Inicialmente, carga las transacciones
        const userId = localStorage.getItem('userId');  // Asumiendo que guardas el userId en localStorage
        if (userId) {
            loadTransactions(userId);
        }
    }, [loadTransactions]);  

    return (
        <TransactionContext.Provider value={{ transactions, addTransaction, loadTransactions, loading }}>
            {children}
        </TransactionContext.Provider>
    );
};
