import React, { Component } from 'react';
import {
  Button,
  Input,
  Modal
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import css from './loginUser.css';
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import sha256 from 'sha256';
import { connect } from 'react-redux';
import LogOut from '../login/LogOut'
import TokenHoc from '../../hoc/TokenHoc';
import GLogin from '../login/GoogleLogin';
import FbLogin from '../login/FbLogin';
import { Redirect, history } from 'kit/lib/routing';


@graphql(
  gql`
      mutation user_login($username: String! $password: String!) {
        user_login(username: $username password: $password ) {
          token
          error
          username
        }
      }
    `,
  {
    name: "user_login"
  }
)
@connect(state => ({ token: state.token }))

class LoginUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      username: '',
      password: ''
    };
    // this.baseState = { ...this.state }
  }
  change = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  logInUser = async () => {
    let response = await this.props.user_login({
      variables: {
        username: this.state.username,
        password: sha256(this.state.password)
      }
    })
    let { user_login } = response.data || {}
    if (user_login.token != null) {
      this.props.dispatch({
        type: "ADD_TOKEN",
        token: user_login.token,
        username: user_login.username
      })
      let obj = {
        token: user_login.token,
        username: user_login.username
      }
      window.localStorage.setItem('info', JSON.stringify(obj))
      window.location.reload()
    }
  }
  show = size => () => this.setState({ size, open: true })
  close = (e) => this.setState({ open: false })
  changeRoute = (url) => {
    history.push(url);
  }
  render() {
    const { open, size } = this.state;
    return (
      <div>
        <Button onClick={this.show('mini')}>
          Login
        </Button>
        {/* <LogOut /> */}
        <Modal className={css.loginModal} size={size} open={open} onClose={this.close}>
          <Modal.Header>
            Log In
          </Modal.Header>
          <Input name='username' value={this.state.username} onChange={this.change} icon='users' iconPosition='left' placeholder='Username...' />< br />
          <Input name='password' value={this.state.password} onChange={this.change} icon='lock' iconPosition='left' placeholder='Password...' /><br />
          <Button onClick={this.logInUser}>Login</Button>
          <GLogin />
          <FbLogin />
          <Link onClick={this.close} to='/resetuj_sifru'>
            Forgot pass
          </Link>
        </Modal>
      </div>
    )
  }
}
export default LoginUser;