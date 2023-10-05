import './App.css';
import Channels from "./Pages/Channels/Channels";
import Menu from "./Modules/Menu/Menu";
import Header from "./Modules/Header/Header";
import ErrorToast from "./Modules/ErrorToast/ErrorToast";

function App() {

    return (
        <div className="App__Container">
            <Menu />
            <div className="Layout__Container">
                <Header />
                <div className="Pages__Container">
                    {/*<Home /> HOME PAGE LAYOUT*/}
                    <Channels/>
                </div>
            </div>
            <ErrorToast />
        </div>
    );
}

export default App;
