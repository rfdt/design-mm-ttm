import './App.css';
import Channels from "./Pages/Channels/Channels";
import Home from "./Pages/Home/Home";
import Menu from "./Modules/Menu/Menu";
import Header from "./Modules/Header/Header";
import ErrorToast from "./Modules/ErrorToast/ErrorToast";
import {Routes, Route} from "react-router-dom";
import Login from "./Pages/Login/Login";

function App() {

    return (
        <div className="App__Container">
            <Menu/>
            <div className="Layout__Container">
                <Header/>
                <div className="Pages__Container">
                    <Routes>
                        <Route path='/' element={<Home />}/>
                        <Route path='/channels' element={<Channels />}/>
                        <Route path='/login' element={<Login />}/>
                    </Routes>
                </div>
            </div>
            <ErrorToast/>
        </div>
    );
}

export default App;
