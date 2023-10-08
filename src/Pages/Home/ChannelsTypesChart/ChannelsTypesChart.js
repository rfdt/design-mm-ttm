import React, {useEffect, useState} from 'react';
import './ChannelsTypesChart.css';
import {Chart} from "primereact/chart";
import {useSelector} from "react-redux";

function ChannelsTypesChart(props) {

    const {appTheme} = useSelector(state => state.global)

    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const textColor = appTheme === 'dark' ? '#616162' : "#000000";
        const surfaceBorder = "#d9d9d9";
        const data = {
            datasets: [
                {
                    data: [11, 16, 7, 3, 14],
                    backgroundColor: [
                        appTheme === 'dark' ? "#FF6259" :"#ff4d4f",
                        appTheme === 'dark' ? "#4CD07D" :"#73d13d",
                        appTheme === 'dark' ? "#EEC137" :"#ffec3d",
                        appTheme === 'dark' ? "#35C4DC" :"#5cdbd3",
                        appTheme === 'dark' ? "#F06BAC" :"#ff85c0"
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
