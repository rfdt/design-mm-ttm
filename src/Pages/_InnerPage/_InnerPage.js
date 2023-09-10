import React from 'react';
import './_InnerPage.css';
import {ScrollTop} from "primereact/scrolltop";

function _InnerPage({children}) {
    return (
        <div className='InnerPage__Container'>
            <div className="InnerPage__ScrollBar InnerPage__ScrollBar--Style">
                {children}
                <ScrollTop target="parent" threshold={100} />
            </div>
        </div>
    );
}

export default _InnerPage;
