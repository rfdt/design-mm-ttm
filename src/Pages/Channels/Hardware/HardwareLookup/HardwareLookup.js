import React from 'react';
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {useSelector} from "react-redux";

function HardwareLookup(props) {

    const {filtersValues} = useSelector(state => state.channels)

 return (
     <DataTable scrollable scrollHeight={'600px'} value={filtersValues ? filtersValues.pe.concat(filtersValues.ssw).concat(filtersValues.stop) : []}>
         <Column field="title" header="Название"  className='ChannelsFilters__Hardware-LookUp-Title'></Column>
         <Column field="hardware_type" header="Тип"  className='ChannelsFilters__Hardware-LookUp-Type'></Column>
     </DataTable>
 );}

export default HardwareLookup;
