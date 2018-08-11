import axios from 'axios';
import io from "socket.io-client";
const socket = io("ws://localhost:3300");

const MSG_LIST = Symbol('MSG_LIST');
const MSG_RECV = Symbol('MSG_RECV');
const MSG_READ = Symbol('MSG_READ');
const CLEAR = Symbol('CLEAR');

const creaters = {
  msgList({ msgs, users }, id) {
    return {
      type: MSG_LIST,
      payload: { msgs, users },
      id
    }
  },
  msgRecv(msg, id) {
    return {
      type: MSG_RECV,
      payload: msg,
      id
    }
  },
  read(data) {
    return {
      type: CLEAR,
      payload: data
    }
  }
}

const initState = {
  chatmsg: [],
  users: {},
  unread: 0
}

export function chat(state = initState, action) {
  switch (action.type) {
    case MSG_LIST:
      return {...state, users: action.payload.users, chatmsg: action.payload.msgs, unread: action.payload.msgs.filter(i => !i.read && i.from !== action.id).length}
    case MSG_RECV:
      const pls = action.id === action.payload.from ? 0 : 1;
      return {...state, chatmsg: [...state.chatmsg, action.payload], unread: state.unread + pls}
    case MSG_READ:
      return {...state}
    default:
      return state;
  }
}

export function recvMsg(id) {
  return dispatch => {
    socket.on('recvmsg', (data) => {
      dispatch(creaters.msgRecv(data, id));
    });
  }
}

export function getMsgList(id) {
  return async dispatch => {
    let res = null;
    if(!id) return false;
    try {
      res = await axios.get('/user/msglist')
      if(res && res.status === 200 && res.data.code === 0) {
        dispatch(creaters.msgList(res.data, id));
      }
    } catch (err) {
      console.error(err.message);
    }
  }
}

export function sendMsg({ from, to, msg }) {
  return async dispatch => {
    socket.emit('sendmsg', {from, to, msg});
  }
}

export function clearUnread({ from }) {
  return async dispatch => {
    let res = null;
    try {
      res = await axios.post('/user/readed', {from});
      if (res && res.status === 200 && res.data.code === 0) {
       dispatch(creaters.read(res.data.msg));
      }
    } catch (err) {
      console.error(err.message);
    }
  }
}
