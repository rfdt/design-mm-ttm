import React, {useState} from 'react';
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import './Hardware.css';
import {TabPanel, TabView} from "primereact/tabview";
import HardwareLookup from "./HardwareLookup/HardwareLookup";

function Hardware(props) {

    const [visibleHardware, setVisibleHardware] = useState(false)

 return (
    <>
        <Button icon="pi pi-database" severity="help" onClick={() => setVisibleHardware(true)}
                className='ChannelsFilters__ExtendedSearch-Btn'/>
        {/*<Dialog header="Оборудование" visible={visibleHardware} className="ChannelsFilters__Hardware"*/}
        {/*        blockScroll={true}*/}
        {/*        onHide={()=>setVisibleHardware(false)}*/}
        {/*        dismissableMask draggable={false} resizable={false}>*/}
        {/*    <TabView>*/}
        {/*        <TabPanel header="Обзор">*/}
        {/*            <HardwareLookup />*/}
        {/*        </TabPanel>*/}
        {/*        <TabPanel header="Создание">*/}

        {/*        </TabPanel>*/}
        {/*    </TabView>*/}
        {/*</Dialog>*/}
    </>
 );}

export default Hardware;
