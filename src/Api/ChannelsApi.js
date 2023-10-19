import {axiosRequest} from "../Axios/axiosRequest";


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

    static updateAndCreate(channel){
        return axiosRequest.post(ChannelsApi.prefix + 'updateandcreate', channel)
    }

    static updateChannel(channel){
        return axiosRequest.post(ChannelsApi.prefix + 'update', channel)
    }

    static createChannel(newChannel){
        return axiosRequest.post(ChannelsApi.prefix + 'create', newChannel)
    }

    static createHardware(newHardware){
        return axiosRequest.post(ChannelsApi.prefix + 'create/hardware', newHardware)
    }

    static testError(){
        return axiosRequest.get(ChannelsApi.prefix + 'test')
    }
}
