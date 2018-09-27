import React, { Component } from 'react';
import Tableline from './Tableline'
import PropTypes from 'prop-types';

class Table extends Component {


    state = {items: this.props.items, selectedLineID:null}


//3 есть ли какой то  механизм обработки предупреждений из propTypes. В случае если тип не соответствую или отсутствуюет вообще в консоли появляется предупреждение но все рендерит как есть


    static propTypes = {

      items: PropTypes.arrayOf (PropTypes.shape({
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        fotos: PropTypes.arrayOf(PropTypes.string).isRequired,
        left: PropTypes.number.isRequired,
        ID: PropTypes.number.isRequired,
      })),
    }

    handleClickonLine = (id)=>{

        this.setState ({selectedLineID: id})

    }

    deleteItem = (id)=>{

    let newItemList = [...this.state.items];

    newItemList= newItemList.filter ((el) => {

            if (el.ID === id) {
                  if  (window.confirm("Удалить товар " + el.name)) {
                   return false
                  } else {
                   return true
                  }
            } else {
             return true
            }

    })

    this.setState ({items: newItemList})
    }

  render() {

    let viewItems = [...this.state.items].map ((el, ind)=>{

        return (

        <Tableline

        key={el.ID} el={el}

        handleClickonLine={this.handleClickonLine}
        selectedLineID={this.state.selectedLineID}

        deleteItem={this.deleteItem}
        />

        )

    })

    return (
      <div className='container my-5'>
      <table className='table'>
          <thead>
        <tr align="center">
          <th>Название</th>
          <th>Цена</th>
          <th>Остаток на складе</th>
          <th>Фото</th>
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
