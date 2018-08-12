import React from 'react';
import { NavBar } from 'antd-mobile';
import { connect } from 'react-redux';
import  NavLinkBar from '../navlink/navlink';
import { Switch, Route } from 'react-router-dom';
import Boss from '../../component/boss/boss';
import Genius from '../../component/genius/genius';
import { Redirect } from 'react-router-dom';
import User from '../../component/user/user';
import Msg from '../../component/msg/msg';
import { getMsgList, recvMsg } from "../../redux/chat.redux";

const filters = ['/boss', '/genius'];

@connect(state => state, { getMsgList, recvMsg })
export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loaded: false };
  }

  componentDidUpdate() {
    if(!this.state.loaded) {
      const { user } = this.props;
      this.props.getMsgList(user._id);
      this.props.recvMsg(user._id);
      this.setState({ loaded: true });
    }
  }

  render() {
    const { pathname } = this.props.location;
    const { user } = this.props;
    let distPath = null;
    if (user.type && filters.includes(pathname) && `/${user.type}` !== pathname) {
      distPath = filters.find(item => item !== pathname);
    }
    const navlist = [{
        path: '/boss',
        text: '牛人',
        icon: 'boss',
        title: '牛人列表',
        component: Boss,
        hide: user.type === 'genius',
      },{
        path: '/genius',
        text: 'boss',
        icon: 'genius',
        title: 'boss 列表',
        component: Genius,
        hide: user.type === 'boss',
      },{
        path: '/msg',
        text: '消息',
        icon: 'msg',
        title: '消息列表',
        component: Msg
    },{
        path: '/me',
        text: '我',
        icon: 'user',
        title: '个人中心',
        component: User,
    }];
    const nav = navlist.find(item => item.path === pathname);
    return (
      <div>
        {distPath ? <Redirect to={distPath}></Redirect> : null}
        { user && user.user ? <NavBar className="fix-header" mode="dark">{nav ? nav.title : null}</NavBar> : null }
        <div style={{ marginTop: 45, marginBottom: 50, overflow: 'scroll', height: 'calc(100vh - 45px - 50px)'}} >
          <Switch>
            { navlist.filter(i => !i.hide).map(v => (<Route key={v.path} path={v.path} component={v.component} />) ) }
          </Switch>
        </div>
        { user && user.user ? <NavLinkBar data={navlist}></NavLinkBar> : null }
      </div>
    );
  }
};
