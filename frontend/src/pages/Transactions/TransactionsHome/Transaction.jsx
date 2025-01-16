import React, { useEffect, useCallback } from 'react';
import NavBarTransaction from '../../../components/Transactions/TransactionNavBar/TransactionNavBar';
import './Transaction.css'; 
import TransactionsList from '../../../components/Transactions/TransactionsList/TransactionsList';
import AddTransaction from '../../../components/Transactions/TransactionAdd/TransactionAdd';
import { useTransactions } from '../../../context/TransactionContext';  // Importamos el hook useTransactions

import api from '../../../services/api';

function Transaction() {
    const { transactions, updateTransactions } = useTransactions();  // Usamos el hook para obtener transacciones y la función de actualización
    const userId = localStorage.getItem('userId'); // Obtienes el ID del usuario del localStorage

    // Usamos useCallback para memorizar la función fetchTransactions y sus dependencias
    const fetchTransactions = useCallback(async () => {
        try {
            const response = await api.get('/api/transactions', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Envío el token en el encabezado
                },
            });
            updateTransactions(response.data);  // Actualiza las transacciones en el contexto
        } catch (error) {
            console.error(error);
        }
    }, [updateTransactions]);  // Dependencia de updateTransactions, ya que puede cambiar en el contexto

    // Usamos useEffect para ejecutar fetchTransactions al cargar el componente
    useEffect(() => {
        fetchTransactions();  // Llamamos la función para obtener las transacciones
    }, [fetchTransactions]);  // Añadimos fetchTransactions en las dependencias para cumplir con ESLint

    const handleTransactionAdded = async () => {
        await fetchTransactions();  // Refresca las transacciones después de agregar una nueva
    };

    return (
        <div className="transactions-page">
            <NavBarTransaction transactions={transactions} />
            <AddTransaction userId={userId} onTransactionAdded={handleTransactionAdded} />
            <TransactionsList transactions={transactions} />
        </div>
    );
}

export default Transaction;
