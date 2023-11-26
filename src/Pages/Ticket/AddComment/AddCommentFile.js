import React from "react";

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

export default File