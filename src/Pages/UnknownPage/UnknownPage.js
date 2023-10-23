import React from 'react';
import './UnknownPage.css';
import {ReactComponent as Unknown} from "../../static/svg/unknown.svg";
import {Button} from "primereact/button";
import {useNavigate} from "react-router-dom";

function UnknownPage() {

    const navigate = useNavigate();
    return (
        <div className='UnknownPage__Container'>
            <Unknown className='UnknownPage__Logo'/>
            <div className="UnknownPage__Info">
                <div className="UnknownPage__Info-Title">
                    Не найдено!
                </div>
                <div className="UnknownPage__Info-SubTitle">
                    <p>Вы попали на несуществующую страницу.</p> <p>Если ранее такого не было, обратитесь к
                    администратору.</p>
                </div>
                <Button type="button" icon="pi pi-chevron-right" label="Вернуться обратно"
                        className='UnknownPage__Info-BackBtn' onClick={()=>navigate(-1)}/>
            </div>
        </div>
    );
}

export default UnknownPage;
