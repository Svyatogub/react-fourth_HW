import { LOGIN_USER, LOGOUT_USER } from './actionTypes';

export const logInAction = (payload) => ({ type: LOGIN_USER, payload });
export const logOutAction = () => ({ type: LOGOUT_USER });
