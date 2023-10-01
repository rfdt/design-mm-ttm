import React, {useEffect, useState} from 'react';
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button"
import {AutoComplete} from "primereact/autocomplete";
import {Dropdown} from "primereact/dropdown";
import {ChannelsApi} from "../../../Api/ChannelsApi";
import './ChannelsFilters.css';
import ExtendedSearch from "../ExtendedSearch/ExtendedSearch";

function ChannelsFilters({
                             showError,
                             addInfoFilter,
                             setAddInfoFilter,
                             cityFilter,
                             setCityFilter,
                             streetFilter,
                             setStreetFilter,
                             homeFilter,
                             setHomeFilter,
                             serviceFilter,
                             setServiceFilter,
                             setStatusFilter,
                             statusFilter,
                             findChannels,
                             channelsCount,
                             // clientFilter,
                             // setClientFilter,
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
                             setChannelIpMngFilter, peFilter, setPeFilter
                         }) {
    const [filtersValue, setFiltersValue] = useState(null);
    const [filteredCitySuggestions, setFilteredCitySuggestions] = useState([]);
    const [filteredStreetsSuggestions, setFilteredStreetsSuggestions] = useState([]);
    const [servicesSuggestions, setServicesSuggestions] = useState([]);
    const [statusSuggestions, setStatusSuggestions] = useState([]);

    const [extendedSearchVisible, setExtendedSearchVisible] = useState(false)

    const defaultFilters = async () => {
        setAddInfoFilter('');
        setHomeFilter('');
        setCityFilter('');
        setStreetFilter('');
        setStatusFilter('');
        setServiceFilter('');

        findChannels({
            addInfoFilter: "",
            cityFilter: "",
            streetFilter: "",
            homeFilter: "",
            statusFilter: "",
            serviceFilter: "",
            peFilter:"", rdFilter:"", channelAggStopFilter:"", vidFilter:"", sizeFilter:"", channelAccStopFilter:"", channelIpMngFilter:""
        })
    }


    useEffect(() => {
        async function fetch() {
            try {
                const filtersValue = await ChannelsApi.getFiltersValue();
                setFiltersValue(filtersValue.data);
            } catch (error) {
                showError(error)
            }
        }

        fetch();
    }, [])

    useEffect(() => {
        if (filtersValue && filtersValue.services) {
            const suggestions = filtersValue.services.map(service => {
                return ({name: service, code: service});
            });
            setServicesSuggestions(suggestions);
        }
        setStatusSuggestions([
            {name: "ВКЛ", code: "ВКЛ"},
            {name: "ОТКЛ", code: "ОТКЛ"},
            {name: "РЕЗЕРВ", code: "РЕЗЕРВ"},
            {name: "ИЗМ", code: "ИЗМ"},
            {name: "ПАУЗА", code: "ПАУЗА"},
        ])
    }, [filtersValue])


    const cityCompleteMethod = (e) => {
        filtersValue ?
            setFilteredCitySuggestions(e.query ? filtersValue.city.filter(city => city.toLowerCase().includes(e.query.toLowerCase())) : filtersValue.city) :
            setFilteredCitySuggestions([]);
    }

    const streetsCompleteMethod = (e) => {
        if (filtersValue) {
            if (cityFilter) {
                if (e.query) {
                    setFilteredStreetsSuggestions(filtersValue.streets[cityFilter]
                        ?.filter(city => city.toLowerCase().includes(e.query.toLowerCase())));
                } else {
                    setFilteredStreetsSuggestions(filtersValue.streets[cityFilter]);
                }
            } else {
                setFilteredStreetsSuggestions([]);
            }
        } else {
            setFilteredStreetsSuggestions([]);
        }
    }

    return (
        <>
            <div className='ChannelsFilters__Container'>
                <div className="ChannelsFilters__Base">
                    <div className="ChannelsFilters__AdditionalSearch">
                        <InputText type="text"
                                   className="ChannelsFilters__AdditionalSearch-Input"
                                   placeholder="ID / Клиент / Доп.Инфо / Примечание" value={addInfoFilter}
                                   onChange={(e) => setAddInfoFilter(e.target.value)}/>
                        <Button icon="pi pi-search"
                                onClick={()=>findChannels()}
                                className={'ChannelsFilters__AdditionalSearch-SearchBtn'} rounded severity="info"/>
                        <Button icon="pi pi-times"
                                className={'ChannelsFilters__AdditionalSearch-ClearBtn'} onClick={defaultFilters}
                                rounded severity="warning"/>
                    </div>
                    <div className="ChannelsFilters__MainSearch">
                        <AutoComplete value={cityFilter} suggestions={filteredCitySuggestions}
                                      completeMethod={cityCompleteMethod}
                                      onChange={(e) => setCityFilter(e.value)} dropdown
                                      placeholder='Населенный пункт' className={'ChannelsFilters__MainSearch-City'}
                        />
                        <AutoComplete value={streetFilter} suggestions={filteredStreetsSuggestions}
                                      completeMethod={streetsCompleteMethod}
                                      onChange={(e) => setStreetFilter(e.value)} dropdown
                                      placeholder='Улица' className={'ChannelsFilters__MainSearch-Street'}
                        />
                        <InputText type="text"
                                   className={'ChannelsFilters__MainSearch-Home'}
                                   value={homeFilter}
                                   onChange={(e) => setHomeFilter(e.target.value)}
                                   placeholder='Дом'
                        />
                        <Dropdown options={servicesSuggestions}
                                  value={serviceFilter}
                                  onChange={(e) => setServiceFilter(e.value)}
                                  optionLabel="name"
                                  placeholder="Услуга" className="ChannelsFilters__MainSearch-Service"
                        />
                        <Dropdown options={statusSuggestions}
                                  value={statusFilter}
                                  onChange={(e) => setStatusFilter(e.value)}
                                  optionLabel="name"
                                  placeholder="Статус" className={'ChannelsFilters__MainSearch-Status'}
                        />
                    </div>
                </div>
                <div className="ChannelsFilters__Info">
                    <div className="ChannelsFilters__ExtendedSearch-Info">
                        Найдено: {channelsCount}
                    </div>
                    <div className="ChannelsFilters__ExtendedSearch-Btns">
                        <Button icon="pi pi-sliders-h" severity="info" className='ChannelsFilters__ExtendedSearch-Btn'
                                onClick={() => setExtendedSearchVisible(true)}
                        />
                        <Button icon="pi pi-file-excel" severity="success"
                                className='ChannelsFilters__ExtendedSearch-Btn'/>
                        <Button icon="pi pi-plus-circle" disabled onClick={() => console.log(123)}
                                className='ChannelsFilters__ExtendedSearch-Btn'/>
                        <Button icon="pi pi-database" disabled severity="help" onClick={() => console.log(123)}
                                className='ChannelsFilters__ExtendedSearch-Btn'/>
                    </div>
                </div>
            </div>
            <ExtendedSearch  visible={extendedSearchVisible} close={() => setExtendedSearchVisible(false)}
                            // clientFilter={clientFilter} setClientFilter={setClientFilter}
                            filtersValue={filtersValue}
                            rdFilter={rdFilter} setRdFilter={setRdFilter}
                            channelAggStopFilter={channelAggStopFilter}
                            setChannelAggStopFilter={setChannelAggStopFilter}
                            vidFilter={vidFilter} setVidFilter={setVidFilter}
                            sizeFilter={sizeFilter} setSizeFilter={setSizeFilter}
                            channelAccStopFilter={channelAccStopFilter}
                            setChannelAccStopFilter={setChannelAccStopFilter}
                            channelIpMngFilter={channelIpMngFilter} setChannelIpMngFilter={setChannelIpMngFilter}
                            addInfoFilter={addInfoFilter} setAddInfoFilter={setAddInfoFilter}
                            peFilter={peFilter} setPeFilter={setPeFilter}
            />
        </>
    );
}

export default ChannelsFilters;
