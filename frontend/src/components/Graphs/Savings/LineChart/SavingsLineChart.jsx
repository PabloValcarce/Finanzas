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

    // Mover la constante MONTHS_ORDER dentro de useMemo para evitar que cause cambios en las dependencias
    const monthsOrder = useMemo(() => [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ], []); // Esta constante no tiene dependencias, por lo tanto, solo se calcula una vez

    // Prepara los datos y colores por adelantado
    const months = useMemo(() => {
        const rawMonths = transactions.map(transaction =>
            new Date(transaction.date).toLocaleString('default', { month: 'long' })
        );
        const uniqueMonths = [...new Set(rawMonths)].map(capitalize);

        // Ordena los meses según monthsOrder
        return uniqueMonths.sort(
            (a, b) => monthsOrder.indexOf(a) - monthsOrder.indexOf(b)
        );
    }, [transactions, monthsOrder]);

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
            datasets: [{
                    label: 'Ahorro por mes',
                    data: balanceByMonth,
                    borderColor: '#87CEFA',
                    fill: {
                        target: 'origin',
                        above: '#28A745',
                        below: '#DC3545',
                    },
                    tension: 0.5,
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: 'rgba(75,192,192,1)', // Asegura que los puntos no muestren valores
                    pointRadius: 5, // Controla el tamaño de los puntos
                    pointHoverRadius: 7, // Radio de los puntos al pasar el mouse
                    pointHoverBorderWidth: 2,
                },
            ],
        };
    }, [months, balanceByMonth]);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: 'white',
                    font: {
                        size: 14,
                    },
                },
            },
            tooltip: {
                enabled: true,
                bodyFont: {
                    size: 16,
                    family: 'Montserrat',
                    weight: 'bold',
                    color: '#f0c8a5',
                },
                bodyColor: '#f0c8a5',
                backgroundColor: '#1A5A8',
                borderColor: '#f0c8a5',
                borderWidth: 1,
            },
        },
        scales: {
            y: {
                beginAtZero: false,
                ticks: {
                    color: '#f0c8a5',
                    font: {
                        size: 12,
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
                        size: 12,
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
