import React from 'react';
import './Header.css';
import {useSelector} from "react-redux";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import classNames from "classnames"
import MobileMenu from "../MobileMenu/MobileMenu";
import {Avatar} from "primereact/avatar";
import {Badge} from "primereact/badge";

function Header() {

    const {appTheme} = useSelector(state => state.global)
    const {isAuthenticated, user} = useSelector(state => state.user)

    return (
        <div className={classNames("Header__Container", {"Header__Container--Dark": appTheme === 'dark'})}>
            <div className="Header__Search">
                <div className="p-inputgroup flex-1">
                    <InputText placeholder="Поиск" />
                    <Button icon="pi pi-search" className="p-button-primary" />
                </div>
            </div>
            <div className="Header__User">
                {isAuthenticated &&
                    <>
                        <div className="Header__User-Avatar">
                            {/*<Badge dot status={'success'}>*/}
                            {/*    <Avatar shape="square" icon={<UserOutlined/>} size={46}/>*/}
                            {/*</Badge>*/}
                            <Avatar className="p-overlay-badge" icon="pi pi-user" size="large">
                                <Badge size="normal" severity="success"/>
                            </Avatar>
                        </div>
                        <div className="Header__User-Info">
                            <div className="Header__User-Data">
                                {user.name.split(' ').slice(0,2).reverse().join(' ')}
                            </div>
                            <div className="Header__User-Email">
                                {user.login}@miranda-media.ru
                            </div>
                        </div>
                    </>}
            </div>
            <MobileMenu />
        </div>
    );
}

export default Header;
