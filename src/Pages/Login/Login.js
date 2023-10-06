import React from 'react';
import _InnerPage from "../_InnerPage/_InnerPage";
import {InputText} from "primereact/inputtext";
import {Password} from "primereact/password"
import {Button} from "primereact/button"
import './Login.css';

function Login(props) {
    return (<_InnerPage>
        <div className="LoginPage__Container">
            <div className="LoginPage__Left-Side">
                <div className="LoginPage__Login-Module">
                    <div className="LoginPage__Login-Module-Header">
                        <div className="LoginPage__Login-Module-Header-Title">
                            <p>Добро</p> <p>Пожаловать</p>
                        </div>
                        <div className="LoginPage__Login-Module-Header-SubTitle">
                            Войдите для продолжения
                        </div>
                    </div>
                    <div className="LoginPage__Login-Module-Form">
                        <div className="p-inputgroup LoginPage__Login-Module-Form-Input">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-user"></i>
                            </span>
                            <InputText placeholder="Имя пользователя" />
                        </div>
                        <div className="p-inputgroup LoginPage__Login-Module-Form-Input">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-key"></i>
                            </span>
                            <Password feedback={false} toggleMask placeholder="Пароль"/>
                        </div>
                        <Button label="Авторизоваться" icon="pi pi-sign-in" type="submit" className="LoginPage__Login-Module-Form-Submit"/>
                        <div className="LoginPage__Login-Module-Form-Forgot">
                            Забыли пароль? <span>Восстановить</span>
                        </div>
                    </div>
                    <div className="LoginPage__Login-Module-Bottom">
                            Еще нет аккаунта?&nbsp;<span>Создать</span>
                    </div>
                </div>
            </div>
            <div className="LoginPage__Right-Side">

            </div>
        </div>
    </_InnerPage>);
}

export default Login;