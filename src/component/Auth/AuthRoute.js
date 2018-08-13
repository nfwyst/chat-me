import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { storeUserInfo } from '../../redux/user.redux';
import axios from 'axios';

@withRouter
@connect(
  null,
  { storeUserInfo }
)
class AuthRoute extends React.Component {
  async componentDidMount() {
    const publicList = ['/login', '/register'];
    const pathName = this.props.location.pathname;
    if (publicList.includes(pathName)) return null;
    let res = null;
    try {
      res = await axios.get('/user/info');
      if(res.status === 200 && res.data.code === 0) {
        this.props.storeUserInfo(res.data.data);
      } else {
        this.props.history.push('/login');
      }
    } catch (err) {
      this.props.history.push('/login');
    }
  }

  render() {
    return null;
  }
}

export default AuthRoute;
