import React from 'react'
import { connect } from 'react-redux';
import { Loader, Dimmer, Segment } from 'semantic-ui-react'
import checkToken from '../functions/checkToken'

function TokenHoc(Component, props) {
	return class extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				token: {}
			};
		}
		returnProps = (token) => {
			let response = checkToken(token)
			this.setState({
				token: response
			})
			if (response.token != '') {
				this.props.dispatch({
					type: 'ADD_TOKEN',
					token: response.token,
					username: response.username
				})
			}
		}
		componentDidMount() {
			this.returnProps(this.props.token)
		}
		render() {
			return (
				<Component {...this.props} token={this.state.token} />
			)
		}
	}
}

export default TokenHoc;
