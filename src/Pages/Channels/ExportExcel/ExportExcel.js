import React, {useState} from 'react';
import {Button} from "primereact/button";
import {ConfirmDialog} from 'primereact/confirmdialog';
import {exportExcelFromJson, transformToBase} from "../../../Modules/exportExcel";
import {ChannelsApi} from "../../../Api/ChannelsApi";
import {useSelector} from "react-redux";
import {useActions} from "../../../Store/useActions";

function ExportExcel() {
    const {channelsFilters} = useSelector(state => state.channels);
    const {setError} = useActions();

    const [visible, setVisible] = useState(false)

    function close(){
        setVisible(false);
    }

    async function findAndExport() {
        try {
            const response = await ChannelsApi.findToExport({...channelsFilters})
            const transformed = response.data ? transformToBase(response.data.channels) : []
            exportExcelFromJson(transformed || [])
        } catch (error) {
            console.log(error)
            setError(error)
        }finally {
            close()
        }
    }

    return (
        <>
            <ConfirmDialog acceptLabel="Да" rejectLabel="Нет"
                           visible={visible}
                           onHide={() => close()} message="Вы уверены, что хотите экспортировать все найденные каналы?"
                            blockScroll
                           draggable={false}
                           dismissableMask={true}
                           header="Подтверждение"
                           icon="pi pi-exclamation-triangle"
                           accept={findAndExport}
                           reject={close}
                           resizable={false}
            />
            <Button icon="pi pi-file-excel" severity="success" onClick={()=>setVisible(true)}
                    className='ChannelsFilters__ExtendedSearch-Btn'/>
        </>
    );
}

export default ExportExcel;
