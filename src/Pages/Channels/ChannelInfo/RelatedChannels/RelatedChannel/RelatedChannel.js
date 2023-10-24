import React from 'react';
import {Avatar} from "primereact/avatar";
import './RelatedChannel.css';

function RelatedChannel({channel}) {
 return (
     <div className="RelatedChannel__Container">
         <Avatar icon="pi pi-link" size="large"/>
         <div className="RelatedChannel__Body">
             <div className="RelatedChannel__Client">
                 {channel.client}
             </div>
             <div className="RelatedChannel__Id">
                 {new Date(channel.date).toLocaleDateString().split('.').reverse().join('-')} | {channel.id_suz} | {channel.id_cms} | {channel.id_tbcd} | {channel.id_oss}
             </div>
         </div>
     </div>
 );}

export default RelatedChannel;
