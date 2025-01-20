import React, { useEffect } from 'react';
import NavBarTransaction from '../../../components/Transactions/TransactionNavBar/TransactionNavBar';
import './TransactionHome.css'; 
import { useTransactions } from '../../../context/TransactionContext';
import useAuth from '../../../hooks/useAuth';

function Transaction() {
    useAuth();
    const { loadTransactions } = useTransactions();

    useEffect(() => {
        loadTransactions();
    }, [loadTransactions]);
    
    return (
        <div className="transactions-page">
            <NavBarTransaction />
            
        </div>
    );
}

export default Transaction;
