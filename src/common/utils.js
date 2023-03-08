export const Status = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCESS: "success",
  FAILURE: "failure",
}

export function isApiError(error) {
  return typeof error === 'object' && error !== null && 'errors' in error;
}
export function loadingReducer(state) {
  state.status = Status.LOADING
}
export function failureReducer(state, action) {
  state.status = Status.FAILURE
  state.errors = action.payload.errors
}
export const isObjectEmpty = (objectName) => {
  return Object.keys(objectName).length === 0 && objectName.constructor === Object;
}
