import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {Dialog} from "primereact/dialog";
import {Button} from "primereact/button";
import {useActions} from "../../../Store/useActions";
import './EditChannel.css';
import EditForm from "./EditForm";

function EditChannel(props) {

    const {isEditingChannel, selectedChannel, loadedSelectedChannel, editingMode} = useSelector(state => state.channels);
    const {setEditChannel, setEditingMode} = useActions();
    const [editingChannel, setEditingChannel] = useState(null);


    useEffect(()=>{
        if(editingMode && selectedChannel && selectedChannel._id && isEditingChannel){
            setEditingChannel({...loadedSelectedChannel});
        }
    }, [editingMode])


    return (
        <Dialog header="Изменение канала связи" className='EditChannel__Container' draggable={false}
                visible={Boolean(isEditingChannel && selectedChannel && selectedChannel._id && loadedSelectedChannel)}
                onHide={() => setEditChannel(false)}
        >
            <div className="EditChannel__InnerContainer">
                {
                    isEditingChannel && selectedChannel && selectedChannel._id && loadedSelectedChannel && !editingMode &&
                    <div className="EditChannel__Mode-Container">
                        <Button label="Изменить текущий СУЗ" className="EditChannel__Mode-Btn"
                                icon="pi pi-pencil" onClick={()=>setEditingMode('editChannel')} />
                        <Button label="Создать новый СУЗ" className="EditChannel__Mode-Btn"
                                icon="pi pi-plus-circle" onClick={()=>setEditingMode('newChannel')}/>
                    </div>
                }
                {
                    isEditingChannel && editingChannel && selectedChannel && selectedChannel._id && loadedSelectedChannel && editingMode &&
                    <EditForm editingChannel={editingChannel}/>
                }
            </div>
        </Dialog>
    );
}

export default EditChannel;
