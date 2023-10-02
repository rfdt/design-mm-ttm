import React, {useState} from 'react';
import {Dialog} from "primereact/dialog";
import './ExtendedSearch.css';
import {AutoComplete} from "primereact/autocomplete";
import {InputText} from "primereact/inputtext";

function ExtendedSearch({
                            filtersValue,
                            visible,
                            close,
                            // clientFilter,
                            // setClientFilter,
                            addInfoFilter, setAddInfoFilter,
                            rdFilter,
                            setRdFilter,
                            vidFilter,
                            setVidFilter,
                            setChannelAggStopFilter,
                            channelAggStopFilter,
                            setSizeFilter,
                            sizeFilter,
                            channelIpMngFilter,
                            channelAccStopFilter,
                            setChannelAccStopFilter,
                            setChannelIpMngFilter,
                            peFilter, setPeFilter
                        }) {

    const [clientsSuggestions, setClientsSuggestions] = useState([]);
    const [aggSuggestions, setAggSuggestions] = useState([]);
    const [accSuggestions, setAccSuggestions] = useState([]);
    const [peSuggestions, setPeSuggestions] = useState([]);


    const clientsCompleteMethod = (e) => {
        filtersValue ? setClientsSuggestions(e.query ? filtersValue.clients.filter(clients => clients.toLowerCase().includes(e.query.toLowerCase())) : filtersValue.clients) : setClientsSuggestions([]);
    }

    const peCompleteMethod = (e) => {
        filtersValue ? setPeSuggestions(e.query ? filtersValue.pe.filter(pe => pe.toLowerCase().includes(e.query.toLowerCase())) : filtersValue.pe) : setPeSuggestions([]);
    }
    const aggCompleteMethod = (e) => {
        filtersValue ? setAggSuggestions(e.query ? filtersValue.agg.filter(agg => agg.toLowerCase().includes(e.query.toLowerCase())) : filtersValue.agg) : setAggSuggestions([]);
    }

    const accCompleteMethod = (e) => {
        filtersValue ? setAccSuggestions(e.query ? filtersValue.acc.filter(acc => acc.toLowerCase().includes(e.query.toLowerCase())) : filtersValue.acc) : setAccSuggestions([]);
    }

    return (<Dialog header="Расширенный поиск" visible={visible} className={'ExtendedSearch__Container'}
                    blockScroll={true}
                    onHide={close}
                    dismissableMask draggable={false} resizable={false}>
        <div className="ExtendedSearch__Filters">
            <div className="ExtendedSearch__Row">
                <AutoComplete value={addInfoFilter} suggestions={clientsSuggestions}
                              completeMethod={clientsCompleteMethod}
                              placeholder='Клиент'
                              onChange={(e) => setAddInfoFilter(e.value)} dropdown
                              className={'ExtendedSearch__Item-100'}/>
            </div>
            <div className="ExtendedSearch__Row">
                <AutoComplete value={peFilter} suggestions={peSuggestions}
                              completeMethod={peCompleteMethod}
                              placeholder='PE'
                              onChange={(e) => setPeFilter(e.value)} dropdown
                              className={'ExtendedSearch__Item-100'}/>
            </div>
            <div className="ExtendedSearch__Row">
                <InputText value={rdFilter}
                           placeholder='RD'
                           onChange={(e) => setRdFilter(e.target.value)}
                           className={'ExtendedSearch__Item-40'}/>
                <AutoComplete value={channelAggStopFilter} suggestions={aggSuggestions}
                              completeMethod={aggCompleteMethod}
                              placeholder='AGG'
                              onChange={(e) => setChannelAggStopFilter(e.value)} dropdown
                              className={'ExtendedSearch__Item-40'}/>
            </div>
            <div className="ExtendedSearch__Row">
                <InputText value={vidFilter}
                           placeholder='Vlan ID'
                           keyfilter='num'
                           onChange={(e) => setVidFilter(e.target.value)}
                           className={'ExtendedSearch__Item-40'}/>
                <InputText value={sizeFilter}
                           placeholder='Емкость'
                           onChange={(e) => setSizeFilter(e.target.value)}
                           className={'ExtendedSearch__Item-40'}/>
            </div>
            <div className="ExtendedSearch__Row">
                <AutoComplete value={channelAccStopFilter} suggestions={accSuggestions}
                              completeMethod={accCompleteMethod}
                              placeholder='ACC'
                              onChange={(e) => setChannelAccStopFilter(e.value)} dropdown
                              className={'ExtendedSearch__Item-40'}/>
                <InputText value={channelIpMngFilter}
                           placeholder='IP/MNG ACC'
                           onChange={(e) => setChannelIpMngFilter(e.target.value)}
                           className={'ExtendedSearch__Item-40'}/>
            </div>
        </div>
    </Dialog>);
}

export default ExtendedSearch;
