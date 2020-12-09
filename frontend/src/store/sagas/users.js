import axiosBase from "../../axiosBase";
import {put} from 'redux-saga/effects';
import {toast} from "react-toastify";
import {
    loginUserError,
    loginUserSuccess, logoutUserError,
    logoutUserSuccess,
    registerUserError,
    registerUserSuccess
} from "../actions/usersActions";
import {push} from 'connected-react-router';

export function* registerUserSaga({userData}) {
    try {
        const response = yield axiosBase.post('/users', userData);
        yield toast.success(response.data.message);
        yield put(registerUserSuccess());
        yield put(push('/login'));
    } catch (e) {
        if(e.response && e.response.data) {
            yield put(registerUserError(e.response.data));
        } else {
            yield put(registerUserError(e.message));
        }
    }
}

export function* loginUserSaga({userData}) {
    try {
        const response = yield axiosBase.post('/users/sessions', userData);
        yield put(loginUserSuccess(response.data));
        yield put(push('/calendar'));
    } catch (e) {
        if(e.response && e.response.data) {
            yield put(loginUserError(e.response.data));
        } else {
            yield put(loginUserError(e.message));
        }
    }
}

export function* logoutUserSaga() {
    try {
        const response = yield axiosBase.delete('/users/sessions');
        yield toast.success(response.data.message);
        yield put(logoutUserSuccess());
        yield put(push('/'));
    } catch (e) {
        if(e.response && e.response.data) {
            yield put(logoutUserError(e.response.data.error));
        } else {
            yield put(logoutUserError(e.message));
        }
    }
}

export function* facebookLoginSaga({data}) {
    try {
        const response = yield axiosBase.post(`/users/facebookLogin`, data);
        yield put(loginUserSuccess(response.data));
        yield put(push('/calendar'));
    } catch (e) {
        if(e.response && e.response.data) {
            yield put(loginUserError(e.response.data));
        } else {
            yield put(loginUserError(e.message));
        }
    }
}