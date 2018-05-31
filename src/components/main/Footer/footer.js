import React, { Component } from 'react';
import { Menu, Grid,Divider } from 'semantic-ui-react'
import { Redirect, history } from 'kit/lib/routing'
import sponsor from '../../images/aerodrom.png'
import css from './footer.css'


class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }


    render() {
        return (
            <Grid className={css.main}>
                <Grid.Row>
                <Grid.Column computer={1}>
                    </Grid.Column>
                    <Grid.Column computer={3}>
                      <p className={css.footerHeadline}>Humani loto</p>
                      <div className={css.linksDiv}>
                        <p>O nama</p>
                        <p>Kako ucestvovati?</p>
                        <p>Nagdrade</p>
                      </div>
                      <Divider section />
                    </Grid.Column>
                    <Grid.Column computer={3}>
                      <p className={css.footerHeadline}>Igra</p>
                      <div className={css.linksDiv}>
                        <p>O nama</p>
                        <p>Kako ucestvovati?</p>
                        <p>Nagrade</p>
                      </div>
                      <Divider section />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column computer={1}/>
                  <Grid.Column computer={14}>
                  <p>Nasi sponzori:</p>
                  <div className={css.sponsorDiv}>
                    <img className={css.sponsorImg} src={sponsor}/>
                    <img className={css.sponsorImg} src={sponsor}/>
                    <img className={css.sponsorImg} src={sponsor}/>
                    <img className={css.sponsorImg} src={sponsor}/>
                    <img className={css.sponsorImg} src={sponsor}/>
                    <img className={css.sponsorImg} src={sponsor}/>
                    </div>
                    <Divider section />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row centered columns={4}>
                  <Grid.Column>
                    <p>© Cybele Technologies 2017 | All right reserved</p>
                  </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}
export default Footer