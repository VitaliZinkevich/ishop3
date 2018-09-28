import React, { Component } from 'react';

import Shop from './components/Shop'
let mock = require ('./mock.json')

class App extends Component {
  render() {
    //console.log (mock)
    // разобраться как следует с json и цифры сделать цифрами для проптайпс
    //mock = JSON.parse (mock) // не работает не хера
    return (

        <div>
          <Shop
          items={mock}
          />

        </div>


    );
  }
}

export default App;
