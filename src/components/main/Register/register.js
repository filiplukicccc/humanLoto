import React, { Component } from 'react';
import {
    Link,
    Route,
    Switch,
} from 'react-router-dom';
import { Form, Segment } from 'semantic-ui-react'
import css from './register.css'


class Register extends Component {
    render() {
        return (
            <div>
                <h1 className={css.loginHeader}>Kreirajte Vas nalog</h1>
                <Segment compact className={css.loginDiv}>

                    <Form>
                        <Form.Group widths='equal'>
                            <Form.Input fluid label='Ime' placeholder='Ime' />
                            <Form.Input fluid label='Prezime' placeholder='Prezime' />
                        </Form.Group>
                        <Form.Group widths='equal'>
                            <Form.Input fluid label='Broj telefona' placeholder='Telefon' />
                            <Form.Input fluid label='Adresa' placeholder='Ulica i broj' />
                            <Form.Input fluid label='Grad' placeholder='Grad' />
                        </Form.Group>
                        <Form.Button>Submit</Form.Button>
                    </Form>
                </Segment>
            </div>
        )
    }
}
export default Register