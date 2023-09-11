import React from 'react';
import './ChannelInfo.css';
import {Sidebar} from "primereact/sidebar";

function ChannelInfo({channelInfoVisible, closeChannelInfo}) {

    return (
        <Sidebar visible={channelInfoVisible} position="right" onHide={() => closeChannelInfo(false)}>
            <h2>Left Sidebar</h2>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat.
            </p>
        </Sidebar>
    );
}

export default ChannelInfo;