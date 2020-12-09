import {
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
}