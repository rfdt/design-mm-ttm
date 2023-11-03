import React, {useEffect} from 'react';
import _InnerPage from "../_InnerPage/_InnerPage";
import {
    CheckCircleOutlined,
    ClockCircleOutlined,
    IssuesCloseOutlined,
} from "@ant-design/icons";
import TicketsHistory from "./TicketsHistoryChart/TicketsHistory";
import ChannelsTypesChart from "./ChannelsTypesChart/ChannelsTypesChart";
import ChannelsCityChart from "./ChannelsCityChart/ChannelsCityChart";
import {useSelector} from "react-redux";
import classNames from 'classnames';

import './Home.css';
import BaseChannelsInfo from "./BaseChannelsInfo/BaseChannelsInfo";
import ChannelsReservedInfo from "./ChannelsReservedInfo/ChannelsReservedInfo";
import ClientsBaseInfo from "./ClientsBaseInfo/ClientsBaseInfo";
import {useActions} from "../../Store/useActions";

function Home() {

    const {appTheme} = useSelector(state => state.global)
    const {channelsDashboardLoaded} = useSelector(state => state.dashboard)

    const {loadChannelsDashboard} = useActions();

    useEffect(()=>{
        if(!channelsDashboardLoaded){
            loadChannelsDashboard();
        }
    }, [channelsDashboardLoaded])

    return (
        <_InnerPage>
            <div className={classNames("HomePage__Container", {"HomePage__Container--Dark": appTheme==='dark'})}>
                <div className="HomePage__Welcome">
                    <div className="HomePage__Title">
                        Администирование
                    </div>
                    <div className="HomePage__SubTitle">
                        Добро пожаловать, Руслан
                    </div>
                </div>
                <div className="HomePage__StatCards-Container">
                    <BaseChannelsInfo />
                    <ChannelsReservedInfo />
                    <ClientsBaseInfo />
                </div>
                <div className="HomePage__StatCards-Container HomePage__StatCards-Container-Square">
                    <div className="HomePage__StatCard--Sqaure">
                        <ChannelsTypesChart />
                    </div>
                    <div className="HomePage__StatCard--Sqaure">
                        <ChannelsCityChart/>
                    </div>
                </div>
                <div className="HomePage__TicketsBlock-Welcome">
                    <div className="HomePage__TicketsBlock-Title">
                        Trouble Ticket Managment
                    </div>
                    <div className="HomePage__TicketsBlock-SubTitle">
                        75% решенных ТТ без выезда
                    </div>
                </div>
                <div className="HomePage__StatTickets-Container">
                    <div className="HomePage__StatCard">
                        <div className="HomePage__OpenedTicket-Container">
                            <div className="HomePage__OpenedTicket-Title">Открытых тикетов</div>
                            <div className="HomePage__OpenedTicket-Count">25 шт</div>
                            <div className="HomePage__OpenedTicket-Info">
                                Крым - <span>10</span> Север - <span>4</span> ЕСПД - <span>10</span>
                            </div>
                            <ClockCircleOutlined className='HomePage__OpenedTicket-Icon'/>
                        </div>
                    </div>
                    <div className="HomePage__StatCard">
                        <div className="HomePage__ClosedTickets-Container">
                            <div className="HomePage__ClosedTickets-Title">
                                Закрыто сегодня
                            </div>
                            <div className="HomePage__ClosedTickets-Count">
                                10 тикетов
                            </div>
                            <div className="HomePage__ClosedTickets-Description">
                                <span>90%</span> ответов за 10 секунд
                            </div>
                            <CheckCircleOutlined className='HomePage__ClosedTickets-Icon'/>
                        </div>
                    </div>
                    <div className="HomePage__StatCard">
                        <div className="HomePage__AllTickets-Container">
                            <div className="HomePage__AllTickets-Title">
                                Всего тикетов
                            </div>
                            <div className="HomePage__AllTickets-Count">
                                2272 шт
                            </div>
                            <div className="HomePage__AllTickets-Description">
                                За вчера <span>+10</span> тикетов
                            </div>
                            <IssuesCloseOutlined className='HomePage__AllTickets-Icon'/>
                        </div>
                    </div>
                </div>
                <div className="HomePage__TicketsCharts">
                    <TicketsHistory/>
                </div>
            </div>
        </_InnerPage>
    );
}

export default Home;
