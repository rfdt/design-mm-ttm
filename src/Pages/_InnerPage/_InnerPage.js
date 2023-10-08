import React from 'react';
import './_InnerPage.css';
import {ScrollTop} from "primereact/scrolltop";
import classNames from "classnames"
import {useSelector} from "react-redux";

function _InnerPage({children}) {
    const {appTheme} = useSelector(state => state.global)
    return (
        <div className='InnerPage__Container'>
            <div className={classNames("InnerPage__ScrollBar InnerPage__ScrollBar--Style",
                {"InnerPage__ScrollBar--Dark-Style": appTheme === 'dark'})}>
                {children}
                <ScrollTop target="parent" threshold={100} />
            </div>
        </div>
    );
}

export default _InnerPage;
