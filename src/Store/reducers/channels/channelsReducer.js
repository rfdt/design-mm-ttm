import {
    CHANNELS_CLEAR_SELECTED_CHANNEL,
    CHANNELS_RESET_FILTERS,
    CHANNELS_SET_EDITING_CHANNEL,
    CHANNELS_SET_EDITING_MODE,
    CHANNELS_SET_FILTER_VALUE,
    CHANNELS_SET_FILTERED_CHANNELS,
    CHANNELS_SET_FILTERED_CHANNELS_COUNT,
    CHANNELS_SET_FILTERS_VALUES,
    CHANNELS_SET_LOADED_SELECTED_CHANNEL,
    CHANNELS_SET_LOADING_SELECTED_CHANNEL,
    CHANNELS_SET_SELECTED_CHANNEL
} from "./channelsTypes";

const filtersInitialValue = {
    addInfoFilter: '',
    cityFilter: '',
    streetFilter: '',
    homeFilter: '',
    serviceFilter: '',
    statusFilter: '',
    peFilter: "",
    rdFilter: '',
    channelAggStopFilter:'',
    vidFilter: '',
    sizeFilter: '',
    channelAccStopFilter: '',
    channelIpMngFilter: '',
}

const channelsReducerInitialState = {
    filteredChannels: [],
    filteredChannelsCount: 0,
    selectedChannel: null,
    isLoadingSelectedChannel: false,
    loadedSelectedChannel: null,
    channelsFilters: {...filtersInitialValue},
    filtersValues: null,
    isEditingChannel: false,
    editingMode: ''
}

export const channelsReducer = (state= channelsReducerInitialState, action) =>{
    switch (action.type){
        case CHANNELS_SET_FILTERED_CHANNELS:
            return {...state, filteredChannels: action.payload}
        case CHANNELS_SET_FILTERED_CHANNELS_COUNT:
            return {...state, filteredChannelsCount: action.payload}
        case CHANNELS_SET_SELECTED_CHANNEL: {
            return {...state, selectedChannel: action.payload}
        }
        case CHANNELS_SET_LOADING_SELECTED_CHANNEL: {
            return {...state, isLoadingSelectedChannel: action.payload}
        }
        case CHANNELS_SET_LOADED_SELECTED_CHANNEL: {
            return {...state, loadedSelectedChannel: action.payload}
        }
        case CHANNELS_CLEAR_SELECTED_CHANNEL:{
            return {...state, selectedChannel: null, isLoadingSelectedChannel: false, loadedSelectedChannel: null}
        }
        case CHANNELS_SET_FILTER_VALUE: {
            const newFiltersValues = {...state.channelsFilters}
            newFiltersValues[action.payload.filter] = action.payload.value
            return {...state, channelsFilters: {...newFiltersValues}}
        }
        case CHANNELS_SET_FILTERS_VALUES: {
            return {...state, filtersValues: action.payload}
        }
        case CHANNELS_RESET_FILTERS: {
            return {...state, channelsFilters: {...filtersInitialValue}}
        }
        case CHANNELS_SET_EDITING_CHANNEL:
            return {...state, isEditingChannel: action.payload, editingMode: ''}
        case CHANNELS_SET_EDITING_MODE:
            return {...state, editingMode: action.payload}
        default: return state
    }
}
