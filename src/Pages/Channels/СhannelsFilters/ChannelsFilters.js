import React, {useState} from 'react';
import './ChannelsFilters.css';
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button"
import {AutoComplete} from "primereact/autocomplete";

const ITEMS = [
    "Симферополь г.",
    "Ялта г.",
    "Николаевка пгт."
]
const STREETS = {
    'Симферополь г.' : [
        'Павленко ул.',
        'Победы пр.',
        'Героев Сталинграда ул.'
    ],
    'Ялта г.' : [],
    'Николаевка пгт.' : []
}

function ChannelsFilters(props) {
    const [cityValue, setCityValue] = useState('');
    const [streetsValue, setStreetsValue] = useState('');
    const [filteredCitySuggestions, setFilteredCitySuggestions] = useState([]);
    const [filteredStreetsSuggestions, setFilteredStreetsSuggestions] = useState([]);

    const cityCompleteMethod = (e) =>{
        setFilteredCitySuggestions(e.query ? ITEMS.filter(city => city.includes(e.query)) : ITEMS);
    }

    const streetsCompleteMethod = (e) =>{
        if (cityValue){
            if(e.query){
                setFilteredStreetsSuggestions(STREETS[cityValue].filter(city => city.includes(e.query)));
            }else {
                setFilteredStreetsSuggestions(STREETS[cityValue]);
            }
        }else {
            setFilteredStreetsSuggestions([]);
        }
    }

    return (
        <div className='ChannelsFilters__Container'>
            <div className="ChannelsFilters__Base">
                <div className="ChannelsFilters__AdditionalSearch">
                    <InputText type="text"
                               className=" ChannelsFilters__AdditionalSearch-Input"
                               placeholder="ID / Клиент / Доп.Инфо / Примечание" />
                    <Button icon="pi pi-search"
                            className={'ChannelsFilters__AdditionalSearch-SearchBtn'}  rounded severity="info"/>
                    <Button icon="pi pi-times"
                            className={'ChannelsFilters__AdditionalSearch-ClearBtn'}  rounded severity="warning"/>
                </div>
                <div className="ChannelsFilters__MainSearch">
                    <AutoComplete   value={cityValue} suggestions={filteredCitySuggestions} completeMethod={cityCompleteMethod}
                                  onChange={(e) => setCityValue(e.value)} dropdown
                                    placeholder='Населенный пункт'
                    />
                    <AutoComplete  value={streetsValue} suggestions={filteredStreetsSuggestions} completeMethod={streetsCompleteMethod}
                                  onChange={(e) => setStreetsValue(e.value)} dropdown
                                  placeholder='Улица'
                    />
                </div>
            </div>
            <div className="ChannelsFilters__Info">

            </div>
        </div>
    );
}

export default ChannelsFilters;
