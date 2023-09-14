import React from 'react';
import './ChannelInfo.css';
import {Sidebar} from "primereact/sidebar";
import {InputText} from "primereact/inputtext";
import { Divider } from 'primereact/divider';

function ChannelInfo({channelInfoVisible, closeChannelInfo}) {

    const customIcons = (
        <React.Fragment>
            <button className="p-sidebar-icon p-link mr-2">
                <span className="pi pi-file-export" />
            </button>
            <button className="p-sidebar-icon p-link mr-2">
                <span className="pi pi-file-edit" />
            </button>
        </React.Fragment>
    );

    return (
        <Sidebar visible={channelInfoVisible} className='ChannelInfo__Container'
                 position="right" onHide={() => closeChannelInfo(false)} icons={customIcons}>
                <div className="ChannelInfo__Table">
                    <div className="ChannelInfo__Table-String">
                        <div className="ChannelInfo__Table-String-Title">
                            ID
                        </div>
                        <div className="ChannelInfo__Table-String-Inputs">
                            <InputText value={'СУЗ-0090'} className="p-inputtext-sm ChannelInfo__Table-String-Input-33" />
                            <InputText value={'XXX'}  className="p-inputtext-sm ChannelInfo__Table-String-Input-33"/>
                            <InputText value={'НЕТ'} className="p-inputtext-sm ChannelInfo__Table-String-Input-33" />
                        </div>
                    </div>
                    <div className="ChannelInfo__Table-String">
                        <div className="ChannelInfo__Table-String-Title">
                            Клиент
                        </div>
                        <div className="ChannelInfo__Table-String-Inputs">
                            <InputText value={'Центр олимпийской подготовки'} className="p-inputtext-sm ChannelInfo__Table-String-Input-100" />
                        </div>
                    </div>
                    <div className="ChannelInfo__Table-String">
                        <div className="ChannelInfo__Table-String-Title">
                            Услуга
                        </div>
                        <div className="ChannelInfo__Table-String-Inputs">
                            <InputText value={'INET'} className="p-inputtext-sm ChannelInfo__Table-String-Input-50" />
                            <InputText value={'10M'} className="p-inputtext-sm ChannelInfo__Table-String-Input-50" />
                        </div>
                    </div>
                    <div className="ChannelInfo__Table-String">
                        <div className="ChannelInfo__Table-String-Title">
                            Адрес
                        </div>
                        <div className="ChannelInfo__Table-String-Inputs">
                            <InputText value={'Симферополь г.'} className="p-inputtext-sm ChannelInfo__Table-String-Input-45" />
                            <InputText value={'Лермонтова ул.'} className="p-inputtext-sm ChannelInfo__Table-String-Input-45" />
                            <InputText value={'123Б'} className="p-inputtext-sm ChannelInfo__Table-String-Input-10" />
                        </div>
                    </div>
                    <div className="ChannelInfo__Table-String">
                        <div className="ChannelInfo__Table-String-Title">
                            Инфо
                        </div>
                        <div className="ChannelInfo__Table-String-Inputs">
                            <InputText value={'Нет'} className="p-inputtext-sm ChannelInfo__Table-String-Input-100"/>
                        </div>
                    </div>
                    <div className="ChannelInfo__Table-String">
                        <div className="ChannelInfo__Table-String-Title">
                            Контакт
                        </div>
                        <div className="ChannelInfo__Table-String-Inputs">
                            <InputText value={'Нет'} className="p-inputtext-sm ChannelInfo__Table-String-Input-100"/>
                        </div>
                    </div>
                    <div className="ChannelInfo__Table-String">
                        <div className="ChannelInfo__Table-String-Title">
                            Статус
                        </div>
                        <div className="ChannelInfo__Table-String-Inputs">
                            <InputText value={'ВКЛ'} className="p-inputtext-sm ChannelInfo__Table-String-Input-ON ChannelInfo__Table-String-Input-50" />
                            <InputText value={'15.06.2023'} className="p-inputtext-sm  ChannelInfo__Table-String-Input-50" />
                        </div>
                    </div>
                    <div className="ChannelInfo__Table-String">
                        <div className="ChannelInfo__Table-String-Title">
                            Прим
                        </div>
                        <div className="ChannelInfo__Table-String-Inputs">
                            <InputText value={'109.24.31.12/30'} className="p-inputtext-sm ChannelInfo__Table-String-Input-50" />
                            <InputText value={'GRT'} className="p-inputtext-sm  ChannelInfo__Table-String-Input-50" />
                        </div>
                    </div>
                </div>
                <Divider />
                <div className="ChannelInfo__Table">
                    <div className="ChannelInfo__Table-String">
                        <div className="ChannelInfo__Table-String-Title">
                            PE
                        </div>
                        <div className="ChannelInfo__Table-String-Inputs">
                            <InputText value={'SMFL-02-AR4'} className="p-inputtext-sm ChannelInfo__Table-String-Input-50" />
                            <InputText value={'ge-1/0/2'}  className="p-inputtext-sm ChannelInfo__Table-String-Input-25"/>
                            <InputText value={'3874'} className="p-inputtext-sm ChannelInfo__Table-String-Input-25" />
                        </div>
                    </div>
                    <div className="ChannelInfo__Table-String">
                        <div className="ChannelInfo__Table-String-Title">
                            AGGSTOP
                        </div>
                        <div className="ChannelInfo__Table-String-Inputs">
                            <InputText value={'СТОП'} className="p-inputtext-sm ChannelInfo__Table-String-Input-70" />
                            <InputText value={'СТОП'} className="p-inputtext-sm ChannelInfo__Table-String-Input-30" />
                        </div>
                    </div>
                    <div className="ChannelInfo__Table-String">
                        <div className="ChannelInfo__Table-String-Title">
                            ACCSTOP
                        </div>
                        <div className="ChannelInfo__Table-String-Inputs">
                            <InputText value={'СТОП'} className="p-inputtext-sm ChannelInfo__Table-String-Input-100" />
                        </div>
                    </div>
                    <div className="ChannelInfo__Table-String">
                        <div className="ChannelInfo__Table-String-Title">
                            IP MNG/A
                        </div>
                        <div className="ChannelInfo__Table-String-Inputs">
                            <InputText value={'СТОП'} className="p-inputtext-sm ChannelInfo__Table-String-Input-100" />
                        </div>
                    </div>
                    <div className="ChannelInfo__Table-String">
                        <div className="ChannelInfo__Table-String-Title">
                            PORT_A
                        </div>
                        <div className="ChannelInfo__Table-String-Inputs">
                            <InputText value={'СТОП'} className="p-inputtext-sm ChannelInfo__Table-String-Input-100"/>
                        </div>
                    </div>
                    <div className="ChannelInfo__Table-String">
                        <div className="ChannelInfo__Table-String-Title">
                            MODEL
                        </div>
                        <div className="ChannelInfo__Table-String-Inputs">
                            <InputText value={'СТОП'} className="p-inputtext-sm ChannelInfo__Table-String-Input-100"/>
                        </div>
                    </div>
                    <div className="ChannelInfo__Table-String">
                        <div className="ChannelInfo__Table-String-Title">
                            SN
                        </div>
                        <div className="ChannelInfo__Table-String-Inputs">
                            <InputText value={'СТОП'} className="p-inputtext-sm ChannelInfo__Table-String-Input-100"/>
                        </div>
                    </div>
                    <div className="ChannelInfo__Table-String">
                        <div className="ChannelInfo__Table-String-Title">
                            MAC
                        </div>
                        <div className="ChannelInfo__Table-String-Inputs">
                            <InputText value={'СТОП'} className="p-inputtext-sm ChannelInfo__Table-String-Input-100"/>
                        </div>
                    </div>
                    <div className="ChannelInfo__Table-String">
                        <div className="ChannelInfo__Table-String-Title">
                            Zabbix
                        </div>
                        <div className="ChannelInfo__Table-String-Inputs">
                            <InputText value={'СТОП'} className="p-inputtext-sm ChannelInfo__Table-String-Input-50"/>
                            <InputText value={'СТОП'} className="p-inputtext-sm ChannelInfo__Table-String-Input-50"/>
                        </div>
                    </div>
                </div>
                <Divider />
                <div className="ChannelInfo__Table">
                    История тикетов или что-то другое
                </div>
        </Sidebar>
    );
}

export default ChannelInfo;