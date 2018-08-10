import React from "react";
import Logo from "../../component/logo/logo";
import { List, Radio, InputItem, WingBlank, WhiteSpace, Button } from "antd-mobile";
import { connect } from 'react-redux';
import { register } from '../../redux/user.redux';
import { Redirect } from 'react-router-dom';
import formWrapper from '../../component/formWrapper/formWrapper';

@connect(state => state.user,{ register })
@formWrapper
class Register extends React.Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
  }
  componentDidMount() {
    this.props.handleChange('type', 'genius');
  }
  handleRegister() {
    this.props.register(this.props.state);
  }
  render() {
    const RadioItem = Radio.RadioItem;
    return (<div>
        { this.props.redirectTo ? <Redirect to={this.props.redirectTo}></Redirect> : null}
        <Logo />
        <WingBlank>
          <List>
            { this.props.msg ? <p className="error-msg">{this.props.msg}</p> : ''}
            <InputItem onChange={v => this.props.handleChange('user', v)} placeholder="用户名" />
            <InputItem type="password" onChange={v => this.props.handleChange('pwd', v)} placeholder="密码" />
            <InputItem type="password" onChange={v => this.props.handleChange('repeatpwd', v)} placeholder="确认密码" />
          </List>
          <WhiteSpace />
          <List>
            <RadioItem
             checked={this.props.state.type === "genius"}
             onChange={() => this.props.handleChange('type', 'genius')}
            >牛人</RadioItem>
            <RadioItem
             onChange={() => this.props.handleChange('type', 'boss')}
             checked={this.props.state.type === "boss"}>Boss</RadioItem>
          </List>
          <WhiteSpace />
          <Button onClick={this.handleRegister} type="primary">注册</Button>
          <WhiteSpace />
        </WingBlank>
    </div>);
  }
}

export default Register;
