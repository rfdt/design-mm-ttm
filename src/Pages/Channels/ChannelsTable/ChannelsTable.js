import React, {useRef, useState} from 'react';
import fakeData from "../../../static/staticData/fake_data.json";
import {Column} from "primereact/column";
import {DataTable} from "primereact/datatable";
import {Tag} from "primereact/tag";
import {ContextMenu} from "primereact/contextmenu";

function ChannelsTable({setSelectedChannel, selectedChannel}) {

    const [contextSelected, setContextSelected] = useState(null);

    const cm = useRef(null);
    const menuModel = [
        {label: 'Просмотреть', icon: 'pi pi-fw pi-eye', command: ()=> setSelectedChannel(contextSelected)},
        {label: 'Копировать СУЗ', icon: 'pi pi-fw pi-copy', command: ()=>console.log(contextSelected)} //Функция на копирования СУЗа в бу.обмен
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'ВКЛ':
                return 'success';
            case 'ВЫКЛ':
                return 'danger';
            case 'ИЗМ':
                return 'info';
            case 'РЕЗЕРВ':
                return 'warning';
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
            <DataTable value={fakeData} paginator rows={10} className={'ChannelsPage__Table-Container'}
                       selectionMode="single" selection={selectedChannel}
                       onSelectionChange={(e) => setSelectedChannel(e.value)} dataKey="_id"
                       onContextMenu={(e) => cm.current.show(e.originalEvent)}
                       contextMenuSelection={contextSelected}
                       onContextMenuSelectionChange={(e) => setContextSelected(e.value)}
                       metaKeySelection={false}
            >
                <Column field="id" header="ID" style={{width: '55px', overflow: 'clip'}}></Column>
                <Column field="id_oss" header="ID_OSS"></Column>
                <Column field="client" header="Клиент"></Column>
                <Column field="service" header="Услуга"></Column>
                <Column field="size" header="Объём"></Column>
                <Column field="city" header="Нас.Пункт"></Column>
                <Column field="street" header="Улица"></Column>
                <Column field="home" header="Дом"></Column>
                <Column field="status" header="Статус" body={statusBodyTemplate}></Column>
                <Column field="date" header="Дата"></Column>
            </DataTable>
        </>
    );
}

export default ChannelsTable;