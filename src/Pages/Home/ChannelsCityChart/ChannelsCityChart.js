import React, {useEffect, useState} from 'react';
import './ChannelsCityChart.css';
import {Chart} from "primereact/chart";
import {useSelector} from "react-redux";
import PageLoader from "../../../Modules/PageLoader/PageLoader";

function ChannelsCityChart(props) {

    const {appTheme} = useSelector(state => state.global);
    const {channelsDashboardLoaded, cities} = useSelector(state => state.dashboard);

    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        if(channelsDashboardLoaded) {
            const data = {
                labels: Object.keys(cities),
                datasets: [
                    {
                        data: Object.keys(cities).map(function(k){return cities[k]}),
                        backgroundColor: [
                            appTheme === 'dark' ? "#FF6259" : "#ff4d4f",
                            appTheme === 'dark' ? "#4CD07D" : "#73d13d",
                            appTheme === 'dark' ? "#EEC137" : "#ffec3d",
                            appTheme === 'dark' ? "#35C4DC" : "#5cdbd3",
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
        }
    }, [channelsDashboardLoaded]);

 return (
    <div className='ChannelsCityChart__Container'>
        {channelsDashboardLoaded ?
            <Chart type="doughnut" data={chartData} options={chartOptions} className='ChannelsCityChart__Chart'/>
            : <div className="HomePage__StatCard-Loader"><PageLoader/></div>
        }
    </div>
 );}

export default ChannelsCityChart;
