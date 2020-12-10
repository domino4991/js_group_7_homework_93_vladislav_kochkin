import {
    CLEAN_EVENTS_WHEN_LOGOUT_SUCCESS, DELETE_EVENT_ERROR, DELETE_SHARED_USER_ERROR, DELETE_SHARED_USER_SUCCESS,
    GET_EVENTS_ERROR,
    GET_EVENTS_SUCCESS, POST_EVENT_ERROR, POST_EVENT_SUCCESS
} from "../actionTypes";

const initialState = {
    events: null,
    eventsError: null
};

export const eventsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_EVENTS_SUCCESS:
            return {
                ...state,
                events: action.data,
                eventsError: null
            };
        case POST_EVENT_SUCCESS:
            return {
                ...state,
                eventsError: null
            };
        case DELETE_SHARED_USER_SUCCESS:
            return {
                ...state,
                eventsError: null
            };
        case GET_EVENTS_ERROR:
        case DELETE_EVENT_ERROR:
        case POST_EVENT_ERROR:
        case DELETE_SHARED_USER_ERROR:
            return {
                ...state,
                eventsError: action.error
            };
        case CLEAN_EVENTS_WHEN_LOGOUT_SUCCESS:
            return {
                ...state,
                events: null,
                eventsError: null
            };
        default:
            return state;
    }
};