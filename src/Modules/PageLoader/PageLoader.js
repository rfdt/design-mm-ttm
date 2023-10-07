import React from 'react';
import {ProgressSpinner} from "primereact/progressspinner";
import './PageLoader.css';

function PageLoader(props) {
 return (
    <div className='InnerPage__Loader'>
        <ProgressSpinner className='InnerPage__Loader'/>
    </div>
 );}

export default PageLoader;
