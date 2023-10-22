import React, {lazy, Suspense, useEffect} from "react";
import {Routes, Route} from "react-router-dom";
import {useActions} from "./Store/useActions";
import classNames from "classnames";
import {useSelector} from "react-redux";
import {useLocale} from "./Modules/Hooks/useLocale";
import {useTheme} from "./Modules/Hooks/useTheme";
import './App.css';
import Menu from "./Modules/Menu/Menu";
import Header from "./Modules/Header/Header";
import ErrorToast from "./Modules/ErrorToast/ErrorToast";
import PrivateRoute from "./Modules/PrivateRoute/PrivateRoute";
import UnknownPage from "./Modules/UnknownPage/UnknownPage";
import MenuSettings from "./Modules/Menu/MenuSettings/MenuSettings";
import PageLoader from "./Modules/PageLoader/PageLoader";

/*LAZY LOAD PAGES */

const HomePage = lazy(() => import('./Pages/Home/Home'));
const ChannelsPage = lazy(() => import('./Pages/Channels/Channels'));
const HardwarePage = lazy(() => import('./Pages/Hardware/Hardware'));
const LoginPage = lazy(() => import('./Pages/Login/Login'));
const RegisterPage = lazy(() => import('./Pages/Register/Register'))


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
                            <Suspense fallback={<PageLoader/>}>
                                <PrivateRoute>
                                    <HomePage/>
                                </PrivateRoute>
                            </Suspense>
                        }/>
                        <Route path='/channels' element={
                            <Suspense fallback={<PageLoader/>}>
                                <PrivateRoute>
                                    <ChannelsPage/>
                                </PrivateRoute>
                            </Suspense>
                        }/>
                        <Route path='/hardware' element={
                            <Suspense fallback={<PageLoader/>}>
                                <PrivateRoute>
                                    <HardwarePage/>
                                </PrivateRoute>
                            </Suspense>
                        }/>
                        <Route path='/login' element={
                            <Suspense fallback={<PageLoader/>}>
                                <LoginPage/>
                            </Suspense>
                        }/>
                        <Route path='/register' element={
                            <Suspense fallback={<PageLoader/>}>
                                <RegisterPage/>
                            </Suspense>
                        }/>
                        <Route path='*' element={<UnknownPage/>}/>
                    </Routes>
                </div>
            </div>
            <ErrorToast/>
            <MenuSettings/>
        </div>
    );
}

export default App;
