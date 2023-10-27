import React from 'react';
import {Avatar} from "primereact/avatar";
import {Button} from "primereact/button";
import './ChannelDraft.css';
import {useActions} from "../../../../../Store/useActions";

function ChannelDraft({draft, idx, setChannelDraft}) {

    const {removeDraftByIdx} = useActions();

    return (
        <div className="NewChannelDraft__Container" onClick={()=>setChannelDraft(draft, idx)}>
            <Avatar icon="pi pi-pencil" size="large"/>
            <div className="NewChannelDraft__Info">
                <div className="NewChannelDraft__Title">Черновик
                    от {new Date(draft.date).toLocaleDateString().split('.').reverse().join('-')}</div>
                <div className="NewChannelDraft__ChannelInfo">
                    {draft.client || draft.id_suz || draft.id_cms || draft.id_tbcd || draft.id_cms || draft.channel_vid}
                </div>
            </div>
            <Button icon="pi pi-times" className='NewChannelDraft__RemoveBtn' rounded text severity="danger"
                    aria-label="Cancel" onClick={()=>removeDraftByIdx(idx)}/>
        </div>
    );
}

export default ChannelDraft;
