import React, { useMemo } from 'react';
import { Pie } from 'react-chartjs-2';
import ChartDataLabes from 'chartjs-plugin-datalabels';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Registra los componentes necesarios de Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabes);

function SavingsCircularChart({ transactions }) {
    const currentMonth = useMemo(() => {
        return new Date().toLocaleString('default', { month: 'long' });
    }, []);

    const currentMonthTransactions = useMemo(() => {
        return transactions.filter(transaction => {
            const transactionMonth = new Date(transaction.date).toLocaleString('default', { month: 'long' });
            return transactionMonth === currentMonth;
        });
    }, [transactions, currentMonth]);

    const totals = useMemo(() => {
        const spent = currentMonthTransactions
            .filter(transaction => transaction.amount < 0)
            .reduce((sum, transaction) => sum + Math.abs(transaction.amount), 0);

        const saved = currentMonthTransactions
            .filter(transaction => transaction.amount > 0)
            .reduce((sum, transaction) => sum + transaction.amount, 0);

        return { spent, saved };
    }, [currentMonthTransactions]);

    const data = useMemo(() => {
        return {
            labels: ['Gastado', 'Ahorrado'],
            datasets: [
                {
                    label: 'Distribución de gastos y ahorros',
                    data: [totals.spent, totals.saved],
                    backgroundColor: ['#DC3545', '#28A745'], // Colores personalizados
                    hoverBackgroundColor: ['#DC3545AA', '#5CD85F'], // Colores al pasar el ratón
                    borderWidth: 1,
                },
            ],
        };
    }, [totals]);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: '#f0c8a5',
                    font: {
                        size: 16,
                        family: 'Montserrat',
                    },
                },
            },
            datalabels: {
                formatter: (value, context) => {
                    const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                    const percentage = ((value / total) * 100).toFixed(2);
                    return `${percentage}%`;
                },
                color: '#fff',
                font: {
                    size: 14,
                    weight: 'bold',
                },
            },
        },
    };

    return (
        <>
            <Pie data={data} style={{ height: '100%', width: '100%' }} options={options} />
        </>
    );
}

export default SavingsCircularChart;
