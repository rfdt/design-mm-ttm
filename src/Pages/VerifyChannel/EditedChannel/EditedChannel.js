import React, {useEffect, useState} from 'react';
import './EditedChannel.css';
import {FieldArray, FormikProvider, useFormik} from "formik";
import {CreateChannelValidationSchema} from "../../../Modules/validationSchemas";
import {useSelector} from "react-redux";
import {useActions} from "../../../Store/useActions";
import {InputText} from "primereact/inputtext";
import classNames from "classnames";
import {Dropdown} from "primereact/dropdown";
import {AutoComplete} from "primereact/autocomplete";
import {Calendar} from "primereact/calendar";
import {Checkbox} from "primereact/checkbox";
import {Button} from "primereact/button";
import {useNavigate} from "react-router-dom";

function EditedChannel({verifiedChannel}) {

    const {filtersValues} = useSelector(state => state.channels);
    const {verifyChannel} = useActions();
    const navigate = useNavigate();

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

    const formik = useFormik({
        initialValues: {
            _id: verifiedChannel._id,
            id_tbcd: verifiedChannel.id_tbcd,
            id_suz: verifiedChannel.id_suz,
            id_oss: verifiedChannel.id_oss,
            id_cms: verifiedChannel.id_cms,
            client: verifiedChannel.client,
            service: verifiedChannel.service,
            service_size: verifiedChannel.service_size,
            city: verifiedChannel.city,
            street: verifiedChannel.street,
            home: verifiedChannel.home,
            add_info: verifiedChannel.add_info,
            contact: verifiedChannel.contact,
            status: verifiedChannel.status,
            date: new Date(verifiedChannel.date),
            note: verifiedChannel.note,
            rd_sr: verifiedChannel.rd_sr,
            channel_pe: "",
            channel_pe_port: "",
            channel_vid: "",
            zabbix: verifiedChannel.zabbix,
            zabbix_avail: verifiedChannel.zabbix_avail,
            channel_region: verifiedChannel.channel_region,
            channel_acc_stop: [{
                acc_stop: "",
                acc_port: "",
                acc_ip_mng: "",
                acc_model: "",
                acc_sn: "",
                acc_mac: "",
                withStop: false
            }],
            channel_agg_stop: [{agg_stop: '', agg_port: '', withStop: false}]
        },
        validationSchema: CreateChannelValidationSchema,
        onSubmit: (data) => {
            const transformedObj = {
                ...data,
                channel_pe: data.channel_pe.title,
                channel_agg_stop: data.channel_agg_stop.map((agg_stop) => ({
                    ...agg_stop,
                    agg_stop: agg_stop.agg_stop.title
                }))
            }
            verifyChannel(transformedObj)
                .then(()=>navigate(-1));
        }
    });

    const isFormFieldInvalidNonTouch = (name) => !!(formik.errors[name]);

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

    return (
        <div className="VerifyChannel__Edit">
            <div className="VerifyChannel__Edit-Title">
                Актуальные данные
            </div>
            <FormikProvider value={formik}>
                <form onSubmit={formik.handleSubmit} className="VerifyChannel__Edit-Body">
                    <div className="VerifyChannel__Managment">
                        <div className="EditChannel__Form-Container EditedChannel__Form-Container-Max600">
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
                                    <InputText style={{width: "49%"}}
                                               value={formik.values.service_size}
                                               onChange={(e) => formik.setFieldValue('service_size', e.target.value)}
                                               placeholder='Размер услуги'
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
                                                  disabled
                                    />
                                    <AutoComplete value={formik.values.street}
                                                  suggestions={filteredStreetsSuggestions}
                                                  completeMethod={streetsCompleteMethod}
                                                  onChange={(e) => formik.setFieldValue('street', e.target.value)}
                                                  placeholder='Улица' dropdown
                                                  inputClassName='p-inputtext-sm'
                                                  className={classNames("EditChannel__Form-Street", {'p-invalid': isFormFieldInvalidNonTouch('street')})}
                                                  disabled
                                    />
                                    <InputText
                                        value={formik.values.home}
                                        onChange={(e) => formik.setFieldValue('home', e.target.value)}
                                        placeholder="Дом"
                                        className={classNames("p-inputtext-sm EditChannel__Form-Home", {'p-invalid': isFormFieldInvalidNonTouch('home')})}
                                        disabled
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
                                    />
                                    <Calendar value={formik.values.date}
                                              onChange={(e) => formik.setFieldValue('date', e.target.value)}
                                              dateFormat="yy.mm.dd"
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
                    </div>
                    <div className="VerifyChannel__Technical">
                        <div className="EditChannel__Form-Container EditedChannel__Form-Container-Max600">
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
                                                        options={filtersValues ? formik.values.channel_agg_stop[index].withStop ? filtersValues.stop : filtersValues.ssw : []}
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
                                                                    formik.setFieldValue(`channel_agg_stop[${index}].agg_stop`, "")
                                                                }}
                                                                className='AddChannel__Form-Input-CheckBox-Stop-Acc'
                                                            />
                                                        </div>
                                                        <Button icon="pi pi-times" rounded text
                                                                severity="danger" aria-label="Удалить"
                                                                type="button"
                                                                disabled={index === 0 && formik.values.channel_agg_stop.length === 1}
                                                                onClick={() => {
                                                                    remove(index)
                                                                }}/>
                                                        {index === formik.values.channel_agg_stop.length - 1 ?
                                                            <Button icon="pi pi-plus" rounded text
                                                                    severity="success" aria-label="Удалить"
                                                                    type="button"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        push({
                                                                            agg_stop: '',
                                                                            agg_port: '',
                                                                            withStop: false
                                                                        })
                                                                    }
                                                                    }/> : null
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
                                                            <Button
                                                                type="button"
                                                                icon="pi pi-times" rounded text severity="danger"
                                                                    aria-label="Удалить" disabled={index === 0 && formik.values.channel_acc_stop.length === 1}
                                                                    onClick={() => remove(index)}/>
                                                            {index === formik.values.channel_acc_stop.length - 1 ?
                                                                <Button
                                                                    type="button"
                                                                    icon="pi pi-plus" rounded text
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
                            <div className="EditChannel__Form-Row">
                                <Button label="Сохранить" icon="pi pi-check" className="EditedChannel__Submit-Btn" size={"small"}
                                        type="submit"/>
                            </div>
                        </div>
                    </div>
                </form>
            </FormikProvider>
        </div>
    );
}

export default EditedChannel;
