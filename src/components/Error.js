import React, { Component } from 'react';

class Error extends Component {
  render() {
  
    return (

        <div className="alert alert-danger" role="alert">
             {this.props.message}           
        </div>


    );
  }
}

export default Error;