import {
  configureStore,
  createAction,
  createReducer,
  createSlice,
  createStore,
} from '@reduxjs/toolkit';

import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware, { ThunkAction as OriginThunkAction } from 'redux-thunk';

export type User = {
  name: string;
};

type UsersState = {
  user: User | null;
};

const initialState = {
  user: null,
};

export const storeUser = createAction<User, 'STORE_USER'>('STORE_USER');
export const clearUser = createAction('LOGOUT');

const usersReducer = createReducer<UsersState>(initialState, (builder) => {
  builder
    .addCase(storeUser, (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.user = action.payload;
    })
    .addCase(clearUser, (state) => {
      state.user = null;
    });
});

export const store = configureStore({
  reducer: {
    user: usersReducer,
  },
  middleware: [thunkMiddleware],
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export type ThunkAction = OriginThunkAction<
  Promise<void>,
  RootState,
  null,
  any
>;
