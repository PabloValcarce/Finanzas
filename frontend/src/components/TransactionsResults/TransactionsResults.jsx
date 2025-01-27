import React from 'react';
import './TransactionsResults.css';

function TransactionsResults({ transactions }) {
    return (
        <div className="transactions-results">
          <h2 className="transactions-results-title">Transacciones</h2>
          {transactions.length > 0 ? (
            <div className="transactions-results-table-wrapper">  {/* Contenedor para el desplazamiento horizontal */}
              <table className="transactions-results-table">
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Categoría</th>
                    <th>Descripción</th>
                    <th>Gasto</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transactions, index) => (
                    <tr key={index}>
                      <td>{new Date(transactions.date).toLocaleDateString()}</td>
                      <td>{transactions.categoria}</td>
                      <td>{transactions.description}</td>
                      <td>${transactions.amount.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="transactions-results-no-expenses">No hay transacciones disponibles en este rango de fechas.</p>
          )}
        </div>
      );
    };
export default TransactionsResults;
