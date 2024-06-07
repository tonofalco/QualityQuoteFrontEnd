import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend, Filler, } from 'chart.js';
import { useCalendarStore } from '../../hooks';
import { useEffect, useState } from 'react';

ChartJS.register(CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend, Filler);

// const data = [1, 3, 5, 6, 4, 0, 0, 1, 0, 0, 0, 0];
const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];


export const BarChart = () => {

    const { events } = useCalendarStore();
    const [count2024, setcount2024] = useState([])

    const monthCount = () => {
        let year2024 = Array(12).fill(0);

        events.forEach(event => {
            const month = (new Date(event.start)).getMonth();
            const year = (new Date(event.start)).getFullYear();

            if (year === 2024) {
                // Incrementar el contador para el mes correspondiente
                year2024[month]++;
            }
        });

        setcount2024(year2024)
    }

    const midata = {
        labels: meses,
        datasets: [
            {
                label: '2024',
                data: count2024,
                backgroundColor: 'rgba(13, 110, 253, 0.7)'
            }
        ]
    };

    const misoptions = {
        responsive: true,
        animation: true,
        plugins: {
            legend: {
                display: true
            }
        },
        scales: {
            y: {
                min: 0,
                max: 'auto'
            },
            x: {
                ticks: { color: 'rgba(0, 0, 0)' }
            }
        }
    };

    useEffect(() => { monthCount();  }, [events])

    return (
        <>
            <Bar data={midata} options={misoptions} />
        </>
    )
}
