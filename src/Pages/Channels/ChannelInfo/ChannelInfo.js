import React from 'react';
import './ChannelInfo.css';
import {Sidebar} from "primereact/sidebar";
import {InputText} from "primereact/inputtext";
import {Divider} from 'primereact/divider';
import {ProgressSpinner} from "primereact/progressspinner";

function ChannelInfo({
                         channelInfoVisible, closeChannelInfo,
                         loadedChannel, setLoadedChannel,
                         isLoadingChannel
                     }) {

    const customIcons = (
        <React.Fragment>
            <button className="p-sidebar-icon p-link mr-2">
                <span className="pi pi-file-export"/>
            </button>
            <button className="p-sidebar-icon p-link mr-2">
                <span className="pi pi-file-edit"/>
            </button>
        </React.Fragment>
    );

    return (
        <Sidebar visible={channelInfoVisible} className='ChannelInfo__Container'
                 position="right" onHide={() => closeChannelInfo(false)} icons={customIcons}>
            {isLoadingChannel ?
                <div className={'ChannelInfo__Loading'}>
                    <ProgressSpinner style={{margin: "0 auto"}}/>
                </div>
                : null}
            {
                !isLoadingChannel && loadedChannel ?
                    <>
                        <div className="ChannelInfo__Table">
                            <div className="ChannelInfo__Table-String">
                                <div className="ChannelInfo__Table-String-Title">
                                    ID
                                </div>
                                <div className="ChannelInfo__Table-String-Inputs">
                                    <InputText value={loadedChannel.id_tbcd}
                                               className="p-inputtext-sm ChannelInfo__Table-String-Input-33"/>
                                    <InputText value={loadedChannel.id_suz}
                                               className="p-inputtext-sm ChannelInfo__Table-String-Input-33"/>
                                    <InputText value={loadedChannel.id_oss}
                                               className="p-inputtext-sm ChannelInfo__Table-String-Input-33"/>
                                </div>
                            </div>
                            <div className="ChannelInfo__Table-String">
                                <div className="ChannelInfo__Table-String-Title">
                                    Клиент
                                </div>
                                <div className="ChannelInfo__Table-String-Inputs">
                                    <InputText value={loadedChannel.client}
                                               className="p-inputtext-sm ChannelInfo__Table-String-Input-100"/>
                                </div>
                            </div>
                            <div className="ChannelInfo__Table-String">
                                <div className="ChannelInfo__Table-String-Title">
                                    Услуга
                                </div>
                                <div className="ChannelInfo__Table-String-Inputs">
                                    <InputText value={loadedChannel.service}
                                               className="p-inputtext-sm ChannelInfo__Table-String-Input-50"/>
                                    <InputText value={loadedChannel.service_size}
                                               className="p-inputtext-sm ChannelInfo__Table-String-Input-50"/>
                                </div>
                            </div>
                            <div className="ChannelInfo__Table-String">
                                <div className="ChannelInfo__Table-String-Title">
                                    Адрес
                                </div>
                                <div className="ChannelInfo__Table-String-Inputs">
                                    <InputText value={loadedChannel.city}
                                               className="p-inputtext-sm ChannelInfo__Table-String-Input-45"/>
                                    <InputText value={loadedChannel.street}
                                               className="p-inputtext-sm ChannelInfo__Table-String-Input-45"/>
                                    <InputText value={loadedChannel.home}
                                               className="p-inputtext-sm ChannelInfo__Table-String-Input-10"/>
                                </div>
                            </div>
                            <div className="ChannelInfo__Table-String">
                                <div className="ChannelInfo__Table-String-Title">
                                    Инфо
                                </div>
                                <div className="ChannelInfo__Table-String-Inputs">
                                    <InputText value={loadedChannel.add_info}
                                               className="p-inputtext-sm ChannelInfo__Table-String-Input-100"/>
                                </div>
                            </div>
                            <div className="ChannelInfo__Table-String">
                                <div className="ChannelInfo__Table-String-Title">
                                    Контакт
                                </div>
                                <div className="ChannelInfo__Table-String-Inputs">
                                    <InputText value={loadedChannel.contact}
                                               className="p-inputtext-sm ChannelInfo__Table-String-Input-100"/>
                                </div>
                            </div>
                            <div className="ChannelInfo__Table-String">
                                <div className="ChannelInfo__Table-String-Title">
                                    Статус
                                </div>
                                <div className="ChannelInfo__Table-String-Inputs">
                                    <InputText value={loadedChannel.status}
                                               className={["p-inputtext-sm", "ChannelInfo__Table-String-Input-50",
                                                   loadedChannel.status === "ВКЛ" ? "ChannelInfo__Table-String-Input-ON" : null,
                                                   loadedChannel.status === "ОТКЛ" ? "ChannelInfo__Table-String-Input-OFF" : null,
                                                   loadedChannel.status === "ПАУЗА" ? "ChannelInfo__Table-String-Input-PAUSE" : null,
                                                   loadedChannel.status !== "ОТКЛ" && loadedChannel.status !== "ВКЛ" &&  loadedChannel.status !== "ПАУЗА" ? "ChannelInfo__Table-String-Input-OTHER" : null
                                               ].join(' ')}/>
                                    <InputText value={loadedChannel.date}
                                               className="p-inputtext-sm  ChannelInfo__Table-String-Input-50"/>
                                </div>
                            </div>
                            <div className="ChannelInfo__Table-String">
                                <div className="ChannelInfo__Table-String-Title">
                                    Прим
                                </div>
                                <div className="ChannelInfo__Table-String-Inputs">
                                    <InputText value={loadedChannel.note}
                                               className="p-inputtext-sm ChannelInfo__Table-String-Input-50"/>
                                    <InputText value={loadedChannel.rd_sr}
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
                                    <InputText value={loadedChannel.channel_pe}
                                               className="p-inputtext-sm ChannelInfo__Table-String-Input-50"/>
                                    <InputText value={loadedChannel.channel_pe_port}
                                               className="p-inputtext-sm ChannelInfo__Table-String-Input-25"/>
                                    <InputText value={loadedChannel.channel_vid}
                                               className="p-inputtext-sm ChannelInfo__Table-String-Input-25"/>
                                </div>
                            </div>
                            <div className="ChannelInfo__Table-String">
                                <div className="ChannelInfo__Table-String-Title">
                                    AGGSTOP
                                </div>
                                <div className="ChannelInfo__Table-String-Inputs">
                                    <InputText value={loadedChannel.channel_agg_stop}
                                               className="p-inputtext-sm ChannelInfo__Table-String-Input-70"/>
                                    <InputText value={loadedChannel.channel_agg_port}
                                               className="p-inputtext-sm ChannelInfo__Table-String-Input-30"/>
                                </div>
                            </div>
                            <div className="ChannelInfo__Table-String">
                                <div className="ChannelInfo__Table-String-Title">
                                    ACCSTOP
                                </div>
                                <div className="ChannelInfo__Table-String-Inputs">
                                    <InputText value={loadedChannel.channel_acc_stop}
                                               className="p-inputtext-sm ChannelInfo__Table-String-Input-100"/>
                                </div>
                            </div>
                            <div className="ChannelInfo__Table-String">
                                <div className="ChannelInfo__Table-String-Title">
                                    IP MNG/A
                                </div>
                                <div className="ChannelInfo__Table-String-Inputs">
                                    <InputText value={loadedChannel.channel_ip_mng_acc}
                                               className="p-inputtext-sm ChannelInfo__Table-String-Input-100"/>
                                </div>
                            </div>
                            <div className="ChannelInfo__Table-String">
                                <div className="ChannelInfo__Table-String-Title">
                                    PORT_A
                                </div>
                                <div className="ChannelInfo__Table-String-Inputs">
                                    <InputText value={loadedChannel.channel_acc_port}
                                               className="p-inputtext-sm ChannelInfo__Table-String-Input-100"/>
                                </div>
                            </div>
                            <div className="ChannelInfo__Table-String">
                                <div className="ChannelInfo__Table-String-Title">
                                    MODEL
                                </div>
                                <div className="ChannelInfo__Table-String-Inputs">
                                    <InputText value={loadedChannel.channel_acc_model}
                                               className="p-inputtext-sm ChannelInfo__Table-String-Input-100"/>
                                </div>
                            </div>
                            <div className="ChannelInfo__Table-String">
                                <div className="ChannelInfo__Table-String-Title">
                                    SN
                                </div>
                                <div className="ChannelInfo__Table-String-Inputs">
                                    <InputText value={loadedChannel.channel_acc_sn}
                                               className="p-inputtext-sm ChannelInfo__Table-String-Input-100"/>
                                </div>
                            </div>
                            <div className="ChannelInfo__Table-String">
                                <div className="ChannelInfo__Table-String-Title">
                                    MAC
                                </div>
                                <div className="ChannelInfo__Table-String-Inputs">
                                    <InputText value={loadedChannel.channel_acc_mac}
                                               className="p-inputtext-sm ChannelInfo__Table-String-Input-100"/>
                                </div>
                            </div>
                            <div className="ChannelInfo__Table-String">
                                <div className="ChannelInfo__Table-String-Title">
                                    Zabbix
                                </div>
                                <div className="ChannelInfo__Table-String-Inputs">
                                    <InputText value={loadedChannel.zabbix}
                                               className="p-inputtext-sm ChannelInfo__Table-String-Input-50"/>
                                    <InputText value={loadedChannel.zabbix_avail}
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
        </Sidebar>
    );
}

export default ChannelInfo;