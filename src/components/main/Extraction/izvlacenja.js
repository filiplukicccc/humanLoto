import React, { Component } from 'react';

let arr = [
  ['22.1.2018', '2,4,12,34,16,43', 'Pera Peric', 'Rucak sa Anom', 'Zvecanska'],
  ['29.1.2018', '6,7,45,21,32,4,5', 'Mika Mikic', 'Rucak sa Acom', 'Dom']
]

class Extraction extends Component {
  render() {
    console.log('niz', arr)
    return (
      <div>
        <h1>Izvlacenja</h1>
       { arr.map((item) => {
          return (
            <div>
              <p>Datum: {item[0]}</p>
              <p>Kombinacija: {item[1]}</p>
              <p>Dobitnik: {item[2]}</p>
              <p>Nagrada: {item[3]}</p>
              <p>Kome ide nagrada: {item[4]}</p><br /><br />
            </div>
          )
        })
        }
      </div>
    )
  }
}
export default Extraction;