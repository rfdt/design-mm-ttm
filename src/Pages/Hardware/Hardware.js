import React, {useMemo, useState} from 'react';
import _InnerPage from "../_InnerPage/_InnerPage";
import './Hardware.css';
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {useSelector} from "react-redux";
import {FilterMatchMode, FilterOperator} from "primereact/api";
import {Dropdown} from "primereact/dropdown";
import AddHardware from "./AddHardware/AddHardware";
import EditHardware from "./EditHardware/EditHardware";
import {hardwareTypeWord} from "../../Modules/hardwareTypes";

function Hardware() {

    const {filtersValues} = useSelector(state => state.channels);

    const hardwares = useMemo(()=> filtersValues ? filtersValues.pe.concat(filtersValues.ssw.concat(filtersValues.stop)) : [], [filtersValues])

    const [selectedHardware, setSelectedHardware] = useState(null);

    const [filters] = useState({
        title: {
            operator: FilterOperator.AND,
            constraints: [ {value: "", matchMode: FilterMatchMode.STARTS_WITH}]
        },
        hardware_type: {value: null, matchMode: FilterMatchMode.CONTAINS}
    });

    const typeRowFilterTemplate = (options) => {
        return (
            <Dropdown  value={options.value} optionLabel={'title'} options={[
                {title: 'PE', value: 'pe'}, {title: 'SSW', value: 'ssw'}, {title: 'СТОП', value: 'stop'}
            ]} onChange={(e) => {
                options.filterApplyCallback(e.value)
            }} placeholder="Тип оборудования" className="p-column-filter" showClear />
        );
    };

    const typeRowTemplate = (dataRow) =>{
        return hardwareTypeWord[dataRow.hardware_type] || 'НЕИЗВЕСТНО';
    }

    return (
            <_InnerPage>
                <div className="HardwarePage__Header">
                    <div className="HardwarePage__Title">Оборудование</div>
                    <div className="HardwarePage__Btn"><AddHardware disabled={!filtersValues}/></div>
                </div>
                <div className="HardwarePage__Container">
                    <DataTable value={hardwares}
                               paginator rows={12}
                               dataKey="_id" filters={filters}
                               filterDisplay="menu" loading={!filtersValues}
                               emptyMessage="Нет данных."
                               selectionMode="single"
                               selection={selectedHardware}
                               onSelectionChange={(e) => setSelectedHardware(e.value)}
                    >
                        <Column field="title" header="Hostname"  filter showFilterMatchModes={false} />
                        <Column field="hardware_type" header="Тип" filter filterElement={typeRowFilterTemplate}
                            style={{width: '25%'}}
                                showFilterMatchModes={false}
                                body={typeRowTemplate}
                        />
                    </DataTable>
                </div>
                {selectedHardware ? <EditHardware selectedHardware={selectedHardware} setSelectedHardware={setSelectedHardware}/> : null}
            </_InnerPage>
    );
}

export default Hardware;
