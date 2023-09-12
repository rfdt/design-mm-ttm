import React, {useRef, useState} from 'react';
import fakeData from "../../../static/staticData/fake_data.json";
import {Column} from "primereact/column";
import {DataTable} from "primereact/datatable";
import {Tag} from "primereact/tag";
import {ContextMenu} from "primereact/contextmenu";
import './ChannelsTable.css';

function ChannelsTable({setSelectedChannel, selectedChannel}) {

    //TODO Добить идею с таблицей, подумать нужно ли добавлять элементы, или пусть таблица по высоте сжимается,
    //поразмыслить и что-то в голову придёт

    const [contextSelected, setContextSelected] = useState(null);

    const cm = useRef(null);
    const menuModel = [
        {label: 'Просмотреть', icon: 'pi pi-fw pi-eye', command: ()=> setSelectedChannel(contextSelected)},
        {label: 'Копировать СУЗ', icon: 'pi pi-fw pi-copy', command: ()=>console.log(contextSelected)} //Функция на копирования СУЗа в бу.обмен
    ];

    const [sortedData, setSortedData] = useState(fakeData.slice(0,12));

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

    const isRowSelectable = (e) =>{
        if(Object.keys(e.data).includes('fake')) return false;
        return true;
    }

    const statusBodyTemplate = (rowData) => {
        return <Tag style={{width: "50px",}} value={rowData.status} severity={getStatusColor(rowData.status)}></Tag>;
    };

    return (
        <>
            <ContextMenu model={menuModel} ref={cm} onHide={() => setContextSelected(null)}/>
            <DataTable value={sortedData} scrollable scrollHeight={'700px'} className={'ChannelsPage__Table-Container'}
                       selectionMode="single" selection={selectedChannel}
                       onSelectionChange={(e) => setSelectedChannel(e.value)} dataKey="_id"
                       onContextMenu={(e) => cm.current.show(e.originalEvent)}
                       contextMenuSelection={contextSelected}
                       onContextMenuSelectionChange={(e) => setContextSelected(e.value)}
                       metaKeySelection={false} /*isDataSelectable={isRowSelectable}*/
            >
                <Column field="id" header="ID" className='ChannelsPage__Table-ID-Field'></Column>
                <Column field="id_oss" header="ID_OSS" className='ChannelsPage__Table-ID-OSS-Field'></Column>
                <Column field="client" header="Клиент" className='ChannelsPage__Table-Client-Field'></Column>
                <Column field="service" header="Услуга" className='ChannelsPage__Table-Service-Field'></Column>
                <Column field="size" header="Объём" className='ChannelsPage__Table-Size-Field'></Column>
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
