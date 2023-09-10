import React, {useEffect, useState} from 'react';
import './ChannelsTypesChart.css';
import {Chart} from "primereact/chart";

function ChannelsTypesChart(props) {

    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const textColor = "#000000";
        const surfaceBorder = "#d9d9d9";
        const data = {
            datasets: [
                {
                    data: [11, 16, 7, 3, 14],
                    backgroundColor: [
                        "#ff4d4f",
                        "#73d13d",
                        "#ffec3d",
                        "#5cdbd3",
                        "#ff85c0"
                    ],
                    label: 'Каналы ММ и Мир-Телеком'
                }
            ],
            labels: ['INET', 'L3VPN', 'L2VPN', 'E1', 'WiFi-Auth']
        };
        const options = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                r: {
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, []);

    return (
    <div className='ChannelsTypesChart__Container'>
        <Chart type="polarArea" data={chartData} options={chartOptions}  />
    </div>
 );}

export default ChannelsTypesChart;
