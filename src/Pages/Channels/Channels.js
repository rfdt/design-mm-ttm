import React, {useState} from 'react';
import _InnerPage from "../_InnerPage/_InnerPage";
import { DataTable } from 'primereact/datatable';
import {Column} from "primereact/column";
import './Channels.css';

const data = [
    {
        _id: 'asdjkah2',
        id: 'СУЗ-12312',
        id_oss: "asda",
        client: "РТПЦ",
        service: "L2VPN",
        city: "Новофёдоровка",
        street: "Парковое ш.",
        home: "39",
        status: "ВКЛ",
        date: "04.08.2023"
    },{
        id: 'СУЗ-12312',
        id_oss: "asda",
        client: "РТПЦ",
        service: "L2VPN",
        city: "Новофёдоровка",
        street: "Парковое ш.",
        home: "39",
        status: "ВКЛ",
        date: "04.08.2023"
    },{
        id: 'СУЗ-12312',
        id_oss: "asda",
        client: "РТПЦ",
        service: "L2VPN",
        city: "Новофёдоровка",
        street: "Парковое ш.",
        home: "39",
        status: "ВКЛ",
        date: "04.08.2023"
    },{
        id: 'СУЗ-12312',
        id_oss: "asda",
        client: "РТПЦ",
        service: "L2VPN",
        city: "Новофёдоровка",
        street: "Парковое ш.",
        home: "39",
        status: "ВКЛ",
        date: "04.08.2023"
    },{
        id: 'СУЗ-12312',
        id_oss: "asda",
        client: "РТПЦ",
        service: "L2VPN",
        city: "Новофёдоровка",
        street: "Парковое ш.",
        home: "39",
        status: "ВКЛ",
        date: "04.08.2023"
    },{
        id: 'СУЗ-12312',
        id_oss: "asda",
        client: "РТПЦ",
        service: "L2VPN",
        city: "Новофёдоровка",
        street: "Парковое ш.",
        home: "39",
        status: "ВКЛ",
        date: "04.08.2023"
    },{
        id: 'СУЗ-12312',
        id_oss: "asda",
        client: "РТПЦ",
        service: "L2VPN",
        city: "Новофёдоровка",
        street: "Парковое ш.",
        home: "39",
        status: "ВКЛ",
        date: "04.08.2023"
    },{
        id: 'СУЗ-12312',
        id_oss: "asda",
        client: "РТПЦ",
        service: "L2VPN",
        city: "Новофёдоровка",
        street: "Парковое ш.",
        home: "39",
        status: "ВКЛ",
        date: "04.08.2023"
    },{
        id: 'СУЗ-12312',
        id_oss: "asda",
        client: "РТПЦ",
        service: "L2VPN",
        city: "Новофёдоровка",
        street: "Парковое ш.",
        home: "39",
        status: "ВКЛ",
        date: "04.08.2023"
    },{
        id: 'СУЗ-12312',
        id_oss: "asda",
        client: "РТПЦ",
        service: "L2VPN",
        city: "Новофёдоровка",
        street: "Парковое ш.",
        home: "39",
        status: "ВКЛ",
        date: "04.08.2023"
    },{
        id: 'СУЗ-12312',
        id_oss: "asda",
        client: "РТПЦ",
        service: "L2VPN",
        city: "Новофёдоровка",
        street: "Парковое ш.",
        home: "39",
        status: "ВКЛ",
        date: "04.08.2023"
    },{
        id: 'СУЗ-12312',
        id_oss: "asda",
        client: "РТПЦ",
        service: "L2VPN",
        city: "Новофёдоровка",
        street: "Парковое ш.",
        home: "39",
        status: "ВКЛ",
        date: "04.08.2023"
    },{
        id: 'СУЗ-12312',
        id_oss: "asda",
        client: "РТПЦ",
        service: "L2VPN",
        city: "Новофёдоровка",
        street: "Парковое ш.",
        home: "39",
        status: "ВКЛ",
        date: "04.08.2023"
    },{
        id: 'СУЗ-12312',
        id_oss: "asda",
        client: "РТПЦ",
        service: "L2VPN",
        city: "Новофёдоровка",
        street: "Парковое ш.",
        home: "39",
        status: "ВКЛ",
        date: "04.08.2023"
    },{
        id: 'СУЗ-12312',
        id_oss: "asda",
        client: "РТПЦ",
        service: "L2VPN",
        city: "Новофёдоровка",
        street: "Парковое ш.",
        home: "39",
        status: "ВКЛ",
        date: "04.08.2023"
    },{
        id: 'СУЗ-12312',
        id_oss: "asda",
        client: "РТПЦ",
        service: "L2VPN",
        city: "Новофёдоровка",
        street: "Парковое ш.",
        home: "39",
        status: "ВКЛ",
        date: "04.08.2023"
    },{
        id: 'СУЗ-12312',
        id_oss: "asda",
        client: "РТПЦ",
        service: "L2VPN",
        city: "Новофёдоровка",
        street: "Парковое ш.",
        home: "39",
        status: "ВКЛ",
        date: "04.08.2023"
    },{
        id: 'СУЗ-12312',
        id_oss: "asda",
        client: "РТПЦ",
        service: "L2VPN",
        city: "Новофёдоровка",
        street: "Парковое ш.",
        home: "39",
        status: "ВКЛ",
        date: "04.08.2023"
    },{
        id: 'СУЗ-12312',
        id_oss: "asda",
        client: "РТПЦ",
        service: "L2VPN",
        city: "Новофёдоровка",
        street: "Парковое ш.",
        home: "39",
        status: "ВКЛ",
        date: "04.08.2023"
    },{
        id: 'СУЗ-12312',
        id_oss: "asda",
        client: "РТПЦ",
        service: "L2VPN",
        city: "Новофёдоровка",
        street: "Парковое ш.",
        home: "39",
        status: "ВКЛ",
        date: "04.08.2023"
    },{
        id: 'СУЗ-12312',
        id_oss: "asda",
        client: "РТПЦ",
        service: "L2VPN",
        city: "Новофёдоровка",
        street: "Парковое ш.",
        home: "39",
        status: "ВКЛ",
        date: "04.08.2023"
    },{
        id: 'СУЗ-12312',
        id_oss: "asda",
        client: "РТПЦ",
        service: "L2VPN",
        city: "Новофёдоровка",
        street: "Парковое ш.",
        home: "39",
        status: "ВКЛ",
        date: "04.08.2023"
    },{
        id: 'СУЗ-12312',
        id_oss: "asda",
        client: "РТПЦ",
        service: "L2VPN",
        city: "Новофёдоровка",
        street: "Парковое ш.",
        home: "39",
        status: "ВКЛ",
        date: "04.08.2023"
    },
]
function Channels(props) {

    const [selectedChannel, setSelectedChannel] = useState(null);

    return (
       <_InnerPage>
           <div className="ChannelsPage__Container">
               <DataTable value={data} paginator rows={13} className={'ChannelsPage__Table-Container'}
                          selectionMode="single" selection={selectedChannel} onSelectionChange={(e) => setSelectedChannel(e.value)} dataKey="_id"
                          metaKeySelection={false}>
                   <Column field="id" header="ID"></Column>
                   <Column field="id_oss" header="ID_OSS"></Column>
                   <Column field="client" header="Клиент"></Column>
                   <Column field="service" header="Услуга"></Column>
                   <Column field="city" header="Нас.Пункт"></Column>
                   <Column field="street" header="Улица"></Column>
                   <Column field="home" header="Дом"></Column>
                   <Column field="status" header="Статус"></Column>
                   <Column field="date" header="Дата"></Column>
               </DataTable>
           </div>
       </_InnerPage>
    );
}

export default Channels;