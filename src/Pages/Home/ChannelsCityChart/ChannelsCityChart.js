import React, {useEffect, useState} from 'react';
import './ChannelsCityChart.css';
import {Chart} from "primereact/chart";

function ChannelsCityChart(props) {

    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const data = {
            labels: ['Симферополь', 'Севастополь', 'Керчь', 'Алушта', 'Ялта', 'Джанкой'],
            datasets: [
                {
                    data: [470, 120,350, 290, 120],
                    backgroundColor: [
                        "#ff4d4f",
                        "#73d13d",
                        "#ffec3d",
                        "#5cdbd3",
                        "#ff85c0",
                        "#9254de"
                    ],
                    hoverBackgroundColor: [
                        "#ff4d4f",
                        "#73d13d",
                        "#ffec3d",
                        "#5cdbd3",
                        "#ff85c0",
                        "#9254de"
                    ]
                }
            ]
        };
        const options = {
            cutout: '70%'
        };

        setChartData(data);
        setChartOptions(options);
    }, []);

 return (
    <div className='ChannelsCityChart__Container'>
        <Chart type="doughnut" data={chartData} options={chartOptions} className='ChannelsCityChart__Chart'/>
    </div>
 );}

export default ChannelsCityChart;
