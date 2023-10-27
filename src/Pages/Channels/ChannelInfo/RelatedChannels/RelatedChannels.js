import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {useActions} from "../../../../Store/useActions";
import './RelatedChannels.css';
import RelatedChannel from "./RelatedChannel/RelatedChannel";

function RelatedChannels() {

    const {loadedSelectedChannel} = useSelector(state => state.channels)
    const {getRelatedChannels} = useActions();

    const [relatedChannels, setRelatedChannels] = useState([]);

    useEffect(() => {
        if (loadedSelectedChannel && loadedSelectedChannel.channel_ref) {
            getRelatedChannels(loadedSelectedChannel._id)
                .then(relatedChannels => setRelatedChannels(relatedChannels))
        }
    }, [])

    return (
        <>{relatedChannels && relatedChannels.length > 0 ?
            <div className='ChannelInfo__Related-Channels-Container'>
                <div className="ChannelInfo__Related-Channels-Title">Связанные каналы</div>
                <div className="ChannelInfo__Related-Channels-Body">
                    {relatedChannels.map(channel => (
                        <RelatedChannel channel={channel} key={channel._id}/>
                    ))}
                </div>
            </div> : null}
        </>
    );
}

export default RelatedChannels;
