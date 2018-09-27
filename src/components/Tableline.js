import React, { Component } from 'react';

class Tableline extends Component {

//1 нет смысла в отдельной проверке propTypes тк весь массив проверен на входе сразу на соотв форме.?

  render() {


//2 onClick организовано без работы с дом. Через дом все выглядит массивней, так как элементов события является ячейка и нужно обращаться к родителю за этим аттрибутом. Подобный механизм использован в документации react

    return (
        <tr align="center"
        onClick={()=>{this.props.handleClickonLine(this.props.el.ID)}}
        className={(this.props.selectedLineID === this.props.el.ID ) ? 'bg-warning' : null}

        >
                <td className='align-middle'>{this.props.el.name}</td>
                <td className='align-middle'>{this.props.el.price+ ' BYN'}</td>
                <td className='align-middle'>{this.props.el.left}</td>
                <td className='align-middle'>{this.props.el.fotos.map ((el, ind)=>{
                  return (
                    <img key={ind}  src={el} alt={'foto ' + ind + ' '} height="150" width="100" ></img>
        )
                })}</td>
                <td className='align-middle'><button onClick={()=>{this.props.deleteItem(this.props.el.ID)}}>Удалить</button></td>
                </tr>
    );
  }
}

export default Tableline;
