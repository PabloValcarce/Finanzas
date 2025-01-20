import React from 'react';
import Swal from 'sweetalert2';
import { useTransactions } from '../../../context/TransactionContext';  // Importa el hook de contexto

const AddTransaction = ({ userId }) => {
    const { addTransaction } = useTransactions();  // Obtén la función addTransaction desde el contexto

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

            // Crear el objeto de la nueva transacción
            const newTransaction = {
                description,
                amount,
                user_id: userId,
            };

            try {
                // Llamar a addTransaction desde el contexto para agregar la nueva transacción
                await addTransaction(newTransaction);

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
