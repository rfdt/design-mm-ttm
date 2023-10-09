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
        if(isAuthenticated && user.roles.some(role=>EDIT_CHANNEL_ACCESS_ROLES.includes(role))){
            setEditChannel(true);
        }else {
            setMessageError("У вас нет доступа к изменению канала");
        }
    }


    const customIcons = (
        <React.Fragment>
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
                                                   className="p-inputtext-sm ChannelInfo__Table-String-Input-45"/>
                                        <InputText value={loadedSelectedChannel.street}
                                                   className="p-inputtext-sm ChannelInfo__Table-String-Input-45"/>
                                        <InputText value={loadedSelectedChannel.home}
                                                   className="p-inputtext-sm ChannelInfo__Table-String-Input-10"/>
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
                                        <InputText value={loadedSelectedChannel.date}
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
                            <div className="ChannelInfo__Table">
                                <div className="ChannelInfo__Table-String">
                                    <div className="ChannelInfo__Table-String-Title">
                                        PE
                                    </div>
                                    <div className="ChannelInfo__Table-String-Inputs">
                                        <InputText value={loadedSelectedChannel.channel_pe}
                                                   className="p-inputtext-sm ChannelInfo__Table-String-Input-50"/>
                                        <InputText value={loadedSelectedChannel.channel_pe_port}
                                                   className="p-inputtext-sm ChannelInfo__Table-String-Input-25"/>
                                        <InputText value={loadedSelectedChannel.channel_vid}
                                                   className="p-inputtext-sm ChannelInfo__Table-String-Input-25"/>
                                    </div>
                                </div>
                                <div className="ChannelInfo__Table-String">
                                    <div className="ChannelInfo__Table-String-Title">
                                        AGGSTOP
                                    </div>
                                    <div className="ChannelInfo__Table-String-Inputs">
                                        <InputText value={loadedSelectedChannel.channel_agg_stop}
                                                   className="p-inputtext-sm ChannelInfo__Table-String-Input-70"/>
                                        <InputText value={loadedSelectedChannel.channel_agg_port}
                                                   className="p-inputtext-sm ChannelInfo__Table-String-Input-30"/>
                                    </div>
                                </div>
                                <div className="ChannelInfo__Table-String">
                                    <div className="ChannelInfo__Table-String-Title">
                                        ACCSTOP
                                    </div>
                                    <div className="ChannelInfo__Table-String-Inputs">
                                        <InputText value={loadedSelectedChannel.channel_acc_stop}
                                                   className="p-inputtext-sm ChannelInfo__Table-String-Input-100"/>
                                    </div>
                                </div>
                                <div className="ChannelInfo__Table-String">
                                    <div className="ChannelInfo__Table-String-Title">
                                        IP MNG/A
                                    </div>
                                    <div className="ChannelInfo__Table-String-Inputs">
                                        <InputText value={loadedSelectedChannel.channel_ip_mng_acc}
                                                   className="p-inputtext-sm ChannelInfo__Table-String-Input-100"/>
                                    </div>
                                </div>
                                <div className="ChannelInfo__Table-String">
                                    <div className="ChannelInfo__Table-String-Title">
                                        PORT_A
                                    </div>
                                    <div className="ChannelInfo__Table-String-Inputs">
                                        <InputText value={loadedSelectedChannel.channel_acc_port}
                                                   className="p-inputtext-sm ChannelInfo__Table-String-Input-100"/>
                                    </div>
                                </div>
                                <div className="ChannelInfo__Table-String">
                                    <div className="ChannelInfo__Table-String-Title">
                                        MODEL
                                    </div>
                                    <div className="ChannelInfo__Table-String-Inputs">
                                        <InputText value={loadedSelectedChannel.channel_acc_model}
                                                   className="p-inputtext-sm ChannelInfo__Table-String-Input-100"/>
                                    </div>
                                </div>
                                <div className="ChannelInfo__Table-String">
                                    <div className="ChannelInfo__Table-String-Title">
                                        SN
                                    </div>
                                    <div className="ChannelInfo__Table-String-Inputs">
                                        <InputText value={loadedSelectedChannel.channel_acc_sn}
                                                   className="p-inputtext-sm ChannelInfo__Table-String-Input-100"/>
                                    </div>
                                </div>
                                <div className="ChannelInfo__Table-String">
                                    <div className="ChannelInfo__Table-String-Title">
                                        MAC
                                    </div>
                                    <div className="ChannelInfo__Table-String-Inputs">
                                        <InputText value={loadedSelectedChannel.channel_acc_mac}
                                                   className="p-inputtext-sm ChannelInfo__Table-String-Input-100"/>
                                    </div>
                                </div>
                                <div className="ChannelInfo__Table-String">
                                    <div className="ChannelInfo__Table-String-Title">
                                        Zabbix
                                    </div>
                                    <div className="ChannelInfo__Table-String-Inputs">
                                        <InputText value={loadedSelectedChannel.zabbix}
                                                   className="p-inputtext-sm ChannelInfo__Table-String-Input-50"/>
                                        <InputText value={loadedSelectedChannel.zabbix_avail}
                                                   className="p-inputtext-sm ChannelInfo__Table-String-Input-50"/>
                                    </div>
                                </div>
                            </div>
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
