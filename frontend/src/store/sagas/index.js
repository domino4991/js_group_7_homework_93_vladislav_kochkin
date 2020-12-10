import { takeEvery } from 'redux-saga/effects';
import {
    addSharedUserSaga,
    cleanUserErrorSaga,
    facebookLoginSaga,
    getUsersSaga,
    loginUserSaga,
    logoutUserSaga,
    registerUserSaga
} from "./users";
import {
    ADD_SHARED_USER,
    CLEAN_EVENTS_WHEN_LOGOUT, CLEAN_USERS_ERROR, DELETE_EVENT, DELETE_SHARED_USER,
    GET_EVENTS, GET_USERS,
    LOGIN_USER,
    LOGIN_USER_FACEBOOK,
    LOGOUT_USER, POST_EVENT,
    REGISTER_USER
} from "../actionTypes";
import {cleanEventsWhenLogoutSaga, deleteEventSaga, deleteSharedUserSaga, getEventsSaga, postEventSaga} from "./events";

export function* rootSaga() {
    yield takeEvery(REGISTER_USER, registerUserSaga);
    yield takeEvery(LOGIN_USER, loginUserSaga);
    yield takeEvery(LOGIN_USER_FACEBOOK, facebookLoginSaga);
    yield takeEvery(LOGOUT_USER, logoutUserSaga);
    yield takeEvery(GET_EVENTS, getEventsSaga);
    yield takeEvery(CLEAN_EVENTS_WHEN_LOGOUT, cleanEventsWhenLogoutSaga);
    yield takeEvery(DELETE_EVENT, deleteEventSaga);
    yield takeEvery(POST_EVENT, postEventSaga);
    yield takeEvery(CLEAN_USERS_ERROR, cleanUserErrorSaga);
    yield takeEvery(DELETE_SHARED_USER, deleteSharedUserSaga);
    yield takeEvery(GET_USERS, getUsersSaga);
    yield takeEvery(ADD_SHARED_USER, addSharedUserSaga);
}