import React, {useEffect, useState} from 'react';
import {FieldArray, FormikProvider} from "formik";
import {TabPanel, TabView} from "primereact/tabview";
import {InputText} from "primereact/inputtext";
import classNames from "classnames";
import {Dropdown} from "primereact/dropdown";
import {InputNumber} from "primereact/inputnumber";
import {AutoComplete} from "primereact/autocomplete";
import {Calendar} from "primereact/calendar";
import {Checkbox} from "primereact/checkbox";
import {Button} from "primereact/button";
import {useSelector} from "react-redux";
import {FileUpload} from "primereact/fileupload";
import {createChannelsFromFile} from "../../../../Store/reducers/channels/channelsActions";

function AddChannelForm({formik}) {

    const {filtersValues} = useSelector(state => state.channels);

    const [filteredCitySuggestions, setFilteredCitySuggestions] = useState([]);
    const [filteredStreetsSuggestions, setFilteredStreetsSuggestions] = useState([]);
    const [servicesSuggestions, setServicesSuggestions] = useState([]);


    useEffect(() => {
        if (filtersValues && filtersValues.services) {
            const suggestions = filtersValues.services.map(service => {
                return ({name: service, code: service});
            });
            setServicesSuggestions(suggestions);
        }
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

    const handleChangeAgg = (index, value) => {
        if (index === 0) {
            formik.setFieldValue('channel_pe_port', value.uplink)
        } else {
            formik.setFieldValue(`channel_agg_stop[${index - 1}].agg_port`, value.uplink)
        }
        formik.setFieldValue(`channel_agg_stop[${index}].agg_stop`, value)
    }

    const handleAccStopChange = (index) => {
        if (formik.values.channel_acc_stop[index].withStop) {
            formik.setFieldValue(`channel_acc_stop[${index}]`, {
                acc_stop: "",
                acc_port: "",
                acc_ip_mng: "",
                acc_model: "",
                acc_sn: "",
                acc_mac: "",
                withStop: false
            })
        } else {
            formik.setFieldValue(`channel_acc_stop[${index}]`, {
                acc_stop: "СТОП",
                acc_port: "СТОП",
                acc_ip_mng: "СТОП",
                acc_model: "СТОП",
                acc_sn: "СТОП",
                acc_mac: "СТОП",
                withStop: true
            })
        }
        formik.setFieldValue(`channel_acc_stop[${index}].withStop`, !formik.values.channel_acc_stop[index].withStop)
    }

    const isFormFieldInvalidNonTouch = (name) => !!(formik.errors[name]);

    const uploadHandler = ({files}) => {
        createChannelsFromFile(files[0])
    }

    return (
        <FormikProvider value={formik}>
            <div className="EditChannel__InnerContainer">
                <form onSubmit={formik.handleSubmit} className={"AddChannel__Form"}>
                    {Object.keys(formik.errors).length > 0 ?
                        <p className="p-error">Не все поля заполнены</p> : null}
                    <TabView>
                        <TabPanel header="Основное">
                            <div className="EditChannel__Form-Container">
                                <div className="EditChannel__Form-Row">
                                    <div className="EditChannel__Form-Input-Title">ID</div>
                                    <div className="EditChannel__Form-Input">
                                        <InputText style={{width: "32%"}}
                                                   className={classNames("p-inputtext-sm", {'p-invalid': isFormFieldInvalidNonTouch('id_tbcd')})}
                                                   value={formik.values.id_tbcd}
                                                   onChange={(e) => formik.setFieldValue('id_tbcd', e.target.value)}
                                                   placeholder='ID TBCD'
                                        />
                                        <InputText style={{width: "32%"}}
                                                   className={classNames("p-inputtext-sm", {'p-invalid': isFormFieldInvalidNonTouch('id_suz')})}
                                                   value={formik.values.id_suz}
                                                   onChange={(e) => formik.setFieldValue('id_suz', e.target.value)}
                                                   placeholder='ID СУЗ'
                                        />
                                        <InputText style={{width: "32%"}}
                                                   className={classNames("p-inputtext-sm", {'p-invalid': isFormFieldInvalidNonTouch('id_oss')})}
                                                   value={formik.values.id_oss}
                                                   onChange={(e) => formik.setFieldValue('id_oss', e.target.value)}
                                                   placeholder='ID OSS'
                                        />
                                    </div>
                                </div>
                                <div className="EditChannel__Form-Row">
                                    <div className="EditChannel__Form-Input-Title"></div>
                                    <div className="EditChannel__Form-Input">
                                        <InputText style={{width: "66%"}}
                                                   className={classNames("p-inputtext-sm", {'p-invalid': isFormFieldInvalidNonTouch('id_cms')})}
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
                                        <InputText style={{width: "100%"}}
                                                   className={classNames("p-inputtext-sm", {'p-invalid': isFormFieldInvalidNonTouch('client')})}
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
                                                  className={classNames("p-inputtext-sm", {'p-invalid': isFormFieldInvalidNonTouch('service')})}
                                        />
                                        {/*<InputText style={{width: "49%"}}*/}
                                        {/*           value={formik.values.service_size}*/}
                                        {/*           onChange={(e) => formik.setFieldValue('service_size', e.target.value)}*/}
                                        {/*           placeholder='Размер услуги'*/}
                                        {/*           className={classNames("p-inputtext-sm", { 'p-invalid': isFormFieldInvalidNonTouch('service_size')})}*/}
                                        {/*/>*/}
                                        <InputNumber value={formik.values.service_size}
                                                     onChange={(e) => formik.setFieldValue('service_size', e.value)}
                                                     style={{width: "49%"}} min={1} step={0.5}
                                                     placeholder="Скорость в МБ" suffix=" МБ"
                                                     className={classNames("p-inputtext-sm", {'p-invalid': isFormFieldInvalidNonTouch('service_size')})}
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
                                                      className={classNames("EditChannel__Form-City", {'p-invalid': isFormFieldInvalidNonTouch('city')})}
                                        />
                                        <AutoComplete value={formik.values.street}
                                                      suggestions={filteredStreetsSuggestions}
                                                      completeMethod={streetsCompleteMethod}
                                                      onChange={(e) => formik.setFieldValue('street', e.target.value)}
                                                      placeholder='Улица' dropdown
                                                      inputClassName='p-inputtext-sm'
                                                      className={classNames("EditChannel__Form-Street", {'p-invalid': isFormFieldInvalidNonTouch('street')})}
                                        />
                                        <InputText
                                            value={formik.values.home}
                                            onChange={(e) => formik.setFieldValue('home', e.target.value)}
                                            placeholder="Дом"
                                            className={classNames("p-inputtext-sm EditChannel__Form-Home", {'p-invalid': isFormFieldInvalidNonTouch('home')})}
                                        />
                                    </div>
                                </div>
                                <div className="EditChannel__Form-Row">
                                    <div className="EditChannel__Form-Input-Title">Инфо</div>
                                    <div className="EditChannel__Form-Input">
                                        <InputText style={{width: "100%"}}
                                                   value={formik.values.add_info}
                                                   onChange={(e) => formik.setFieldValue('add_info', e.target.value)}
                                                   placeholder="Дополнительная информация"
                                                   className={classNames("p-inputtext-sm", {'p-invalid': isFormFieldInvalidNonTouch('add_info')})}
                                        />
                                    </div>
                                </div>
                                <div className="EditChannel__Form-Row">
                                    <div className="EditChannel__Form-Input-Title">Контакт</div>
                                    <div className="EditChannel__Form-Input">
                                        <InputText style={{width: "100%"}}
                                                   value={formik.values.contact}
                                                   onChange={(e) => formik.setFieldValue('contact', e.target.value)}
                                                   placeholder="Контакт для связи"
                                                   className={classNames("p-inputtext-sm", {'p-invalid': isFormFieldInvalidNonTouch('contact')})}
                                        />
                                    </div>
                                </div>
                                <div className="EditChannel__Form-Row">
                                    <div className="EditChannel__Form-Input-Title">Статус</div>
                                    <div className="EditChannel__Form-Input">
                                        <Dropdown style={{width: "49%"}}
                                                  options={filtersValues ? filtersValues.status : []}
                                                  value={{name: formik.values.status, code: formik.values.status}}
                                                  onChange={(e) => formik.setFieldValue('status', e.target.value.name)}
                                                  optionLabel="name"
                                                  placeholder="Статус"
                                                  className={[
                                                      formik.values.status === "ВКЛ" ? "EditChannel__Form-Status-ON" : null,
                                                      formik.values.status === "ОТКЛ" ? "EditChannel__Form-Status-OFF" : null,
                                                      formik.values.status === "ПАУЗА" ? "EditChannel__Form-Status-PAUSE" : null,
                                                      formik.values.status !== "ОТКЛ" && formik.values.status !== "ВКЛ" && formik.values.status !== "ПАУЗА" ? "EditChannel__Form-Status-OTHER" : null
                                                  ].join(' ')}
                                        />
                                        <Calendar value={formik.values.date}
                                                  onChange={(e) => formik.setFieldValue('date', e.target.value)}
                                                  dateFormat="yy-mm-dd"
                                                  style={{width: "49%"}}
                                        />
                                    </div>
                                </div>
                                <div className="EditChannel__Form-Row">
                                    <div className="EditChannel__Form-Input-Title">Прим</div>
                                    <div className="EditChannel__Form-Input">
                                        <InputText style={{width: "49%"}}
                                                   value={formik.values.note}
                                                   onChange={(e) => formik.setFieldValue('note', e.target.value)}
                                                   placeholder="Примечание"
                                                   className={classNames("p-inputtext-sm", {'p-invalid': isFormFieldInvalidNonTouch('note')})}
                                        />
                                        <InputText style={{width: "49%"}}
                                                   value={formik.values.rd_sr}
                                                   onChange={(e) => formik.setFieldValue('rd_sr', e.target.value)}
                                                   placeholder="RD_SR"
                                                   className={classNames("p-inputtext-sm", {'p-invalid': isFormFieldInvalidNonTouch('rd_sr')})}
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
                                            className={classNames("p-inputtext-sm EditChannel__Form-Pe", {'p-invalid': isFormFieldInvalidNonTouch('channel_pe')})}
                                        />
                                        <InputText value={formik.values.channel_pe_port}
                                                   onChange={(e) => formik.setFieldValue('channel_pe_port', e.target.value)}
                                                   placeholder="PE Порт"
                                                   className={classNames("p-inputtext-sm EditChannel__Form-Input-PE-Port", {'p-invalid': isFormFieldInvalidNonTouch('channel_pe_port')})}
                                        />
                                        <InputText value={formik.values.channel_vid}
                                                   onChange={(e) => formik.setFieldValue('channel_vid', e.target.value)}
                                                   placeholder="Vlan ID"
                                                   className={classNames("p-inputtext-sm EditChannel__Form-Input-PE-Vid", {'p-invalid': isFormFieldInvalidNonTouch('channel_vid')})}
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
                                                            options={filtersValues ? formik.values.channel_agg_stop[index].withStop ? filtersValues.stop : filtersValues.ssw.filter(agg_stop => index === 0 ? agg_stop.uplink_type === 'to_ar' : agg_stop.uplink_type === 'to_ssw') : []}
                                                            optionLabel="title" placeholder="SSW"
                                                            filter
                                                            className={classNames("p-inputtext-sm AddChannel__Form-Input-Agg", {'p-invalid': formik.errors.channel_agg_stop && formik.errors.channel_agg_stop[index] && formik.errors.channel_agg_stop[index].agg_stop})}
                                                        />
                                                        <InputText
                                                            value={formik.values.channel_agg_stop[index].agg_port}
                                                            onChange={
                                                                (e) => {
                                                                    if (!formik.values.channel_agg_stop[index].withStop) {
                                                                        formik.setFieldValue(`channel_agg_stop[${index}].agg_port`, e.target.value)
                                                                    }
                                                                }
                                                            }
                                                            placeholder="AGG PORT"
                                                            className={classNames("p-inputtext-sm AddChannel__Form-Input-Agg-Port", {'p-invalid': formik.errors.channel_agg_stop && formik.errors.channel_agg_stop[index] && formik.errors?.channel_agg_stop[index]?.agg_port})}
                                                        />
                                                        <div
                                                            className="EditChannel__Form-Input AddChannel__Form-Row-Input-Agg EditChannel__Form-Input-Just-End">
                                                            <div className="EditChannel__Form-Agg-Adding-Stop">
                                                                <Checkbox
                                                                    checked={formik.values.channel_agg_stop[index].withStop}
                                                                    onChange={() => {
                                                                        if (formik.values.channel_agg_stop[index].withStop) {
                                                                            formik.setFieldValue(`channel_agg_stop[${index}].agg_port`, "")
                                                                        } else {
                                                                            formik.setFieldValue(`channel_agg_stop[${index}].agg_port`, "СТОП")
                                                                        }
                                                                        formik.setFieldValue(`channel_agg_stop[${index}].withStop`, !formik.values?.channel_agg_stop[index]?.withStop)
                                                                    }}
                                                                    className='AddChannel__Form-Input-CheckBox-Stop-Acc'
                                                                />
                                                            </div>
                                                            <Button icon="pi pi-times" rounded text
                                                                    severity="danger" aria-label="Удалить"
                                                                    onClick={() => remove(index)}
                                                                    disabled={index === 0 && formik.values.channel_agg_stop.length === 1}
                                                            />
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
                                                    formik.values.channel_acc_stop.map((acc_stop, index) => (
                                                        <React.Fragment key={index}>
                                                            <div key={index}
                                                                 className="EditChannel__Form-Input AddChannel__Form-Row-Input-Agg">
                                                                <InputText style={{width: "49%"}}
                                                                           value={formik.values.channel_acc_stop[index].acc_stop}
                                                                           onChange={(e) => formik.setFieldValue(`channel_acc_stop[${index}].acc_stop`, e.target.value)}
                                                                           placeholder="ACC STOP"
                                                                           className={classNames("p-inputtext-sm", {'p-invalid': formik.errors.channel_acc_stop && formik.errors?.channel_acc_stop[index]?.acc_stop})}
                                                                />
                                                                <InputText style={{width: "49%"}}
                                                                           value={formik.values.channel_acc_stop[index].acc_ip_mng}
                                                                           onChange={(e) => formik.setFieldValue(`channel_acc_stop[${index}].acc_ip_mng`, e.target.value)}
                                                                           placeholder="IP MNG/A (Управления)"
                                                                           className={classNames("p-inputtext-sm", {'p-invalid': formik.errors.channel_acc_stop && formik.errors?.channel_acc_stop[index]?.acc_ip_mng})}
                                                                />
                                                            </div>
                                                            <div
                                                                className="EditChannel__Form-Input AddChannel__Form-Row-Input-Agg">
                                                                <InputText style={{width: "49%"}}
                                                                           value={formik.values.channel_acc_stop[index].acc_port}
                                                                           onChange={(e) => formik.setFieldValue(`channel_acc_stop[${index}].acc_port`, e.target.value)}
                                                                           placeholder="Порт узла доступа"
                                                                           className={classNames("p-inputtext-sm", {'p-invalid': formik.errors.channel_acc_stop && formik.errors.channel_acc_stop[index] && formik.errors?.channel_acc_stop[index]?.acc_port})}
                                                                />
                                                                <InputText style={{width: "49%"}}
                                                                           value={formik.values.channel_acc_stop[index].acc_model}
                                                                           onChange={(e) => formik.setFieldValue(`channel_acc_stop[${index}].acc_model`, e.target.value)}
                                                                           placeholder="Модель узла доступа"
                                                                           className={classNames("p-inputtext-sm", {'p-invalid': formik.errors.channel_acc_stop && formik.errors.channel_acc_stop[index] && formik.errors?.channel_acc_stop[index]?.acc_model})}
                                                                />
                                                            </div>
                                                            <div
                                                                className="EditChannel__Form-Input AddChannel__Form-Row-Input-Agg">
                                                                <InputText style={{width: "49%"}}
                                                                           value={formik.values.channel_acc_stop[index].acc_sn}
                                                                           onChange={(e) => formik.setFieldValue(`channel_acc_stop[${index}].acc_sn`, e.target.value)}
                                                                           placeholder="Серийный номер узла доступа"
                                                                           className={classNames("p-inputtext-sm", {'p-invalid': formik.errors.channel_acc_stop && formik.errors.channel_acc_stop[index] && formik.errors?.channel_acc_stop[index]?.acc_sn})}
                                                                />
                                                                <InputText style={{width: "49%"}}
                                                                           value={formik.values.channel_acc_stop[index].acc_mac}
                                                                           onChange={(e) => formik.setFieldValue(`channel_acc_stop[${index}].acc_mac`, e.target.value)}
                                                                           placeholder="MAC узла доступа"
                                                                           className={classNames("p-inputtext-sm", {'p-invalid': formik.errors.channel_acc_stop && formik.errors.channel_acc_stop[index] && formik.errors?.channel_acc_stop[index]?.acc_mac})}
                                                                />
                                                            </div>
                                                            <div
                                                                className="EditChannel__Form-Input AddChannel__Form-Row-Input-Agg EditChannel__Form-Input-Just-End">
                                                                <Checkbox
                                                                    className='AddChannel__Form-Input-CheckBox-Stop-Acc'
                                                                    checked={formik.values.channel_acc_stop[index].withStop}
                                                                    onChange={() => handleAccStopChange(index)}
                                                                />
                                                                <Button icon="pi pi-times" rounded text
                                                                        severity="danger"
                                                                        aria-label="Удалить"
                                                                        onClick={() => remove(index)}
                                                                        disabled={index === 0 && formik.values.channel_acc_stop.length === 1}
                                                                />
                                                                {index === formik.values.channel_acc_stop.length - 1 ?
                                                                    <Button icon="pi pi-plus" rounded text
                                                                            severity="success"
                                                                            aria-label="Добавить" onClick={() => push({
                                                                        acc_stop: "",
                                                                        acc_port: "",
                                                                        acc_ip_mng: "",
                                                                        acc_model: "",
                                                                        acc_sn: "",
                                                                        acc_mac: ""
                                                                    })}/> : null}
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
                                        <InputText style={{width: "49%"}}
                                                   value={formik.values.zabbix}
                                                   onChange={(e) => formik.setFieldValue('zabbix', e.target.value)}
                                                   placeholder="Zabbix"
                                                   className={classNames("p-inputtext-sm", {'p-invalid': isFormFieldInvalidNonTouch('zabbix')})}
                                        />
                                        <InputText style={{width: "49%"}}
                                                   value={formik.values.zabbix_avail}
                                                   onChange={(e) => formik.setFieldValue('zabbix_avail', e.target.value)}
                                                   placeholder="Zabbix Статус"
                                                   className={classNames("p-inputtext-sm", {'p-invalid': isFormFieldInvalidNonTouch('zabbix_avail')})}
                                        />
                                    </div>
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel header="Массовое">
                            <FileUpload className="AddChannel__Upload" auto accept=".xlsx" mode="basic"
                                        name="file[]" customUpload uploadHandler={uploadHandler}/>
                        </TabPanel>
                    </TabView>
                    <Button label="Сохранить" icon="pi pi-check" className="EditChannel__Submit-Btn" size={"small"}
                            type="submit"/>
                </form>
            </div>
        </FormikProvider>
    );
}

export default AddChannelForm;
