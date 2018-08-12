import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, Badge } from 'antd-mobile';

@connect(state => state, { })
class Msg  extends Component {
  // 获取最近一次聊天信息
  getLatest(arr) {
    return arr.reduce((i, n) => {
      if ( i.create_time <= n.create_time ) {
        return n;
      } else {
        return i;
      }
    });
  }
  render() {
    const group = {};
    this.props.chat.chatmsg.forEach(item => {
      group[item.chatid] = group[item.chatid] || [];
      group[item.chatid].push(item);
    });
    // 最新的消息总是在最上面
    const chatList = Object.values(group).sort((a, b) => {
      const al = this.getLatest(a);
      const bl = this.getLatest(b);
      return bl.create_time - al.create_time;
    });
    return (
      <div>
          {
            chatList.map(i => {
              const latest = this.getLatest(i);
              const id = latest.from === this.props.user._id ? latest.to : latest.from;
              let avatar = this.props.chat.users[id].avatar;
              const unreadNum = i.filter(i => !i.read && i.to === this.props.user._id).length;
              try {
                avatar = require(`../img/${avatar}.jpg`);
              } catch (err) {
                avatar = require(`../img/${avatar}.png`);
              }
              return (
              <List
              key={latest._id}
              onClick={() => {
                this.props.history.push(`/chat/${id}`);
              }}
              >
                <List.Item
                thumb={avatar}
                extra={<Badge text={unreadNum}></Badge>}
                arrow="horizontal"
                >
                  {this.props.chat.users[id].name}
                  <List.Item.Brief>
                    {latest.content}
                  </List.Item.Brief>
                </List.Item>
              </List>
              )
            })
          }
      </div>
    );
  }
}

export default Msg ;
