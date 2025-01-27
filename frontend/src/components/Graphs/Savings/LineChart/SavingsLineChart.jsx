import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Registra los componentes necesarios de Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    ChartDataLabels
);

function SavingsLineChart({ transactions }) {
    // Función para capitalizar la primera letra
    const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);

    // Mover la constante MONTHS_ORDER dentro de useMemo para evitar que cause cambios en las dependencias
    const monthsOrder = useMemo(() => [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ], []); 

    const months = useMemo(() => {
        const rawMonths = transactions.map(transaction =>
            new Date(transaction.date).toLocaleString('default', { month: 'long' })
        );
        const uniqueMonths = [...new Set(rawMonths)].map(capitalize);

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
                borderColor: '#1F5A7A',
                fill: {
                    target: 'origin',
                    above: '#70BFF5',
                    below: '#F5A167',
                },
                tension: 0.5,
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: 'rgba(75,192,192,1)', 
                pointRadius: 5, 
                pointHoverRadius: 7, 
                pointHoverBorderWidth: 2,
            },
            ],
        };
    }, [months, balanceByMonth]);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function (context) {const value = context.raw;
                        if (value !== undefined) {
                            return `$${value.toFixed(2)}`; // Asegúrate de que "context.raw" es un número válido
                        }
                        return '';
                    },
                },
            },
            datalabels: {
                display:false
            },
        },
        scales: {

            x: {
                beginAtZero: false,
                ticks: {
                    color: '#000',
                },
            },
            y: {
                ticks: {
                    color: '#000',
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
