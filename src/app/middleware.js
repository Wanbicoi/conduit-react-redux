import agent from "../common/agent";
import { login, logOut, register } from "../features/auth/authSlice"
const localStorageMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case register.fulfilled.type:
    case login.fulfilled.type:
      window.localStorage.setItem('jwt', action.payload.token);
      agent.setToken(action.payload.token);
      break;

    case logOut.type:
      window.localStorage.removeItem('jwt');
      agent.setToken(undefined);
      break;
  }

  return next(action);
}
export default localStorageMiddleware
