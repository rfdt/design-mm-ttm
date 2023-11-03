import React from 'react';
import {IdcardOutlined} from "@ant-design/icons";
import PageLoader from "../../../Modules/PageLoader/PageLoader";
import {useSelector} from "react-redux";

function ClientsBaseInfo(props) {

    const {clientsCount, channelsDashboardLoaded} = useSelector(state => state.dashboard);

    return (
        <div className="HomePage__StatCard">
            {channelsDashboardLoaded ? <div className="HomePage__Clients-Container">
                <div className="HomePage__Clients-Title">
                    Клиенты
                </div>
                <div className="HomePage__Clients-Count">
                    {clientsCount} юр.лиц
                </div>
                <div className="HomePage__Clients-Description">
                    * Уникальных клиентов ММ и МТК
                </div>
                <IdcardOutlined className='HomePage__Clients-Icon'/>
            </div> : <div className="HomePage__StatCard-Loader"><PageLoader/></div>
            }
        </div>
    );
}

export default ClientsBaseInfo;
