import React, { Component } from 'react';

class Error extends Component {
  render() {
  
    return (

        <span className="alert alert-danger" role="alert">
             {this.props.message}           
        </span>


    );
  }
}

export default Error;
