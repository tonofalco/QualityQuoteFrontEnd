import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

var beneficios = [1, 3, 5, 6, 4, 0, 0, 1, 0, 0, 0, 0];
var beneficios2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var beneficios3 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

var misoptions = {
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

var midata = {
    labels: meses,
    datasets: [
        {
            label: '2024',
            data: beneficios,
            backgroundColor: 'rgba(13, 110, 253, 0.7)'
        },
        // {
        //     label: '2025',
        //     data: beneficios2,
        //     backgroundColor: 'rgba(108, 117, 125, 0.7)'
        // },
        // {
        //     label: '2026',
        //     data: beneficios3,
        //     backgroundColor: 'rgba(220, 53, 69, 0.7)'
        // }
    ]
};

export const BarChart = () => {
    return (
        <>
            <Bar data={midata} options={misoptions} />
        </>
    )
}
