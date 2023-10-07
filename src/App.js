import './App.css';
import Channels from "./Pages/Channels/Channels";
import Home from "./Pages/Home/Home";
import Menu from "./Modules/Menu/Menu";
import Header from "./Modules/Header/Header";
import ErrorToast from "./Modules/ErrorToast/ErrorToast";
import {Routes, Route} from "react-router-dom";
import Login from "./Pages/Login/Login";
import {useActions} from "./Store/useActions";
import {useEffect} from "react";
import PrivateRoute from "./Modules/PrivateRoute/PrivateRoute";
import UnknownPage from "./Modules/UnknownPage/UnknownPage";
import Register from "./Pages/Register/Register";

function App() {

    const {loadUser} = useActions();

    useEffect(() => {
        loadUser()
    }, [])

    return (
        <div className="App__Container">
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
                        <Route path='/login' element={<Login/>}/>
                        <Route path='/register' element={<Register/>}/>
                        <Route path='*' element={<UnknownPage />} />
                    </Routes>
                </div>
            </div>
            <ErrorToast/>
        </div>
    );
}

export default App;
