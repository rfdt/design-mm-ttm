import React, {useState} from 'react';
import {Dialog} from "primereact/dialog";
import './ExtendedSearch.css';
import {AutoComplete} from "primereact/autocomplete";
import {InputText} from "primereact/inputtext";
import {useSelector} from "react-redux";
import {useActions} from "../../../Store/useActions";
import {Dropdown} from "primereact/dropdown";
import {Button} from "primereact/button";

function ExtendedSearch({visible, close}) {
    const {channelsFilters, filtersValues} = useSelector(state => state.channels);
    const {setFilterValue, resetExtendedFilters} = useActions()

    const [clientsSuggestions, setClientsSuggestions] = useState([]);

    const clientsCompleteMethod = (e) => {
        filtersValues ? setClientsSuggestions(e.query ? filtersValues.clients.filter(clients => clients.toLowerCase().includes(e.query.toLowerCase())) : filtersValues.clients) : setClientsSuggestions([]);
    }

    return (<Dialog header="Расширенный поиск" visible={visible} className={'ExtendedSearch__Container'}
                    blockScroll={true}
                    onHide={close}
                    dismissableMask draggable={false} resizable={false}>
        <div className="ExtendedSearch__Filters">
            <div className="ExtendedSearch__Row">
                <AutoComplete value={channelsFilters.addInfoFilter} suggestions={clientsSuggestions}
                              completeMethod={clientsCompleteMethod}
                              placeholder='Клиент'
                              onChange={(e) => setFilterValue('addInfoFilter', e.target.value)}
                              dropdown
                              className={'ExtendedSearch__Item-100'}/>
            </div>
            <div className="ExtendedSearch__Row">
                <Dropdown value={channelsFilters.peFilter}
                          onChange={(e) => setFilterValue('peFilter',e.value)} options={filtersValues?.pe || []}
                          optionLabel="title" placeholder="PE"
                          filter  className="ExtendedSearch__Item-100" />
            </div>
            <div className="ExtendedSearch__Row">
                <InputText value={channelsFilters.rdFilter}
                           placeholder='RD'
                           onChange={(e) => setFilterValue('rdFilter', e.target.value)}
                           className={'ExtendedSearch__Item-40'}/>
                <Dropdown value={channelsFilters.channelAggStopFilter}
                          onChange={(e) => setFilterValue('channelAggStopFilter', e.target.value)}
                          options={filtersValues ? filtersValues.ssw.concat(filtersValues.stop) : []}
                          optionLabel="title" placeholder="AGG"
                          filter  className="ExtendedSearch__Item-40" />
            </div>
            <div className="ExtendedSearch__Row">
                <InputText value={channelsFilters.vidFilter}
                           placeholder='Vlan ID'
                           keyfilter='num'
                           onChange={(e) => setFilterValue('vidFilter', e.target.value)}
                           className={'ExtendedSearch__Item-40'}/>
                <InputText value={channelsFilters.sizeFilter}
                           placeholder='Емкость'
                           onChange={(e) => setFilterValue('sizeFilter', e.target.value)}
                           className={'ExtendedSearch__Item-40'}/>
            </div>
            <div className="ExtendedSearch__Row">
                <InputText value={channelsFilters.channelAccStopFilter}
                           placeholder='ACC'
                           onChange={(e) => setFilterValue('channelAccStopFilter', e.target.value)}
                           className={'ExtendedSearch__Item-40'}/>
                <InputText value={channelsFilters.channelIpMngFilter}
                           placeholder='IP/MNG ACC'
                           onChange={(e) => setFilterValue('channelIpMngFilter', e.target.value)}
                           className={'ExtendedSearch__Item-40'}/>
            </div>
            <div className="ExtendedSearch__Row ExtendedSearch__Row-Btns">
                <Button icon="pi pi-times"
                        className={'ExtendedSearch__Item-40'}
                        label="Очистить" severity="danger"
                        aria-label="Очистить"
                        size="small"
                        onClick={resetExtendedFilters}
                />
            </div>
        </div>
    </Dialog>);
}

export default ExtendedSearch;
