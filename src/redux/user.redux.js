import axios from 'axios';
import { getRedirectPath } from '../util';

const AUTH_SUCCESS = Symbol('AUTH_SUCCESS');
export const ERROR_MSG = Symbol('ERROR_MSG');
const LOAD_DATA = Symbol('LOAD_DATA');
const LOGOUT = Symbol('LOGOUT');
const CLEAR = Symbol('CLEAR');

export function errorMsg(msg) {
  return {
    msg,
    type: ERROR_MSG
  }
}

function authSuccess(obj) {
  const { pwd, ...data } = obj;
  return {
    type: AUTH_SUCCESS,
    payload: data
  }
}

const initState = {
  redirectTo: '',
  msg: '',
  user: '',
  type: ''
}

// reducer
export function user(state = initState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return { ...state, msg: '', ...action.payload, redirectTo: getRedirectPath(action.payload) }
    case ERROR_MSG:
      return { ...state, msg: action.msg, isAuth: false}
    case LOAD_DATA:
      return { ...state, ...action.payload };
    case LOGOUT:
      return { ...initState, redirectTo: '/login' };
    case CLEAR:
      return { ...state, redirectTo: null };
    default:
      return state;
  }
}

// action
export function login({ user, pwd }) {
  if (!user || !pwd) {
    return errorMsg('用户名密码必须输入');
  }
  return async dispatch => {
    let res = null;
    try {
      res = await axios.post('/user/login', {user, pwd});
      if (res.status === 200 && res.data.code === 0) {
        dispatch(authSuccess(res.data.data));
      } else {
        dispatch(errorMsg(res.data.msg));
      }
    } catch (err) {
      dispatch(errorMsg(err.message));
    }
  }
}

export function register({ user, pwd, repeatpwd, type }) {
  if (!user || !pwd || !type) {
    return errorMsg('必须输入用户密码');
  } else if(pwd !== repeatpwd) {
    return errorMsg('两次输入密码不一致');
  }

  return async dispatch => {
    let res = null;
    try {
      res = await axios.post('/user/register', { user, pwd, type });
      if (res.status === 200 && res.data.code === 0) {
        dispatch(authSuccess({user, pwd, type}));
      } else {
        dispatch(errorMsg(res.data.msg));
      }
    } catch (err) {
      dispatch(errorMsg(err.message));
    }
  }
}

export function storeUserInfo(userinfo) {
 return {
   type: LOAD_DATA,
   payload: userinfo,
 };
}

export function update(data) {
  return async dispatch => {
    let res = null;
    try {
      res = await axios.post('/user/update', data);
      if(res.status === 200 && res.data.code === 0) {
        dispatch(authSuccess(res.data.data));
      } else {
        dispatch(errorMsg(res.data.msg));
      }
    } catch (err) {
      dispatch(errorMsg(err.message));
    }
  }
}

export function logoutSubmit() {
  return {
    type: LOGOUT
  }
}

export function clearRedirect() {
  return {
    type: CLEAR
  }
}
