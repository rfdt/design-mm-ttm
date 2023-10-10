import React, {useState} from 'react';
import "./MobileMenu.css";
import {
    HomeOutlined,
    IssuesCloseOutlined,
    LeftOutlined, LoginOutlined, LogoutOutlined,
    SettingOutlined,
    SlidersOutlined,
} from "@ant-design/icons";
import {Sidebar} from "primereact/sidebar";
import {useActions} from "../../Store/useActions";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

function MobileMenu(props) {

    const {isAuthenticated} = useSelector(state => state.user)
    const {toggleSettingsVisible, logoutUser} = useActions();
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const navigate = useNavigate();
    const menuClick = (functionClick) => {
        functionClick()
        setIsMenuVisible(false)
    }

    const navigateTo = (path) => {
        navigate(path);
        setIsMenuVisible(false)
    }

    // TODO сделать мобильное меню
    return (
        <>
            <LeftOutlined className="Header__Mobile-Menu-Btn" onClick={() => setIsMenuVisible(true)}/>
            <Sidebar
                showCloseIcon={false}
                header={null}
                className='Header__Mobile-Menu-Container' visible={isMenuVisible} position="bottom"
                onHide={() => setIsMenuVisible(false)}>
                <div className="Header__Mobile-Menu-Inner">
                    <div className="Mobile-Menu-Items">
                        <div className="Mobile-Menu-Item" onClick={() => navigateTo('/')}>
                            <HomeOutlined className="Mobile-Menu-Item-Icon"/>
                            <div className="Mobile-Menu-Item-Text">
                                Главная
                            </div>
                        </div>
                        <div className="Mobile-Menu-Item" onClick={() => navigateTo('/channels')}>
                            <SlidersOutlined className="Mobile-Menu-Item-Icon"/>
                            <div className="Mobile-Menu-Item-Text">
                                Включения
                            </div>
                        </div>
                        <div className="Mobile-Menu-Item" onClick={() => navigateTo('/tickets')}>
                            <IssuesCloseOutlined className="Mobile-Menu-Item-Icon"/>
                            <div className="Mobile-Menu-Item-Text">
                                Тикеты
                            </div>
                        </div>
                    </div>
                    <div className="Mobile-Menu-Items">
                        <div className="Mobile-Menu-Item" onClick={toggleSettingsVisible}>
                            <SettingOutlined className="Mobile-Menu-Item-Icon"/>
                            <div className="Mobile-Menu-Item-Text">
                                Настройки
                            </div>
                        </div>
                        {
                            isAuthenticated ?
                                <div className="Mobile-Menu-Item Mobile-Menu-Item-Last"
                                     onClick={() => menuClick(logoutUser)}>
                                    <LogoutOutlined className="Mobile-Menu-Item-Icon"/>
                                    <div className="Mobile-Menu-Item-Text">
                                        Выйти
                                    </div>
                                </div>
                                :
                                <div className="Mobile-Menu-Item Mobile-Menu-Item-Last"
                                     onClick={() => navigateTo('/login')}>
                                    <LoginOutlined className="Mobile-Menu-Item-Icon"/>
                                    <div className="Mobile-Menu-Item-Text">
                                        Войти
                                    </div>
                                </div>
                        }
                    </div>
                </div>
            </Sidebar>
        </>
    );
}

export default MobileMenu;
