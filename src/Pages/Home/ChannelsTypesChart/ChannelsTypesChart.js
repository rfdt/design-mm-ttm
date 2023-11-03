import React, {useEffect, useState} from 'react';
import './ChannelsTypesChart.css';
import {Chart} from "primereact/chart";
import {useSelector} from "react-redux";
import PageLoader from "../../../Modules/PageLoader/PageLoader";

function ChannelsTypesChart(props) {

    const {appTheme} = useSelector(state => state.global)

    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    const {channelsDashboardLoaded, services} = useSelector(state => state.dashboard);

    useEffect(() => {
        if(channelsDashboardLoaded) {
            const textColor = appTheme === 'dark' ? '#616162' : "#000000";
            const surfaceBorder = "#d9d9d9";
            const data = {
                labels: Object.keys(services),
                datasets: [
                    {
                        data: Object.keys(services).map(function(k){return services[k]}),
                        backgroundColor: [
                            appTheme === 'dark' ? "#FF6259" : "#ff4d4f",
                            appTheme === 'dark' ? "#4CD07D" : "#73d13d",
                            appTheme === 'dark' ? "#EEC137" : "#ffec3d",
                            appTheme === 'dark' ? "#35C4DC" : "#5cdbd3",
                            appTheme === 'dark' ? "#F06BAC" : "#ff85c0"
                        ],
                        label: 'Каналы ММ и Мир-Телеком'
                    }
                ]
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
        }
    }, [channelsDashboardLoaded]);

    return (
    <div className='ChannelsTypesChart__Container'>
        {channelsDashboardLoaded ?
        <Chart type="polarArea" data={chartData} options={chartOptions}  />
            : <div className="HomePage__StatCard-Loader"><PageLoader/></div>
        }
    </div>
 );}

export default ChannelsTypesChart;
