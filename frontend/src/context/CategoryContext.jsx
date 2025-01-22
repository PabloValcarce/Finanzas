import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';  // Importar la instancia de axios

// Crear el contexto
const CategoryContext = createContext();

// Proveedor del contexto
export const CategoryProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);  // Estado para almacenar categorías
    const [loading, setLoading] = useState(true);  // Estado de carga

    // Función para obtener las categorías desde el backend
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await api.get('/api/categories');
                setCategories(response.data);  // Guardar categorías en el estado
            } catch (error) {
                console.error('Error fetching categories:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);  // Solo se ejecuta una vez cuando el componente se monta

    return (
        <CategoryContext.Provider value={{ categories, loading }}>
            {children}
        </CategoryContext.Provider>
    );
};

export const useCategories = () => useContext(CategoryContext);
