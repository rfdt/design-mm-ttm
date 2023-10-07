import * as Yup from "yup";
export const UserLoginValidationSchema = Yup.object().shape({
    login: Yup.string().required('Поле логин обязательно'),
    password: Yup.string().required('Поле пароль обязательно')
})

export const UserRegisterValidationSchema = Yup.object().shape({
    name: Yup.string().required('Поле ФИО обязательно'),
    login: Yup.string().required('Поле логин обязательно').min(5, "Минимум 5 символов"),
    password: Yup.string().required('Поле пароль обязательно').min(8, "Минимум 8 символов")
})
