import React from 'react';
import { Card, WhiteSpace, WingBlank } from 'antd-mobile';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { clearRedirect } from '../../redux/user.redux';
import { withRouter } from 'react-router-dom';

@withRouter
@connect(null, { clearRedirect })
class ChatInfo extends React.Component {
  static propTypes = {
    userlist: PropTypes.array.isRequired,
  }
  constructor(props) {
    super(props);
    this.props.clearRedirect();
  }
  handleClick(user) {
    this.props.history.push(`/chat/${user._id}`);
  }
  render() {
    const userlist = this.props.userlist;
    return (
      <WingBlank>
        <WhiteSpace />
        {userlist.map(i => {
          let avatar = null;
          try {
            avatar = i.avatar ? require(`../img/${i.avatar}.jpg`) : null;
          } catch (e) {
            avatar = i.avatar ? require(`../img/${i.avatar}.png`) : null;
          }
          return avatar ? (<div key={i._id}>
          <Card onClick={() => this.handleClick(i)}>
            <Card.Header
              title={i.user}
              thumb={avatar}
              extra={<span>{i.title}</span>}
            >
            </Card.Header>
            <Card.Body>
              <WhiteSpace />
              {i.type === 'boss' ? <div style={{fontWeight: 'bold'}}>公司名称: {i.company}</div> : null}
              <WhiteSpace />
              {i.desc.split('\n').map(i => (<div key={i}>{i}</div>))}
              <WhiteSpace />
              {i.type === 'boss' ? <div>薪资: {i.money}</div> : null}
              <WhiteSpace />
            </Card.Body>
          </Card><WhiteSpace /></div>) : null;
        })}
      </WingBlank>
    )
  }
}

export default ChatInfo;
