import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {Dialog} from "primereact/dialog";
import {Button} from "primereact/button";
import {useActions} from "../../../Store/useActions";
import {TabPanel, TabView} from "primereact/tabview";
import {InputText} from "primereact/inputtext";
import './EditChannel.css';

function EditChannel(props) {

    /* TODO ДОДЕЛАТЬ */

    const {isEditingChannel, selectedChannel, loadedSelectedChannel, editingMode} = useSelector(state => state.channels);
    const {setEditChannel, setEditingMode} = useActions();
    const [editingChannel, setEditingChannel] = useState(null);

    useEffect(()=>{
        if(editingMode && selectedChannel && selectedChannel._id && isEditingChannel){
            setEditingChannel({...loadedSelectedChannel});
        }
    }, [editingMode])

    const setEditingChannelFieldValue = (field, value)=>{
        const newValue = {...editingChannel};
        newValue[field] = value
        setEditingChannel(newValue)
    }

    return (
        <Dialog header="Изменение канала связи" className='EditChannel__Container' draggable={false}
                visible={Boolean(isEditingChannel && selectedChannel && selectedChannel._id && loadedSelectedChannel)}
                onHide={() => setEditChannel(false)}
        >
            <div className="EditChannel__InnerContainer">
                {
                    isEditingChannel && selectedChannel && selectedChannel._id && loadedSelectedChannel && !editingMode &&
                    <div className="EditChannel__Mode-Container">
                        <Button label="Изменить текущий СУЗ" className="EditChannel__Mode-Btn"
                                icon="pi pi-pencil" onClick={()=>setEditingMode('newChannel')} />
                        <Button label="Создать новый СУЗ" className="EditChannel__Mode-Btn"
                                icon="pi pi-plus-circle" onClick={()=>setEditingMode('editChannel')}/>
                    </div>
                }
                {
                    isEditingChannel && editingChannel && selectedChannel && selectedChannel._id && loadedSelectedChannel && editingMode &&
                    <form>
                        <TabView>
                            <TabPanel header="Основное" >
                               <div className="EditChannel__Form-Container">
                                   <div className="EditChannel__Form-Row">
                                       <div className="EditChannel__Form-Input-Title">ID</div>
                                       <div className="EditChannel__Form-Input">
                                           <InputText style={{width: "32%"}} className="p-inputtext-sm"
                                                value={editingChannel.id_tbcd}
                                                      onChange={(e)=>setEditingChannelFieldValue('id_tbcd', e.target.value)}
                                           />
                                           <InputText style={{width: "32%"}} className="p-inputtext-sm"
                                                      value={editingChannel.id_suz}
                                                      onChange={(e)=>setEditingChannelFieldValue('id_suz', e.target.value)}
                                           />
                                           <InputText style={{width: "32%"}} className="p-inputtext-sm"
                                                      value={editingChannel.id_oss}
                                                      onChange={(e)=>setEditingChannelFieldValue('id_oss', e.target.value)}
                                           />
                                       </div>
                                   </div>
                                   <div className="EditChannel__Form-Row">
                                       <div className="EditChannel__Form-Input-Title">Клиент</div>
                                       <div className="EditChannel__Form-Input">
                                           <InputText style={{width: "100%"}} className="p-inputtext-sm"
                                                      value={editingChannel.client}
                                                      onChange={(e)=>setEditingChannelFieldValue('client', e.target.value)}
                                           />
                                       </div>
                                   </div>
                                   <div className="EditChannel__Form-Row">
                                       <div className="EditChannel__Form-Input-Title">Услуга</div>
                                       <div className="EditChannel__Form-Input">
                                           <InputText style={{width: "49%"}} className="p-inputtext-sm"
                                                      value={editingChannel.service}
                                                      onChange={(e)=>setEditingChannelFieldValue('service', e.target.value)}
                                           />
                                           <InputText style={{width: "49%"}} className="p-inputtext-sm"
                                                      value={editingChannel.service_size}
                                                      onChange={(e)=>setEditingChannelFieldValue('service_size', e.target.value)}
                                           />
                                       </div>
                                   </div>
                                   <div className="EditChannel__Form-Row">
                                       <div className="EditChannel__Form-Input-Title">Адрес</div>
                                       <div className="EditChannel__Form-Input">
                                           <InputText style={{width: "44%"}} className="p-inputtext-sm"
                                                      value={editingChannel.city}
                                                      onChange={(e)=>setEditingChannelFieldValue('city', e.target.value)}
                                           />
                                           <InputText style={{width: "44%"}} className="p-inputtext-sm"
                                                      value={editingChannel.street}
                                                      onChange={(e)=>setEditingChannelFieldValue('street', e.target.value)}
                                           />
                                           <InputText style={{width: "9%"}} className="p-inputtext-sm"
                                                      value={editingChannel.home}
                                                      onChange={(e)=>setEditingChannelFieldValue('home', e.target.value)}
                                           />
                                       </div>
                                   </div>
                                   <div className="EditChannel__Form-Row">
                                       <div className="EditChannel__Form-Input-Title">Инфо</div>
                                       <div className="EditChannel__Form-Input">
                                           <InputText style={{width: "100%"}} className="p-inputtext-sm"
                                                      value={editingChannel.add_info}
                                                      onChange={(e)=>setEditingChannelFieldValue('add_info', e.target.value)}
                                           />
                                       </div>
                                   </div>
                                   <div className="EditChannel__Form-Row">
                                       <div className="EditChannel__Form-Input-Title">Контакт</div>
                                       <div className="EditChannel__Form-Input">
                                           <InputText style={{width: "100%"}} className="p-inputtext-sm"
                                                      value={editingChannel.contact}
                                                      onChange={(e)=>setEditingChannelFieldValue('contact', e.target.value)}
                                           />
                                       </div>
                                   </div>
                                   <div className="EditChannel__Form-Row">
                                       <div className="EditChannel__Form-Input-Title">Статус</div>
                                       <div className="EditChannel__Form-Input">
                                           <InputText style={{width: "49%"}} className="p-inputtext-sm"
                                                      value={editingChannel.status}
                                                      onChange={(e)=>setEditingChannelFieldValue('status', e.target.value)}
                                           />
                                           <InputText style={{width: "49%"}} className="p-inputtext-sm"
                                                      value={editingChannel.date}
                                                      onChange={(e)=>setEditingChannelFieldValue('date', e.target.value)}
                                           />
                                       </div>
                                   </div>
                                   <div className="EditChannel__Form-Row">
                                       <div className="EditChannel__Form-Input-Title">Прим</div>
                                       <div className="EditChannel__Form-Input">
                                           <InputText style={{width: "49%"}} className="p-inputtext-sm"
                                                      value={editingChannel.note}
                                                      onChange={(e)=>setEditingChannelFieldValue('note', e.target.value)}
                                           />
                                           <InputText style={{width: "49%"}} className="p-inputtext-sm"
                                                      value={editingChannel.rd_sr}
                                                      onChange={(e)=>setEditingChannelFieldValue('rd_sr', e.target.value)}
                                           />
                                       </div>
                                   </div>
                               </div>
                            </TabPanel>
                            <TabPanel header="Включение">
                                <div className="EditChannel__Form-Container">
                                    <div className="EditChannel__Form-Row">
                                        <div className="EditChannel__Form-Input-Title">PE</div>
                                        <div className="EditChannel__Form-Input">
                                            <InputText style={{width: "49%"}} className="p-inputtext-sm"
                                                value={editingChannel.channel_pe}
                                                       onChange={(e)=>setEditingChannelFieldValue('channel_pe', e.target.value)}
                                            />
                                            <InputText style={{width: "24%"}} className="p-inputtext-sm"
                                                value={editingChannel.channel_pe_port}
                                                       onChange={(e)=>setEditingChannelFieldValue('channel_pe_port', e.target.value)}
                                            />
                                            <InputText style={{width: "24%"}} className="p-inputtext-sm"
                                                value={editingChannel.channel_vid}
                                                       onChange={(e)=>setEditingChannelFieldValue('channel_vid', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="EditChannel__Form-Row">
                                        <div className="EditChannel__Form-Input-Title">AGGSTOP</div>
                                        <div className="EditChannel__Form-Input">
                                            <InputText style={{width: "75%"}} className="p-inputtext-sm"
                                                       value={editingChannel.channel_agg_stop}
                                                       onChange={(e)=>setEditingChannelFieldValue('channel_agg_stop', e.target.value)}
                                            />
                                            <InputText style={{width: "24%"}} className="p-inputtext-sm"
                                                       value={editingChannel.channel_agg_port}
                                                       onChange={(e)=>setEditingChannelFieldValue('channel_agg_port', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="EditChannel__Form-Row">
                                        <div className="EditChannel__Form-Input-Title">ACCSTOP</div>
                                        <div className="EditChannel__Form-Input">
                                            <InputText style={{width: "100%"}} className="p-inputtext-sm"
                                                       value={editingChannel.channel_acc_stop}
                                                       onChange={(e)=>setEditingChannelFieldValue('channel_acc_stop', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="EditChannel__Form-Row">
                                        <div className="EditChannel__Form-Input-Title">IP MNG/A</div>
                                        <div className="EditChannel__Form-Input">
                                            <InputText style={{width: "100%"}} className="p-inputtext-sm"
                                                       value={editingChannel.channel_ip_mng_acc}
                                                       onChange={(e)=>setEditingChannelFieldValue('channel_ip_mng_acc', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="EditChannel__Form-Row">
                                        <div className="EditChannel__Form-Input-Title">PORT_A</div>
                                        <div className="EditChannel__Form-Input">
                                            <InputText style={{width: "100%"}} className="p-inputtext-sm"
                                                       value={editingChannel.channel_acc_port}
                                                       onChange={(e)=>setEditingChannelFieldValue('channel_acc_port', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="EditChannel__Form-Row">
                                        <div className="EditChannel__Form-Input-Title">MODEL</div>
                                        <div className="EditChannel__Form-Input">
                                            <InputText style={{width: "100%"}} className="p-inputtext-sm"
                                                       value={editingChannel.channel_acc_model}
                                                       onChange={(e)=>setEditingChannelFieldValue('channel_acc_model', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="EditChannel__Form-Row">
                                        <div className="EditChannel__Form-Input-Title">SN</div>
                                        <div className="EditChannel__Form-Input">
                                            <InputText style={{width: "100%"}} className="p-inputtext-sm"
                                                       value={editingChannel.channel_acc_sn}
                                                       onChange={(e)=>setEditingChannelFieldValue('channel_acc_sn', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="EditChannel__Form-Row">
                                        <div className="EditChannel__Form-Input-Title">MAC</div>
                                        <div className="EditChannel__Form-Input">
                                            <InputText style={{width: "100%"}} className="p-inputtext-sm"
                                                       value={editingChannel.channel_acc_mac}
                                                       onChange={(e)=>setEditingChannelFieldValue('channel_acc_mac', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="EditChannel__Form-Row">
                                        <div className="EditChannel__Form-Input-Title">ZABBIX</div>
                                        <div className="EditChannel__Form-Input">
                                            <InputText style={{width: "49%"}} className="p-inputtext-sm"
                                                       value={editingChannel.zabbix}
                                                       onChange={(e)=>setEditingChannelFieldValue('zabbix', e.target.value)}
                                            />
                                            <InputText style={{width: "49%"}} className="p-inputtext-sm"
                                                       value={editingChannel.zabbix_avail}
                                                       onChange={(e)=>setEditingChannelFieldValue('zabbix_avail', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </TabView>
                        <Button label="Сохранить" icon="pi pi-check" className="EditChannel__Submit-Btn" size={"small"}/>
                    </form>
                }
            </div>
        </Dialog>
    );
}

export default EditChannel;
