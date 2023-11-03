import {SET_DASHBOARD_CHANNELS_STAT} from "./dashboardTypes";

const initialState = {
    channelsDashboardLoaded: false,
    channelsCount: 0,
    reservedChannels: 0,
    clientsCount: 0,
    services: null,
    cities: null
}
export const dashboardReducer = (state = initialState, action)=>{
    switch (action.type){
        case SET_DASHBOARD_CHANNELS_STAT:
            return {...state, ...action.payload, channelsDashboardLoaded: true}
        default:
            return state
    }
}
