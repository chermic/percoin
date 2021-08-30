import { LOCAL_STORAGE_KEYS } from '../../../constants';
import { clearUser, storeUser, ThunkAction, User } from '../../../store';

export const login =
  (user: User): ThunkAction =>
  async (dispatch, getState) => {
    dispatch(storeUser({ name: user.name }));
    localStorage.setItem(LOCAL_STORAGE_KEYS.login, user.name);
  };

export const logout = (): ThunkAction => async (dispatch, getState) => {
  dispatch(clearUser());
  localStorage.removeItem(LOCAL_STORAGE_KEYS.login);
};
