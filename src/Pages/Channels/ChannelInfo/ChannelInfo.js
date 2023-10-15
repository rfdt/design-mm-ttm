import React, {useEffect, useState} from 'react';
import './ChannelInfo.css';
import {Sidebar} from "primereact/sidebar";
import {InputText} from "primereact/inputtext";
import {Divider} from 'primereact/divider';
import {ProgressSpinner} from "primereact/progressspinner";
import {useSelector} from "react-redux";
import {useActions} from "../../../Store/useActions";
import EditChannel from "../EditChannel/EditChannel";
import {EDIT_CHANNEL_ACCESS_ROLES} from "../../../Modules/functionAccess";
import InventoryHardwareInfo from "./HardwareInfo/InventoryHardwareInfo";
import HardwareInfo from "./HardwareInfo/HardwareInfo";

function ChannelInfo() {

    const {isLoadingSelectedChannel, loadedSelectedChannel, selectedChannel} = useSelector(state => state.channels)
    const {isAuthenticated, user} = useSelector(state => state.user)
    const {clearSelectedChannel, setEditChannel, setMessageError} = useActions()
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


    const customIcons = (
        <React.Fragment>
            {loadedSelectedChannel && !loadedSelectedChannel.channel_verified ? <p className={'p-error'}>Канал не верифицирован</p> : null}
            <button className="p-sidebar-icon p-link mr-2">
                <span className="pi pi-file-export"/>
            </button>
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
                            <div className="ChannelInfo__Table">
                                <div className="ChannelInfo__Table-String">
                                    <div className="ChannelInfo__Table-String-Title">
                                        ID
                                    </div>
                                    <div className="ChannelInfo__Table-String-Inputs">
                                        <InputText value={loadedSelectedChannel.id_tbcd}
                                                   className="p-inputtext-sm ChannelInfo__Table-String-Input-33"/>
                                        <InputText value={loadedSelectedChannel.id_suz}
                                                   className="p-inputtext-sm ChannelInfo__Table-String-Input-33"/>
                                        <InputText value={loadedSelectedChannel.id_oss}
                                                   className="p-inputtext-sm ChannelInfo__Table-String-Input-33"/>
                                    </div>
                                </div>
                                <div className="ChannelInfo__Table-String">
                                    <div className="ChannelInfo__Table-String-Title">
                                        Клиент
                                    </div>
                                    <div className="ChannelInfo__Table-String-Inputs">
                                        <InputText value={loadedSelectedChannel.client}
                                                   className="p-inputtext-sm ChannelInfo__Table-String-Input-100"/>
                                    </div>
                                </div>
                                <div className="ChannelInfo__Table-String">
                                    <div className="ChannelInfo__Table-String-Title">
                                        Услуга
                                    </div>
                                    <div className="ChannelInfo__Table-String-Inputs">
                                        <InputText value={loadedSelectedChannel.service}
                                                   className="p-inputtext-sm ChannelInfo__Table-String-Input-50"/>
                                        <InputText value={loadedSelectedChannel.service_size}
                                                   className="p-inputtext-sm ChannelInfo__Table-String-Input-50"/>
                                    </div>
                                </div>
                                <div className="ChannelInfo__Table-String">
                                    <div className="ChannelInfo__Table-String-Title">
                                        Адрес
                                    </div>
                                    <div className="ChannelInfo__Table-String-Inputs">
                                        <InputText value={loadedSelectedChannel.city}
                                                   className="p-inputtext-sm ChannelInfo__Table-String-Input-40"/>
                                        <InputText value={loadedSelectedChannel.street}
                                                   className="p-inputtext-sm ChannelInfo__Table-String-Input-40"/>
                                        <InputText value={loadedSelectedChannel.home}
                                                   className="p-inputtext-sm ChannelInfo__Table-String-Input-20"/>
                                    </div>
                                </div>
                                <div className="ChannelInfo__Table-String">
                                    <div className="ChannelInfo__Table-String-Title">
                                        Инфо
                                    </div>
                                    <div className="ChannelInfo__Table-String-Inputs">
                                        <InputText value={loadedSelectedChannel.add_info}
                                                   className="p-inputtext-sm ChannelInfo__Table-String-Input-100"/>
                                    </div>
                                </div>
                                <div className="ChannelInfo__Table-String">
                                    <div className="ChannelInfo__Table-String-Title">
                                        Контакт
                                    </div>
                                    <div className="ChannelInfo__Table-String-Inputs">
                                        <InputText value={loadedSelectedChannel.contact}
                                                   className="p-inputtext-sm ChannelInfo__Table-String-Input-100"/>
                                    </div>
                                </div>
                                <div className="ChannelInfo__Table-String">
                                    <div className="ChannelInfo__Table-String-Title">
                                        Статус
                                    </div>
                                    <div className="ChannelInfo__Table-String-Inputs">
                                        <InputText value={loadedSelectedChannel.status}
                                                   className={["p-inputtext-sm", "ChannelInfo__Table-String-Input-50",
                                                       loadedSelectedChannel.status === "ВКЛ" ? "ChannelInfo__Table-String-Input-ON" : null,
                                                       loadedSelectedChannel.status === "ОТКЛ" ? "ChannelInfo__Table-String-Input-OFF" : null,
                                                       loadedSelectedChannel.status === "ПАУЗА" ? "ChannelInfo__Table-String-Input-PAUSE" : null,
                                                       loadedSelectedChannel.status !== "ОТКЛ" && loadedSelectedChannel.status !== "ВКЛ" && loadedSelectedChannel.status !== "ПАУЗА" ? "ChannelInfo__Table-String-Input-OTHER" : null
                                                   ].join(' ')}/>
                                        <InputText value={new Date(loadedSelectedChannel.date).toLocaleDateString()}
                                                   className="p-inputtext-sm  ChannelInfo__Table-String-Input-50"/>
                                    </div>
                                </div>
                                <div className="ChannelInfo__Table-String">
                                    <div className="ChannelInfo__Table-String-Title">
                                        Прим
                                    </div>
                                    <div className="ChannelInfo__Table-String-Inputs">
                                        <InputText value={loadedSelectedChannel.note}
                                                   className="p-inputtext-sm ChannelInfo__Table-String-Input-50"/>
                                        <InputText value={loadedSelectedChannel.rd_sr}
                                                   className="p-inputtext-sm  ChannelInfo__Table-String-Input-50"/>
                                    </div>
                                </div>
                            </div>
                            <Divider/>
                            {!loadedSelectedChannel.channel_verified ? <InventoryHardwareInfo /> : <HardwareInfo />}
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
