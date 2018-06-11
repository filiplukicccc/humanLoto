import React, { Component } from 'react'
import GoogleLogin from 'react-google-login'
import gql from "graphql-tag"
import { graphql } from "react-apollo"
import { connect } from 'react-redux';

@graphql(
	gql`
      mutation user_gLogin($gToken: String!) {
        user_gLogin(gToken: $gToken) {
          id
          username
          email
          channel
          token
          error
        }
      }
    `,
	{
		name: "user_gLogin"
	}
)
@connect(state => ({ token: state.token }))

class GLogin extends Component {
	responseGoogle = (e) => {
		this.sendGoogleId(e.accessToken)
	}
	sendGoogleId = async (gToken) => {
		const response = await this.props.user_gLogin({
			variables: {
				gToken
			}
		})
		const { user_gLogin } = response.data || {}
		if (user_gLogin.token != null) {
			this.props.dispatch({
				type: "ADD_TOKEN",
				token: user_gLogin.token,
				username: user_gLogin.username
			})
			const obj = {
				token: user_gLogin.token,
				username: user_gLogin.username
			}
			window.localStorage.setItem('info', JSON.stringify(obj))
			window.location.reload()
		}
	}
	render() {
		return (
			<div>
				<GoogleLogin
					clientId="336354050197-f5jtnsqjr0eorhd8cd0b1arpa77ravs1.apps.googleusercontent.com"
					buttonText="Google Login"
					onSuccess={this.responseGoogle}
				/>
			</div>
		)
	}
}
export default GLogin;
