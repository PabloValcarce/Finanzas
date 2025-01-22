import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useTransactions } from '../../../context/TransactionContext';
import { useCategories } from '../../../context/CategoryContext'; 
import './AddTransaction.css';

const AddTransaction = ({ userId }) => {
    const { addTransaction } = useTransactions();
    const { categories, loading } = useCategories();  // Accede a las categorías desde el contexto
    const [isFormValid, setIsFormValid] = useState(false);  // Estado para verificar si el formulario es válido

    if (loading) {
        return <div>Loading categories...</div>;
    }

    const handleAddTransaction = async () => {
        // Construir el HTML del formulario dinámicamente con las categorías obtenidas del contexto
        const categoryOptions = categories
            .map(
                (category) =>
                    `<option value="${category.id}">${category.nombre}</option>`
            )
            .join('');

        // Agregar una opción placeholder al principio
        const { value: formValues } = await Swal.fire({
            title: 'Añadir transacción',
            html:
                '<input id="swal-input1" class="swal2-input" placeholder="Descripción">' +
                '<input id="swal-input2" type="number" class="swal2-input" placeholder="Cantidad">' +
                `<select id="swal-select" class="swal2-input">
                    <option value="" disabled selected>Seleccione categoría</option>
                    ${categoryOptions}
                 </select>`,
            focusConfirm: false,
            preConfirm: () => {
                const description = document.getElementById('swal-input1').value;
                const amount = document.getElementById('swal-input2').value;
                const categoria_id = document.getElementById('swal-select').value;

                // Verificar si la categoría, descripción y cantidad han sido proporcionadas
                setIsFormValid(categoria_id && description && amount);  // Si todo es válido, habilitamos el botón
                return [description, amount, categoria_id];
            },
            // Configuración del botón de confirmación deshabilitado inicialmente
            didOpen: () => {
                Swal.getConfirmButton().disabled = true;
                document.getElementById('swal-select').addEventListener('change', () => {
                    const description = document.getElementById('swal-input1').value;
                    const amount = document.getElementById('swal-input2').value;
                    const categoria_id = document.getElementById('swal-select').value;

                    // Verificar si la categoría, descripción y cantidad son válidos
                    const isValid = description && amount && categoria_id;
                    Swal.getConfirmButton().disabled = !isValid;  // Habilitar el botón solo si todos los campos están completos
                });

                // Se asegura que si algún campo se cambia (description o amount), también se verifique si es válido
                document.getElementById('swal-input1').addEventListener('input', () => {
                    const description = document.getElementById('swal-input1').value;
                    const amount = document.getElementById('swal-input2').value;
                    const categoria_id = document.getElementById('swal-select').value;
                    const isValid = description && amount && categoria_id;
                    Swal.getConfirmButton().disabled = !isValid;
                });

                document.getElementById('swal-input2').addEventListener('input', () => {
                    const description = document.getElementById('swal-input1').value;
                    const amount = document.getElementById('swal-input2').value;
                    const categoria_id = document.getElementById('swal-select').value;
                    const isValid = description && amount && categoria_id;
                    Swal.getConfirmButton().disabled = !isValid;
                });
            },
        });

        if (formValues) {
            const [description, amount, categoria_id] = formValues;  // Desestructuramos los valores del formulario

            const newTransaction = {
                description,
                amount,
                user_id: userId,
                categoria_id,  // Incluye la categoría seleccionada
            };

            try {
                console.log(newTransaction);
                await addTransaction(newTransaction);
                Swal.fire('Success', 'Transaction added successfully!', 'success');
            } catch (error) {
                Swal.fire('Error', 'Failed to add transaction.', 'error');
                console.error(error);
            }
        }
    };

    return (
        <button className="add" onClick={handleAddTransaction}>
            +
        </button>
    );
};

export default AddTransaction;
