import React, {useState} from 'react';
import _InnerPage from "../_InnerPage/_InnerPage";
import { DataTable } from 'primereact/datatable';
import {Column} from "primereact/column";
import './Channels.css';
import fakeData from '../../static/staticData/fake_data.json';
import {Tag} from "primereact/tag";

function Channels(props) {

    const [selectedChannel, setSelectedChannel] = useState(null);

    const getStatusColor = (status)=>{
        switch (status) {
            case 'ВКЛ':
                return 'success';
            case 'ВЫКЛ':
                return 'danger';
            case 'ИЗМ':
                return 'info';
        }
    }

    const statusBodyTemplate = (rowData) => {
        return <Tag style={{width: "50px",}} value={rowData.status} severity={getStatusColor(rowData.status)}></Tag>;
    };

    return (
       <_InnerPage>
           <div className="ChannelsPage__Container">
               <div className="ChannelsPage__Filters">
                Фильтры
               </div>
               <DataTable value={fakeData} paginator rows={10} className={'ChannelsPage__Table-Container'}
                          selectionMode="single" selection={selectedChannel} onSelectionChange={(e) => setSelectedChannel(e.value)} dataKey="_id"
                          metaKeySelection={false}>
                   <Column field="id" header="ID" style={{maxWidth: '60px', overflow: 'clip'}}></Column>
                   <Column field="id_oss" header="ID_OSS"></Column>
                   <Column field="client" header="Клиент"></Column>
                   <Column field="service" header="Услуга"></Column>
                   <Column field="city" header="Нас.Пункт"></Column>
                   <Column field="street" header="Улица"></Column>
                   <Column field="home" header="Дом"></Column>
                   <Column field="status" header="Статус" body={statusBodyTemplate}></Column>
                   <Column field="date" header="Дата"></Column>
               </DataTable>

           </div>
       </_InnerPage>
    );
}

export default Channels;
