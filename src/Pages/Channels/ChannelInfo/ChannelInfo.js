import React, {useEffect, useState} from 'react';
import './ChannelInfo.css';
import {Sidebar} from "primereact/sidebar";
import {Divider} from 'primereact/divider';
import {ProgressSpinner} from "primereact/progressspinner";
import {useSelector} from "react-redux";
import {useActions} from "../../../Store/useActions";
import EditChannel from "../EditChannel/EditChannel";
import {EDIT_CHANNEL_ACCESS_ROLES} from "../../../Modules/functionAccess";
import InventoryHardwareInfo from "./HardwareInfo/InventoryHardwareInfo";
import HardwareInfo from "./HardwareInfo/HardwareInfo";
import {useNavigate} from "react-router-dom";
import CommercialInfo from "./CommercialInfo/CommercialInfo";
import VerifyInfo from "./VerifyInfo/VerifyInfo";
import RelatedChannels from "./RelatedChannels/RelatedChannels";

function ChannelInfo() {

    const {isLoadingSelectedChannel, loadedSelectedChannel, selectedChannel} = useSelector(state => state.channels)
    const {isAuthenticated, user} = useSelector(state => state.user)
    const {clearSelectedChannel, setEditChannel, setMessageError} = useActions()
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (selectedChannel && selectedChannel._id) {
            setVisible(true)
        }
        if (!selectedChannel) {
            setVisible(false)
        }
    }, [selectedChannel])

    const startEditChannel = () =>{
        if(loadedSelectedChannel && loadedSelectedChannel.channel_verified === false){
            return setMessageError('Нельзя изменить канал из инвентори. Требуется верификация канала');
        }
        if(loadedSelectedChannel && loadedSelectedChannel.status === 'ИЗМ'){
            return setMessageError("Нельзя изменить архивный канал");
        }
        if(isAuthenticated && user.roles.some(role=>EDIT_CHANNEL_ACCESS_ROLES.includes(role))){
            setEditChannel(true);
        }else {
            setMessageError("У вас нет доступа к изменению канала");
        }
    }

    const onVerify = () =>{
        if(selectedChannel && !selectedChannel.channel_verified){
            navigate(`/verify/${selectedChannel._id}`)
        }
    }


    const customIcons = (
        <React.Fragment>
            {loadedSelectedChannel && !loadedSelectedChannel.channel_verified ? <><p className={'p-error'}>Канал не верифицирован</p>
            <button className="p-sidebar-icon p-link mr-2" disabled={loadedSelectedChannel && loadedSelectedChannel.channel_verified}
                                                            onClick={()=>onVerify()}
            >
                <span className="pi pi-shield"/>
            </button>
            </> : null}
            <button className="p-sidebar-icon p-link mr-2" onClick={startEditChannel}>
                <span className="pi pi-file-edit"/>
            </button>
        </React.Fragment>
    );

    return (
        <Sidebar visible={visible} className='ChannelInfo__Container'
                 position="right" onHide={() => clearSelectedChannel()} icons={customIcons}>
            <>
                {isLoadingSelectedChannel ?
                    <div className={'ChannelInfo__Loading'}>
                        <ProgressSpinner style={{margin: "0 auto"}}/>
                    </div>
                    : null}
                {
                    !isLoadingSelectedChannel && loadedSelectedChannel ?
                        <>
                            <div className="ChannelInfo__Title">
                                Сведения о канале
                            </div>
                            <VerifyInfo />
                            <CommercialInfo />
                            <Divider/>
                            <div className="ChannelInfo__Title">
                                Технические сведения
                            </div>
                            {!loadedSelectedChannel.channel_verified ? <InventoryHardwareInfo /> : <HardwareInfo />}
                            <Divider/>
                            <RelatedChannels />
                            <Divider/>
                            <div className="ChannelInfo__Table">
                                История тикетов или что-то другое
                            </div>
                        </> : null
                }
                <EditChannel/>
            </>
        </Sidebar>
    );
}

export default ChannelInfo;
