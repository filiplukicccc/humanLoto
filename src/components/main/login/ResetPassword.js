import React, { Component } from 'react'
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import {  Input, Button } from 'semantic-ui-react'


@graphql(
  gql`
      mutation user_resetPassword($email: String!) {
        user_resetPassword(email: $email){
          error
        }
      }
    `,
  {
    name: "reset_password"
  }
)

class ForgotPassword extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: ''
		}
	}
	emailChange = (e) => {
		this.setState({
			[e.target.name] : e.target.value
		})
	}
	passwordReset = async () => {
		const response = await this.props.reset_password({
			variables: {
				email: this.state.email
			}
		})
		console.log('respon',response)
	}
	render() {
		console.log('st',this.state)
		return (
			<div>
				<p>Forgot Password</p>
				<Input placeholder='Unesite e-mail' name='email' value={this.state.email} onChange={this.emailChange} /><br />
				<Button onClick={this.passwordReset} style={{marginBottom: '30px'}}>Posalji zahtev</Button>
			</div>
		)
	}
}

export default ForgotPassword;
