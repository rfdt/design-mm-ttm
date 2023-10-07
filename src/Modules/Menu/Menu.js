import React, {useEffect, useState} from 'react';
import MmLogo from "../../static/images/MM-LOGO-ENCIRCLE.png";
import classNames from "classnames";
import {
    HomeOutlined,
    IssuesCloseOutlined,
    LogoutOutlined,
    RightCircleOutlined,
    SettingOutlined,
    SlidersOutlined
} from "@ant-design/icons";
import './Menu.css';
import {useLocation, useNavigate} from "react-router-dom";

function Menu(props) {
    const [isMenuOpened, setIsMenuOpened] = useState(false)
    const [selectedItem, setSelectedItem] = useState('home');

    const location = useLocation();
    const navigate = useNavigate();

    const navigateTo = (path) =>{
        navigate(path)
    }

    useEffect(()=>{
        switch (location.pathname){
            case "/":
               return setSelectedItem('home');
            case "/channels":
                return setSelectedItem('channels');
            case "/tickets":
                return setSelectedItem('tickets');
            default:
                return setSelectedItem('unknown');
        }
    }, [location])


    return (
        <div className={
            classNames('Menu__Container', {'Menu--Open': isMenuOpened})
        }>
            <div className={classNames('Menu__Logo', {'Menu__Logo--Open': isMenuOpened})}>
                <div className="Menu__Logo-IMG" onClick={() => setIsMenuOpened(!isMenuOpened)}>
                    <img src={MmLogo} alt=""/>
                </div>
                {isMenuOpened &&
                    <div className={classNames('Menu__Logo-Title', {'Menu__Logo-Title--Open': isMenuOpened})}>
                        Миранда-медиа
                    </div>
                }
            </div>
            <div className="Menu__Items">
                <div onClick={() => navigateTo('/')}
                     className={classNames('Menu__Item',
                         {'Menu__Item--Closed': !isMenuOpened}, {'Menu__Item--Active': selectedItem === 'home'})}>
                    <HomeOutlined className={
                        classNames(
                            'Menu__Item-Logo',
                            {'Menu__Item-Logo-Opened': isMenuOpened},
                            {'Menu__Item-Logo--Active': selectedItem === 'home'}
                        )}/>
                    {
                        isMenuOpened &&
                        <span className={classNames(
                            'Menu__Item-Text',
                            {'Menu__Item-Text--Disabled': selectedItem !== 'home'},
                            {'Menu__Item-Text--Active': selectedItem === 'home'}
                        )}>Главная</span>
                    }
                </div>
                <div onClick={() => navigateTo('/channels')}
                     className={classNames('Menu__Item',
                         {'Menu__Item--Closed': !isMenuOpened}, {'Menu__Item--Active': selectedItem === 'channels'})}>
                    <SlidersOutlined className={
                        classNames(
                            'Menu__Item-Logo',
                            {'Menu__Item-Logo-Opened': isMenuOpened},
                            {'Menu__Item-Logo--Active': selectedItem === 'channels'}
                        )}/>
                    {
                        isMenuOpened &&
                        <span className={classNames(
                            'Menu__Item-Text',
                            {'Menu__Item-Text--Disabled': selectedItem !== 'channels'},
                            {'Menu__Item-Text--Active': selectedItem === 'channels'}
                        )}>Включения</span>
                    }
                </div>
                <div onClick={() => navigateTo('/tickets')}
                     className={classNames('Menu__Item',
                         {'Menu__Item--Closed': !isMenuOpened}, {'Menu__Item--Active': selectedItem === 'tickets'})}>
                    <IssuesCloseOutlined className={
                        classNames(
                            'Menu__Item-Logo',
                            {'Menu__Item-Logo-Opened': isMenuOpened},
                            {'Menu__Item-Logo--Active': selectedItem === 'tickets'}
                        )}/>
                    {
                        isMenuOpened &&
                        <span className={classNames(
                            'Menu__Item-Text',
                            {'Menu__Item-Text--Disabled': selectedItem !== 'tickets'},
                            {'Menu__Item-Text--Active': selectedItem === 'tickets'}
                        )}>Тикеты</span>
                    }
                </div>
            </div>
            <div className="Menu__Bottom">
                <div onClick={()=>setIsMenuOpened(!isMenuOpened)}
                    className={classNames('Menu__Item', 'Menu__Item-Open-Btn',
                        {'Menu__Item--Closed': !isMenuOpened})}>
                    <RightCircleOutlined  className={
                        classNames(
                            'Menu__Item-Logo',
                            {'Menu__Item-Logo-Opened Menu-Item-Closed': isMenuOpened}
                        )}/>
                    {
                        isMenuOpened &&
                        <span className={classNames(
                            'Menu__Item-Text', 'Menu__Item-Bottom-Text',
                        )}>Закрыть</span>
                    }
                </div>
                <div
                     className={classNames('Menu__Item',
                         {'Menu__Item--Closed': !isMenuOpened})}>
                    <SettingOutlined className={
                        classNames(
                            'Menu__Item-Logo',
                            {'Menu__Item-Logo-Opened': isMenuOpened}
                        )}/>
                    {
                        isMenuOpened &&
                        <span className={classNames(
                            'Menu__Item-Text', 'Menu__Item-Bottom-Text',
                        )}>Настройки</span>
                    }
                </div>
                <div
                     className={classNames('Menu__Item',
                         {'Menu__Item--Closed': !isMenuOpened})}>
                    <LogoutOutlined className={
                        classNames(
                            'Menu__Item-Logo',
                            {'Menu__Item-Logo-Opened': isMenuOpened},
                        )}/>
                    {
                        isMenuOpened &&
                        <span className={classNames(
                            'Menu__Item-Text', 'Menu__Item-Bottom-Text'
                        )}>Выйти</span>
                    }
                </div>
            </div>
        </div>
    );
}

export default Menu;
