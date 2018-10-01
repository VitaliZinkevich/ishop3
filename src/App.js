import React, { Component } from 'react';
//import './App.css'
import Shop from './components/Shop'
let mock = require ('./mock.json')

class App extends Component {
  render() {
   

    return (

        
          <Shop
          items={[...mock]}
          />
        


    );
  }
}

export default App;
