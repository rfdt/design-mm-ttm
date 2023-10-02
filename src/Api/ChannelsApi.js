import {axiosRequest} from "../Axios/axiosRequest";

// export const ChannelsApi = {
//     gitFiltersValue: () => axiosRequest.get('/channels/getfiltersvalue'),
// }

export class ChannelsApi {
    static prefix = 'channels/'

    static getFiltersValue(){
        return axiosRequest.get(ChannelsApi.prefix + 'getfiltersvalue')
    }

    static findChannels(filters){
        return axiosRequest.post(ChannelsApi.prefix + 'find', {...filters})
    }

    static findChannelById(channel_id){
        return axiosRequest.get(ChannelsApi.prefix + 'find/'+channel_id)
    }

    static findToExport(filters){
        return axiosRequest.post(ChannelsApi.prefix + 'findall', {...filters})
    }


}