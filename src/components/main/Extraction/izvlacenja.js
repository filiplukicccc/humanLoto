import React, { Component } from 'react';
import ItemDescription, { Container, Divider, Button, Grid } from 'semantic-ui-react'
import { Icon, Image as ImageComponent, Item } from 'semantic-ui-react'
import css from './izvlacenja.css'

let arr = [
  ['22.1.2018', '2,4,12,34,16,43', 'Pera Peric', 'Rucak sa Anom', 'Zvecanska'],
  ['29.1.2018', '6,7,45,21,32,4,5', 'Mika Mikic', 'Rucak sa Acom', 'Dom']
]
let numbers= [23,2,23,4,5,12,32]

class Extraction extends Component {
  render() {
    let number=numbers.map(item=>{
      return <Item.Description className={css.numberDiv}>{item}</Item.Description>
    })
    console.log('niz', arr)
    return (
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column computer={8} className={css.voteDiv}>
            <h1>Izvlacenja</h1>
              <Item.Group>
               <Divider/>
                <Item>
                  <Item.Content>
                    <Item.Header as='a'>Izvlacenje broj 3</Item.Header>
                    <Item.Description>Datum:22/11/2017</Item.Description>
                    <Item.Description>Kombinacija:</Item.Description>
                    <Item.Description className={css.numbersRow}>{number}</Item.Description>
                    <Item.Description>Kome ide nagrada: Zvecanska</Item.Description>
                    <Item.Description floated='right'>Dobitnik: Petar petrovic </Item.Description>
                  </Item.Content>
                </Item>
                <Divider />
                <Item>
                  <Item.Content>
                    <Item.Header as='a'>Izvlacenje broj 2</Item.Header>
                    <Item.Description>Datum:22/11/2017</Item.Description>
                    <Item.Description>Kombinacija:</Item.Description>
                    <Item.Description className={css.numbersRow}>{number}</Item.Description>
                    <Item.Description>Kome ide nagrada: Petar Petrovic</Item.Description>
                  </Item.Content>
                </Item>
                <Divider />
                <Item>
                  <Item.Content>
                    <Item.Header as='a'>Izvlacenje broj 1</Item.Header>
                    <Item.Description>Datum:22/11/2017</Item.Description>
                    <Item.Description>Kombinacija:</Item.Description>
                    <Item.Description className={css.numbersRow}>{number}</Item.Description>
                    <Item.Description>Kome ide nagrada: Petar Petrovic</Item.Description>
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
export default Extraction;