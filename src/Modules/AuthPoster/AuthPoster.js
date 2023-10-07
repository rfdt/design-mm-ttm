import React from 'react';
import './AuthPoster.css';
import MM_Logo_Encircle from '../../static/images/MM-LOGO-ENCIRCLE.png';
import {ReactComponent as DataSVG} from '../../static/svg/data.svg'
import {ReactComponent as EthernetSVG} from '../../static/svg/ethernet.svg'
import {ReactComponent as RouterOptionsSVG} from '../../static/svg/router_options.svg'
import {ReactComponent as ServerSVG} from '../../static/svg/server.svg';
import {ReactComponent as SwitchSVG} from '../../static/svg/switch.svg';
import {ReactComponent as ChannelsSVG} from "../../static/svg/channels.svg";
import {ReactComponent as ConnectionSVG} from  "../../static/svg/connection.svg";
import {ReactComponent as GraphSVG} from  "../../static/svg/graph.svg";

function AuthPoster(props) {
 return (
     <div className="AuthPage__Poster">
         <div className="AuthPage__Poster-Logo">
             <img src={MM_Logo_Encircle} alt="" className='AuthPage__Poster-Logo-IMG'/>
             <div className="AuthPage__Poster-Title">
                 Миранда-медиа
             </div>
             <div className="AuthPage__Poster-SubTitle">
                 Крымский оператор связи
             </div>
         </div>
         <DataSVG className='AuthPage__Poster-Image-1'/>
         <EthernetSVG className='AuthPage__Poster-Image-2' />
         <RouterOptionsSVG className='AuthPage__Poster-Image-3' />
         <ServerSVG className='AuthPage__Poster-Image-4'/>
         <SwitchSVG className='AuthPage__Poster-Image-5'/>
         <ChannelsSVG className='AuthPage__Poster-Image-6' />
         <ConnectionSVG className='AuthPage__Poster-Image-7' />
         <GraphSVG className='AuthPage__Poster-Image-8'/>
     </div>
 );}

export default AuthPoster;
