import {ChannelsApi} from "../../../Api/ChannelsApi";
import {
    CHANNELS_ADD_NEW_HARDWARE,
    CHANNELS_CLEAR_SELECTED_CHANNEL, CHANNELS_RESET_EXTENDED_FILTERS,
    CHANNELS_RESET_FILTERS, CHANNELS_SET_EDITED_HARDWARE,
    CHANNELS_SET_EDITING_CHANNEL, CHANNELS_SET_EDITING_MODE,
    CHANNELS_SET_FILTER_VALUE,
    CHANNELS_SET_FILTERED_CHANNELS,
    CHANNELS_SET_FILTERED_CHANNELS_COUNT,
    CHANNELS_SET_FILTERS_VALUES,
    CHANNELS_SET_LOADED_SELECTED_CHANNEL,
    CHANNELS_SET_LOADING_SELECTED_CHANNEL,
    CHANNELS_SET_SELECTED_CHANNEL
} from "./channelsTypes";
import {setError} from "../errors/errorsActions";

const setFilteredChannelsAC = (channels) => ({type: CHANNELS_SET_FILTERED_CHANNELS, payload: channels})
const setFilteredChannelsCountAC = (count) => ({type: CHANNELS_SET_FILTERED_CHANNELS_COUNT, payload: count})
const setSelectedChannelAC = (channel) => ({type: CHANNELS_SET_SELECTED_CHANNEL, payload: channel})
const setLoadingSelectedChannelAC = (isLoading) => ({type: CHANNELS_SET_LOADING_SELECTED_CHANNEL, payload: isLoading})
const setLoadedSelectedChannelAC = (channel) => ({type: CHANNELS_SET_LOADED_SELECTED_CHANNEL, payload: channel})
const setFiltersValuesAC = (filterValues) => ({type: CHANNELS_SET_FILTERS_VALUES, payload: filterValues})
const addHardwareAC = (newHardware) =>({type: CHANNELS_ADD_NEW_HARDWARE, payload: newHardware})
const editChannelAC = (hardware) => ({type: CHANNELS_SET_EDITED_HARDWARE, payload: hardware})


export const findChannels = () => async (dispatch, getState) => {
    try {
        const filters = getState().channels.channelsFilters;
        const channels = await ChannelsApi.findChannels({...filters,
            peFilter: filters.peFilter.title || '',
            channelAggStopFilter: filters.channelAggStopFilter.title || ''
        });
        dispatch(setFilteredChannelsAC(channels.data.channels));
        dispatch(setFilteredChannelsCountAC(channels.data.count));
    } catch (e) {
        dispatch(setError(e))
    }
}

export const clearSearch = () => async (dispatch, getState) => {
    try {
        dispatch(resetFilters());
        dispatch(findChannels());
    }catch (e){
        dispatch(setError(e))
    }
}

export const selectChannel = (channel) => async (dispatch, getState) => {
    try {
        dispatch(setSelectedChannelAC(channel));
        dispatch(setLoadingSelectedChannelAC(true));
        const selectedChannel = getState().channels.selectedChannel
        const loadedData = await ChannelsApi.findChannelById(selectedChannel._id);
        dispatch(setLoadedSelectedChannelAC(loadedData.data))
        dispatch(setLoadingSelectedChannelAC(false));
    } catch (e) {
        dispatch(setError(e))
    }
}

export const clearSelectedChannel = () => ({type: CHANNELS_CLEAR_SELECTED_CHANNEL})
export const setFilterValue = (filter, value) =>({type: CHANNELS_SET_FILTER_VALUE, payload: {filter, value}})
export const resetFilters = () => ({type: CHANNELS_RESET_FILTERS})
export const resetExtendedFilters = () => ({type: CHANNELS_RESET_EXTENDED_FILTERS})
export const getFilterValues = () => async (dispatch) =>{
    try {
        const filtersValue = await ChannelsApi.getFiltersValue();
        dispatch(setFiltersValuesAC(filtersValue.data))
    }catch (e){
        dispatch(setError(e))
    }
}
export const setEditChannel = (edit) =>({type: CHANNELS_SET_EDITING_CHANNEL, payload: edit})
export const setEditingMode = (mode) => ({type: CHANNELS_SET_EDITING_MODE, payload: mode})
export const createAndUpdateChannel = (channel) => async (dispatch) => {
    try {
        dispatch(setLoadingSelectedChannelAC(true));
        const newChannel = await ChannelsApi.updateAndCreate(channel);
        dispatch(setLoadedSelectedChannelAC(newChannel.data));
        dispatch(setLoadingSelectedChannelAC(false));
        dispatch(setEditChannel(false));
    }catch (e){
        dispatch(setError(e));
    }
}

export const updateChannel = (channel) => async (dispatch) => {
    try {
        dispatch(setLoadingSelectedChannelAC(true));
        const newChannel = await ChannelsApi.updateChannel(channel);
        dispatch(setLoadedSelectedChannelAC(newChannel.data));
        dispatch(setLoadingSelectedChannelAC(false));
        dispatch(setEditChannel(false));
    }catch (e){
        dispatch(setError(e));
    }
}

export const createChannel = (newChannel) => async (dispatch) =>{
    try {
        const newChannelCreated = await ChannelsApi.createChannel(newChannel);
        return true;
    }catch (e){
        dispatch(setError(e));
        return false;
    }
}

export const clearExtendedSearch = () => (dispatch)=> {
    try {
        dispatch(resetExtendedFilters());
    }catch (e){
        dispatch(setError(e));
        return false;
    }
}

export const addHardware = (newHardware) => async (dispatch) =>{
    try {
        const newHardwareSaved = await ChannelsApi.createHardware(newHardware);
        dispatch(addHardwareAC(newHardwareSaved.data))
    }catch (e){
        dispatch(setError(e));
    }
}

export const editHardware = (editHardware) => async (dispatch) =>{
    try {
        const editedHardware = await ChannelsApi.editHardware(editHardware);
        dispatch(editChannelAC(editedHardware.data));
    }catch (e){
        dispatch(setError(e));
    }
}