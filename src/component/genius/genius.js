import React from 'react';
import { connect } from 'react-redux';
import { getUserList } from '../../redux/chatuser.redux';
import ChatInfo from '../chatinfo/chatinfo';

@connect(state => state.chatuser, { getUserList })
class Genius extends React.Component {
  componentDidMount() {
    this.props.getUserList('boss');
  }
  render() {
    return (
      <ChatInfo userlist={this.props.userlist}/>
    )
  }
}

export default Genius;
