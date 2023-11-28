import React, {useState} from 'react';
import _InnerPage from "../_InnerPage/_InnerPage";
import TicketInfo from "./TicketInfo/TicketInfo";
import TicketComment from "./TicketComment/TicketComment";
import AddComment from "./AddComment/AddComment";
import TicketAction from "./TicketAction/TicketAction";
import './Ticket.css';

function Ticket(props) {
    const [text, setText] = useState(null);
    const [files, setFiles] = useState([]);

    const [actionType, setActionType] = useState(null); // TODO Тот проп который будет в редакс(текущее событие)

    return (
        <_InnerPage>
            <div className='TicketPage__Container'>
                <TicketInfo setActionType={setActionType}/>
                <div className="TicketPage__Comments">
                    {/*Вот тут map по комментам из тикета*/}
                    <TicketComment files={files} text={text}/>
                    <AddComment files={files} text={text} setFiles={setFiles} setText={setText}/>
                    <TicketAction visible={actionType !== null} close={()=>setActionType(null)} actionType={actionType}/>
                </div>
            </div>
        </_InnerPage>
    );
}

export default Ticket;