import React, { useMemo } from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Tooltip, Legend);

function SpentRadarChart({ transactions }) {
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
                    label: 'Distribución de Gastos',
                    data: values,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
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
            r: {
                ticks: {
                    display:false,
                },
            },
        },
    };

    return <Radar data={data} options={options} />;
}

export default SpentRadarChart;
