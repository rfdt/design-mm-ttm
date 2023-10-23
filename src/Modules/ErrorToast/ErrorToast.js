import React, {useEffect, useRef} from 'react';
import {Toast} from "primereact/toast";
import {transformAxiosError} from "../transformAxiosError";
import {useSelector} from "react-redux";
import {useActions} from "../../Store/useActions";

function ErrorToast(props) {

    const toastRef = useRef(null);
    const {isErrored, errorObj, errorMessage} = useSelector(state => state.errors);
    const {clearError} = useActions();

    const showError = (error) => {
        toastRef.current.show({
            severity: 'error',
            summary: "Ошибка загрузки",
            detail: errorMessage ? errorMessage : transformAxiosError(error),
            life: 3000
        })
    }

    useEffect(()=>{
        if(isErrored && (errorObj || errorMessage)){
            showError(errorObj)
        }
    }, [isErrored, errorObj, errorMessage])

    return (
        <Toast ref={toastRef} position="top-right" onHide={()=>clearError()}/>
    );
}

export default ErrorToast;
