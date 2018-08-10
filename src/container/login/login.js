import React from 'react';
import Logo from '../../component/logo/logo';
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile';
import { login, clearRedirect } from '../../redux/user.redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import formWrapper from '../../component/formWrapper/formWrapper';

@connect(state => state.user, { login, clearRedirect })
@formWrapper
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.props.clearRedirect();
    this.register = this.register.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }
  register() {
    this.props.history.push('/register');
  }
  handleLogin() {
    this.props.login(this.props.state);
  }
  render() {
    return (<div>
        {this.props.redirectTo && this.props.redirectTo !== this.props.location.pathname ? <Redirect to={this.props.redirectTo}></Redirect> : null}
        <Logo />
        <WingBlank>
          {this.props.msg ? <p className="error-msg">{this.props.msg}</p> : ''}
          <List>
            <InputItem onChange={v => this.props.handleChange('user', v)} placeholder="用户名"/>
            <InputItem type="password" onChange={v => this.props.handleChange('pwd', v)} placeholder="密码" />
          </List>
          <WhiteSpace />
          <WhiteSpace />
          <Button onClick={this.handleLogin} type="primary">登录</Button>
          <WhiteSpace />
          <Button type="primary" onClick={this.register}>
            注册
          </Button>
        </WingBlank>
    </div>);
  }
}

export default Login;
