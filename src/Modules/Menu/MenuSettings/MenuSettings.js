import React from 'react';
import './MenuSettings.css';
import {Dialog} from "primereact/dialog";
import {SelectButton} from "primereact/selectbutton";
import {useSelector} from "react-redux";
import {useActions} from "../../../Store/useActions";

function MenuSettings({visible, close}) {

    const {appTheme} = useSelector(state => state.global);
    const {setAppTheme} = useActions();

    const themesVars = [
        { name: 'Светлая тема', value: 'light' },
        { name: 'Тёмная тема', value: 'dark' },
    ];

 return (
     <Dialog header="Настройки" visible={visible}  onHide={close} draggable={false} dismissableMask className="MenuSettings__Container">
        <div className="MenuSettings__InnerContainer">
            <SelectButton className={'MenuSettings__Change-Theme'} value={appTheme} onChange={(e) => setAppTheme(e.value)} optionLabel="name" options={themesVars} />
        </div>
     </Dialog>
 );}

export default MenuSettings;
