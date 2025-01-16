import React from 'react';
import Swal from 'sweetalert2';
import api from '../../../services/api';
import { useTransactions } from '../../../context/TransactionContext';

const AddTransaction = ({ userId, onTransactionAdded }) => {

    const{addTransaction} = useTransactions();

    const handleAddTransaction = async () => {
        const { value: formValues } = await Swal.fire({
            title: 'Add Transaction',
            html:
                '<input id="swal-input1" class="swal2-input" placeholder="Description">' +
                '<input id="swal-input2" type="number" class="swal2-input" placeholder="Amount">',
            focusConfirm: false,
            preConfirm: () => {
                return [
                    document.getElementById('swal-input1').value,
                    document.getElementById('swal-input2').value
                ]
            }
        });

        if (formValues) {
            const [description, amount] = formValues;
            try {
                await api.post('/api/transactions', {
                    description,
                    amount,
                    user_id: userId
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`, // Asegúrate de enviar el token
                    },
                });
                onTransactionAdded();
                Swal.fire('Success', 'Transaction added successfully!', 'success');
            } catch (error) {
                Swal.fire('Error', 'Failed to add transaction.', 'error');
                console.error(error);
            }
        }
    };

    return (
        <button onClick={handleAddTransaction}>
            Add Transaction
        </button>
    );
};

export default AddTransaction;