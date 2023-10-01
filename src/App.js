import './App.css';
import Channels from "./Pages/Channels/Channels";
import Menu from "./Modules/Menu/Menu";
import Header from "./Modules/Header/Header";



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
        </div>
    );
}

export default App;
