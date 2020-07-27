import { call, put, takeLatest } from 'redux-saga/effects';
import { actions } from './slice';
import api from 'utils/api';

export function* loadTools({
  payload: { page = 0, search = ' ', searchTagsOnly = false },
}) {
  try {
    const tools = yield call(
      api.get,
      `tools?skip=${page}&search=${search}&searchTagsOnly=${searchTagsOnly}`,
    );
    yield put(actions.toolsLoaded(tools.data));
  } catch {
    yield put(actions.toolsError());
  }
}
export function* createTool({ payload }) {
  try {
    const tools = yield call(api.post, 'tools', payload);
    yield put(actions.toolCreated(tools.data));
  } catch {
    yield put(actions.toolCreateError());
  }
}
export function* editTool({ payload }) {
  try {
    const tools = yield call(api.put, `tools/${payload.id}`, payload.data);
    yield put(actions.toolEdited(tools.data));
  } catch {
    yield put(actions.toolsError());
  }
}
export function* deleteTool({ payload }) {
  try {
    const tools = yield call(api.delete, `tools/${payload}`);
    yield put(actions.toolDeleted(tools.data));
  } catch {
    yield put(actions.toolDeleteError());
  }
}
export function* toolsSaga() {
  yield takeLatest(actions.loadTools, loadTools);
  yield takeLatest(actions.createTool, createTool);
  yield takeLatest(actions.editTool, editTool);
  yield takeLatest(actions.deleteTool, deleteTool);
}
