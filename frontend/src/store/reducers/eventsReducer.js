import {GET_EVENTS_ERROR, GET_EVENTS_SUCCESS} from "../actionTypes";

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
        case GET_EVENTS_ERROR:
            return {
                ...state,
                eventsError: action.error
            };
        default:
            return state;
    }
};