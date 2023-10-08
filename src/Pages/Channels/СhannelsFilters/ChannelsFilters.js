import React, {useEffect, useState} from 'react';
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button"
import {AutoComplete} from "primereact/autocomplete";
import {Dropdown} from "primereact/dropdown";
import {ChannelsApi} from "../../../Api/ChannelsApi";
import './ChannelsFilters.css';
import ExtendedSearch from "../ExtendedSearch/ExtendedSearch";
import ExportExcel from "../ExportExcel/ExportExcel";
import {useActions} from "../../../Store/useActions";
import {useSelector} from "react-redux";
import {MultiStateCheckbox} from "primereact/multistatecheckbox";

function ChannelsFilters({showError}) {

    const {setFilterValue, getFilterValues, findChannels, clearSearch, setError} = useActions();
    const {channelsFilters, filtersValues, filteredChannelsCount} = useSelector(state => state.channels);

    const [filteredCitySuggestions, setFilteredCitySuggestions] = useState([]);
    const [filteredStreetsSuggestions, setFilteredStreetsSuggestions] = useState([]);
    const [servicesSuggestions, setServicesSuggestions] = useState([]);
    const [statusSuggestions, setStatusSuggestions] = useState([]);

    const [extendedSearchVisible, setExtendedSearchVisible] = useState(false)

    useEffect(() => {
        getFilterValues()
    }, [])

    useEffect(() => {
        if (filtersValues && filtersValues.services) {
            const suggestions = filtersValues.services.map(service => {
                return ({name: service, code: service});
            });
            setServicesSuggestions(suggestions);
        }
        setStatusSuggestions([{name: "ВКЛ", code: "ВКЛ"}, {name: "ОТКЛ", code: "ОТКЛ"},
            {name: "РЕЗЕРВ", code: "РЕЗЕРВ"}, {name: "ИЗМ", code: "ИЗМ"}, {name: "ПАУЗА", code: "ПАУЗА"}])
    }, [filtersValues])


    const cityCompleteMethod = (e) => {
        filtersValues ? setFilteredCitySuggestions(e.query ? filtersValues.city.filter(city => city.toLowerCase().includes(e.query.toLowerCase())) : filtersValues.city) : setFilteredCitySuggestions([]);
    }

    const streetsCompleteMethod = (e) => {
        if (filtersValues) {
            if (channelsFilters.cityFilter) {
                if (e.query) {
                    setFilteredStreetsSuggestions(filtersValues.streets[channelsFilters.cityFilter]
                        ?.filter(city => city.toLowerCase().includes(e.query.toLowerCase())));
                } else {
                    setFilteredStreetsSuggestions(filtersValues.streets[channelsFilters.cityFilter]);
                }
            } else {
                setFilteredStreetsSuggestions([]);
            }
        } else {
            setFilteredStreetsSuggestions([]);
        }
    }

    async function testError() {
        try {
            await ChannelsApi.testError()
        } catch (e) {
            setError(e)
        }
    }

    const channelRegionOptions = [
        {value: 'crimea', icon: 'pi pi-home'},
        {value: 'north', icon: 'pi pi-map'},
    ];

    return (<>
        <div className='ChannelsFilters__Container'>
            <div className="ChannelsFilters__Base">
                <div className="ChannelsFilters__AdditionalSearch">
                    <InputText type="text"
                               className="ChannelsFilters__AdditionalSearch-Input"
                               placeholder="ID / Клиент / Доп.Инфо / Примечание" value={channelsFilters.addInfoFilter}
                               onChange={(e) => setFilterValue('addInfoFilter', e.target.value)}/>
                    <div className="ChannelsFilters__AdditionalSearch-Btns">
                        <MultiStateCheckbox value={channelsFilters.channelRegionFilter}
                                            onChange={(e) => setFilterValue('channelRegionFilter', e.value)}
                                            options={channelRegionOptions} optionValue="value"
                                            className='ChannelsFilters__AdditionalSearch-RegionBtn' empty={false}/>
                        <Button icon="pi pi-search"
                                onClick={findChannels}
                                className={'ChannelsFilters__AdditionalSearch-SearchBtn'} rounded severity="info"/>
                        <Button icon="pi pi-times"
                                className={'ChannelsFilters__AdditionalSearch-ClearBtn'}
                                onClick={clearSearch}
                                rounded severity="warning"/>
                    </div>
                </div>
                <div className="ChannelsFilters__MainSearch">
                    <AutoComplete value={channelsFilters.cityFilter} suggestions={filteredCitySuggestions}
                                  completeMethod={cityCompleteMethod}
                                  onChange={(e) => setFilterValue('cityFilter', e.target.value)}
                                  dropdown
                                  placeholder='Населенный пункт' className={'ChannelsFilters__MainSearch-City'}
                    />
                    <AutoComplete value={channelsFilters.streetFilter} suggestions={filteredStreetsSuggestions}
                                  completeMethod={streetsCompleteMethod}
                                  onChange={(e) => setFilterValue('streetFilter', e.target.value)}
                                  dropdown
                                  placeholder='Улица' className={'ChannelsFilters__MainSearch-Street'}
                    />
                    <InputText type="text"
                               className={'ChannelsFilters__MainSearch-Home'}
                               value={channelsFilters.homeFilter}
                               onChange={(e) => setFilterValue('homeFilter', e.target.value)}
                               placeholder='Дом'
                    />
                    <Dropdown options={servicesSuggestions}
                              value={{name: channelsFilters.serviceFilter, code: channelsFilters.serviceFilter}}
                              onChange={(e) => setFilterValue('serviceFilter', e.target.value.name)}
                              optionLabel="name"
                              placeholder="Услуга" className="ChannelsFilters__MainSearch-Service"
                    />
                    <Dropdown options={statusSuggestions}
                              value={{name: channelsFilters.statusFilter, code: channelsFilters.statusFilter}}
                              onChange={(e) => setFilterValue('statusFilter', e.target.value.name)}
                              optionLabel="name"
                              placeholder="Статус" className={'ChannelsFilters__MainSearch-Status'}
                    />
                </div>
            </div>
            <div className="ChannelsFilters__Info">
                <div className="ChannelsFilters__ExtendedSearch-Info">
                    Найдено: {filteredChannelsCount}
                </div>
                <div className="ChannelsFilters__ExtendedSearch-Btns">
                    <Button icon="pi pi-sliders-h" severity="info" className='ChannelsFilters__ExtendedSearch-Btn'
                            onClick={() => setExtendedSearchVisible(true)}
                    />
                    <ExportExcel/>
                    <Button icon="pi pi-plus-circle" onClick={() => testError()}
                            className='ChannelsFilters__ExtendedSearch-Btn'/>
                    <Button icon="pi pi-database" disabled severity="help" onClick={() => console.log(123)}
                            className='ChannelsFilters__ExtendedSearch-Btn'/>
                </div>
            </div>
        </div>
        <ExtendedSearch visible={extendedSearchVisible} close={() => setExtendedSearchVisible(false)}/>
    </>);
}

export default ChannelsFilters;
