import {GLOBAL_SET_THEME} from "./globalTypes";

const globalReducerInitialState = {
    appTheme: localStorage.getItem('mm-theme') || "light"
}
export const globalReducer = (state = globalReducerInitialState, action) =>{
    switch (action.type){
        case GLOBAL_SET_THEME:
            localStorage.setItem('mm-theme', action.payload);
            return {...state, appTheme: action.payload}
        default: return state
    }
}
