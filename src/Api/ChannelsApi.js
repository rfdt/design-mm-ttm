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

    static createChannelFromFile(file){
        const channelData = new FormData()
        channelData.append('file', file)
        return axiosRequest.post(ChannelsApi.prefix+'createfromfile', channelData)
    }

    static createHardware(newHardware){
        return axiosRequest.post(ChannelsApi.prefix + 'create/hardware', newHardware)
    }

    static editHardware(editHardware){
        return axiosRequest.post(ChannelsApi.prefix + 'edit/hardware', editHardware)
    }

    static verifyChannel(verifiedChannel){
        return axiosRequest.post(ChannelsApi.prefix + 'verify', verifiedChannel)
    }

    static getRelatedChannels(channel_id){
        return axiosRequest.get(ChannelsApi.prefix + 'related/'+channel_id)
    }

    static getChannelsDashboard(){
        return axiosRequest.get(ChannelsApi.prefix + 'dashboard')
    }

    static testError(){
        return axiosRequest.get(ChannelsApi.prefix + 'test')
    }
}
