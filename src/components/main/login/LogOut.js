import React, { Component } from 'react';
import {
	Button,
	Dropdown,
	Image
} from 'semantic-ui-react';
import { connect } from 'react-redux';

@connect(state => ({ token: state.token }))

class LogOut extends Component {
	logOut = () => {
		this.props.dispatch({
			type: 'ADD_TOKEN',
			token: '',
			username: ''
		})
		window.localStorage.removeItem('info')
		window.location.reload()
	}
	render() {
		return (
			<div>
				<Button onClick={this.logOut}>
					LogOut
        </Button>
			</div>
		)
	}
}
export default LogOut;