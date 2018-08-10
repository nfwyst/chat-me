import React from 'react';
import { Grid, List } from 'antd-mobile';
import PropTypes from 'prop-types';
class AvatarSelector extends React.Component {
  static propTypes = {
    selectAvatar: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      icon: '',
      text: '',
    };
  }
  render() {
    const avatars = '1,2,3,4'.split(',').map(text => {
      let icon;
      try {
        icon = require(`../img/${text}.jpg`)
      } catch(e) {
        icon = require(`../img/${text}.png`)
      }
      return {icon, text}
    });
    const header = this.state.icon ? (<div className="select-avatar-header"><span>已选择头像</span><img style={{width: 30}} src={this.state.icon} alt="当前选择的头像"/></div>) : '请选择头像';
    return (
      <div>
        <List renderHeader={() => header}>
          <Grid data={avatars} columnNum={5} onClick={e => {
            this.setState(e);
            this.props.selectAvatar(e.text);
          }}/>
        </List>
      </div>
    )
  }
}

export default AvatarSelector;
