import {
    CLEAN_EVENTS_WHEN_LOGOUT,
    CLEAN_EVENTS_WHEN_LOGOUT_SUCCESS,
    DELETE_EVENT,
    DELETE_EVENT_ERROR, DELETE_SHARED_USER, DELETE_SHARED_USER_ERROR, DELETE_SHARED_USER_SUCCESS,
    GET_EVENTS,
    GET_EVENTS_ERROR,
    GET_EVENTS_SUCCESS, POST_EVENT, POST_EVENT_ERROR, POST_EVENT_SUCCESS
} from "../actionTypes";

export const getEventsSuccess = data => ({type: GET_EVENTS_SUCCESS, data});
export const getEventsError = error => ({type: GET_EVENTS_ERROR, error});
export const cleanEventsWhenLogoutSuccess = () => ({type: CLEAN_EVENTS_WHEN_LOGOUT_SUCCESS});
export const deleteEventError = error => ({type: DELETE_EVENT_ERROR, error});
export const postEventSuccess = () => ({type: POST_EVENT_SUCCESS});
export const postEventError = error => ({type: POST_EVENT_ERROR, error});
export const deleteSharedUserSuccess = () => ({type: DELETE_SHARED_USER_SUCCESS});
export const deleteSharedUserError = error => ({type: DELETE_SHARED_USER_ERROR, error});

export const getEvents = () => {
    return {type: GET_EVENTS};
};

export const cleanEventsWhenLogout = () => {
    return {type: CLEAN_EVENTS_WHEN_LOGOUT};
};

export const deleteEvent = id => {
    return {type: DELETE_EVENT, id};
}

export const postEvent = (data) => {
    return {type: POST_EVENT, data};
}

export const deleteSharedUser = email => {
    return {type: DELETE_SHARED_USER, email};
}