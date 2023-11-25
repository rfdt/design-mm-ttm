import React, {useState} from 'react';
import './Ticket.css';
import {Accordion, AccordionTab} from "primereact/accordion";
import {Avatar} from "primereact/avatar";
import {Button} from "primereact/button";
import {Editor} from "primereact/editor";
import {FileUpload} from "primereact/fileupload";
import {Tag} from "primereact/tag";
import {Dropdown} from "primereact/dropdown";
import _InnerPage from "../_InnerPage/_InnerPage";

function Ticket(props) {

    const [text, setText] = useState(null);
    const [commentType, setCommentType] = useState(null);

    console.log(text);

    const renderHeader = () => {
        return (
            <>
        <span className="ql-formats">
          <button className="ql-bold" aria-label="Bold"></button>
          <button className="ql-italic" aria-label="Italic"></button>
          <button className="ql-underline" aria-label="Underline"></button>
          <button
              type="button"
              className="ql-code-block"
              aria-label="Insert Code Block"
              data-pc-section="codeblock"
          ></button>
          <button
              type="button"
              className="ql-list"
              value="ordered"
              aria-label="Ordered List"
              data-pc-section="list"
          ></button>
        </span>
            </>
        );
    };

    const commentTypes = [{name: "Ход решения", code: "Ход решения"}];

    const header = renderHeader();

    const [files, setFiles] = useState([]);

    const selectFiles = (e) => {
        if (e.files[0]) {
            e.files[0]["id"] = new Date() + " " + e.files[0].name;
            setFiles([e.files[0], ...files]);
        }
    };

    const removeFile = (file_idx) => {
        setFiles(files.filter((_, idx) => idx !== file_idx));
    };

    const validationError = () => {
        // Кидать ошибку в систему а не console.log
        console.log("Ошибка валидации файла. Файл слишком большой!");
    };

    console.log(files);

    return (
        <_InnerPage>
            <div className='TicketPage__Container'>
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
                                    label="Пауза"
                                    severity="info"
                                    className="TroubleTicketAction__Button"
                                    size='small'
                                />
                                <Button
                                    label="Проверка клиентом"
                                    severity="help"
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
                <div className="TicketPage__Comments">
                    <div className="Comment__Container">
                        <div className="Comment__Header">
                            <div className="Comment__Author">Кушнир Артём Александрович</div>
                            <div className="Comment__Theme">
                                <Tag
                                    severity="info"
                                    value="Ход решения"
                                    className="Comment__Theme-Tag"
                                ></Tag>
                            </div>
                        </div>
                        <div
                            className="Comment__Text"
                            dangerouslySetInnerHTML={{__html: text}}
                        ></div>
                        {files.length > 0 ? (
                            <div className="Comment__Files">
                                {files.map((file) => (
                                    <CommentFile key={file.id} name={file.name}/>
                                ))}
                            </div>
                        ) : null}
                        <div className="Comment__Date">
                            Создано: <span>{new Date().toLocaleString()}</span>
                        </div>
                    </div>
                    <div className="AddComment__Container">
                        <div className="AddComment__Header">
                            <Dropdown
                                value={commentType}
                                onChange={(e) => setCommentType(e.value)}
                                options={commentTypes}
                                optionLabel="name"
                                placeholder="Выберите тип"
                            />
                            <Button label="Отправить" raised icon="pi pi-send" iconPos="right" size='small'/>
                        </div>
                        <Editor
                            value={text}
                            onTextChange={(e) => setText(e.htmlValue)}
                            headerTemplate={header}
                            // style={{ minHeight: "120px" }}
                        />
                        <div className="UploadFile__Container">
                            <FileUpload
                                mode="basic"
                                accept="*"
                                maxFileSize={1500000}
                                onSelect={selectFiles}
                                onValidationFail={validationError}
                                auto={true}
                                url={"http://192.168.10.1/file/preview"}
                                chooseOptions={{
                                    style: {
                                        height: "45px",
                                        width: "45px",
                                        justifyContent: "center",
                                        marginRight: "10px"
                                    },
                                    iconOnly: true,
                                    icon: "pi pi-paperclip"
                                }}
                            />
                            {files.map((file, idx) => (
                                <File
                                    key={file.id}
                                    name={file.name}
                                    idx={idx}
                                    remove={removeFile}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </_InnerPage>
    );
}

const CommentFile = ({name}) => {
    return (
        <div className="CommentFile__Container">
            <span className="pi pi-file CommentFile__Icon"></span>
            {name}
        </div>
    );
};

const File = ({name, idx, remove}) => {
    const removeFile = () => {
        remove(idx);
    };

    return (
        <>
            <div className={`AddComment-File__Container`} aria-label={name}>
                <i className="AddComment-File__Icon pi pi-file "></i>
                <i
                    className="pi pi-trash AddComment-File__Remove"
                    onClick={removeFile}
                ></i>
                <div className="AddComment-File__Info">
                    Файл: <span>{name}</span>
                </div>
            </div>
        </>
    );
};


export default Ticket;