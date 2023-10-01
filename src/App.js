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
import Channels from "./Pages/Channels/Channels";
import Menu from "./Modules/Menu/Menu";

const {Search} = Input;

function App() {

    return (
        <div className="App__Container">
            <Menu />
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
                    {/*<Home /> HOME PAGE LAYOUT*/}
                    <Channels/>
                </div>
            </div>
        </div>
    );
}

export default App;
