import React from 'react';
import { connect } from 'react-redux';
import { Result, List, WhiteSpace, Button, WingBlank, Modal } from 'antd-mobile';
import browserCookie from 'browser-cookies';
import { logoutSubmit } from '../../redux/user.redux';
import { Redirect } from 'react-router-dom';

@connect(state => state.user, { logoutSubmit })
class User extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }
  logout() {
    const alert = Modal.alert;
    alert('注销', '确认退出登录吗?', [
      { text: '取消', onPress: () => console.log('cancel') },
      { text: '确认', onPress: () => {
        browserCookie.erase('userid');
        this.props.logoutSubmit();
      }}
    ]);
  }
  render() {
    let imgPath = null;
    try {
      imgPath = require(`../img/${this.props.avatar}.jpg`);
    } catch (e) {
      try {
        imgPath = require(`../img/${this.props.avatar}.png`);
      } catch (e) {
        imgPath = null;
      }
    }
    return this.props.user ? (
      <div>
        <Result
        img={<img style={{width: '100%'}} src={imgPath} alt="用户头像"/>}
        title={this.props.user}
        message={this.props.type === 'boss' ? this.props.company : null}
        />
        <List renderHeader={() => '简介'}>
          <List.Item multipleLine>
            {this.props.title}
            {this.props.desc ? this.props.desc.split('/n').map(item => <List.Item.Brief key={item}>{item}</List.Item.Brief>) : null}
            {this.props.money ? <List.Item.Brief>薪资: {this.props.money}</List.Item.Brief> : null}
          </List.Item>
        </List>
        <WhiteSpace />
        <WingBlank>
          <WhiteSpace />
          <Button className="logout-btn" type="primary" onClick={this.logout}>
            退出登录
          </Button>
        </WingBlank>
      </div>
    ) : this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null;
  }
}

export default User;
