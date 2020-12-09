import { takeEvery } from 'redux-saga/effects';
import {facebookLoginSaga, loginUserSaga, logoutUserSaga, registerUserSaga} from "./users";
import {GET_EVENTS, LOGIN_USER, LOGIN_USER_FACEBOOK, LOGOUT_USER, REGISTER_USER} from "../actionTypes";
import {getEventsSaga} from "./events";

export function* rootSaga() {
    yield takeEvery(REGISTER_USER, registerUserSaga);
    yield takeEvery(LOGIN_USER, loginUserSaga);
    yield takeEvery(LOGIN_USER_FACEBOOK, facebookLoginSaga);
    yield takeEvery(LOGOUT_USER, logoutUserSaga);
    yield takeEvery(GET_EVENTS, getEventsSaga);
}