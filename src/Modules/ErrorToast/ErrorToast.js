import React, {useEffect, useRef} from 'react';
import {Toast} from "primereact/toast";
import {transformAxiosError} from "../transformAxiosError";
import {useSelector} from "react-redux";

function ErrorToast(props) {

    const toastRef = useRef(null);
    const {isErrored, errorObj} = useSelector(state => state.errors)

    const showError = (error) => {
        toastRef.current.show({
            severity: 'error',
            summary: "Ошибка загрузки",
            detail: transformAxiosError(error),
            life: 3000
        })
    }

    useEffect(()=>{
        if(isErrored && errorObj){
            showError(errorObj)
        }
    }, [isErrored, errorObj])

    return (
        <Toast ref={toastRef} position="top-right"/>
    );
}

export default ErrorToast;