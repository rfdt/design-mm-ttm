import React, {useRef, useState} from 'react';
import {Column} from "primereact/column";
import {DataTable} from "primereact/datatable";
import {Tag} from "primereact/tag";
import {ContextMenu} from "primereact/contextmenu";
import './ChannelsTable.css';
import {useActions} from "../../../Store/useActions";
import {useSelector} from "react-redux";
import classNames from "classnames"

function ChannelsTable() {

    const {appTheme} = useSelector(state => state.global);
    const {selectedChannel, filteredChannels} = useSelector(state => state.channels)
    const {selectChannel} = useActions();

    const [contextSelected, setContextSelected] = useState(null);

    const cm = useRef(null);
    const menuModel = [
        {label: 'Просмотреть', icon: 'pi pi-fw pi-eye', command: ()=> selectChannel(contextSelected)},
        {label: 'Копировать СУЗ', icon: 'pi pi-fw pi-copy', command: ()=>console.log(contextSelected)} //Функция на копирования СУЗа в бу.обмен
    ];


    const getStatusColor = (status) => {
        switch (status) {
            case 'ВКЛ':
                return 'success';
            case 'ОТКЛ':
                return 'danger';
            case 'ИЗМ':
                return 'info';
            case 'РЕЗЕРВ':
                return 'warning';
            case 'ПАУЗА':
                return 'info';
            default:
                return 'warning';
        }
    }

    const statusBodyTemplate = (rowData) => {
        return <Tag style={{width: "50px",}} value={rowData.status} severity={getStatusColor(rowData.status)}></Tag>;
    };

    return (
        <>
            <ContextMenu model={menuModel} ref={cm} onHide={() => setContextSelected(null)}/>
            <DataTable value={filteredChannels} scrollable
                       className={classNames('ChannelsPage__Table-Container', {"ChannelsPage__Table-Dark-Container": appTheme === 'dark'})}
                       selectionMode="single" selection={selectedChannel}
                       onSelectionChange={(e) => selectChannel(e.value)} dataKey="_id"
                       onContextMenu={(e) => cm.current.show(e.originalEvent)}
                       contextMenuSelection={contextSelected}
                       onContextMenuSelectionChange={(e) => setContextSelected(e.value)}
                       metaKeySelection={false}
            >
                <Column field="id_suz" header="ID" className='ChannelsPage__Table-ID-Field'></Column>
                <Column field="id_oss" header="ID_OSS" className='ChannelsPage__Table-ID-OSS-Field'></Column>
                <Column field="client" header="Клиент" className='ChannelsPage__Table-Client-Field'></Column>
                <Column field="service" header="Услуга" className='ChannelsPage__Table-Service-Field'></Column>
                <Column field="service_size" header="Объём" className='ChannelsPage__Table-Size-Field'></Column>
                <Column field="city" header="Нас.Пункт" className='ChannelsPage__Table-City-Field'></Column>
                <Column field="street" header="Улица" className='ChannelsPage__Table-Street-Field'></Column>
                <Column field="home" header="Дом" className='ChannelsPage__Table-Home-Field'></Column>
                <Column field="status" header="Статус" body={statusBodyTemplate} className='ChannelsPage__Table-Status-Field'></Column>
                <Column field="date" header="Дата" className='ChannelsPage__Table-Date-Field'></Column>
            </DataTable>
        </>
    );
}

export default ChannelsTable;
