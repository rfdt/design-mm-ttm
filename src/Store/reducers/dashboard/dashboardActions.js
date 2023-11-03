import {setError} from "../errors/errorsActions";
import {ChannelsApi} from "../../../Api/ChannelsApi";
import {SET_DASHBOARD_CHANNELS_STAT} from "./dashboardTypes";

const setDashboardChannelStat = (channelStat) => ({type: SET_DASHBOARD_CHANNELS_STAT, payload: channelStat})
export const loadChannelsDashboard  = () => async (dispatch) =>{
    try {
        const dashboardStat = await ChannelsApi.getChannelsDashboard();
        dispatch(setDashboardChannelStat(dashboardStat.data))
    }catch (e){
        dispatch(setError(e));
    }
}
