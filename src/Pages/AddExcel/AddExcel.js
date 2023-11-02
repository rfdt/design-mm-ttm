import React, {useState} from 'react';
import _InnerPage from "../_InnerPage/_InnerPage";
import './AddExcel.css';
import {FileUpload} from "primereact/fileupload";
import {useActions} from "../../Store/useActions";
import PageLoader from "../../Modules/PageLoader/PageLoader";

function AddExcel(props) {

    const {createChannelsFromFile} = useActions();
    const [isUploading, setIsUploading] = useState(false);
    const [messages, setMessages] = useState([]);
    const [success, setSuccess] = useState(false);

    const uploadHandler = ({files}) => {
        setIsUploading(true);
        setSuccess(false);
        createChannelsFromFile(files[0])
            .then(messages=> {
                setIsUploading(false);
                if(messages.length === 0){
                    return setSuccess(true)
                }
                setMessages(messages);
            })
            .catch(()=>setIsUploading(false))
    }

    const MessageContent = ({message}) => {
       return (
           <div className='AddExcel__Message-Container'>
                <div className="AddExcel__Message-Icon">
                    <i className="pi pi-exclamation-circle" style={{fontSize: "28px"}}></i>
                </div>
               <div className="AddExcel__Message-Content">
                   {message}
               </div>
           </div>
       )
    }

    return (
        <_InnerPage>
            <div className="AddExcelPage__Container">
                <div className="AddExcelPage__Header">
                    <div className="AddExcelPage__Title-Block">
                        <div className="AddExcelPage__Title">
                            Массовое создание
                        </div>
                        <div className="AddExcelPage__SubTitle">
                            Добавление каналов связи из Excel
                        </div>
                    </div>
                    <div className="AddExcelPage_Btn-Block">
                        <FileUpload className="AddExcelPage_Upload-Btn" auto accept=".xlsx" mode="basic"
                                    chooseLabel='Выберите файл для загрузки'
                                    name="file[]" customUpload uploadHandler={uploadHandler}
                        />
                    </div>
                </div>
                <div className="AddExcelPage__Info">
                    {isUploading ? <PageLoader /> : null}
                    {!isUploading && messages && messages.length ? messages.map((message, idx)=>(
                            <MessageContent message={message} key={idx}/>
                    )) : null}
                    {!isUploading && success ? <div className='AddExcelPage__SuccessMsg'>Все каналы успешно добавлены!</div> : null}
                </div>
            </div>
        </_InnerPage>
    );
}

export default AddExcel;
