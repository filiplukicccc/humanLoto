import React, { Component } from 'react'
import FacebookLogin from 'react-facebook-login';
import gql from "graphql-tag"
import { graphql } from "react-apollo"
import { connect } from 'react-redux';
@connect(state => ({ token: state.token }))

@graphql(
	gql`
      mutation user_fbLogin($fbToken: String!) {
        user_fbLogin(fbToken: $fbToken) {
          token
          error
          username
        }
      }
    `,
	{
		name: "user_fbLogin"
	}
)

class FbLogin extends Component {

	responseFacebook = e => {
		this.sendFbId(e.accessToken)
	}
	sendFbId = async (fbToken) => {
		const response = await this.props.user_fbLogin({
			variables: {
				fbToken
			}
		})
		const {user_fbLogin} = response.data || {}
		if(user_fbLogin.token != null) {
			this.props.dispatch({
				type: "ADD_TOKEN",
				token: user_fbLogin.token,
				username: user_fbLogin.username
			})
			const obj = {
				token: user_fbLogin.token,
				username: user_fbLogin.username
			}
			window.localStorage.setItem('info', JSON.stringify(obj))
			window.location.reload()
		}
	}
	render() {
		return (
			<div>
				<FacebookLogin
					appId="151650115563827"
					autoLoad={false}
					fields="name,email,picture"
					callback={this.responseFacebook}
				/>
			</div>
		)
	}
}

export default FbLogin;
