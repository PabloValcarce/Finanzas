import React from 'react';
import { TransactionProvider } from './TransactionContext'; // Asegúrate de importar todos los contextos
import { CategoryProvider } from './CategoryContext'; // Contexto de categorías

const AppContextProvider = ({ children }) => {
  return (
    <TransactionProvider>
      <CategoryProvider>
        {children}
      </CategoryProvider>
    </TransactionProvider>
  );
};

export default AppContextProvider;
