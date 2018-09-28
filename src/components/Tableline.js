import React, { Component } from 'react';

class Tableline extends Component {

  handleDeletion = (e)=>{
    e.stopPropagation()
    this.props.deleteItem(this.props.el.ID)
  }

  handleEdition = (e)=>{
    e.stopPropagation()
    this.props.editItem(this.props.el.ID)
  }


  render() {


    return (
        <tr align="center"
        onClick={()=>{this.props.handleClickonLine(this.props.el.ID)}}
        className={(this.props.selectedLineID === this.props.el.ID ) ? 'bg-warning' : null}

        >
                <td className='align-middle'>{this.props.el.name}</td>
                <td className='align-middle'>{this.props.el.price+ ' BYN'}</td>
                <td className='align-middle'>{this.props.el.left}</td>
                <td className='align-middle d-flex flex-row'>{this.props.el.fotos.map ((el, ind)=>{
                  return (
                    <img key={ind}  src={el} alt={'foto ' + ind + ' '} height="75" width="50" ></img>
        )
                })}</td>

                <td className='align-middle'><button
                onClick={this.handleEdition}
                >Редактировать</button></td>

                <td className='align-middle'><button onClick={this.handleDeletion}>Удалить</button></td>
                </tr>
    );
  }
}

export default Tableline;
