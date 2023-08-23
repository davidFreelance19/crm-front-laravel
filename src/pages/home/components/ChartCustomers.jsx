import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
const ChartCustomers = ({ chartData }) => {
    const [chartOptions, setChartOptions] = useState({});
    const [chartInfo, setChartInfo] = useState({})
    useEffect(() => {
        const data = {
            labels: ['Pending', 'Completed', 'Canceled'],
            datasets: [
                {
                    label: 'Status to do',
                    data: [chartData.Pending, chartData.Completed, chartData.Canceled],
                    backgroundColor: [
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(254, 162, 170, 0.2)',
                    ],
                    borderColor: [
                        'rgb(255, 159, 64)',
                        'rgb(75, 192, 192)',
                        'rgb(235, 54, 69)',
                    ],
                    borderWidth: 1
                }
            ]
        };
        const options = {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        };
        setChartInfo(data)
        setChartOptions(options);
    }, []);

    return (
        <div className="max-w-[1200px] h-full flex flex-col gap-6 justify-center">
            <p className='font-semibold text-xl'>Your status progress to do:</p>
            <Chart type="bar" data={chartInfo} options={chartOptions} />
        </div>
    )
}

export default ChartCustomers
