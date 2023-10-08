import React, {useEffect, useState} from 'react';
import './ChannelsCityChart.css';
import {Chart} from "primereact/chart";
import {useSelector} from "react-redux";

function ChannelsCityChart(props) {

    const {appTheme} = useSelector(state => state.global)
    
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const data = {
            labels: ['Симферополь', 'Севастополь', 'Керчь', 'Алушта', 'Ялта', 'Джанкой'],
            datasets: [
                {
                    data: [470, 120,350, 290, 120],
                    backgroundColor: [
                        appTheme === 'dark' ? "#FF6259" : "#ff4d4f",
                        appTheme === 'dark' ? "#4CD07D" : "#73d13d",
                        appTheme === 'dark' ? "#EEC137" : "#ffec3d",
                        appTheme === 'dark' ?  "#35C4DC" : "#5cdbd3",
                        appTheme === 'dark' ? "#F06BAC" : "#ff85c0",
                        appTheme === 'dark' ? "#B975F9" : "#9254de"
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
