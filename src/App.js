import './App.css';
import Channels from "./Pages/Channels/Channels";
import Home from "./Pages/Home/Home";
import Menu from "./Modules/Menu/Menu";
import Header from "./Modules/Header/Header";
import ErrorToast from "./Modules/ErrorToast/ErrorToast";
import {Routes, Route} from "react-router-dom";
import Login from "./Pages/Login/Login";
import {useActions} from "./Store/useActions";
import React, {useEffect} from "react";
import PrivateRoute from "./Modules/PrivateRoute/PrivateRoute";
import UnknownPage from "./Modules/UnknownPage/UnknownPage";
import Register from "./Pages/Register/Register";
import {useSelector} from "react-redux";
import classNames from "classnames";
import MenuSettings from "./Modules/Menu/MenuSettings/MenuSettings";
import {useLocale} from "./Modules/Hooks/useLocale";
import {useTheme} from "./Modules/Hooks/useTheme";
import Hardware from "./Pages/Hardware/Hardware";

function App() {

    const {appTheme} = useSelector(state => state.global)
    const {loadUser} = useActions();

    useTheme();

    useLocale();

    useEffect(() => {
        loadUser()
    }, [])

    return (
        <div className={classNames("App__Container", {"App__Container--Dark": appTheme === 'dark'})}>
            <Menu/>
            <div className="Layout__Container">
                <Header/>
                <div className="Pages__Container">
                    <Routes>
                        <Route path='/' element={
                            <PrivateRoute>
                                <Home/>
                            </PrivateRoute>
                        }/>
                        <Route path='/channels' element={
                            <PrivateRoute>
                                <Channels/>
                            </PrivateRoute>
                        }/>
                        <Route path='/hardware' element={
                            <PrivateRoute>
                               <Hardware />
                            </PrivateRoute>
                        }/>
                        <Route path='/login' element={<Login/>}/>
                        <Route path='/register' element={<Register/>}/>
                        <Route path='*' element={<UnknownPage />} />
                    </Routes>
                </div>
            </div>
            <ErrorToast/>
            <MenuSettings />
        </div>
    );
}

export default App;
