import React from 'react';
import render, { hideInitLoading } from '../render';

function UserEdit() {
    return (
        <React.Fragment>
            <h1>编辑用户资料</h1>
            <p>这是React渲染的页面</p>
        </React.Fragment>
    );
}

class UserEditContainer extends React.Component {
  state = {
      loading: true,
  };

  componentDidMount() {
      setTimeout(() => {
          this.setState({ loading: false });
          hideInitLoading();
      }, 800);
  }

  render() {
      if (this.state.loading) return null;

      return (<UserEdit />);
  }
}

render(UserEditContainer);
