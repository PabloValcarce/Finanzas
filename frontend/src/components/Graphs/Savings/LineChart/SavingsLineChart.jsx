import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';

// Registra los componentes necesarios de Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

function SavingsLineChart({ transactions }) {
    // Se obtiene el nombre del mes (sin año) de las transacciones
    const months = useMemo(() => {
        // Creamos un arreglo de los meses únicos sin año
        return [...new Set(transactions.map(transaction => new Date(transaction.date).toLocaleString('default', { month: 'long' })))]
    }, [transactions]);

    // Crea los datos para la gráfica
    const data = useMemo(() => {
        // Crea un objeto de balance por mes
        const balanceByMonth = months.map(month => {
            const filteredTransactions = transactions.filter(transaction => {
                const transactionMonth = new Date(transaction.date).toLocaleString('default', { month: 'long' });
                return transactionMonth === month;
            });
            // Sumar el balance para ese mes
            return filteredTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);
        });

        return {
            labels: months, // Los meses como etiquetas (sin año)
            datasets: [
                {
                    label: 'Ahorro por Mes',
                    data: balanceByMonth, // Balance por mes
                    borderColor: '#87CEFA', // Línea azul clara
                    backgroundColor: '#FF4500',
                    fill: true,
                    tension: 0.5, // Curvatura de la línea
                    pointBorderColor: 'rgba(75,192,192,1)', // Puntos de la línea
                    pointBackgroundColor: '#FF4500',
                },
            ],
        };
    }, [transactions, months]);

    const options = {
        plugins: {
            legend: {
              labels: {
                color: '#FF4500',
                font: {
                  size: 16,
                   // Cambiar tamaño de las etiquetas de la leyenda
                },
              },
            },
            tooltip: {
              bodyFont: {
                size: 14, // Cambiar tamaño del texto en los tooltips
              },
            },
          },
        scales: {
            y: {
                // No limitamos el valor mínimo del eje Y
                beginAtZero: false,
                ticks: {
                    color: '#FF4500',
                    font: {
                        size: 14,
                        family: 'Montserrat',
                        weight: 'bold'
                    }
                }
            },
            x: {
                // No limitamos el valor mínimo del eje Y
                beginAtZero: false,
                ticks: {
                    color: '#FF4500',
                    font: {
                        size: 14,
                        family: 'Montserrat',
                        weight: 'bold'
                    }
                }
            },
        },
    };

    return (
        <>
            <Line data={data} style={{height: '100%',width: '100%'}} options={options} />
        </>
    );
}

export default SavingsLineChart;
