import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function SpentBarChart({ transactions }) {
    const data = useMemo(() => {
        const categoryTotals = transactions.reduce((acc, transaction) => {
            const { categoria, amount } = transaction;
            if (amount < 0) { // Solo gastos
                acc[categoria] = (acc[categoria] || 0) + Math.abs(amount);
            }
            return acc;
        }, {});

        const labels = Object.keys(categoryTotals);
        const values = Object.values(categoryTotals);

        return {
            labels,
            datasets: [
                {
                    label: 'Gastos por Categoría',
                    data: values,
                    backgroundColor: '#87CEFA',
                    borderColor: '#1B3A57',
                    borderWidth: 1,
                },
            ],
        };
    }, [transactions]);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return `$${context.raw.toFixed(2)}`;
                    },
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    color: '#000',
                },
            },
            y: {
                beginAtZero: true,
                ticks: {
                    color: '#000',
                },
            },
        },
    };

    return <Bar data={data} options={options} />;
}

export default SpentBarChart;
