import React, {useState} from 'react';
import {Button} from "primereact/button";
import {ConfirmDialog, confirmDialog} from 'primereact/confirmdialog';
import {exportExcelFromJson} from "../../../Modules/exportExcel";
import {ChannelsApi} from "../../../Api/ChannelsApi";

function ExportExcel({
                         showError,
                         addInfoFilter,
                         cityFilter,
                         streetFilter,
                         homeFilter,
                         serviceFilter,
                         statusFilter,
                         findChannels,
                         rdFilter,
                         vidFilter,
                         channelAggStopFilter,
                         sizeFilter,
                         channelIpMngFilter,
                         channelAccStopFilter, peFilter
                     }) {

    async function findAndExport() {
        try {
            const response = await ChannelsApi.findToExport({
                addInfoFilter, cityFilter, streetFilter, homeFilter,
                serviceFilter: serviceFilter.name || "", statusFilter: statusFilter?.name || "",
                peFilter, rdFilter, channelAggStopFilter, vidFilter, sizeFilter, channelAccStopFilter, channelIpMngFilter
            })
            exportExcelFromJson(response?.data || [])
        } catch (error) {
            showError(error)
        }
    }

    const confirm = () => {
        confirmDialog({
            acceptLabel: 'Да',
            rejectLabel: 'Нет',
            message: 'Вы уверены, что хотите экспортировать все найденные каналы?',
            header: 'Подтверждение',
            icon: 'pi pi-exclamation-triangle',
            blockScroll: true,
            draggable: false,
            dismissableMask: true,
            accept: findAndExport
        });
    };

    return (
        <>
            <ConfirmDialog/>
            <Button icon="pi pi-file-excel" severity="success" onClick={confirm}
                    className='ChannelsFilters__ExtendedSearch-Btn'/>
        </>
    );
}

export default ExportExcel;