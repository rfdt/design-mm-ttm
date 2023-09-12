import React, {useState} from 'react';
import './ChannelsFilters.css';
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button"
import {AutoComplete} from "primereact/autocomplete";
import {Dropdown} from "primereact/dropdown";

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
                               className="ChannelsFilters__AdditionalSearch-Input"
                               placeholder="ID / Клиент / Доп.Инфо / Примечание" />
                    <Button icon="pi pi-search"
                            className={'ChannelsFilters__AdditionalSearch-SearchBtn'}  rounded severity="info"/>
                    <Button icon="pi pi-times"
                            className={'ChannelsFilters__AdditionalSearch-ClearBtn'}  rounded severity="warning"/>
                </div>
                <div className="ChannelsFilters__MainSearch">
                    <AutoComplete   value={cityValue} suggestions={filteredCitySuggestions} completeMethod={cityCompleteMethod}
                                  onChange={(e) => setCityValue(e.value)} dropdown
                                    placeholder='Населенный пункт' className={'ChannelsFilters__MainSearch-City'}
                    />
                    <AutoComplete  value={streetsValue} suggestions={filteredStreetsSuggestions} completeMethod={streetsCompleteMethod}
                                  onChange={(e) => setStreetsValue(e.value)} dropdown
                                  placeholder='Улица' className={'ChannelsFilters__MainSearch-Street'}
                    />
                    <InputText type="text"
                               className={'ChannelsFilters__MainSearch-Home'}
                               placeholder='Дом'
                    />
                    <Dropdown options={[]}
                              optionLabel="name"
                              placeholder="Услуга" className="ChannelsFilters__MainSearch-Service"
                    />
                    <Dropdown options={[]}
                              optionLabel="name"
                              placeholder="Статус" className={'ChannelsFilters__MainSearch-Status'}
                    />
                </div>
            </div>
            <div className="ChannelsFilters__Info">
                <div className="ChannelsFilters__ExtendedSearch-Info">
                    Найдено: 123
                </div>
                <div className="ChannelsFilters__ExtendedSearch-Btns">
                    <Button icon="pi pi-sliders-h" severity="info" className='ChannelsFilters__ExtendedSearch-Btn'/>
                    <Button icon="pi pi-file-excel" severity="success" className='ChannelsFilters__ExtendedSearch-Btn'/>
                    <Button icon="pi pi-plus-circle" disabled onClick={()=>console.log(123)} className='ChannelsFilters__ExtendedSearch-Btn'/>
                    <Button icon="pi pi-database" disabled severity="help" onClick={()=>console.log(123)} className='ChannelsFilters__ExtendedSearch-Btn'/>
                </div>
            </div>
        </div>
    );
}

export default ChannelsFilters;
