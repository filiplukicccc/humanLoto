import React, { Component } from 'react';
import {
  Link,
  Route,
  Switch,
} from 'react-router-dom';
import ItemDescription, { Container, Divider, Button, Grid } from 'semantic-ui-react'
import { Icon, Image as ImageComponent, Item } from 'semantic-ui-react'
import css from './home.css'
let arr = [
  ['22.1.2018', '2,4,12,34,16,43', 'Pera Peric', 'Rucak sa Anom', 'Zvecanska'],
  ['29.1.2018', '6,7,45,21,32,4,5', 'Mika Mikic', 'Rucak sa Acom', 'Dom']
]
let numbers = [23, 2, 23, 4, 5, 12, 32]
let numbers1 = [0, 0, 0, 0, 0, 0, 0]

class Home extends Component {
  constructor() {
    super();
    this.state = { 
      time: {},
      interval:null,
      start:""
    };
  }

  secondsToTime =()=> {
    var countDownDate = new Date("May 31, 2018 18:18:00").getTime();
    var now = new Date().getTime();
    var distance = countDownDate - now;
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    let obj = {
      "d": days,
      "h": hours,
      "m": minutes,
      "s": seconds,
      "distance": distance
    };
    this.setState({time:obj})
    if (this.state.time.distance <= 0) { 
      clearInterval(this.state.interval)
      this.setState({start:"Izvlacenje je pocelo!"})
  }
}

  componentWillMount() {
   this.countDown();
  }
  countDown =()=> {
    this.setState({ interval:setInterval(this.secondsToTime, 1000)})
  }

  render() {
    console.log("STATE",this.state)
    let number = numbers.map(item => {
      return <Item.Description className={css.numberDiv}>{item}</Item.Description>
    })
    let number1 = numbers1.map(item => {
      return <Item.Description className={css.numberDiv}>{item}</Item.Description>
    })
    return (
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column computer={8} className={css.voteDiv}>
              <h1>Pocetna</h1>
              <Item.Group>
                <Divider />
                <Item>
                  <Item.Content>
                    <Item.Header as='a'>Sledece izvlacenje:</Item.Header>
                    <Item.Description>Datum:22/11/2017</Item.Description>
                    <Item.Description>Pocinje za:{
                      this.state.time.distance < 0 ? 
                      <span>{this.state.start}</span> :
                      <span>
                      <span>{" "+this.state.time.d+" "+"dana"}</span>
                      <span>{" "+this.state.time.h+" "+"sata"}</span>
                      <span>{" "+this.state.time.m+" "+"minuta"}</span>
                      <span>{" "+this.state.time.s+" "+"sekundi"}</span>
                      </span>
                    }
                      </Item.Description>
                    <Item.Description className={css.numbersRow}>{number1}</Item.Description>
                  </Item.Content>
                </Item>
                <Divider />
                <Item>
                  <Item.Content>
                    <Item.Header>Predhodno izvlacenje:</Item.Header>
                    <Item.Description>Datum:22/11/2017</Item.Description>
                    <Item.Description>Kombinacija:</Item.Description>
                    <Item.Description className={css.numbersRow}>{number}</Item.Description>
                    <div className={css.subAwards}>
                      <Item.Description>Kome ide nagrada: Zvecanska</Item.Description>
                      <Item.Description>Dobitnik: Petar Petrovic,Beograd</Item.Description>
                    </div>
                  </Item.Content>
                </Item>
                <Divider />
              </Item.Group>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}
export default Home;