import {channelsReducer} from "./channels/channelsReducer";
import {combineReducers} from "redux";
import {errorsReducer} from "./errors/errorsReducer";
import {userReducer} from "./user/userReducer";

export const rootReducer = combineReducers({
    channels: channelsReducer,
    errors: errorsReducer,
    user: userReducer
});
