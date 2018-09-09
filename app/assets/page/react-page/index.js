import React from 'react';
import render, { hideInitLoading } from '../render';

function Login() {
  return (
    <React.Fragment>
      <h1>登录</h1>
      <p>这是React渲染的页面</p>
    </React.Fragment>
  );
}

class LoginContainer extends React.Component {
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

    return (<Login />);
  }
}

render(LoginContainer);
