import {useEffect} from "react";
import {store} from "../../Store/store";

export const useTheme = () =>{

    const appTheme = store.getState().global.appTheme;

    useEffect(()=>{
        if(appTheme === 'dark'){
            import('primereact/resources/themes/lara-dark-indigo/theme.css')
        }else {
            import('primereact/resources/themes/lara-light-indigo/theme.css')
        }
    }, [appTheme])
}