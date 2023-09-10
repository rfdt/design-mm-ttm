import './App.css';
import MmLogo from './static/images/MM-LOGO.png';
import {
    HomeOutlined,
    IssuesCloseOutlined,
    LogoutOutlined,
    SettingOutlined, SlidersOutlined,
    UserOutlined
} from "@ant-design/icons";
import {Avatar, Badge, Input} from "antd";
import {useState} from "react";
import classNames from "classnames";
import Home from "./Pages/Home/Home";

const {Search} = Input;

function App() {
    const [selectedItem, setSelectedItem] = useState('home');

    return (
        <div className="App__Container">
            <div className="Menu__Container">
                <div className="Menu__Logo">
                    <div className="Menu__Logo-IMG">
                        <img src={MmLogo} alt=""/>
                    </div>
                    <div className="Menu__Logo-Title">
                        Миранда-Медиа
                    </div>
                </div>
                <div className="Menu__Items">
                    <div className={
                             classNames(
                                 'Menu__Item',
                                 {'Menu__Item--Active' : selectedItem === 'home'}
                             )}
                         onClick={()=>setSelectedItem('home')}>
                        <HomeOutlined className={
                            classNames(
                                'Menu__Item-Logo',
                                {'Menu__Item-Logo--Active' : selectedItem === 'home'}
                            )} />
                        <span className={classNames(
                            'Menu__Item-Text',
                            {'Menu__Item-Text--Active' : selectedItem === 'home'}
                        )}>Главная</span>
                    </div>
                    <div className={
                        classNames(
                            'Menu__Item',
                            {'Menu__Item--Active' : selectedItem === 'inventory'}
                        )} onClick={()=>setSelectedItem('inventory')}>
                        <SlidersOutlined className={
                            classNames(
                                'Menu__Item-Logo',
                                {'Menu__Item-Logo--Active' : selectedItem === 'inventory'}
                            )} />
                        <span className={classNames(
                            'Menu__Item-Text',
                            {'Menu__Item-Text--Active' : selectedItem === 'inventory'}
                        )}>Включения</span>
                    </div>
                    <div className={
                        classNames(
                            'Menu__Item',
                            {'Menu__Item--Active' : selectedItem === 'tickets'}
                        )} onClick={()=>setSelectedItem('tickets')}>
                        <IssuesCloseOutlined className={
                            classNames(
                                'Menu__Item-Logo',
                                {'Menu__Item-Logo--Active' : selectedItem === 'tickets'}
                            )} />
                        <span className={classNames(
                            'Menu__Item-Text',
                            {'Menu__Item-Text--Active' : selectedItem === 'tickets'}
                        )}>Тикеты</span>
                    </div>
                </div>
                <div className="Menu__Bottom">
                    <div className="Menu__Settings">
                        <SettingOutlined  className='Menu__Settings-Logo'/>
                        <span className='Menu__Settings-Text'>Настройки</span>
                    </div>
                    <div className="Menu__Logout">
                        <LogoutOutlined  className='Menu__Logout-Logo'/>
                        <span className='Menu__Logout-Text'>Выйти</span>
                    </div>
                </div>
            </div>
            <div className="Layout__Container">
                <div className="Header__Container">
                    <div className="Header__Search">
                        <Search placeholder="Начните что-то искать"
                                rootClassName='Header__Search-Input'
                                allowClear size={'large'} />
                    </div>
                    <div className="Header__User">
                        <div className="Header__User-Avatar">
                            <Badge dot status={'success'}>
                                <Avatar shape="square" icon={<UserOutlined />} size={46}/>
                            </Badge>
                        </div>
                        <div className="Header__User-Info">
                            <div className="Header__User-Data">
                                Федько Руслан
                            </div>
                            <div className="Header__User-Email">
                                ruslan-fedko@miranda-media.ru
                            </div>
                        </div>
                    </div>
                </div>
                <div className="Pages__Container">
                    <Home />
                </div>
            </div>
        </div>
    );
}

export default App;
