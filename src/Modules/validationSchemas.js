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
    _id: Yup.string(),
    id_tbcd: Yup.string().required('Поле обязательно'),
    id_suz: Yup.string().required('Поле обязательно'),
    id_oss: Yup.string().required('Поле обязательно'),
    id_cms: Yup.string().required('Поле обязательно'),
    client: Yup.string().required('Поле обязательно'),
    service: Yup.string().required('Поле обязательно'),
    service_size: Yup.number().required('Поле обязательно').min(1),
    city: Yup.string().required('Поле обязательно'),
    street: Yup.string().required('Поле обязательно'),
    home: Yup.string().required('Поле обязательно'),
    add_info: Yup.string().required('Поле обязательно'),
    contact: Yup.string().required('Поле обязательно'),
    status: Yup.string().required('Поле обязательно'),
    date: Yup.string().required('Поле обязательно'),
    note: Yup.string().required('Поле обязательно'),
    rd_sr: Yup.string().required('Поле обязательно'),
    channel_pe: Yup.object().shape({title: Yup.string().required()}),
    channel_pe_port: Yup.string().required('Поле обязательно'),
    channel_vid: Yup.string().required('Поле обязательно'),


    channel_agg_stop: Yup.array().of(Yup.object().shape({
        agg_stop:  Yup.object().shape({title: Yup.string().required('Поле agg_stop обязательно')}),
        agg_port: Yup.string().required('Поле обязательно'),
        withStop: Yup.boolean()
    })).min(1),

    channel_acc_stop: Yup.array().of(Yup.object().shape({
        acc_stop:   Yup.string().required('Поле aсс_stop обязательно'),
        acc_port: Yup.string().required('Поле обязательно'),
        acc_ip_mng: Yup.string().required('Поле обязательно'),
        acc_model:Yup.string().required('Поле обязательно'),
        acc_sn: Yup.string().required('Поле обязательно'),
        acc_mac: Yup.string().required('Поле обязательно'),
        withStop: Yup.string().required('Поле обязательно')
    })).min(1),


    zabbix: Yup.string().required('Поле обязательно'),
    zabbix_avail: Yup.string().required('Поле обязательно'),
    channel_region: Yup.string().required('Поле обязательно'),
})

export const AddOrEditHardwareValidationSchema = Yup.object().shape({
    _id: Yup.string(),
    title: Yup.string().required(),
    uplink: Yup.string().required(),
    uplink_type: Yup.object().required(),
    hardware_type: Yup.object().required()
})
