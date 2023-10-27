import React, {useEffect, useState} from 'react';
import {Dialog} from "primereact/dialog"
import AddChannelForm from "./AddChannelForm/AddChannelForm";
import './AddChannel.css';
import {useSelector} from "react-redux";
import {useActions} from "../../../Store/useActions";
import {useFormik} from "formik";
import {CreateChannelValidationSchema} from "../../../Modules/validationSchemas";
import NewChannelsDrafts from "./NewChannelsDrafts/NewChannelsDrafts";

function AddChannel({close, visible}) {

    const {channelsDrafts} = useSelector(state => state.channels)
    const {createChannel, saveOrUpdateDraft, removeDraftByIdx} = useActions();

    const [showAddForm, setShowAddForm] = useState(false);
    const [selectedIdx, setSelectedIdx] = useState(null);

    const formik = useFormik({
        initialValues: {
            id_tbcd: '',
            id_suz: '',
            id_oss: '',
            id_cms: '',
            client: '',
            service: '',
            service_size: null,
            city: '',
            street: '',
            home: '',
            add_info: '',
            contact: '',
            status: "РЕЗЕРВ",
            date: new Date(),
            note: "",
            rd_sr: "",
            channel_pe: null,
            channel_pe_port: "",
            channel_vid: "",
            zabbix: "",
            zabbix_avail: "",
            channel_region: 'crimea',
            channel_acc_stop: [{
                acc_stop: "",
                acc_port: "",
                acc_ip_mng: "",
                acc_model: "",
                acc_sn: "",
                acc_mac: "",
                withStop: false
            }],
            channel_agg_stop: [{agg_stop: '', agg_port: '', withStop: false}]
        },
        validationSchema: CreateChannelValidationSchema,
        onSubmit: async (data) => {
            const transformedObj = {
                ...data,
                channel_pe: data.channel_pe.title,
                channel_agg_stop: data.channel_agg_stop.map((agg_stop) => ({
                    ...agg_stop,
                    agg_stop: agg_stop.agg_stop.title
                })),
                service_size: data.service_size >= 1000 ? `${data.service_size / 1000}G` : `${data.service_size}M`
            }
            const response = await createChannel(transformedObj);
            if(selectedIdx !== null){
                removeDraftByIdx(selectedIdx)
            }
            if (response) {
                close();
                setShowAddForm(false);
            }
        }
    });

    useEffect(() => {
        if (visible && channelsDrafts && channelsDrafts.length === 0) {
            setShowAddForm(true)
        }
    }, [channelsDrafts, visible])

    const saveAndClose = () => {
        if (showAddForm) {
            if (formik.values.id_cms || formik.values.id_tbcd
                || formik.values.id_oss || formik.values.id_suz
                || formik.values.client || formik.values.channel_vid) {
                saveOrUpdateDraft(formik.values)
            }
            setShowAddForm(false);
        }
        close();
    }

    const setChannelDraft = (channelDraft, idx) => {
        formik.setValues({...channelDraft, date: new Date(channelDraft.date)})
        if(idx !== undefined && idx !== null){
            setSelectedIdx(idx)
        }
        setShowAddForm(true)
    }

    return (
        <Dialog header="Создание нового канала"
                className='AddChannel__Container'
                visible={visible} onHide={saveAndClose}
                draggable={false}
        >
            {showAddForm && <AddChannelForm close={close} formik={formik}/>}
            {!showAddForm && <NewChannelsDrafts setChannelDraft={setChannelDraft}/>}
        </Dialog>
    );
}

export default AddChannel;
