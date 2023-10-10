import {GLOBAL_SET_THEME, GLOBAL_TOGGLE_SETTINGS} from "./globalTypes";
export const setAppTheme = (theme) => (dispatch) =>{
    dispatch({type: GLOBAL_SET_THEME, payload: theme})
    window.location.reload()
}

export const toggleSettingsVisible = () =>({type: GLOBAL_TOGGLE_SETTINGS});
