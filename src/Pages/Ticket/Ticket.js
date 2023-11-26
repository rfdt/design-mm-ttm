import React, {useState} from 'react';
import _InnerPage from "../_InnerPage/_InnerPage";
import TicketInfo from "./TicketInfo/TicketInfo";
import TicketComment from "./TicketComment/TicketComment";
import AddComment from "./AddComment/AddComment";
import './Ticket.css';

function Ticket(props) {
    const [text, setText] = useState(null);
    const [files, setFiles] = useState([]);

    return (
        <_InnerPage>
            <div className='TicketPage__Container'>
                <TicketInfo />
                <div className="TicketPage__Comments">
                    {/*Вот тут map по комментам из тикета*/}
                    <TicketComment files={files} text={text}/>
                    <AddComment files={files} text={text} setFiles={setFiles} setText={setText}/>
                </div>
            </div>
        </_InnerPage>
    );
};

export default Ticket;