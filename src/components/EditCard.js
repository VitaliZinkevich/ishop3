import React, { Component } from 'react';
//import './EditCard.css'
import Error from './Error'

// удалить это или переписать только на импорт необходимых функций
import validator from 'validator';

class EditCard extends Component {

  constructor(props) {
      super(props);
      this.state = {item: {...props.item}, errors:[]};

    }

    componentWillReceiveProps (props){
      this.setState ({item: props.item})
    }



  handleName = (e) =>{

    this.setState ({item: {...this.state.item, name:e.target.value}})
  }

  handlePrice = (e) =>{
    this.setState ({item: {...this.state.item, price:e.target.value}})
  }

  handleLeft = (e) =>{
    this.setState ({item: {...this.state.item, left:e.target.value}})
  }

  handleFotos = (e) =>{
        let newLinkInFotos = [...this.state.item.fotos]
        newLinkInFotos[e.target.name] = e.target.value
        this.setState ({item: {...this.state.item, fotos: newLinkInFotos}})
  }

  cancelChange = ()=>{
    
    this.props.cancelEditing()
  }

  saveNewData= ()=>{

    let {name , price, left, fotos} = this.state.item

    let errors = []
//сообщения об ошибках отображаются возле неправильно заполненных полей.

    name = name.trim().replace(/\s/g, "");
    if (!validator.isAlpha(name)){
      errors.push ('Название только латинецей и только буквы')
    } else {
      errors.push (null)
    }

    if (!validator.isInt(price.toString())){
      errors.push ('Цена только число')
    }else {
      errors.push (null)
    }

    if (!validator.isInt(left.toString())){
      errors.push ('Остаток только число')
    }else {
      errors.push (null)
    }

    fotos.forEach ((el)=>{
        if (!validator.isURL(el)) {
        errors.push ('Только URL')
      }else {
        errors.push (null)
      }

    })
    
    let flag = true

    errors.forEach ((el)=>{
      if (el === null) {
        
      } else {
        flag = false
      }
    })

    if (flag === true) {
      let item = {...this.state.item}

      this.setState ({errors:[]})

      this.props.setUpdateFromEdit (item)

    } else {
      this.setState ({errors: errors})
    }

  }

  render() {

    const imgLinks = this.state.item.fotos.map ((el, ind)=>{
        return (

          <div key={ind} >
          <p className=''>Ссылка {ind+1}</p>
          <input
          name={ind}
          className='' value = {el}
          onChange={this.handleFotos}
          />
          {this.state.errors[3] == null ? null : (<Error message={this.state.errors[3]}/>)}
          </div>
        )
      })
    
   

    return (

      <div className='w-75'>
      <h4>Редактировать {this.state.item.name}</h4>
      <div className="card" >
      <div className="card-body">
          <h5 className="card-title">Редактировать</h5>

          <div className="card-text">

          <div><p className=''> Имя</p>
          <input
          key={this.state.ID}
          className='' value = {this.state.item.name}
          onChange={this.handleName}
          />

         {this.state.errors[0] == null ? null : (<Error message={this.state.errors[0]}/>)} 

          </div>

          <div><p className=''>Цена</p>
          <input className='' value = {this.state.item.price}
          onChange={this.handlePrice}
          />
          {this.state.errors[1] == null ? null : (<Error message={this.state.errors[1]}/>)}
          </div>

          <div><p className=''>Остаток</p>
          <input className='' value = {this.state.item.left}
          onChange={this.handleLeft}
          />
          {this.state.errors[2] == null ? null : (<Error message={this.state.errors[2]}/>)}
          </div>

          <div><p className=''><strong>Ссылки на фото</strong></p>
          {imgLinks}
          
          
          </div>

          </div>

          <button
          className='btn btn-success '
          onClick={this.saveNewData}
          > Сохранить</button>

          <button
          className='btn btn-danger '
          onClick={this.cancelChange}
          >Отмена</button>

        </div>
         
      </div>

      </div>


    );
  }
}

export default EditCard;
