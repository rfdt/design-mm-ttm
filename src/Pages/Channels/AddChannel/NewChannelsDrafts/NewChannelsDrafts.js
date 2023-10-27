import React from 'react';
import './NewChannelsDrafts.css';
import {Button} from "primereact/button";
import ChannelDraft from "./ChannelDraft/ChannelDraft";
import {useSelector} from "react-redux";
import {emptyChannelDraft} from "../../../../Modules/emptyChannelDraft";

function NewChannelsDrafts({setChannelDraft}) {

    const {channelsDrafts} = useSelector(state => state.channels)

    return (
        <div className='NewChannelsDrafts__Container'>
            {channelsDrafts.map((draft, idx)=>(
                <ChannelDraft draft={draft} idx={idx} key={idx} setChannelDraft={setChannelDraft}/>
            ))}
            <Button label="Новая запись" severity="info" className='NewChannel__ClearDraft' size={"small"} onClick={()=>setChannelDraft(emptyChannelDraft)}/>
        </div>
    );
}

export default NewChannelsDrafts;
