import React from 'react';
import _InnerPage from "../_InnerPage/_InnerPage";
import {
    CheckCircleOutlined,
    ClockCircleOutlined,
    ExclamationCircleOutlined,
    IdcardOutlined, IssuesCloseOutlined,
    SlidersOutlined
} from "@ant-design/icons";
import TicketsHistory from "./TicketsHistoryChart/TicketsHistory";
import ChannelsTypesChart from "./ChannelsTypesChart/ChannelsTypesChart";
import ChannelsCityChart from "./ChannelsCityChart/ChannelsCityChart";
import './Home.css';

function Home(props) {

    return (
        <_InnerPage>
            <div className="HomePage__Container">
                <div className="HomePage__Welcome">
                    <div className="HomePage__Title">
                        Администирование
                    </div>
                    <div className="HomePage__SubTitle">
                        Добро пожаловать, Руслан
                    </div>
                </div>
                <div className="HomePage__StatCards-Container">
                    <div className="HomePage__StatCard">
                        <div className="HomePage__Activation-Container">
                            <div className="HomePage__Activation-Title">Всего каналов</div>
                            <div className="HomePage__Activation-Count">65580 шт</div>
                            <div className="HomePage__Activation-Channels">
                                L2 - <span>3480</span> Inet - <span>7875</span> L3 - <span>8760</span>
                            </div>
                            <SlidersOutlined className='HomePage__Activation-Icon'/>
                        </div>
                    </div>
                    <div className="HomePage__StatCard">
                        <div className="HomePage__Reserved-Container">
                            <div className="HomePage__Reserved-Title">
                                Зарезервировано
                            </div>
                            <div className="HomePage__Reserved-Count">
                                440 каналов
                            </div>
                            <div className="HomePage__Reserved-Description">
                                * Новые каналы, ожидающие запуска
                            </div>
                            <ExclamationCircleOutlined className='HomePage__Reserved-Icon'/>
                        </div>
                    </div>
                    <div className="HomePage__StatCard">
                        <div className="HomePage__Clients-Container">
                            <div className="HomePage__Clients-Title">
                                Клиенты
                            </div>
                            <div className="HomePage__Clients-Count">
                                1300 юр.лиц
                            </div>
                            <div className="HomePage__Clients-Description">
                                Бол - <span>110</span> | Средн - <span>350</span> | Мал - <span>790</span>
                            </div>
                            <IdcardOutlined className='HomePage__Clients-Icon'/>
                        </div>
                    </div>
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
