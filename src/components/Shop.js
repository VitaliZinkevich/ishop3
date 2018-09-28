import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Table from './Table'
import ItemCard from './ItemCard'
import EditCard from './EditCard'

class Shop extends Component {

  static propTypes = {

    items: PropTypes.arrayOf (PropTypes.shape({
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      fotos: PropTypes.arrayOf(PropTypes.string).isRequired,
      left: PropTypes.number.isRequired,
      ID: PropTypes.number.isRequired,
    })),
  }

  state = {items: this.props.items,
            selectedLineID:null,
            selectedItem:null,
            editedItem:null
          }

  handleClickonLine = (id)=>{

      let newSelectedItem = [...this.state.items].filter ((elem)=>{
        if (elem.ID === id) {
          return true
        } else {
          return false
        }
      })



      this.setState ({selectedLineID: id, selectedItem: newSelectedItem, editedItem:null})
  }

  deleteItem = (id)=>{
    //alert (id)
      let newItemList = [...this.state.items];
      newItemList = newItemList.filter ((el) => {

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

      if (this.state.selectedLineID === id) {
        this.setState ({items: newItemList, selectedLineID: null, selectedItem: null})
      } else {
        this.setState ({items: newItemList})
      }


  }

  editedItem = null

  editItem = (id)=>{

    let elem = [...this.state.items].filter ((el)=>{

      if (el.ID === id) {
            this.editedItem = el
            return true
          } else {
            return false
          }
        })

    this.setState ({editedItem: elem, selectedLineID: null, selectedItem: null })
  }

  cancelEditing = () => {
    this.setState ({editedItem: null})
  }

  setUpdateFromEdit = (item)=> {
    alert ('save')
    console.log (item)

    // найти и заменить, снять режим редактирования

  }

  render() {

    const itemDetailes = <ItemCard
    selectedItem ={this.state.selectedItem}

    />

    const itemEdit = <EditCard
    item = {this.editedItem}
    cancelEditing={this.cancelEditing}
    setUpdateFromEdit={this.setUpdateFromEdit}
    />



    return (

      <div className='container'>
        <div className='row'>
          <div className='col-8'>

          <Table
           items={this.state.items}
           handleClickonLine={this.handleClickonLine}
           selectedLineID={this.state.selectedLineID}
           deleteItem={this.deleteItem}
           editItem={this.editItem}
           />

           <button className='btn btn-primary'>Добавить товар</button>
           </div>

            <div className='col-4'>
            {(this.state.selectedLineID !== null) ? itemDetailes : null}
            {(this.state.editedItem !== null) ? itemEdit  : null}
            </div>
        </div>

        <div className='row'>
        Тут добавление нового
        </div>

       </div>


    );
  }
}

export default Shop;
