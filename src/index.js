import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './config';
import Login from './container/login/login';
import Register from './container/register/register';
import AuthRoute from './component/Auth/AuthRoute';
import './index.css';
import BoosInfo from './container/boosinfo/boosinfo';
import GeniusInfo from './container/geniusinfo/geniusinfo';
import Dashboard from './component/dashboard/dashboard';
import Chat from './component/chat/chat';
const store = createStore(reducers, compose(
  applyMiddleware(thunkMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : i => i
));

ReactDOM.render(<Provider store={store}>
  <BrowserRouter>
    <div>
      <AuthRoute></AuthRoute>
      <Switch>
        <Route path='/geniusinfo' component={GeniusInfo}></Route>
        <Route path='/login' component={Login}></Route>
        <Route path='/register' component={Register}></Route>
        <Route path='/bossinfo' component={BoosInfo}></Route>
        <Route path='/chat/:user' component={Chat}></Route>
        <Route component={Dashboard}></Route>
      </Switch>
    </div>
  </BrowserRouter>
</Provider>, document.getElementById('root'));
