import React, { Component } from 'react';
import {
  Link,
  Route,
  Switch,
} from 'react-router-dom';
import { Container, Divider, Button, Grid, Input, TextArea } from 'semantic-ui-react'
import { Icon, Image as ImageComponent, Item } from 'semantic-ui-react'
import css from './award.css'

const paragraph = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur ullamcorper ultricies nisi."
let niz = [
  {
    name: 'Rucak sa Anom',
    tekst: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa strong. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede link mollis pretium. Integer tincidunt',
    glasova: 123
  },
  {
    name: 'Rucak sa Acom',
    tekst: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa strong. Cum sociis natoque penatibus et magnis dis parturient montes.',
    glasova: 86
  },
  {
    name: 'Rucak sa Slobom',
    tekst: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa strong. Cum sociis natoque penatibus et magnis dis parturient montes.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa strong. Cum sociis natoque penatibus et magnis dis parturient montes',
    glasova: 146
  }
]

class Award extends Component {
  constructor(props) {
    super(props);
    this.state = {
      awardName: '',
      awardDesc: '',
      gamesAdd: [],
    }
  }
  addGame = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  addAward = (name, desc) => {
    let gamesAdded = this.state.gamesAdd
    gamesAdded.push({
      nameAward: name,
      descriptionAward: desc,
    })
    this.setState({
      gamesAdd: gamesAdded
    })
  }
  count = (vote) => {
    let votes = vote + 1;
    console.log('vote',votes)
  }
  render() {
    let { gamesAdd } = this.state;
    console.log(this.state)
    return (
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column computer={10} className={css.awardList}>
              {/* <Container className={css.awardDiv} textAlign='Left'>
                <b>Zvecanska</b>
                <Divider />
                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa strong. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede link mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.</p>
                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa strong. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede link mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.</p>
              </Container>
              <Container textAlign='Left' className={css.awardDiv} >
                <b>Tirsova</b>
                <Divider />
                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa strong. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede link mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.</p>
                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa strong. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede link mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.</p>

              </Container>
              <Container textAlign='Left' className={css.awardDiv}>
                <b>Petar Petrovic</b>
                <Divider />
                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa strong. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede link mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.</p>
                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa strong. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede link mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.</p>
              </Container> */}
            </Grid.Column>
            <Grid.Column computer={5} className={css.voteDiv}>
              <h2>Predlozite nagradu</h2>
              <span>Naziv nagrade: </span><Input name='awardName' value={this.state.awardName} onChange={this.addGame} /><br />
              <span>Opis nagrade: </span><TextArea name='awardDesc' value={this.state.awardDesc} onChange={this.addGame} autoHeight />
              <Button circular onClick={() => this.addAward(this.state.awardName, this.state.awardDesc)}>+</Button>
              <Item.Group>
                <Item>
                  <Item.Content>
                    {
                      gamesAdd.map((item) => {
                        return (
                          <div>
                            <Item.Header as='a'>{item.nameAward}</Item.Header>
                            <Item.Description>{item.descriptionAward}</Item.Description>
                            <Item.Extra>
                              <Icon color='green' name='check' />Glasova: 
                              <Button floated='right'>Glasaj</Button>
                            </Item.Extra>
                          </div>
                        )
                      })
                    }
                    {niz.map((item => {
                      return (
                        <div>
                          <Item.Header as='a'>{item.name}</Item.Header>
                          <Item.Description>{item.tekst}</Item.Description>
                          <Item.Extra>
                            <Icon color='green' name='check' />Glasova: {item.glasova}
                            <Button floated='right' onClick={() => this.count(item.glasova)} >Glasaj</Button>
                          </Item.Extra>
                        </div>
                      )
                    }))
                    }
                  </Item.Content>
                </Item>
                <Divider />
                {/* <Item>
                  <Item.Content>
                    <Item.Header as='a'>2.Tirsova</Item.Header>
                    <Item.Description>{paragraph}</Item.Description>
                    <Item.Extra>
                      <Icon color='green' name='check' /> 90 Votes <Button floated='right'>
                        Glasaj
                     </Button></Item.Extra>
                  </Item.Content>
                </Item>
                <Divider />
                <Item>
                  <Item.Content>
                    <Item.Header as='a'>3.Petar Petrovic</Item.Header>
                    <Item.Description>{paragraph}</Item.Description>
                    <Item.Extra>
                      <Icon color='green' name='check' /> 70 Votes <Button floated='right'>
                        Glasaj
                     </Button></Item.Extra>
                  </Item.Content>
                </Item>
                <Divider /> */}
              </Item.Group>
            </Grid.Column>
          </Grid.Row>

        </Grid>
      </div>
    )
  }
}
export default Award;