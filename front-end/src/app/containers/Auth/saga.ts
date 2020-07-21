import { call, put, takeLatest } from 'redux-saga/effects';
import { actions } from './slice';
import api from 'utils/api';

export function* login({ payload }) {
  try {
    const res = yield call(api.post, '/auth/login', payload);
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data.user));
    yield put(actions.loggedIn(res.data));
  } catch (error) {}
}
export function* register({ payload }) {
  try {
    const res = yield call(api.post, '/auth/register', payload);
    yield put(actions.registered(res.data));
  } catch (error) {}
}

export function* authSaga() {
  yield takeLatest(actions.login, login);
  yield takeLatest(actions.register, register);
}
