import React, {useEffect} from 'react';
import _InnerPage from "../_InnerPage/_InnerPage";
import './Channels.css';
import ChannelsFilters from "./СhannelsFilters/ChannelsFilters";
import ChannelsTable from "./ChannelsTable/ChannelsTable";
import ChannelInfo from "./ChannelInfo/ChannelInfo";
import {useActions} from "../../Store/useActions";

function Channels() {

    const {findChannels} = useActions()

    useEffect(() => {
        findChannels()
    }, [])


    return (
        <>
            <_InnerPage>
                <div className="ChannelsPage__Container">
                    <div className="ChannelsPage__Filters">
                        <ChannelsFilters  />
                    </div>
                    <ChannelsTable  />
                    <ChannelInfo/>
                </div>
            </_InnerPage>
        </>
    );
}

export default Channels;
