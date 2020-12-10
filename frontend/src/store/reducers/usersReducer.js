import {
    ADD_SHARED_USER_ERROR, ADD_SHARED_USER_SUCCESS,
    CLEAN_USERS_ERROR_SUCCESS, GET_USERS_ERROR, GET_USERS_SUCCESS,
    LOGIN_USER_ERROR,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER_ERROR,
    LOGOUT_USER_SUCCESS,
    REGISTER_USER_ERROR
} from "../actionTypes";

const initialState = {
    user: null,
    usersError: null,
    sharedUsersList: null,
    users: null
};

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                user: action.data,
                usersError: null
            };
        case LOGOUT_USER_SUCCESS:
            return {
                ...state,
                user: null,
                usersError: null
            };
        case GET_USERS_SUCCESS:
            return {
                ...state,
                users: action.data,
                usersError: null
            };
        case ADD_SHARED_USER_SUCCESS:
            return {
                ...state,
                usersError: null
            };
        case LOGIN_USER_ERROR:
        case LOGOUT_USER_ERROR:
        case REGISTER_USER_ERROR:
        case GET_USERS_ERROR:
        case ADD_SHARED_USER_ERROR:
            return {
                ...state,
                usersError: action.error
            };
        case CLEAN_USERS_ERROR_SUCCESS:
            return {
                ...state,
                usersError: null
            };
        default:
            return state;
    }
};