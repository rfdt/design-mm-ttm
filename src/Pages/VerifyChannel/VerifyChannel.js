import React, {useEffect, useState} from 'react';
import _InnerPage from "../_InnerPage/_InnerPage";
import './VerifyChannel.css';
import {useParams} from "react-router-dom";
import {useActions} from "../../Store/useActions";
import ChannelInventory from "./ChannelInventory/ChannelInventory";
import PageLoader from "../../Modules/PageLoader/PageLoader";
import EditedChannel from "./EditedChannel/EditedChannel";

function VerifyChannel(props) {

    const {id} = useParams();
    const {getChannelToVerify} = useActions();
    const [loadingChannel, setLoadingChannel] = useState(true);
    const [verifiedChannel, setVerifiedChannel] = useState(null);

    useEffect(() => {
        getChannelToVerify(id)
            .then(channelResponse => {
                if(channelResponse){
                    setVerifiedChannel(channelResponse);
                    setLoadingChannel(false);
                }
            })
    }, [id])

    return (
        <_InnerPage>
            {!loadingChannel ?
                <div className="VerifyChannel__Container">
                    <div className="VerifyChannel__Title">Верификация канала</div>
                    {verifiedChannel && <ChannelInventory verifiedChannel={verifiedChannel}/>}
                    {verifiedChannel && <EditedChannel verifiedChannel={verifiedChannel}/>}
                </div>
                : <PageLoader/>
            }
        </_InnerPage>
    );
}

export default VerifyChannel;
