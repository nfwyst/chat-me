import React from 'react';
import { TextareaItem, NavBar, InputItem, WingBlank, List, WhiteSpace, Button } from 'antd-mobile';
import AvatarSelector from '../../component/avatar-selector/avatar-selector.js';
import { connect } from 'react-redux';
import { update } from '../../redux/user.redux';
import { Redirect } from 'react-router-dom';
@connect(
  state => state.user,
  { update }
)
class GeniusInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      desc: '',
      avatar: '',
    }
  }
  onChange(key, v) {
    this.setState({
      [key]: v
    });
  }
  render() {
    return (
      <div>
        {this.props.redirectTo && this.props.redirectTo !== this.props.location.pathname ? <Redirect to={this.props.redirectTo}></Redirect> : null}
        <WingBlank>
          <NavBar mode="dark">牛人 完善信息</NavBar>
          <WhiteSpace />
          <AvatarSelector selectAvatar={(name) => {
            this.setState({
              avatar: name
            });
          }}></AvatarSelector>
          <WhiteSpace />
          <List>
            <InputItem onChange={v => this.onChange('title', v)}>
              求职岗位
            </InputItem>
            <TextareaItem
              onChange={v => this.onChange('desc', v)}
              rows={3}
              autoHeight
              title="求职简介"
            >
            </TextareaItem>
          </List>
          <Button type="primary" onClick={() => {
            this.props.update(this.state);
          }}>保存</Button>
        </WingBlank>
      </div>
    )
  }
}

export default GeniusInfo;
