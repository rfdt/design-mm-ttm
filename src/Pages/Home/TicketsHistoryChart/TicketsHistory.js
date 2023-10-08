import React, {useEffect, useState} from 'react';
import {Chart} from "primereact/chart";
import './TicketsHistory.css';
import {useSelector} from "react-redux";

function TicketsHistory(props) {

    const {appTheme} = useSelector(state => state.global)
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});


    useEffect(() => {
        const data = {
            labels: ['03.09', '04.09', '05.09', '06.09', '07.09', '08.09', '09.09'],
            datasets: [
                {
                    label: 'Открыто тикетов',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    borderColor: "#ff7a45",
                    tension: 0.4
                },
                {
                    label: 'Закрытые тикеты',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    borderColor: "#52c41a",
                    tension: 0.4
                }
            ]
        };
        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: {
                        color: appTheme === 'dark' ? "#616162" : "black"
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: "#595959"
                    },
                    grid: {
                        color: "#d9d9d9"
                    }
                },
                y: {
                    ticks: {
                        color: "#595959"
                    },
                    grid: {
                        color: "#d9d9d9"
                    }
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, []);

 return (
     <Chart className='TicketsChart-HistoryChart' type="line" data={chartData} options={chartOptions} />
 );}

export default TicketsHistory;
