import React from 'react';
import './ChannelInventory.css';
import {InputText} from "primereact/inputtext";
import '../../Channels/ChannelInfo/ChannelInfo.css';

function ChannelInventory({verifiedChannel}) {
 return (
     <div className="VerifyChannel__Inventory">
            <div className="VerifyChannel__Inventory-Title">
                Данные из INVENTORY
            </div>
         <div className="VerifyChannel__Inventory-Body">
             <div className="VerifyChannel__Inventory-Managment">
                 <div className="ChannelInfo__Table">
                     <div className="ChannelInfo__Table-String">
                         <div className="ChannelInfo__Table-String-Title">
                             ID
                         </div>
                         <div className="ChannelInfo__Table-String-Inputs">
                             <InputText value={verifiedChannel.id_tbcd}
                                        className="p-inputtext-sm ChannelInfo__Table-String-Input-33"/>
                             <InputText value={verifiedChannel.id_suz}
                                        className="p-inputtext-sm ChannelInfo__Table-String-Input-33"/>
                             <InputText value={verifiedChannel.id_oss}
                                        className="p-inputtext-sm ChannelInfo__Table-String-Input-33"/>
                         </div>
                     </div>
                     <div className="ChannelInfo__Table-String">
                         <div className="ChannelInfo__Table-String-Title">
                             Клиент
                         </div>
                         <div className="ChannelInfo__Table-String-Inputs">
                             <InputText value={verifiedChannel.client}
                                        className="p-inputtext-sm ChannelInfo__Table-String-Input-100"/>
                         </div>
                     </div>
                     <div className="ChannelInfo__Table-String">
                         <div className="ChannelInfo__Table-String-Title">
                             Услуга
                         </div>
                         <div className="ChannelInfo__Table-String-Inputs">
                             <InputText value={verifiedChannel.service}
                                        className="p-inputtext-sm ChannelInfo__Table-String-Input-50"/>
                             <InputText value={verifiedChannel.service_size}
                                        className="p-inputtext-sm ChannelInfo__Table-String-Input-50"/>
                         </div>
                     </div>
                     <div className="ChannelInfo__Table-String">
                         <div className="ChannelInfo__Table-String-Title">
                             Адрес
                         </div>
                         <div className="ChannelInfo__Table-String-Inputs">
                             <InputText value={verifiedChannel.city}
                                        className="p-inputtext-sm ChannelInfo__Table-String-Input-40"/>
                             <InputText value={verifiedChannel.street}
                                        className="p-inputtext-sm ChannelInfo__Table-String-Input-40"/>
                             <InputText value={verifiedChannel.home}
                                        className="p-inputtext-sm ChannelInfo__Table-String-Input-20"/>
                         </div>
                     </div>
                     <div className="ChannelInfo__Table-String">
                         <div className="ChannelInfo__Table-String-Title">
                             Инфо
                         </div>
                         <div className="ChannelInfo__Table-String-Inputs">
                             <InputText value={verifiedChannel.add_info}
                                        className="p-inputtext-sm ChannelInfo__Table-String-Input-100"/>
                         </div>
                     </div>
                     <div className="ChannelInfo__Table-String">
                         <div className="ChannelInfo__Table-String-Title">
                             Контакт
                         </div>
                         <div className="ChannelInfo__Table-String-Inputs">
                             <InputText value={verifiedChannel.contact}
                                        className="p-inputtext-sm ChannelInfo__Table-String-Input-100"/>
                         </div>
                     </div>
                     <div className="ChannelInfo__Table-String">
                         <div className="ChannelInfo__Table-String-Title">
                             Статус
                         </div>
                         <div className="ChannelInfo__Table-String-Inputs">
                             <InputText value={verifiedChannel.status}
                                        className={["p-inputtext-sm", "ChannelInfo__Table-String-Input-50",
                                            verifiedChannel.status === "ВКЛ" ? "ChannelInfo__Table-String-Input-ON" : null,
                                            verifiedChannel.status === "ОТКЛ" ? "ChannelInfo__Table-String-Input-OFF" : null,
                                            verifiedChannel.status === "ПАУЗА" ? "ChannelInfo__Table-String-Input-PAUSE" : null,
                                            verifiedChannel.status !== "ОТКЛ" && verifiedChannel.status !== "ВКЛ" && verifiedChannel.status !== "ПАУЗА" ? "ChannelInfo__Table-String-Input-OTHER" : null
                                        ].join(' ')}/>
                             <InputText value={new Date(verifiedChannel.date).toLocaleDateString().split('.').reverse().join('-')}
                                        className="p-inputtext-sm  ChannelInfo__Table-String-Input-50"/>
                         </div>
                     </div>
                     <div className="ChannelInfo__Table-String">
                         <div className="ChannelInfo__Table-String-Title">
                             Прим
                         </div>
                         <div className="ChannelInfo__Table-String-Inputs">
                             <InputText value={verifiedChannel.note}
                                        className="p-inputtext-sm ChannelInfo__Table-String-Input-50"/>
                             <InputText value={verifiedChannel.rd_sr}
                                        className="p-inputtext-sm  ChannelInfo__Table-String-Input-50"/>
                         </div>
                     </div>
                 </div>
             </div>
             <div className="VerifyChannel__Inventory-Technical">
                 <div className="ChannelInfo__Table">
                     <div className="ChannelInfo__Table-String">
                         <div className="ChannelInfo__Table-String-Title">
                             PE
                         </div>
                         <div className="ChannelInfo__Table-String-Inputs">
                             <InputText value={verifiedChannel.inventory_channel_pe}
                                        className="p-inputtext-sm ChannelInfo__Table-String-Input-50"/>
                             <InputText value={verifiedChannel.inventory_channel_pe_port}
                                        className="p-inputtext-sm ChannelInfo__Table-String-Input-25"/>
                             <InputText value={verifiedChannel.inventory_channel_vid}
                                        className="p-inputtext-sm ChannelInfo__Table-String-Input-25"/>
                         </div>
                     </div>
                     <div className="ChannelInfo__Table-String">
                         <div className="ChannelInfo__Table-String-Title">
                             AGGSTOP
                         </div>
                         <div className="ChannelInfo__Table-String-Inputs">
                             <InputText value={verifiedChannel.inventory_channel_agg_stop}
                                        className="p-inputtext-sm ChannelInfo__Table-String-Input-70"/>
                             <InputText value={verifiedChannel.inventory_channel_agg_port}
                                        className="p-inputtext-sm ChannelInfo__Table-String-Input-30"/>
                         </div>
                     </div>
                     <div className="ChannelInfo__Table-String">
                         <div className="ChannelInfo__Table-String-Title">
                             ACCSTOP
                         </div>
                         <div className="ChannelInfo__Table-String-Inputs">
                             <InputText value={verifiedChannel.inventory_channel_acc_stop}
                                        className="p-inputtext-sm ChannelInfo__Table-String-Input-100"/>
                         </div>
                     </div>
                     <div className="ChannelInfo__Table-String">
                         <div className="ChannelInfo__Table-String-Title">
                             IP MNG/A
                         </div>
                         <div className="ChannelInfo__Table-String-Inputs">
                             <InputText value={verifiedChannel.inventory_channel_ip_mng_acc}
                                        className="p-inputtext-sm ChannelInfo__Table-String-Input-100"/>
                         </div>
                     </div>
                     <div className="ChannelInfo__Table-String">
                         <div className="ChannelInfo__Table-String-Title">
                             PORT_A
                         </div>
                         <div className="ChannelInfo__Table-String-Inputs">
                             <InputText value={verifiedChannel.inventory_channel_acc_port}
                                        className="p-inputtext-sm ChannelInfo__Table-String-Input-100"/>
                         </div>
                     </div>
                     <div className="ChannelInfo__Table-String">
                         <div className="ChannelInfo__Table-String-Title">
                             MODEL
                         </div>
                         <div className="ChannelInfo__Table-String-Inputs">
                             <InputText value={verifiedChannel.inventory_channel_acc_model}
                                        className="p-inputtext-sm ChannelInfo__Table-String-Input-100"/>
                         </div>
                     </div>
                     <div className="ChannelInfo__Table-String">
                         <div className="ChannelInfo__Table-String-Title">
                             SN
                         </div>
                         <div className="ChannelInfo__Table-String-Inputs">
                             <InputText value={verifiedChannel.inventory_channel_acc_sn}
                                        className="p-inputtext-sm ChannelInfo__Table-String-Input-100"/>
                         </div>
                     </div>
                     <div className="ChannelInfo__Table-String">
                         <div className="ChannelInfo__Table-String-Title">
                             MAC
                         </div>
                         <div className="ChannelInfo__Table-String-Inputs">
                             <InputText value={verifiedChannel.inventory_channel_acc_mac}
                                        className="p-inputtext-sm ChannelInfo__Table-String-Input-100"/>
                         </div>
                     </div>
                     <div className="ChannelInfo__Table-String">
                         <div className="ChannelInfo__Table-String-Title">
                             Zabbix
                         </div>
                         <div className="ChannelInfo__Table-String-Inputs">
                             <InputText value={verifiedChannel.zabbix}
                                        className="p-inputtext-sm ChannelInfo__Table-String-Input-50"/>
                             <InputText value={verifiedChannel.zabbix_avail}
                                        className="p-inputtext-sm ChannelInfo__Table-String-Input-50"/>
                         </div>
                     </div>
                 </div>
             </div>
         </div>
     </div>
 );}

export default ChannelInventory;
