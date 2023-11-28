import React, {Suspense} from 'react';
import {Dialog} from "primereact/dialog";
import './TicketAction.css';
import PageLoader from "../../../Modules/PageLoader/PageLoader";

const TicketDeparture = React.lazy(() => import('./Actions/TicketDeparture'));

function TicketAction({visible, close, actionType}) {
    // Close - функция, которая заркывает окно(По факту меняет статус текущего события на null)
    // visible - проп, который проверяет actionType !== null. Action type - параметр текущего события (Будет в редакс сторе).
    // ActionType - будет терминироваться в редаксе в отдельном редьюсере

    return (
        <Dialog header="Событие TT" visible={visible} onHide={close} draggable={false} className={'Action__Container'}>
            <div className="Action__Container">
                {actionType === 'departure' &&
                    <Suspense fallback={<PageLoader/>}>
                        <TicketDeparture/>
                    </Suspense>
                }
            </div>
        </Dialog>
    );
}

export default TicketAction;