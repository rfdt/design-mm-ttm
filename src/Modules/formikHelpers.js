import React from "react";

export const isFormFieldInvalid = (name, formik) => !!(formik.touched[name] && formik.errors[name]);

export const getFormErrorMessage = (name, formik) => {
    return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]}</small> :
        <small className="p-error">&nbsp;</small>;
};
