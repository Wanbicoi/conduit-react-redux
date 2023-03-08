import { configureStore } from '@reduxjs/toolkit';
import homeReducer from "../features/home/homeSlice"
import authReducer from "../features/auth/authSlice"
import articleReducer from "../features/article/articleSlice"
import localStorageMiddleware from "./middleware"
import editorReducer from '../features/editor/editorSlice'
// import storage from 'redux-persist/lib/storage';
// import { persistReducer, persistStore } from 'redux-persist';

// const persistConfig = {
//   key: 'root',
//   storage,
// }
//
// const persistedReducer = persistReducer(persistConfig, authReducer)

export const store = configureStore({
  reducer: {
    home: homeReducer,
    auth: authReducer,
    article: articleReducer,
    editor: editorReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    // routerMiddleware(history),
    localStorageMiddleware,
  ],
});

// export const persistor = persistStore(store)
