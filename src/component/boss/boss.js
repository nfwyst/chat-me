import React from 'react';
import { connect } from 'react-redux';
import { getUserList } from '../../redux/chatuser.redux';
import ChatInfo from '../chatinfo/chatinfo';

@connect(state => state.chatuser, {getUserList})
class Boss extends React.Component {
  componentDidMount() {
    this.props.getUserList('genius');
  }
  render() {
    return (
      <ChatInfo userlist={this.props.userlist}/>
    )
  }
}

export default Boss;
