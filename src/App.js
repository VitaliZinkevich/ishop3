import React, { Component } from 'react';
//import './App.css'
import Shop from './components/Shop'
let mock = require ('./mock.json')

class App extends Component {
  render() {
    //console.log (mock)
    // разобраться как следует с json и цифры сделать цифрами для проптайпс
    //mock = JSON.parse (mock) // не работает не хера
    return (

        
          <Shop
          items={mock}
          />
        


    );
  }
}

export default App;
