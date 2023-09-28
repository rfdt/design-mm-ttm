import React, {useEffect, useRef, useState} from 'react';
import _InnerPage from "../_InnerPage/_InnerPage";
import './Channels.css';
import ChannelsFilters from "./СhannelsFilters/ChannelsFilters";
import ChannelsTable from "./ChannelsTable/ChannelsTable";
import ChannelInfo from "./ChannelInfo/ChannelInfo";
import {Toast} from "primereact/toast";
import {ChannelsApi} from "../../Api/ChannelsApi";
import {transformAxiosError} from "../../Modules/transformAxiosError";

function Channels(props) {
    const toastRef = useRef(null);

    const [filteredChannels, setFilteredChannels] = useState([]);
    const [selectedChannel, setSelectedChannel] = useState(null);
    const [channelInfoVisible, setChannelInfoVisible] = useState(false);
    const [isLoadingChannel, setIsLoadingChannel] = useState(false);
    const [loadedChannel, setLoadedChannel] = useState(null);

    /* FILTERS BLOCK */

    const [addInfoFilter, setAddInfoFilter] = useState('');
    const [cityFilter, setCityFilter] = useState('');
    const [streetFilter, setStreetFilter] = useState('');
    const [homeFilter, setHomeFilter] = useState('');
    const [serviceFilter, setServiceFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [peFilter, setPeFilter] = useState('');
    // const [clientFilter, setClientFilter] = useState('');
    const [rdFilter, setRdFilter] = useState('');
    const [channelAggStopFilter, setChannelAggStopFilter] = useState('');
    const [vidFilter, setVidFilter] = useState('');
    const [sizeFilter, setSizeFilter] = useState('');
    const [channelAccStopFilter, setChannelAccStopFilter] = useState('');
    const [channelIpMngFilter, setChannelIpMngFilter] = useState('');

    const showError = (error) => {
        toastRef.current.show({
            severity: 'error',
            summary: "Ошибка загрузки",
            detail: transformAxiosError(error),
            life: 3000
        })
    }


    async function findChannels(filters = {
        addInfoFilter, cityFilter, streetFilter, homeFilter,
        serviceFilter: serviceFilter.name || "", statusFilter: statusFilter?.name || "",
        peFilter, rdFilter, channelAggStopFilter, vidFilter, sizeFilter, channelAccStopFilter, channelIpMngFilter
    }) {
        try {
            const channels = await ChannelsApi.findChannels({...filters})
            setFilteredChannels(channels.data)
        } catch (error) {
            showError(error)
        }
    }

    useEffect(() => {
        findChannels()
    }, [])


    useEffect(() => {
        async function request(id) {
            try {
                const channel = await ChannelsApi.findChannelById(id)
                setLoadedChannel(channel.data);
                setIsLoadingChannel(false)
            } catch (e) {
                setSelectedChannel(null)
                setIsLoadingChannel(false);
                showError(e)
            }
        }

        if (selectedChannel && selectedChannel._id) {
            setChannelInfoVisible(true);
            setIsLoadingChannel(true);
            request(selectedChannel._id);
        }
        // Эффекта которая срабатывает на выбранный канал, если выбран канал с полем _id,
        // то открыть сайд бар, запускать асинх на загрузку и т.д
    }, [selectedChannel]);

    useEffect(() => {
        if (!selectedChannel) {
            //Эффекта, которая срабатывает на удаление канала из состояние локального selectedChannel
            //Удалять тут состояния которое загружается с сервера и т.д
            setChannelInfoVisible(false);
        }
    }, [selectedChannel])

    const closeChannelInfo = () => {
        setSelectedChannel(null);
    }

    return (
        <>
            <_InnerPage>
                <div className="ChannelsPage__Container">
                    <div className="ChannelsPage__Filters">
                        <ChannelsFilters showError={showError} addInfoFilter={addInfoFilter}
                                         setAddInfoFilter={setAddInfoFilter}
                                         cityFilter={cityFilter} setCityFilter={setCityFilter}
                                         streetFilter={streetFilter} setStreetFilter={setStreetFilter}
                                         homeFilter={homeFilter} setHomeFilter={setHomeFilter}
                                         serviceFilter={serviceFilter} setServiceFilter={setServiceFilter}
                                         statusFilter={statusFilter} setStatusFilter={setStatusFilter}
                                         findChannels={findChannels}
                            // clientFilter={clientFilter} setClientFilter={setClientFilter}
                                         rdFilter={rdFilter} setRdFilter={setRdFilter}
                                         channelAggStopFilter={channelAggStopFilter}
                                         setChannelAggStopFilter={setChannelAggStopFilter}
                                         vidFilter={vidFilter} setVidFilter={setVidFilter}
                                         sizeFilter={sizeFilter} setSizeFilter={setSizeFilter}
                                         channelAccStopFilter={channelAccStopFilter}
                                         setChannelAccStopFilter={setChannelAccStopFilter}
                                         channelIpMngFilter={channelIpMngFilter}
                                         setChannelIpMngFilter={setChannelIpMngFilter}
                                         peFilter={peFilter} setPeFilter={setPeFilter}
                                         channelsCount={filteredChannels.length}
                        />
                    </div>
                    <ChannelsTable selectedChannel={selectedChannel}
                                   setSelectedChannel={setSelectedChannel}
                                   toastRef={toastRef}
                                   filteredChannels={filteredChannels}
                    />
                    <ChannelInfo channelInfoVisible={channelInfoVisible} closeChannelInfo={closeChannelInfo}
                                 isLoadingChannel={isLoadingChannel} setIsLoadingChannel={setIsLoadingChannel}
                                 loadedChannel={loadedChannel} setLoadedChannel={loadedChannel}
                    />
                </div>
            </_InnerPage>
            <Toast ref={toastRef} position="top-right"/>
        </>
    );
}

export default Channels;
