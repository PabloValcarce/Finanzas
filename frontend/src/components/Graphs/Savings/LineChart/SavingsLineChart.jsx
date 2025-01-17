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
    // Prepara los datos y colores por adelantado en lugar de dentro de los callbacks
    const months = useMemo(() => {
        return [...new Set(transactions.map(transaction => new Date(transaction.date).toLocaleString('default', { month: 'long' })))]
    }, [transactions]);

    const balanceByMonth = useMemo(() => {
        return months.map(month => {
            const filteredTransactions = transactions.filter(transaction => {
                const transactionMonth = new Date(transaction.date).toLocaleString('default', { month: 'long' });
                return transactionMonth === month;
            });
            return filteredTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);
        });
    }, [transactions, months]);

    // Configuración del gráfico
    const data = useMemo(() => {
        return {
            labels: months,
            datasets: [
                {
                    label: 'Ahorro por Mes',
                    data: balanceByMonth,
                    borderColor: '#87CEFA',
                    fill: {
                        target: 'origin',
                        above: '#28A745',
                        below: '#DC3545',
                    },
                    tension: 0.5,
                    pointBorderColor: 'rgba(75,192,192,1)',
                },
            ],
        };
    }, [months, balanceByMonth]);

    const options = {
        plugins: {
            legend: {
                labels: {
                    color: '#f0c8a5',
                    font: {
                        size: 20,
                    },
                },
            },
            tooltip: {
                bodyFont: {
                    size: 16,
                },
            },
        },
        scales: {
            y: {
                beginAtZero: false,
                ticks: {
                    color: '#f0c8a5',
                    font: {
                        size: 14,
                        family: 'Montserrat',
                        weight: 'bold',
                    },
                },
            },
            x: {
                beginAtZero: false,
                ticks: {
                    color: '#f0c8a5',
                    font: {
                        size: 14,
                        family: 'Montserrat',
                        weight: 'bold',
                    },
                },
            },
        },
    };

    return (
        <>
            <Line data={data} style={{height: '100%', width: '100%'}} options={options} />
        </>
    );
}

export default SavingsLineChart;
