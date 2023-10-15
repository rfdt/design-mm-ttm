import React from 'react';
import {InputText} from "primereact/inputtext";
import {useSelector} from "react-redux";

function InventoryHardwareInfo(props){

const { loadedSelectedChannel} = useSelector(state => state.channels)

return (
    <div className="ChannelInfo__Table">
        <div className="ChannelInfo__Table-String">
            <div className="ChannelInfo__Table-String-Title">
                PE
            </div>
            <div className="ChannelInfo__Table-String-Inputs">
                <InputText value={loadedSelectedChannel.inventory_channel_pe}
                           className="p-inputtext-sm ChannelInfo__Table-String-Input-50"/>
                <InputText value={loadedSelectedChannel.inventory_channel_pe_port}
                           className="p-inputtext-sm ChannelInfo__Table-String-Input-25"/>
                <InputText value={loadedSelectedChannel.inventory_channel_vid}
                           className="p-inputtext-sm ChannelInfo__Table-String-Input-25"/>
            </div>
        </div>
        <div className="ChannelInfo__Table-String">
            <div className="ChannelInfo__Table-String-Title">
                AGGSTOP
            </div>
            <div className="ChannelInfo__Table-String-Inputs">
                <InputText value={loadedSelectedChannel.inventory_channel_agg_stop}
                           className="p-inputtext-sm ChannelInfo__Table-String-Input-70"/>
                <InputText value={loadedSelectedChannel.inventory_channel_agg_port}
                           className="p-inputtext-sm ChannelInfo__Table-String-Input-30"/>
            </div>
        </div>
        <div className="ChannelInfo__Table-String">
            <div className="ChannelInfo__Table-String-Title">
                ACCSTOP
            </div>
            <div className="ChannelInfo__Table-String-Inputs">
                <InputText value={loadedSelectedChannel.inventory_channel_acc_stop}
                           className="p-inputtext-sm ChannelInfo__Table-String-Input-100"/>
            </div>
        </div>
        <div className="ChannelInfo__Table-String">
            <div className="ChannelInfo__Table-String-Title">
                IP MNG/A
            </div>
            <div className="ChannelInfo__Table-String-Inputs">
                <InputText value={loadedSelectedChannel.inventory_channel_ip_mng_acc}
                           className="p-inputtext-sm ChannelInfo__Table-String-Input-100"/>
            </div>
        </div>
        <div className="ChannelInfo__Table-String">
            <div className="ChannelInfo__Table-String-Title">
                PORT_A
            </div>
            <div className="ChannelInfo__Table-String-Inputs">
                <InputText value={loadedSelectedChannel.inventory_channel_acc_port}
                           className="p-inputtext-sm ChannelInfo__Table-String-Input-100"/>
            </div>
        </div>
        <div className="ChannelInfo__Table-String">
            <div className="ChannelInfo__Table-String-Title">
                MODEL
            </div>
            <div className="ChannelInfo__Table-String-Inputs">
                <InputText value={loadedSelectedChannel.inventory_channel_acc_model}
                           className="p-inputtext-sm ChannelInfo__Table-String-Input-100"/>
            </div>
        </div>
        <div className="ChannelInfo__Table-String">
            <div className="ChannelInfo__Table-String-Title">
                SN
            </div>
            <div className="ChannelInfo__Table-String-Inputs">
                <InputText value={loadedSelectedChannel.inventory_channel_acc_sn}
                           className="p-inputtext-sm ChannelInfo__Table-String-Input-100"/>
            </div>
        </div>
        <div className="ChannelInfo__Table-String">
            <div className="ChannelInfo__Table-String-Title">
                MAC
            </div>
            <div className="ChannelInfo__Table-String-Inputs">
                <InputText value={loadedSelectedChannel.inventory_channel_acc_mac}
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
);
}

export default InventoryHardwareInfo;
