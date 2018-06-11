import React, { Component } from 'react';
import {
  Link,
  Route,
  Switch,
} from 'react-router-dom';
import { connect } from 'react-redux';
import TokenHoc from '../../hoc/TokenHoc';

@connect(state => ({ token: state.token }))
@TokenHoc

class Home extends Component {
  checkIfTabIsActive = () => {
    if(window.localStorage.getItem('info') == null) {
      this.props.dispatch({
        type: 'ADD_TOKEN',
        token: '',
        username: ''
      })
    }
  }
  componentWillMount(){
    if(this.props.token.token != "") {
       {token: this.props.token.token}
    }
    window.addEventListener('storage', this.checkIfTabIsActive)
    
  }
  render() {
    return (
      <div>
        <h1>Pocetna hello {this.props.token.username}</h1>
      </div>
    )
  }
}
export default Home;