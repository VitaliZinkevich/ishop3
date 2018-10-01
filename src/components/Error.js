import React, { Component } from 'react';

class Error extends Component {
  render() {
  
    return (

        <p className="alert alert-danger" role="alert">
             {this.props.message}           
        </p>


    );
  }
}

export default Error;
