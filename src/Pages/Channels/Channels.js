import React, {useEffect, useState} from 'react';
import _InnerPage from "../_InnerPage/_InnerPage";
import './Channels.css';
import ChannelsFilters from "./СhannelsFilters/ChannelsFilters";
import ChannelsTable from "./ChannelsTable/ChannelsTable";
import ChannelInfo from "./ChannelInfo/ChannelInfo";

function Channels(props) {

    const [selectedChannel, setSelectedChannel] = useState(null);
    const [channelInfoVisible, setChannelInfoVisible] = useState(false);

    useEffect(()=>{
        if(selectedChannel && selectedChannel._id){
            setChannelInfoVisible(true);
        } // Эффекта которая срабатывает на выбранный канал, если выбран канал с полем _id,
        // то открыть сайд бар, запускать асинх на загрузку и т.д
    }, [selectedChannel]);

    useEffect(()=>{
        if(!selectedChannel){
            //Эффекта, которая срабатывает на удаление канала из состояние локального selectedChannel
            //Удалять тут состояния которое загружается с сервера и т.д
            setChannelInfoVisible(false);
        }
    },[selectedChannel])

    const closeChannelInfo = () =>{
        setSelectedChannel(null);
    }

    return (
       <_InnerPage>
           <div className="ChannelsPage__Container">
               <div className="ChannelsPage__Filters">
                <ChannelsFilters selectedChannel={selectedChannel} setSelectedChannel={setSelectedChannel}/>
               </div>
               <ChannelsTable selectedChannel={selectedChannel} setSelectedChannel={setSelectedChannel} />
               <ChannelInfo channelInfoVisible={channelInfoVisible} closeChannelInfo={closeChannelInfo}/>
           </div>
       </_InnerPage>
    );
}

export default Channels;
