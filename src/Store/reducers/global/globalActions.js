import {GLOBAL_SET_THEME} from "./globalTypes";
export const setAppTheme = (theme) => (dispatch) =>{
    dispatch({type: GLOBAL_SET_THEME, payload: theme})
    window.location.reload()
}
