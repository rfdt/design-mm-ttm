import React from 'react';
import {ExclamationCircleOutlined} from "@ant-design/icons";
import {useSelector} from "react-redux";
import PageLoader from "../../../Modules/PageLoader/PageLoader";

function ChannelsReservedInfo() {

    const {reservedChannels, channelsDashboardLoaded} = useSelector(state => state.dashboard);

    return (
        <div className="HomePage__StatCard">
            {channelsDashboardLoaded ?
                <div className="HomePage__Reserved-Container">
                    <div className="HomePage__Reserved-Title">
                        Зарезервировано
                    </div>
                    <div className="HomePage__Reserved-Count">
                        {reservedChannels} каналов
                    </div>
                    <div className="HomePage__Reserved-Description">
                        * Новые каналы, ожидающие запуска
                    </div>
                    <ExclamationCircleOutlined className='HomePage__Reserved-Icon'/>
                </div>
                : <div className="HomePage__StatCard-Loader"><PageLoader/></div>}
        </div>
    );
}
export default ChannelsReservedInfo;
