import React from 'react';
import { List, InputItem, WingBlank, NavBar, WhiteSpace, Icon } from 'antd-mobile';
import { connect } from 'react-redux';
import { sendMsg, clearUnread, getMsgList, recvMsg } from '../../redux/chat.redux';

@connect(state => state, { sendMsg, clearUnread, getMsgList, recvMsg })
class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: '', loaded: false};
  }

  componentDidUpdate() {
    if (!this.props.chat.chatmsg.length && this.props.user._id && !this.state.loaded) {
      this.props.getMsgList(this.props.user._id);
      this.props.recvMsg(this.props.user._id);
      this.setState({
        loaded: true
      });
    }
  }

  componentDidMount() {
    this.props.clearUnread({
      from: this.props.match.params.user
    });
    // socket.on("recvmsg", data => {
    //   this.setState({
    //     msg: [...this.state.msg, data.text]
    //   });
    // });
  }

  handleSubmit() {
    // socket.emit('sendmsg', { text: this.state.text });
    // this.setState({text: ''})
    const from = this.props.user._id;
    const to = this.props.match.params.user;
    const msg = this.state.text;
    this.props.sendMsg({ from, to, msg});
    this.setState({ text: ''});
  }

  render() {
    const user = this.props.match.params.user;
    const me = this.props.user._id;
    return (
      <div id="chat-page">
        <NavBar icon={<Icon type="left"/>} onLeftClick={() => {this.props.history.goBack()}} mode="dark" className="fix-header">
          {this.props.chat.users[user] ? this.props.chat.users[user].name : null}
        </NavBar>
        <WhiteSpace />
        <div className="chat-content">
          <WingBlank>
            {this.props.chat.chatmsg.filter(m => (m.from === user && m.to === me) || (m.from === me || m.to === user) ).map((v, index) => {
              let lthumb = null;
              let rthumb = null;
              if(this.props.chat.users && this.props.chat.users[user]) {
                try {
                  lthumb = require(`../img/${this.props.chat.users[user].avatar}.png`);
                } catch(e) {
                  lthumb = require(`../img/${this.props.chat.users[user].avatar}.jpg`);
                }
              }
              try {
                rthumb = require(`../img/${this.props.user.avatar}.png`);
              } catch(e) {
                rthumb = require(`../img/${this.props.user.avatar}.jpg`);
              }
              return v.from===user ? (
                <List key={`v._id${index}`}>
                  <List.Item thumb={lthumb}>{v.content}</List.Item>
                </List>
              ) :  (
                <List key={`v._id${index}`}>
                  <List.Item
                    extra={<img src={rthumb} />}
                    className="chat-me"
                  >
                  {v.content}
                  </List.Item>
                </List>
              );
            })}
          </WingBlank>
        </div>
        <WhiteSpace />
        <div className="stick-footer">
          <List>
            <InputItem
              placeholder="请输入"
              value={this.state.text}
              onChange={v => this.setState({text: v})}
              extra={<span onClick={() => this.handleSubmit()}>发送</span>}
            />
          </List>
        </div>
      </div>
    )
  }
}

export default Chat;
