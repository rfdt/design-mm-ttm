import React from 'react';
import {Avatar, Badge, Input} from "antd";
import {LeftCircleOutlined, LeftSquareOutlined, UserOutlined} from "@ant-design/icons";
import './Header.css';

const {Search} = Input;

function Header(props) {
    return (
        <div className="Header__Container">
            <div className="Header__Search">
                <Search placeholder="Начните что-то искать"
                        rootClassName='Header__Search-Input'
                        allowClear size={'large'}/>
            </div>
            <div className="Header__User">
                <div className="Header__User-Avatar">
                    <Badge dot status={'success'}>
                        <Avatar shape="square" icon={<UserOutlined/>} size={46}/>
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
            <LeftCircleOutlined  className="Header__Mobile-Menu-Btn"/>
        </div>
    );
}

export default Header;