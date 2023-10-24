import React, {useState} from 'react';
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import './AddHardware.css';
import {InputText} from "primereact/inputtext";
import {Dropdown} from "primereact/dropdown";
import {useFormik} from "formik";
import {AddOrEditHardwareValidationSchema} from "../../../Modules/validationSchemas";
import classNames from "classnames";
import {useActions} from "../../../Store/useActions";
import {hardware_types, hardware_uplink_type} from "../../../Modules/hardwareTypes";

function AddHardware(props) {

    const {addHardware} = useActions()

    const [addHardwareVisible, setAddHardwareVisible] = useState(false);

    const formik = useFormik({
        initialValues: {
            title: '',
            uplink: '',
            uplink_type: '',
            hardware_type: ''
        },
        validationSchema: AddOrEditHardwareValidationSchema,
        onSubmit: (data) => {
            addHardware({...data, hardware_type: data.hardware_type.code, uplink_type: data.uplink_type.code})
                .then(()=>setAddHardwareVisible(false))
        }
    });

    const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);

    return (
        <>
            <Button label="Добавить" type="button" severity="success" onClick={() => setAddHardwareVisible(true)} disabled={props.disabled}/>
            <Dialog header="Добавление оборудования" visible={addHardwareVisible}
                    onHide={() => setAddHardwareVisible(false)}
                    resizable={false}
                    draggable={false}
                    className='AddHardware__Dialog-Container'
            >
                <div className="AddHardware__Dialog-Inner-Container">
                    <form className='AddHardware__Form' onSubmit={formik.handleSubmit}>
                        <div className="AddHardware__Row">
                            <div className="AddHardware__Row-Title">
                                Hostname
                            </div>
                            <InputText
                                value={formik.values.title}
                                onChange={(e) => formik.setFieldValue('title', e.target.value)}
                                placeholder="Введите Host Name" className={classNames('AddHardware__Row-Input', {'p-invalid': isFormFieldInvalid('title')})}
                            />
                        </div>
                        <div className="AddHardware__Row">
                            <div className="AddHardware__Row-Title">
                                Тип
                            </div>
                            <Dropdown  options={hardware_types} optionLabel="name"
                                       value={formik.values.hardware_type}
                                      placeholder="Выберите тип"
                                       className={classNames('AddHardware__Row-Input', {'p-invalid': isFormFieldInvalid('hardware_type')})}
                                        onChange={(e)=>formik.setFieldValue('hardware_type', e.value)}
                            />
                        </div>
                        <div className="AddHardware__Row">
                            <div className="AddHardware__Row-Title">
                                Uplink
                            </div>
                            <InputText placeholder="Введите uplink"
                                       value={formik.values.uplink}
                                       className={classNames('AddHardware__Row-Input', {'p-invalid': isFormFieldInvalid('uplink')})}
                                       onChange={(e)=>formik.setFieldValue('uplink', e.target.value)}
                            />
                        </div>
                        <div className="AddHardware__Row">
                            <div className="AddHardware__Row-Title">
                                Включение
                            </div>
                            <Dropdown  options={hardware_uplink_type} optionLabel="name"
                                       placeholder="Схема включения"
                                       value={formik.values.uplink_type}
                                       className={classNames('AddHardware__Row-Input', {'p-invalid': isFormFieldInvalid('uplink_type')})}
                                       onChange={(e)=>formik.setFieldValue('uplink_type', e.value)}
                            />
                        </div>
                        <div className="AddHardware__Row AddHardware__Row-Centered">
                            <Button label="Cоздать" className='AddHardware__Submit-Btn' type="submit"/>
                        </div>
                    </form>
                </div>
            </Dialog>
        </>
    );
}

export default AddHardware;
