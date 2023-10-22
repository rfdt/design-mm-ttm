import React, {useEffect, useState} from 'react';
import {Dialog} from "primereact/dialog";
import './EditHardware.css';
import {useFormik} from "formik";
import {AddOrEditHardwareValidationSchema} from "../../../Modules/validationSchemas";
import {InputText} from "primereact/inputtext";
import classNames from "classnames";
import {Dropdown} from "primereact/dropdown";
import {hardware_types, hardware_uplink_type} from "../../../Modules/hardwareTypes";
import {Button} from "primereact/button";
import {useActions} from "../../../Store/useActions";

function EditHardware({selectedHardware, setSelectedHardware}) {

    const {editHardware} = useActions()

    const [visible, setVisible] = useState(false);

    useEffect(()=>{
        if(selectedHardware){
            setVisible(true)
        }else {
            setVisible(false)
        }
    }, [selectedHardware])

    const closeEditHardware = () =>{
        setSelectedHardware(null);
    }

    const formik = useFormik({
        initialValues: {
            _id:  selectedHardware._id ,
            title: selectedHardware.title ,
            uplink: selectedHardware.uplink ,
            uplink_type: hardware_uplink_type.find(type => type.code === selectedHardware.uplink_type),
            hardware_type: hardware_types.find(type=> {
                return type.code === selectedHardware.hardware_type
            })
        },
        validationSchema: AddOrEditHardwareValidationSchema,
        onSubmit: (data) => {
            editHardware({...data, hardware_type: data.hardware_type.code, uplink_type: data.uplink_type.code})
                .then(()=>setSelectedHardware(null))
        }
    });

    const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);

    return (
        <Dialog header="Изменение оборудования"
                visible={visible}
                onHide={closeEditHardware}
                resizable={false}
                draggable={false}
                className='EditHardware__Container'
        >
            <div className="AddHardware__Dialog-Inner-Container">
                <form className='AddHardware__Form' onSubmit={formik.handleSubmit}>
                    <div className="AddHardware__Row">
                        <div className="AddHardware__Row-Title">
                            Host Name
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
                                   disabled
                                   value={formik.values.hardware_type}
                                   placeholder="Выберите тип"
                                   className={classNames('AddHardware__Row-Input', {'p-invalid': isFormFieldInvalid('hardware_type')})}
                                   onChange={(e)=>formik.setFieldValue('hardware_type', e.value)}
                        />
                    </div>
                    <div className="AddHardware__Row">
                        <div className="AddHardware__Row-Title">
                            Up Link
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
                        <Button label="Изменить" className='AddHardware__Submit-Btn' type="submit"/>
                    </div>
                </form>
            </div>
        </Dialog>
    );
}

export default EditHardware;