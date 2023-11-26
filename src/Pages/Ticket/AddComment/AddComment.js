import React, {useState} from 'react';
import {Dropdown} from "primereact/dropdown";
import {Button} from "primereact/button";
import {Editor} from "primereact/editor";
import {FileUpload} from "primereact/fileupload";
import File from './AddCommentFile';
import './AddComment.css'

function AddComment({files, setFiles, text, setText}) {
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
    const header = renderHeader();

    const [commentType, setCommentType] = useState(null);
    const commentTypes = [{name: "Ход решения", code: "Ход решения"}];

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

    return (
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
    );
}

export default AddComment;