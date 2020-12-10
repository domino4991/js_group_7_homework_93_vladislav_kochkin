import {
    ADD_SHARED_USER,
    ADD_SHARED_USER_ERROR,
    ADD_SHARED_USER_SUCCESS,
    CLEAN_USERS_ERROR,
    CLEAN_USERS_ERROR_SUCCESS, GET_USERS, GET_USERS_ERROR, GET_USERS_SUCCESS,
    LOGIN_USER,
    LOGIN_USER_ERROR, LOGIN_USER_FACEBOOK,
    LOGIN_USER_SUCCESS, LOGOUT_USER, LOGOUT_USER_ERROR, LOGOUT_USER_SUCCESS,
    REGISTER_USER,
    REGISTER_USER_ERROR,
    REGISTER_USER_SUCCESS
} from "../actionTypes";

export const registerUserSuccess = () => ({type: REGISTER_USER_SUCCESS});
export const registerUserError = error => ({type: REGISTER_USER_ERROR, error});
export const loginUserSuccess = data => ({type: LOGIN_USER_SUCCESS, data});
export const loginUserError = error => ({type: LOGIN_USER_ERROR, error});
export const logoutUserSuccess = () => ({type: LOGOUT_USER_SUCCESS});
export const logoutUserError = error => ({type: LOGOUT_USER_ERROR, error});
export const cleanUsersErrorSuccess = () => ({type: CLEAN_USERS_ERROR_SUCCESS});

export const getUsersSuccess = data => ({type: GET_USERS_SUCCESS, data});
export const getUsersError = error => ({type: GET_USERS_ERROR, error});

export const addSharedUserSuccess = () => ({type: ADD_SHARED_USER_SUCCESS});
export const addSharedUserError = error => ({type: ADD_SHARED_USER_ERROR, error});

export const registerUser = userData => {
    return {type: REGISTER_USER, userData};
};

export const loginUser = userData => {
    return {type: LOGIN_USER, userData};
};

export const logoutUser = () => {
    return {type: LOGOUT_USER};
};

export const facebookLogin = data => {
    return {type: LOGIN_USER_FACEBOOK, data};
};

export const cleanUserError = () => {
    return {type: CLEAN_USERS_ERROR};
};

export const getUsers = () => {
    return {type: GET_USERS};
};

export const addSharedUser = email => {
    return {type: ADD_SHARED_USER, email};
}