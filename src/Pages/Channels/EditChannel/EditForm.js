import React, {useEffect, useState} from 'react';
import {FieldArray, FormikProvider, useFormik} from "formik";
import {TabPanel, TabView} from "primereact/tabview";
import {InputText} from "primereact/inputtext";
import {Dropdown} from "primereact/dropdown";
import {AutoComplete} from "primereact/autocomplete";
import {Button} from "primereact/button";
import {CreateChannelValidationSchema} from "../../../Modules/validationSchemas";
import {Calendar} from "primereact/calendar";
import {Checkbox} from "primereact/checkbox";
import {useSelector} from "react-redux";
import {useActions} from "../../../Store/useActions";

function EditForm({editingChannel}) {

    const {filtersValues, editingMode} = useSelector(state => state.channels);
    const {createAndUpdateChannel, updateChannel} = useActions();

    const [filteredCitySuggestions, setFilteredCitySuggestions] = useState([]);
    const [filteredStreetsSuggestions, setFilteredStreetsSuggestions] = useState([]);
    const [servicesSuggestions, setServicesSuggestions] = useState([]);
    const [statusSuggestions, setStatusSuggestions] = useState([]);

    useEffect(() => {
        if (filtersValues && filtersValues.services) {
            const suggestions = filtersValues.services.map(service => {
                return ({name: service, code: service});
            });
            setServicesSuggestions(suggestions);
        }
        setStatusSuggestions([{name: "ВКЛ", code: "ВКЛ"}, {name: "ОТКЛ", code: "ОТКЛ"},
            {name: "РЕЗЕРВ", code: "РЕЗЕРВ"}, {name: "ИЗМ", code: "ИЗМ"}, {name: "ПАУЗА", code: "ПАУЗА"}])
    }, [filtersValues])


    const cityCompleteMethod = (e) => {
        filtersValues ? setFilteredCitySuggestions(e.query ? filtersValues.city.filter(city => city.toLowerCase().includes(e.query.toLowerCase())) : filtersValues.city) : setFilteredCitySuggestions([]);
    }

    const streetsCompleteMethod = (e) => {
        if (filtersValues) {
            if (formik.values.city) {
                if (e.query) {
                    setFilteredStreetsSuggestions(filtersValues.streets[formik.values.city]
                        ?.filter(city => city.toLowerCase().includes(e.query.toLowerCase())));
                } else {
                    setFilteredStreetsSuggestions(filtersValues.streets[formik.values.city]);
                }
            } else {
                setFilteredStreetsSuggestions([]);
            }
        } else {
            setFilteredStreetsSuggestions([]);
        }
    }

    const formik = useFormik({
        initialValues: {
            _id: editingChannel._id,
            id_tbcd: editingChannel.id_tbcd,
            id_suz: editingChannel.id_suz,
            id_oss: editingChannel.id_oss,
            id_cms: editingChannel.id_cms,
            client: editingChannel.client,
            service: editingChannel.service,
            service_size: editingChannel.service_size,
            city: editingChannel.city,
            street: editingChannel.street,
            home: editingChannel.home,
            add_info: editingChannel.add_info,
            contact: editingChannel.contact,
            status: editingChannel.status,
            date: new Date(editingChannel.date),
            note: "XXXX",
            rd_sr: "XXXX",
            channel_pe: filtersValues.pe.filter(p=>p.title===editingChannel.channel_pe)[0],
            channel_pe_port: editingChannel.channel_pe_port,
            channel_vid: editingChannel.channel_vid,
            zabbix: editingChannel.zabbix,
            zabbix_avail: editingChannel.zabbix_avail,
            channel_region: 'crimea',
            channel_acc_stop: editingChannel.channel_acc_stop,
            channel_agg_stop: editingChannel.channel_agg_stop
                .map(agg=>({...agg, agg_stop: agg.withStop ?
                        filtersValues.stop.filter(stop=>stop.title === agg.agg_stop)[0] :
                        filtersValues.ssw.filter(aggS=>aggS.title === agg.agg_stop)[0]}))
        },
        validationSchema: CreateChannelValidationSchema,
        onSubmit: async (data) => {
            const transformedObj = {...data,
                channel_pe: data.channel_pe.title,
                channel_agg_stop: data.channel_agg_stop.map((agg_stop)=>({...agg_stop, agg_stop: agg_stop.agg_stop.title}))
            }
            if(editingMode === 'newChannel'){
                createAndUpdateChannel(transformedObj)
            }
            if(editingMode === 'editChannel'){
                updateChannel(transformedObj)
            }
        }
    });

    const handleChangeAgg = (index, value) => {
        if (index === 0) {
            formik.setFieldValue('channel_pe_port', value.uplink)
        } else {
            formik.setFieldValue(`channel_agg_stop[${index - 1}].agg_port`, value.uplink)
        }
        formik.setFieldValue(`channel_agg_stop[${index}].agg_stop`, value)
    }

    const handleAccStopChange = (index) =>{
        if (formik.values.channel_acc_stop[index].withStop) {
            formik.setFieldValue(`channel_acc_stop[${index}]`, {acc_stop: "", acc_port: "", acc_ip_mng: "", acc_model: "", acc_sn: "", acc_mac: "",  withStop: false})
        } else {
            formik.setFieldValue(`channel_acc_stop[${index}]`, {acc_stop: "СТОП", acc_port: "СТОП", acc_ip_mng: "СТОП", acc_model: "СТОП", acc_sn: "СТОП", acc_mac: "СТОП",  withStop: true})
        }
        formik.setFieldValue(`channel_acc_stop[${index}].withStop`, !formik.values.channel_acc_stop[index].withStop)
    }

 return (
     <FormikProvider value={formik}>
         <form onSubmit={formik.handleSubmit}>
             <TabView>
                 <TabPanel header="Основное">
                     <div className="EditChannel__Form-Container">
                         <div className="EditChannel__Form-Row">
                             <div className="EditChannel__Form-Input-Title">ID</div>
                             <div className="EditChannel__Form-Input">
                                 <InputText style={{width: "32%"}} className="p-inputtext-sm"
                                            value={formik.values.id_tbcd}
                                            onChange={(e) => formik.setFieldValue('id_tbcd', e.target.value)}
                                            placeholder='ID TBCD'
                                 />
                                 <InputText style={{width: "32%"}} className="p-inputtext-sm"
                                            value={formik.values.id_suz}
                                            onChange={(e) => formik.setFieldValue('id_suz', e.target.value)}
                                            placeholder='ID СУЗ'
                                 />
                                 <InputText style={{width: "32%"}} className="p-inputtext-sm"
                                            value={formik.values.id_oss}
                                            onChange={(e) => formik.setFieldValue('id_oss', e.target.value)}
                                            placeholder='ID OSS'
                                 />
                             </div>
                         </div>
                         <div className="EditChannel__Form-Row">
                             <div className="EditChannel__Form-Input-Title"></div>
                             <div className="EditChannel__Form-Input">
                                 <InputText style={{width: "66%"}} className="p-inputtext-sm"
                                            value={formik.values.id_cms}
                                            onChange={(e) => formik.setFieldValue('id_cms', e.target.value)}
                                            placeholder='ID CMS'
                                 />
                                 <Dropdown style={{width: "32%"}}
                                           options={[{name: 'Крым', code: 'crimea'}, {
                                               name: 'Север',
                                               code: 'north'
                                           }]}
                                           value={{
                                               name: formik.values.channel_region === 'crimea' ? "Крым" : "Север",
                                               code: formik.values.channel_region
                                           }}
                                           onChange={(e) => formik.setFieldValue('channel_region', e.target.value.code)}
                                           optionLabel="name"
                                           placeholder="Регион канала"
                                 />
                             </div>
                         </div>
                         <div className="EditChannel__Form-Row">
                             <div className="EditChannel__Form-Input-Title">Клиент</div>
                             <div className="EditChannel__Form-Input">
                                 <InputText style={{width: "100%"}} className="p-inputtext-sm"
                                            value={formik.values.client}
                                            onChange={(e) => formik.setFieldValue('client', e.target.value)}
                                            placeholder='Название клиента'
                                 />
                             </div>
                         </div>
                         <div className="EditChannel__Form-Row">
                             <div className="EditChannel__Form-Input-Title">Услуга</div>
                             <div className="EditChannel__Form-Input">
                                 <Dropdown style={{width: "49%"}}
                                           options={servicesSuggestions}
                                           value={{name: formik.values.service, code: formik.values.service}}
                                           onChange={(e) => formik.setFieldValue('service', e.target.value.name)}
                                           optionLabel="name"
                                           placeholder="Услуга"
                                 />
                                 <InputText style={{width: "49%"}} className="p-inputtext-sm"
                                            value={formik.values.service_size}
                                            onChange={(e) => formik.setFieldValue('service_size', e.target.value)}
                                            placeholder='Размер услуги'
                                 />
                             </div>
                         </div>
                         <div className="EditChannel__Form-Row">
                             <div className="EditChannel__Form-Input-Title">Адрес</div>
                             <div className="EditChannel__Form-Input EditChannel__Form-Input-Address">
                                 <AutoComplete value={formik.values.city}
                                               suggestions={filteredCitySuggestions}
                                               completeMethod={cityCompleteMethod}
                                               onChange={(e) => formik.setFieldValue('city', e.target.value)}
                                               placeholder='Населенный пункт' dropdown
                                               className='EditChannel__Form-City'

                                 />
                                 <AutoComplete value={formik.values.street}
                                               suggestions={filteredStreetsSuggestions}
                                               completeMethod={streetsCompleteMethod}
                                               onChange={(e) => formik.setFieldValue('street', e.target.value)}
                                               placeholder='Улица' dropdown
                                               className='EditChannel__Form-Street'
                                               inputClassName='p-inputtext-sm'
                                 />
                                 <InputText className="p-inputtext-sm EditChannel__Form-Home"
                                            value={formik.values.home}
                                            onChange={(e) => formik.setFieldValue('home', e.target.value)}
                                            placeholder="Дом"
                                 />
                             </div>
                         </div>
                         <div className="EditChannel__Form-Row">
                             <div className="EditChannel__Form-Input-Title">Инфо</div>
                             <div className="EditChannel__Form-Input">
                                 <InputText style={{width: "100%"}} className="p-inputtext-sm"
                                            value={formik.values.add_info}
                                            onChange={(e) => formik.setFieldValue('add_info', e.target.value)}
                                            placeholder="Дополнительная информация"
                                 />
                             </div>
                         </div>
                         <div className="EditChannel__Form-Row">
                             <div className="EditChannel__Form-Input-Title">Контакт</div>
                             <div className="EditChannel__Form-Input">
                                 <InputText style={{width: "100%"}} className="p-inputtext-sm"
                                            value={formik.values.contact}
                                            onChange={(e) => formik.setFieldValue('contact', e.target.value)}
                                            placeholder="Контакт для связи"
                                 />
                             </div>
                         </div>
                         <div className="EditChannel__Form-Row">
                             <div className="EditChannel__Form-Input-Title">Статус</div>
                             <div className="EditChannel__Form-Input">
                                 <Dropdown style={{width: "49%"}}
                                           options={statusSuggestions}
                                           value={{name: formik.values.status, code: formik.values.status}}
                                           onChange={(e) => formik.setFieldValue('status', e.target.value.name)}
                                           optionLabel="name"
                                           placeholder="Статус"
                                 />
                                 <Calendar value={formik.values.date}
                                           onChange={(e) => formik.setFieldValue('date', e.target.value)}
                                           dateFormat="dd.mm.yy"
                                           style={{width: "49%"}}
                                 />
                             </div>
                         </div>
                         <div className="EditChannel__Form-Row">
                             <div className="EditChannel__Form-Input-Title">Прим</div>
                             <div className="EditChannel__Form-Input">
                                 <InputText style={{width: "49%"}} className="p-inputtext-sm"
                                            value={formik.values.note}
                                            onChange={(e) => formik.setFieldValue('note', e.target.value)}
                                            placeholder="Примечание"
                                 />
                                 <InputText style={{width: "49%"}} className="p-inputtext-sm"
                                            value={formik.values.rd_sr}
                                            onChange={(e) => formik.setFieldValue('rd_sr', e.target.value)}
                                            placeholder="RD_SR"
                                 />
                             </div>
                         </div>
                     </div>
                 </TabPanel>
                 <TabPanel header="Оборудование">
                     <div className="EditChannel__Form-Container">
                         <div className="EditChannel__Form-Row">
                             <div className="EditChannel__Form-Input-Title">PE</div>
                             <div className="EditChannel__Form-Input EditChannel__Form-Input-PE">
                                 <Dropdown
                                     value={formik.values.channel_pe}
                                     onChange={(e) => formik.setFieldValue('channel_pe', e.target.value)}
                                     options={filtersValues ? filtersValues.pe : []} optionLabel="title"
                                     placeholder="PE"
                                     filter
                                     className="p-inputtext-sm EditChannel__Form-Pe"/>
                                 <InputText className="p-inputtext-sm EditChannel__Form-Input-PE-Port"
                                            value={formik.values.channel_pe_port}
                                            onChange={(e) => formik.setFieldValue('channel_pe_port', e.target.value)}
                                            placeholder="PE Порт"
                                 />
                                 <InputText className="p-inputtext-sm EditChannel__Form-Input-PE-Vid"
                                            value={formik.values.channel_vid}
                                            onChange={(e) => formik.setFieldValue('channel_vid', e.target.value)}
                                            placeholder="Vlan ID"
                                 />
                             </div>
                         </div>
                         <FieldArray name="channel_agg_stop">
                             {({push, remove}) => (
                                 <div className="EditChannel__Form-Row-Agg EditChannel__Form-Row">
                                     <div
                                         className="EditChannel__Form-Input-Title AddChannel__Form-Input-Title-Agg">AGGSTOP
                                     </div>
                                     <div className="AddChannel__Form-Row-Inputs">
                                         {formik.values.channel_agg_stop.map((agg_stop, index) => (
                                             <div key={index}
                                                  className="EditChannel__Form-Input AddChannel__Form-Row-Input-Agg">
                                                 <Dropdown
                                                     value={formik.values.channel_agg_stop[index].agg_stop}
                                                     onChange={(e) => handleChangeAgg(index, e.target.value)}
                                                     options={filtersValues ? formik.values.channel_agg_stop[index].withStop ? filtersValues.stop : filtersValues.ssw : []}
                                                     optionLabel="title" placeholder="SSW"
                                                     filter
                                                     className="p-inputtext-sm AddChannel__Form-Input-Agg"/>
                                                 <InputText
                                                     className="p-inputtext-sm AddChannel__Form-Input-Agg-Port"
                                                     value={formik.values.channel_agg_stop[index].agg_port}
                                                     onChange={
                                                         (e) => {
                                                             if (!formik.values.channel_agg_stop[index].withStop) {
                                                                 formik.setFieldValue(`channel_agg_stop[${index}].agg_port`, e.target.value)
                                                             }
                                                         }
                                                     }
                                                     placeholder="AGG PORT"
                                                 />
                                                 <div className="EditChannel__Form-Agg-Adding-Block">
                                                     <div className="EditChannel__Form-Agg-Adding-Stop">
                                                         <Checkbox
                                                             checked={formik.values.channel_agg_stop[index].withStop}
                                                             onChange={() => {
                                                                 if (formik.values.channel_agg_stop[index].withStop) {
                                                                     formik.setFieldValue(`channel_agg_stop[${index}].agg_port`, "")
                                                                 } else {
                                                                     formik.setFieldValue(`channel_agg_stop[${index}].agg_port`, "СТОП")
                                                                 }
                                                                 formik.setFieldValue(`channel_agg_stop[${index}].withStop`, !formik.values.channel_agg_stop[index].withStop)
                                                             }}
                                                         />
                                                     </div>
                                                     <Button icon="pi pi-times" rounded text
                                                             severity="danger" aria-label="Удалить"
                                                             onClick={() => index !== 0 ? remove(index) : null}/>
                                                     {index === formik.values.channel_agg_stop.length - 1 ?
                                                         <Button icon="pi pi-plus" rounded text
                                                                 severity="success" aria-label="Удалить"
                                                                 onClick={() => push({
                                                                     agg_stop: '',
                                                                     channel_agg_port: '',
                                                                     withStop: false
                                                                 })}/> : null
                                                     }
                                                 </div>
                                             </div>
                                         ))}
                                     </div>
                                 </div>
                             )}
                         </FieldArray>
                         <FieldArray name="channel_acc_stop">
                             {({push, remove}) => (
                                 <div className="EditChannel__Form-Row EditChannel__Form-Row-Agg">
                                     <div
                                         className="EditChannel__Form-Input-Title AddChannel__Form-Input-Title-Agg">ACCSTOP
                                     </div>
                                     <div className="AddChannel__Form-Row-Inputs">
                                         {
                                             formik.values.channel_acc_stop.map((acc_stop, index)=>(
                                                 <React.Fragment key={index}>
                                                     <div key={index}
                                                          className="EditChannel__Form-Input AddChannel__Form-Row-Input-Agg">
                                                         <InputText style={{width: "49%"}} className="p-inputtext-sm"
                                                                    value={formik.values.channel_acc_stop[index].acc_stop}
                                                                    onChange={(e) => formik.setFieldValue(`channel_acc_stop[${index}].acc_stop`, e.target.value)}
                                                                    placeholder="ACC STOP"
                                                         />
                                                         <InputText style={{width: "49%"}} className="p-inputtext-sm"
                                                                    value={formik.values.channel_acc_stop[index].acc_ip_mng}
                                                                    onChange={(e) => formik.setFieldValue(`channel_acc_stop[${index}].acc_ip_mng`, e.target.value)}
                                                                    placeholder="IP MNG/A (Управления)"
                                                         />
                                                     </div>
                                                     <div
                                                         className="EditChannel__Form-Input AddChannel__Form-Row-Input-Agg">
                                                         <InputText style={{width: "49%"}} className="p-inputtext-sm"
                                                                    value={formik.values.channel_acc_stop[index].acc_port}
                                                                    onChange={(e) => formik.setFieldValue(`channel_acc_stop[${index}].acc_port`, e.target.value)}
                                                                    placeholder="Порт узла доступа"
                                                         />
                                                         <InputText style={{width: "49%"}} className="p-inputtext-sm"
                                                                    value={formik.values.channel_acc_stop[index].acc_model}
                                                                    onChange={(e) => formik.setFieldValue(`channel_acc_stop[${index}].acc_model`, e.target.value)}
                                                                    placeholder="Модель узла доступа"
                                                         />
                                                     </div>
                                                     <div
                                                         className="EditChannel__Form-Input AddChannel__Form-Row-Input-Agg">
                                                         <InputText style={{width: "49%"}} className="p-inputtext-sm"
                                                                    value={formik.values.channel_acc_stop[index].acc_sn}
                                                                    onChange={(e) => formik.setFieldValue(`channel_acc_stop[${index}].acc_sn`, e.target.value)}
                                                                    placeholder="Серийный номер узла доступа"
                                                         />
                                                         <InputText style={{width: "49%"}} className="p-inputtext-sm"
                                                                    value={formik.values.channel_acc_stop[index].acc_mac}
                                                                    onChange={(e) => formik.setFieldValue(`channel_acc_stop[${index}].acc_mac`, e.target.value)}
                                                                    placeholder="MAC узла доступа"
                                                         />
                                                     </div>
                                                     <div
                                                         className=" EditChannel__Form-Input AddChannel__Form-Row-Input-Agg EditChannel__Form-Input-Just-End">
                                                         <Checkbox
                                                             className='AddChannel__Form-Input-CheckBox-Stop-Acc'
                                                             checked={formik.values.channel_acc_stop[index].withStop}
                                                             onChange={() => handleAccStopChange(index)}
                                                         />
                                                         <Button icon="pi pi-times" rounded text severity="danger"
                                                                 aria-label="Удалить" onClick={() => index !== 0 ? remove(index) : null}/>
                                                         {index === formik.values.channel_acc_stop.length - 1 ?
                                                             <Button icon="pi pi-plus" rounded text severity="success"
                                                                     aria-label="Добавить" onClick={() => push({acc_stop: "", acc_port: "", acc_ip_mng: "", acc_model: "", acc_sn: "", acc_mac: ""})}/> : null}
                                                     </div>
                                                 </React.Fragment>
                                             ))
                                         }
                                     </div>
                                 </div>
                             )}
                         </FieldArray>
                         <div className="EditChannel__Form-Row">
                             <div className="EditChannel__Form-Input-Title">ZABBIX</div>
                             <div className="EditChannel__Form-Input">
                                 <InputText style={{width: "49%"}} className="p-inputtext-sm"
                                            value={formik.values.zabbix}
                                            onChange={(e) => formik.setFieldValue('zabbix', e.target.value)}
                                            placeholder="Zabbix"
                                 />
                                 <InputText style={{width: "49%"}} className="p-inputtext-sm"
                                            value={formik.values.zabbix_avail}
                                            onChange={(e) => formik.setFieldValue('zabbix_avail', e.target.value)}
                                            placeholder="Zabbix Статус"
                                 />
                             </div>
                         </div>
                     </div>
                 </TabPanel>
             </TabView>
             <Button label="Сохранить" icon="pi pi-check" className="EditChannel__Submit-Btn" size={"small"}
                     type="submit"/>
         </form>
     </FormikProvider>
 );}

export default EditForm;
