import React, { Component } from 'react';
import Tableline from './Tableline'


class Table extends Component {


  render() {

    let viewItems = [...this.props.items].map ((el, ind)=>{

        return (
        <Tableline
        key={el.ID} el={el}
        handleClickonLine={this.props.handleClickonLine}
        selectedLineID={this.props.selectedLineID}
        deleteItem={this.props.deleteItem}
        editItem={this.props.editItem}
        />

        )

    })

    return (
      <div className='my-5'>
      <table className='table'>
          <thead>
        <tr align="center">
          <th>Название</th>
          <th>Цена</th>
          <th>Остаток на складе</th>
          <th>Фото</th>
          <th>Редактировать</th>
          <th>Удаление</th>
        </tr>
      </thead>
          <tbody>
            {viewItems}
          </tbody>
      </table>
      </div>

    );
  }
}



export default Table;
