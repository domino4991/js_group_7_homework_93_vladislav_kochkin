import axiosBase from "../../axiosBase";
import {put} from 'redux-saga/effects';
import {
    cleanEventsWhenLogoutSuccess,
    deleteEventError, deleteSharedUserError, deleteSharedUserSuccess, getEvents,
    getEventsError,
    getEventsSuccess, postEventError, postEventSuccess
} from "../actions/eventsActions";
import {toast} from "react-toastify";

export function* getEventsSaga() {
    try {
        const response = yield axiosBase.get('/events');
        yield put(getEventsSuccess(response.data));
    } catch (e) {
        if(e.response && e.response.data) {
            yield put(getEventsError(e.response.data.error));
        } else {
            yield put(getEventsError(e.message));
        }
    }
}

export function* cleanEventsWhenLogoutSaga() {
    yield put(cleanEventsWhenLogoutSuccess());
}

export function* deleteEventSaga({id}) {
    try {
        const response = yield axiosBase.delete(`/events/${id}`);
        yield toast.success(response.data.message);
        yield put(getEvents());
    } catch (e) {
        if(e.response && e.response.data) {
            yield put(deleteEventError(e.response.data.error));
            yield toast.error(e.response.data.error);
        } else{
            yield put(deleteEventError(e.message));
            yield toast.error(e.message);
        }
    }
}

export function* postEventSaga({data}) {
    try {
        const response = yield axiosBase.post('/events', data);
        yield toast.success(response.data.message);
        yield put(getEvents());
        yield put(postEventSuccess());
    } catch (e) {
        if(e.response && e.response.data) {
            if(e.response.data.errors.datetime) {
                yield toast.error(e.response.data.errors.datetime.message);
            }
            yield put(postEventError(e.response.data));
        } else {
            yield put(postEventError(e.message));
        }
    }
}

export function* deleteSharedUserSaga({email}) {
    try {
        const response = yield axiosBase.put(`/events/${email}`);
        yield toast.success(response.data.message);
        yield put(getEvents());
        yield put(deleteSharedUserSuccess());
    } catch (e) {
        if(e.response && e.response.data) {
            yield put(deleteSharedUserError(e.response.data.error));
        } else {
            yield put(deleteSharedUserError(e.message));
        }
    }
}