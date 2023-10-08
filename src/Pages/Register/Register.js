import React from 'react';
import './Register.css';
import AuthPoster from "../../Modules/AuthPoster/AuthPoster";
import {InputText} from "primereact/inputtext";
import classNames from "classnames";
import {Password} from "primereact/password";
import {Button} from "primereact/button";
import {useFormik} from "formik";
import {UserRegisterValidationSchema} from "../../Modules/validationSchemas";
import {useActions} from "../../Store/useActions";
import {useSelector} from "react-redux";
import {Navigate, useNavigate} from "react-router-dom";
import PageLoader from "../../Modules/PageLoader/PageLoader";

function Register(props) {

    const {registerUser} = useActions();
    const {isAuthenticated, isLoaded, isLoading} = useSelector(state => state.user);
    const {appTheme} = useSelector(state => state.global)
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            login: '',
            password: '',
            name: ''
        },
        validationSchema: UserRegisterValidationSchema,
        onSubmit: ({login, password, name}) => {
            registerUser({login, password, name, role: "USER"})
        }
    });

    if(isLoading || !isLoaded){
        return <PageLoader />
    }

    if(isAuthenticated && isLoaded){
        return <Navigate to={'/'}/>
    }

    const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name) => {
        return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
    };

    return (
        <div className={classNames('RegisterPage__Container', {'RegisterPage__Container--Dark' : appTheme==='dark'})}>
            <div className="RegisterPage__LeftSide">
                <div className="RegisterPage__Register-Module">
                    <div className="RegisterPage__Register-Module-Header">
                        <div className="RegisterPage__Register-Module-Header-Title">
                            <p>Добро</p> <p>Пожаловать</p>
                        </div>
                        <div className="RegisterPage__Register-Module-Header-SubTitle">
                            Создание учетной записи
                        </div>
                    </div>
                    <form className="RegisterPage__Register-Module-Form" onSubmit={formik.handleSubmit}>
                        <div className="p-inputgroup RegisterPage__Register-Module-Form-Input">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-user"></i>
                            </span>
                            <InputText placeholder="Ваше ФИО"
                                       id="name"
                                       name="name"
                                       value={formik.values.name}
                                       onChange={(e) => formik.setFieldValue('name', e.target.value)}
                                       className={classNames({'p-invalid': isFormFieldInvalid('name')})}/>
                        </div>
                        {getFormErrorMessage('name')}
                        <div className="p-inputgroup RegisterPage__Register-Module-Form-Input">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-user"></i>
                            </span>
                            <InputText placeholder="Имя пользователя"
                                       id="login"
                                       name="login"
                                       value={formik.values.login}
                                       onChange={(e) => formik.setFieldValue('login', e.target.value)}
                                       className={classNames({'p-invalid': isFormFieldInvalid('login')})}/>
                        </div>
                        {getFormErrorMessage('login')}
                        <div className="p-inputgroup RegisterPage__Register-Module-Form-Input">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-key"></i>
                            </span>
                            <Password feedback={false} toggleMask placeholder="Пароль"
                                      id="password"
                                      name="password"
                                      value={formik.values.password}
                                      onChange={(e) => formik.setFieldValue('password', e.target.value)}
                                      className={classNames({'p-invalid': isFormFieldInvalid('password')})}/>
                        </div>
                        {getFormErrorMessage('password')}
                        <Button label="Регистрация" icon="pi pi-sign-in" type="submit"
                                className="RegisterPage__Register-Module-Form-Submit"/>
                    </form>
                    <div className="RegisterPage__Register-Module-Bottom">
                        Есть учетная запись?&nbsp;<span onClick={()=>navigate('/login')}>Войти</span>
                    </div>
                </div>
            </div>
            <div className="RegisterPage__RightSide">
                <AuthPoster/>
            </div>
        </div>
    );
}

export default Register;
