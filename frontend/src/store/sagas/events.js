import axiosBase from "../../axiosBase";
import {put} from 'redux-saga/effects';
import {getEventsError, getEventsSuccess} from "../actions/eventsActions";

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