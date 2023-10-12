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

export const CreateChannelValidationSchema =  Yup.object().shape({
    id_tbcd: Yup.string().required('Поле обязательно'),
    id_suz: Yup.string().required('Поле обязательно'),
    id_oss: Yup.string().required('Поле обязательно'),
    id_cms: Yup.string().required('Поле обязательно'),
    client: Yup.string().required('Поле обязательно'),
    service: Yup.string().required('Поле обязательно'),
    service_size: Yup.string().required('Поле обязательно'),
    city: Yup.string().required('Поле обязательно'),
    street: Yup.string().required('Поле обязательно'),
    home: Yup.string().required('Поле обязательно'),
    add_info: Yup.string().required('Поле обязательно'),
    contact: Yup.string().required('Поле обязательно'),
    status: Yup.string().required('Поле обязательно'),
    date: Yup.string().required('Поле обязательно'),
    note: Yup.string().required('Поле обязательно'),
    rd_sr: Yup.string().required('Поле обязательно'),
    channel_pe: Yup.string().required('Поле обязательно'),
    channel_pe_port: Yup.string().required('Поле обязательно'),
    channel_vid: Yup.string().required('Поле обязательно'),
    channel_agg_stop: Yup.string().required('Поле обязательно'),
    channel_agg_port: Yup.string().required('Поле обязательно'),
    channel_acc_stop: Yup.string().required('Поле обязательно'),
    channel_ip_mng_acc: Yup.string().required('Поле обязательно'),
    channel_acc_port: Yup.string().required('Поле обязательно'),
    channel_acc_model: Yup.string().required('Поле обязательно'),
    channel_acc_sn: Yup.string().required('Поле обязательно'),
    channel_acc_mac: Yup.string().required('Поле обязательно'),
    zabbix: Yup.string().required('Поле обязательно'),
    zabbix_avail: Yup.string().required('Поле обязательно'),
    channel_region: Yup.string().required('Поле обязательно'),
})
