import React from 'react';
import './TicketInfo.css';
import {Accordion, AccordionTab} from "primereact/accordion";
import {Button} from "primereact/button";
import {Avatar} from "primereact/avatar";

function TicketInfo({setActionType}) {

    //setActionType - функция, которая будет из редакса, для установки типа события.

    return (
        <div className="TicketPage__Info">
            <Accordion activeIndex={0}>
                <AccordionTab header="Trouble Ticket">
                    <div className="TroubleTicketInfo__Container">
                        <div className="TroubleTicketInfo__Client">
                            <div className="TroubleTicketInfo__Client-Title">
                                Номер заказа:
                            </div>
                            <div className="TroubleTicketInfo__Client-Info">СУЗ-53148</div>
                        </div>
                        <div className="TroubleTicketInfo__Client">
                            <div className="TroubleTicketInfo__Client-Title">Клиент:</div>
                            <div className="TroubleTicketInfo__Client-Info">
                                Проект ЕСПД Цифровая экономика
                            </div>
                        </div>
                        <div className="TroubleTicketInfo__Client">
                            <div className="TroubleTicketInfo__Client-Title">
                                Контакт клиента:
                            </div>
                            <div className="TroubleTicketInfo__Client-Info">
                                Андрей +79785551042
                            </div>
                        </div>
                        <div className="TroubleTicketInfo__Client">
                            <div className="TroubleTicketInfo__Client-Title">Адрес:</div>
                            <div className="TroubleTicketInfo__Client-Info">
                                Симферополь г. Лермонтова ул. 12
                            </div>
                        </div>
                        <div className="TroubleTicketInfo__Incident">
                            <div className="TroubleTicketInfo__Incident-Number">
                                <div className="TroubleTicketInfo__Incident-Title">Услуга:</div>
                                <div className="TroubleTicketInfo__Incident-Info">VPLS</div>
                            </div>
                            <div className="TroubleTicketInfo__Incident-Date">
                                <div className="TroubleTicketInfo__Incident-Title">
                                    Неисправность:
                                </div>
                                <div className="TroubleTicketInfo__Incident-Info">
                                    Деградация Услуги
                                </div>
                            </div>
                        </div>
                        <div className="TroubleTicketInfo__Incident">
                            <div className="TroubleTicketInfo__Incident-Number">
                                <div className="TroubleTicketInfo__Incident-Title">
                                    Номер ТТ:
                                </div>
                                <div className="TroubleTicketInfo__Incident-Info">12341</div>
                            </div>
                            <div className="TroubleTicketInfo__Incident-Date">
                                <div className="TroubleTicketInfo__Incident-Title">
                                    Дата открытия ТТ:
                                </div>
                                <div className="TroubleTicketInfo__Incident-Info">
                                    {new Date().toLocaleString()}
                                </div>
                            </div>
                        </div>
                        <div className="TroubleTicketInfo__Client">
                            <div className="TroubleTicketInfo__Client-Title">Статус ТТ:</div>
                            <div className="TroubleTicketInfo__Client-Info TroubleTicketInfo__TT-Status">
                                В работе
                            </div>
                        </div>
                    </div>
                </AccordionTab>
                <AccordionTab header="Техническая информация"></AccordionTab>
                <AccordionTab header="События">
                    <div className="TroubleTicketAction__Container">
                        <Button
                            label="Передать на выезд"
                            className="TroubleTicketAction__Button"
                            size='small'
                            onClick={()=>setActionType('departure')}
                        />
                        <Button
                            label="Передать подразделению"
                            className="TroubleTicketAction__Button"
                            size='small'
                            onClick={()=>setActionType('subdivision')}
                        />
                        <Button
                            label="Передать ОПМ"
                            className="TroubleTicketAction__Button"
                            size='small'
                        />
                        <Button
                            label="Пауза"
                            severity="info"
                            className="TroubleTicketAction__Button"
                            size='small'
                        />
                        <Button
                            label="Закрыть ТТ"
                            severity="warning"
                            className="TroubleTicketAction__Button"
                            size='small'
                        />
                    </div>
                </AccordionTab>
                <AccordionTab header="Ответственные">
                    <div className="Performers__Container">
                        <div className="Performer__Container">
                            <Avatar label="А" size="normal" className="Performer__Avatar"/>
                            <div className="Performer__Name">Вайсфельд Андрей Андреевич</div>
                        </div>
                        <div className="Performer__Container">
                            <Avatar label="Р" size="normal" className="Performer__Avatar"/>
                            <div className="Performer__Name">Федько Руслан Диляверович</div>
                        </div>
                    </div>
                </AccordionTab>
            </Accordion>
        </div>
    );
}

export default TicketInfo;