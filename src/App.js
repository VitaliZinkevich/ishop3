import React, { Component } from 'react';
import './App.css';
import Table from './components/Table'
import mock from './mock'

class App extends Component {
  render() {

    return (


      <Table className="App" items={mock.data}>
      </Table>


    );
  }
}

export default App;
