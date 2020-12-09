import {GET_EVENTS, GET_EVENTS_ERROR, GET_EVENTS_SUCCESS} from "../actionTypes";

export const getEventsSuccess = data => ({type: GET_EVENTS_SUCCESS, data});
export const getEventsError = error => ({type: GET_EVENTS_ERROR, error});

export const getEvents = () => {
    return {type: GET_EVENTS};
};