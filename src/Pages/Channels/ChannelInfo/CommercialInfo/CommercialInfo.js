import React from 'react';
import {InputText} from "primereact/inputtext";
import {useSelector} from "react-redux";

function CommercialInfo() {

    const {loadedSelectedChannel} = useSelector(state => state.channels)

 return (
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
                 <InputText value={new Date(loadedSelectedChannel.date).toLocaleDateString().split('.').reverse().join('.')}
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
 );}

export default CommercialInfo;
