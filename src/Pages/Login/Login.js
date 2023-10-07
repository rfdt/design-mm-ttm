import React from 'react';
import _InnerPage from "../_InnerPage/_InnerPage";
import {InputText} from "primereact/inputtext";
import {Password} from "primereact/password"
import {Button} from "primereact/button"
import './Login.css';
import {useFormik} from "formik";
import {UserLoginValidationSchema} from "../../Modules/validationSchemas";
import classNames from "classnames";
import {useActions} from "../../Store/useActions";
import {useSelector} from "react-redux";
import {Navigate, useNavigate} from "react-router-dom";
import PageLoader from "../../Modules/PageLoader/PageLoader";
import AuthPoster from "../../Modules/AuthPoster/AuthPoster";

function Login(props) {

    const {loginUser} = useActions();
    const {isAuthenticated, isLoaded, isLoading} = useSelector(state => state.user);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            login: '',
            password: ''
        },
        validationSchema: UserLoginValidationSchema,
        onSubmit: ({login, password}) => {
            loginUser({login, password})
        }
    });

    const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name) => {
        return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
    };

    if(isLoading || !isLoaded){
        return <PageLoader />
    }

    if(isAuthenticated && isLoaded){
        return <Navigate to={'/'}/>
    }

    return (
        <_InnerPage>
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
                    <form className="LoginPage__Login-Module-Form" onSubmit={formik.handleSubmit}>
                        <div className="p-inputgroup LoginPage__Login-Module-Form-Input">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-user"></i>
                            </span>
                            <InputText placeholder="Имя пользователя"
                                       id="login"
                                       name="login"
                                       value={formik.values.login}
                                       onChange={(e)=>formik.setFieldValue('login', e.target.value)}
                                       className={classNames({ 'p-invalid': isFormFieldInvalid('login') })}/>
                        </div>
                        {getFormErrorMessage('login')}
                        <div className="p-inputgroup LoginPage__Login-Module-Form-Input">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-key"></i>
                            </span>
                            <Password feedback={false} toggleMask placeholder="Пароль"
                                      id="password"
                                      name="password"
                                      value={formik.values.password}
                                      onChange={(e)=>formik.setFieldValue('password', e.target.value)}
                                      className={classNames({ 'p-invalid': isFormFieldInvalid('password') })}/>
                        </div>
                        {getFormErrorMessage('password')}
                        <Button label="Авторизоваться" icon="pi pi-sign-in" type="submit" className="LoginPage__Login-Module-Form-Submit"/>
                        <div className="LoginPage__Login-Module-Form-Forgot">
                            Забыли пароль? <span>Восстановить</span>
                        </div>
                    </form>
                    <div className="LoginPage__Login-Module-Bottom">
                            Еще нет аккаунта?&nbsp;<span onClick={()=>navigate('/register')}>Создать</span>
                    </div>
                </div>
            </div>
            <div className="LoginPage__Right-Side">
                <AuthPoster/>
            </div>
        </div>
    </_InnerPage>
    );
}

export default Login;
