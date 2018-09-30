import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import './Shop.css'

import Table from './Table'
import ItemCard from './ItemCard'
import EditCard from './EditCard'
import NewItem from './NewItem'

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
            editedItem:null,
            addingNewItem :false
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

  editedItem = null // не успевает обновляться стейт форма через свойство

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
        this.editedItem= null
        this.setState ({items: newItemList, selectedLineID: null, selectedItem: null, editedItem: null}, ()=>{
          this.editedItem = null
        }) 
        
      } else {
        this.setState ({items: newItemList, editedItem: null}, ()=>{
          this.editedItem = null})
      }


  }

  editItem = (id)=>{

        let elem = [...this.state.items].filter ((el)=>{

          if (el.ID === id) {
                this.editedItem = el // не успевает обновляться стейт форма через свойство
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

  setUpdateFromEdit = (updatedItem)=> {

    let newItems = [...this.state.items]
    
    newItems = newItems.map ((el, ind)=>{
      if (el.ID === updatedItem.ID) {
        el = updatedItem
        return el
       

      } else {
        return el
      }
    })

    this.editedItem = updatedItem; // не успевает обновляться стейт форма через свойство
    this.setState({items:newItems, editedItem: updatedItem})

  }

  addItem= () => {

    this.setState({addingNewItem: true})

  }

  cancelAdd = () =>{
    this.setState({addingNewItem: false})
  }

  addNewItem = (item)=>{
   
    let newItems = [...this.state.items]
    
    let id = Math.floor (Math.random())
    item.ID=id

    newItems.push(item)
    this.setState ({items: newItems,addingNewItem:false })
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

     
        
        <div className='row '>

          <div className='col-8'>

          <Table
           items={this.state.items}
           handleClickonLine={this.handleClickonLine}
           selectedLineID={this.state.selectedLineID}
           deleteItem={this.deleteItem}
           editItem={this.editItem}
           />

           <button 
           onClick={this.addItem}
           className='btn btn-primary mb-3'
           
           >Добавить товар</button>
           </div>

            <div className='col-4'>
            {(this.state.selectedLineID !== null) ? itemDetailes : null}
            {(this.state.editedItem !== null) ? itemEdit  : null}
            </div>
            
            <div className='row w-100'>
            <div className='col-12' >
            {(this.state.addingNewItem === true) ? (
            <NewItem
             cancelAdd={this.cancelAdd}
             addNewItem={this.addNewItem}
             />) : null}
            </div>
            
            </div>
        </div>

       

       


    );
  }
}

export default Shop;
