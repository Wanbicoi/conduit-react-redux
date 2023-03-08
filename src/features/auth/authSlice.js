import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit"
import agent from "../../common/agent"
import { Status, isApiError, failureReducer, loadingReducer, isObjectEmpty } from "../../common/utils"
export const login = createAsyncThunk('user/login', async ({ email, password }, thunkApi) => {
  try {
    const {
      user: { token, ...user },
    } = await agent.Auth.login(email, password);
    return { token, user };
  } catch (error) {
    if (isApiError(error)) {
      throw thunkApi.rejectWithValue(error);
    }
    throw error;
  }
})

export const register = createAsyncThunk('user/register', async ({ username, email, password }, thunkApi) => {
  try {
    const {
      user: { token, ...user },
    } = await agent.Auth.register(username, email, password);
    return { token, user };
  } catch (error) {
    if (isApiError(error)) {
      return thunkApi.rejectWithValue(error);
    }
    throw error;
  }
})
// export const getCurrentUser = createAsyncThunk('user/getCurrent', async (_, { rejectWithValue }) => {
//   try {
//     const user = await agent.Auth.getCurrentUser()
//     return user
//   } catch (error) {
//     console.log(error)
//     if (isApiError(error)) {
//       return rejectWithValue(error)
//     }
//     throw error
//   }
// })
export const updateUser = createAsyncThunk('user/update', async (user, thunkApi) => {
  try {
    const res = await agent.Auth.updateUser(user)
    return res
  } catch (error) {
    if (isApiError(error)) {
      return thunkApi.rejectWithValue(error)
    }
    throw error
  }
})
function successReducer(state, action) {
  state.status = Status.SUCCESS;
  state.token = action.payload.token;
  state.user = action.payload.user;
  delete state.errors;
}
const initialState = {
  status: Status.IDLE,
  // user: {},
  errors: undefined,
  // token: '',,
}
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    getUserToken: (state, action) => { state.token = action.payload },
    logOut: () => initialState,
  },
  extraReducers(builder) {
    builder
      .addCase(login.fulfilled, successReducer)
      .addCase(register.fulfilled, successReducer)
      .addCase(updateUser.fulfilled, successReducer)
    builder
      .addCase(login.rejected, failureReducer)
      .addCase(register.rejected, failureReducer)
      .addCase(updateUser.rejected, failureReducer)
    builder
      .addMatcher((action) => /auth\/.*\/pending/.test(action.type), loadingReducer);
  }
})
const selectAuthSlice = (state) => state.auth;

export const selectErrors = (state) => selectAuthSlice(state).errors;

export const selectUser = (state) => selectAuthSlice(state).user;
export const selectIsAuthenticated = createSelector(
  (state) => selectAuthSlice(state).token,
  selectUser,
  (token, user) => Boolean(token && user)
);
export const { logOut, getUserToken } = authSlice.actions
export default authSlice.reducer
