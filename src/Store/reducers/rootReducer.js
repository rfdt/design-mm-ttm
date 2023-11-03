import {channelsReducer} from "./channels/channelsReducer";
import {combineReducers} from "redux";
import {errorsReducer} from "./errors/errorsReducer";
import {userReducer} from "./user/userReducer";
import {globalReducer} from "./global/globalReducer";
import {dashboardReducer} from "./dashboard/dashboardReducer";

export const rootReducer = combineReducers({
    channels: channelsReducer,
    errors: errorsReducer,
    user: userReducer,
    global: globalReducer,
    dashboard: dashboardReducer
});
