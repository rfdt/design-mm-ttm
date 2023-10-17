import React from 'react';
import {InputText} from "primereact/inputtext";
import {useSelector} from "react-redux";

function HardwareInfo() {

    const {loadedSelectedChannel} = useSelector(state => state.channels)

    return (
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
            {loadedSelectedChannel.channel_agg_stop.map((agg, index) => (
                <div className="ChannelInfo__Table-String" key={index}>
                    <div className="ChannelInfo__Table-String-Title">
                        {index === 0 ? "AGGSTOP" : null}
                    </div>
                    <div className="ChannelInfo__Table-String-Inputs">
                        <InputText value={agg.agg_stop}
                                   className="p-inputtext-sm ChannelInfo__Table-String-Input-70"/>
                        <InputText value={agg.agg_port}
                                   className="p-inputtext-sm ChannelInfo__Table-String-Input-30"/>
                    </div>
                </div>
            ))}
            {loadedSelectedChannel.channel_acc_stop.map((acc, index) => (
                <React.Fragment key={index}>
                    {acc.withStop ?
                        <div className="ChannelInfo__Table-String">
                            <div className="ChannelInfo__Table-String-Title">
                                ACCSTOP
                            </div>
                            <div className="ChannelInfo__Table-String-Inputs">
                                <InputText value={acc.acc_stop}
                                           className="p-inputtext-sm ChannelInfo__Table-String-Input-50"/>
                                <InputText value={acc.acc_ip_mng}
                                           className="p-inputtext-sm ChannelInfo__Table-String-Input-50"/>
                            </div>
                        </div>
                        :
                        <>
                            <div className="ChannelInfo__Table-String">
                                <div className="ChannelInfo__Table-String-Title">
                                    ACCSTOP
                                </div>
                                <div className="ChannelInfo__Table-String-Inputs">
                                    <InputText value={acc.acc_stop}
                                               className="p-inputtext-sm ChannelInfo__Table-String-Input-50"/>
                                    <InputText value={acc.acc_ip_mng}
                                               className="p-inputtext-sm ChannelInfo__Table-String-Input-50"/>
                                </div>
                            </div>
                            <div className="ChannelInfo__Table-String">
                                <div className="ChannelInfo__Table-String-Title">

                                </div>
                                <div className="ChannelInfo__Table-String-Inputs">
                                    <InputText value={acc.acc_port}
                                               className="p-inputtext-sm ChannelInfo__Table-String-Input-50"/>
                                    <InputText value={acc.acc_model}
                                               className="p-inputtext-sm ChannelInfo__Table-String-Input-50"/>
                                </div>
                            </div>
                            <div className="ChannelInfo__Table-String">
                                <div className="ChannelInfo__Table-String-Title">

                                </div>
                                <div className="ChannelInfo__Table-String-Inputs">
                                    <InputText value={acc.acc_sn}
                                               className="p-inputtext-sm ChannelInfo__Table-String-Input-50"/>
                                    <InputText value={acc.acc_mac}
                                               className="p-inputtext-sm ChannelInfo__Table-String-Input-50"/>
                                </div>
                            </div>
                        </>}
                </React.Fragment>
            ))}
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
    );
}

export default HardwareInfo;
