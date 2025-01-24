import React from "react";
import "./SpentResults.css";

const SpentResults = ({ expenses }) => {
  return (
    <div className="spent-results">
      <h2 className="spent-results-title">Detalle de Gastos</h2>
      {expenses.length > 0 ? (
        <div className="spent-results-table-wrapper">  {/* Contenedor para el desplazamiento horizontal */}
          <table className="spent-results-table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Categoría</th>
                <th>Descripción</th>
                <th>Gasto</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense, index) => (
                <tr key={index}>
                  <td>{new Date(expense.date).toLocaleDateString()}</td>
                  <td>{expense.categoria}</td>
                  <td>{expense.description}</td>
                  <td>${expense.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="spent-results-no-expenses">No hay gastos disponibles en este rango de fechas.</p>
      )}
    </div>
  );
};

export default SpentResults;
