import React, {useEffect, useState} from 'react';
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button"
import {AutoComplete} from "primereact/autocomplete";
import {Dropdown} from "primereact/dropdown";
import './ChannelsFilters.css';
import ExtendedSearch from "../ExtendedSearch/ExtendedSearch";
import ExportExcel from "../ExportExcel/ExportExcel";
import {useActions} from "../../../Store/useActions";
import {useSelector} from "react-redux";
import AddChannel from "../AddChannel/AddChannel";
import {useNavigate} from "react-router-dom";
import {
    ADD_CHANNEL_ACCESS_ROLES,
    ADD_HARDWARE_ACCESS_ROLES,
    EDIT_CHANNEL_ACCESS_ROLES
} from "../../../Modules/functionAccess";

function ChannelsFilters() {

    const {setFilterValue, getFilterValues, findChannels, clearSearch} = useActions();
    const {channelsFilters, filtersValues, filteredChannelsCount} = useSelector(state => state.channels);
    const {isAuthenticated, user} = useSelector(state => state.user)
    const {setMessageError} = useActions()

    const [filteredCitySuggestions, setFilteredCitySuggestions] = useState([]);
    const [filteredStreetsSuggestions, setFilteredStreetsSuggestions] = useState([]);
    const [servicesSuggestions, setServicesSuggestions] = useState([]);

    const [extendedSearchVisible, setExtendedSearchVisible] = useState(false);
    const [addChannelVisible, setAddChannelVisible] = useState(false);

    const navigate = useNavigate();

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

    const showAddingChannel = () =>{
        if(isAuthenticated && user.roles.some(role=>ADD_CHANNEL_ACCESS_ROLES.includes(role))){
            setAddChannelVisible(true)
        }else {
            setMessageError("У вас нет доступа к добавлению канала");
        }
    }

    const handleSearchSubmit = (e) =>{
        e.preventDefault()
        findChannels();
    }

    return (<>
        <form className='ChannelsFilters__Container' onSubmit={handleSearchSubmit} autoComplete={'off'}>
            <div className="ChannelsFilters__Base">
                <div className="ChannelsFilters__AdditionalSearch">
                    <InputText type="text"
                               className="ChannelsFilters__AdditionalSearch-Input"
                               placeholder="ID / Клиент / Доп.Инфо / Примечание" value={channelsFilters.addInfoFilter}
                               onChange={(e) => setFilterValue('addInfoFilter', e.target.value)}/>
                    <div className="ChannelsFilters__AdditionalSearch-Btns">
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
                    <Dropdown options={filtersValues ? filtersValues.status : []}
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
                            type="button"
                    />
                    <Button icon="pi pi-plus-circle" onClick={showAddingChannel}
                            type="button"
                            className='ChannelsFilters__ExtendedSearch-Btn'
                            disabled={isAuthenticated && !user.roles.some(role=>ADD_CHANNEL_ACCESS_ROLES.includes(role))}
                    />
                    <ExportExcel/>
                    <Button icon="pi pi-database" severity="help"
                            className='ChannelsFilters__ExtendedSearch-Btn' onClick={()=>navigate('/hardware')}
                            type="button"
                            disabled={isAuthenticated && !user.roles.some(role=>ADD_HARDWARE_ACCESS_ROLES.includes(role))}
                    />
                </div>
            </div>
        </form>
        <ExtendedSearch visible={extendedSearchVisible} close={() => setExtendedSearchVisible(false)}/>
        <AddChannel close={()=>setAddChannelVisible(false)} visible={addChannelVisible}/>
    </>);
}

export default ChannelsFilters;
