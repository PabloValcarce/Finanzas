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
    // Función para capitalizar la primera letra
    const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);

    // Prepara los datos y colores por adelantado
    const months = useMemo(() => {
        const rawMonths = transactions.map(transaction =>
            new Date(transaction.date).toLocaleString('default', { month: 'long' })
        );
        return [...new Set(rawMonths)].map(capitalize);
    }, [transactions]);

    const balanceByMonth = useMemo(() => {
        return months.map(month => {
            const filteredTransactions = transactions.filter(transaction => {
                const transactionMonth = capitalize(
                    new Date(transaction.date).toLocaleString('default', { month: 'long' })
                );
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
                    family: 'Montserrat',
                    weight: 'bold',
                    color: '#f0c8a5',
                },
                bodyColor: '#f0c8a5', // Cambia el color del texto que imprime la cantidad
                backgroundColor: '#1A5A8F', // Fondo del tooltip
                borderColor: '#f0c8a5', // Borde del tooltip
                borderWidth: 1,
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
            <Line data={data} style={{ height: '100%', width: '100%' }} options={options} />
        </>
    );
}

export default SavingsLineChart;
