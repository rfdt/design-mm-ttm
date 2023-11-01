import {
    CHANNELS_ADD_NEW_HARDWARE,
    CHANNELS_CLEAR_SELECTED_CHANNEL, CHANNELS_RESET_EXTENDED_FILTERS,
    CHANNELS_RESET_FILTERS, CHANNELS_SET_EDITED_HARDWARE,
    CHANNELS_SET_EDITING_CHANNEL,
    CHANNELS_SET_EDITING_MODE,
    CHANNELS_SET_FILTER_VALUE,
    CHANNELS_SET_FILTERED_CHANNELS,
    CHANNELS_SET_FILTERED_CHANNELS_COUNT,
    CHANNELS_SET_FILTERS_VALUES,
    CHANNELS_SET_LOADED_SELECTED_CHANNEL,
    CHANNELS_SET_LOADING_SELECTED_CHANNEL,
    CHANNELS_SET_SELECTED_CHANNEL, REMOVE_DRAFT_CHANNEL_BY_IDX, SAVE_OR_UPDATE_DRAFT_CHANNEL
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
    channelAggStopFilter: '',
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
    editingMode: '',
    channelsDrafts: JSON.parse(localStorage.getItem('mm-channels-draft') || "[]")
}

export const channelsReducer = (state = channelsReducerInitialState, action) => {
    switch (action.type) {
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
        case CHANNELS_CLEAR_SELECTED_CHANNEL: {
            return {...state, selectedChannel: null, isLoadingSelectedChannel: false, loadedSelectedChannel: null}
        }
        case CHANNELS_SET_FILTER_VALUE: {
            const newFiltersValues = {...state.channelsFilters}
            newFiltersValues[action.payload.filter] = action.payload.value
            return {...state, channelsFilters: {...newFiltersValues}}
        }
        case CHANNELS_SET_FILTERS_VALUES: {
            return {
                ...state, filtersValues: {
                    ...action.payload,
                    status: [{name: "ВКЛ", code: "ВКЛ"}, {name: "ОТКЛ", code: "ОТКЛ"},
                        {name: "РЕЗЕРВ", code: "РЕЗЕРВ"}, {name: "ИЗМ", code: "ИЗМ"}, {name: "ПАУЗА", code: "ПАУЗА"}],
                }
            }
        }
        case CHANNELS_RESET_FILTERS: {
            return {...state, channelsFilters: {...filtersInitialValue}}
        }
        case CHANNELS_RESET_EXTENDED_FILTERS: {
            return {
                ...state, channelsFilters:
                    {
                        ...state.channelsFilters, addInfoFilter: "", peFilter: "",
                        rdFilter: "", channelAccStopFilter: "", channelAggStopFilter: "",
                        channelIpMngFilter: "", sizeFilter: "", vidFilter: ""
                    }
            }
        }
        case CHANNELS_SET_EDITING_CHANNEL:
            return {...state, isEditingChannel: action.payload, editingMode: ''}
        case CHANNELS_SET_EDITING_MODE:
            return {...state, editingMode: action.payload}
        case CHANNELS_ADD_NEW_HARDWARE:
            const newFiltersValues = {
                ...state.filtersValues
            }
            newFiltersValues[action.payload.hardware_type] = [...state.filtersValues[action.payload.hardware_type], action.payload]
            return {...state, filtersValues: newFiltersValues}
        case CHANNELS_SET_EDITED_HARDWARE:
            const editedFiltersValues = {...state.filtersValues}
            let hardwareIndex = editedFiltersValues[action.payload.hardware_type].findIndex(hardware => hardware._id === action.payload._id)
            editedFiltersValues[action.payload.hardware_type][hardwareIndex] = action.payload;
            return {...state, filtersValues: editedFiltersValues}
        case SAVE_OR_UPDATE_DRAFT_CHANNEL:
            let channelDrafts = [...state.channelsDrafts]
            const index = channelDrafts.findIndex(
                (draft) => (draft.client && draft.client === action.payload.client) || (draft.channel_vid && draft.channel_vid === action.payload.channel_vid)
                || (draft.id_suz && draft.id_suz === action.payload.id_suz) || (draft.id_tbcd && draft.id_tbcd === action.payload.id_tbcd)
                || (draft.id_oss && draft.id_oss === action.payload.id_oss) || (draft.id_cms && draft.id_cms === action.payload.id_cms)
            )
            if(index > -1){
                channelDrafts[index] = {...action.payload}
            }else {
                if(channelDrafts.length === 5){
                    channelDrafts[0] = action.payload
                }else {
                    channelDrafts.push(action.payload)
                }
            }
            localStorage.setItem('mm-channels-draft', JSON.stringify(channelDrafts));
            return {...state, channelsDrafts: channelDrafts}
        case REMOVE_DRAFT_CHANNEL_BY_IDX:
            let channelDraftsDeleted = [...state.channelsDrafts].filter((_, idx)=>idx !== action.payload);
            localStorage.setItem('mm-channels-draft', JSON.stringify(channelDraftsDeleted));
            return {...state, channelsDrafts: channelDraftsDeleted}
        default:
            return state
    }
}
