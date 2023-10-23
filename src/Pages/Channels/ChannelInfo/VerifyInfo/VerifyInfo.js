import React, {useState} from 'react';
import './VerifyInfo.css';
import {Avatar} from "primereact/avatar";
import {Badge} from "primereact/badge";
import {Button} from "primereact/button";
import {useSelector} from "react-redux";

function VerifyInfo(props) {

    const {loadedSelectedChannel} = useSelector(state => state.channels)
    const [visible, setVisible] = useState(true);

    return (
        <>
            {loadedSelectedChannel.channel_verified && loadedSelectedChannel.channel_verified_user && loadedSelectedChannel.channel_verified_date && visible?
                <div className='Channel-VerifyInfo__Container'>
                    <div className="Channel-VerifyInfo__Body">
                        <div className="Header__User-Avatar">
                            <Avatar className="p-overlay-badge" icon="pi pi-user" size="large" />
                        </div>
                        <div className="Header__User-Info">
                            <div className="Header__User-Data">
                                {loadedSelectedChannel.channel_verified_user.name.split(' ').slice(0,2).reverse().join(' ')}
                            </div>
                            <div className="Header__User-Email">
                                Дата проверки: {new Date(loadedSelectedChannel.channel_verified_date)
                                .toLocaleDateString().split('.').reverse().join('.')}
                            </div>
                        </div>
                        <div className="Channel-VerifyInfo-Close">
                            <Button icon="pi pi-times" rounded text severity="info" aria-label="Cancel" size={"small"} onClick={()=>setVisible(false)}/>
                        </div>
                    </div>
                </div> : null
            }
        </>
    );
}

export default VerifyInfo;
