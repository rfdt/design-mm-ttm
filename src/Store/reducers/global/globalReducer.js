import {GLOBAL_SET_THEME, GLOBAL_TOGGLE_SETTINGS} from "./globalTypes";

const globalReducerInitialState = {
    appTheme: localStorage.getItem('mm-theme') || "light",
    settingsVisible: false
}
export const globalReducer = (state = globalReducerInitialState, action) =>{
    switch (action.type){
        case GLOBAL_SET_THEME:
            localStorage.setItem('mm-theme', action.payload);
            return {...state, appTheme: action.payload}
        case GLOBAL_TOGGLE_SETTINGS:
            return {...state, settingsVisible: !state.settingsVisible}
        default: return state
    }
}
