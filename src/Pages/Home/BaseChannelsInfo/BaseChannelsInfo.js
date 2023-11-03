import React from 'react';
import {SlidersOutlined} from "@ant-design/icons";
import {useSelector} from "react-redux";
import PageLoader from "../../../Modules/PageLoader/PageLoader";

function BaseChannelsInfo() {

    const {channelsCount, channelsDashboardLoaded, services} = useSelector(state => state.dashboard);

 return (
     <div className="HomePage__StatCard">
         {channelsDashboardLoaded ?
         <div className="HomePage__Activation-Container">
             <div className="HomePage__Activation-Title">Всего каналов</div>
             <div className="HomePage__Activation-Count">{channelsCount} шт</div>
             <div className="HomePage__Activation-Channels">
                 Inet - <span>{services['INET']}</span> L2 - <span>{services['L2VPN']}</span> L3 - <span>{services['L3VPN']}</span>
             </div>
             <SlidersOutlined className='HomePage__Activation-Icon'/>
         </div>
             : <div className="HomePage__StatCard-Loader"><PageLoader/></div>}
     </div>
 );}

export default BaseChannelsInfo;
