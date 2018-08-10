import axios from 'axios';
import { ERROR_MSG, errorMsg } from './user.redux'
const USER_LIST = Symbol('USER_LIST');

const initState = {
  userlist: []
}

// reducer
export function chatuser(state = initState, action) {
  switch (action.type) {
    case USER_LIST:
      return { ...state, userlist: action.payload };
    case ERROR_MSG:
      return {...state, msg: action.msg}
    default:
      return state;
  }
}

// action
function userList(data, type) {
  return {
    type: USER_LIST,
    payload: data,
  }
}


export function getUserList(type) {
  return async dispatch => {
    let res = null;
    try {
      res = await axios.get(`/user/list?type=${type}`)
      if (res.status === 200 && res.data.code === 0) {
        dispatch(userList(res.data.data));
      } else {
        dispatch(errorMsg(res.data.msg));
      }
    } catch (err) {
      dispatch(errorMsg(err.message));
    }
  }
}
