import React, { Component } from 'react';
import {
    Link,
    Route,
    Switch,
} from 'react-router-dom';
import { Form, Segment } from 'semantic-ui-react'
import css from './register.css'


class Register extends Component {
    constructor(props){
        super(props);
          this.state = {
            // name:"",
            // lastName:"",
            // phone:"",
            // address:"",
            // city:""
          }
    }
    handleChange = (e, { name, value }) => this.setState({ [name]: value })
    // handleSubmit = () => this.setState({ email: '', name: '' })
    render() {
      console.log("STATE",this.state)
        return (
            <div>
                <h1 className={css.loginHeader}>Kreirajte Vas nalog</h1>
                <Segment compact className={css.loginDiv}>

                    <Form>
                        <Form.Group widths='equal'>
                            <Form.Input fluid name="name" label='Ime' placeholder='Ime' onChange={this.handleChange} />
                            <Form.Input fluid name="lastName" label='Prezime' placeholder='Prezime' onChange={this.handleChange} />
                        </Form.Group>
                        <Form.Group widths='equal'>
                            <Form.Input fluid name = "phone" label='Broj telefona' placeholder='Telefon' onChange={this.handleChange} />
                            <Form.Input fluid name = "address" label='Adresa' placeholder='Ulica i broj' onChange={this.handleChange}/>
                            <Form.Input fluid name = "city" label='Grad' placeholder='Grad' onChange={this.handleChange} />
                        </Form.Group>
                        <Form.Button>Submit</Form.Button>
                    </Form>
                </Segment>
            </div>
        )
    }
}
export default Register