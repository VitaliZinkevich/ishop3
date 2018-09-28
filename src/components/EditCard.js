import React, { Component } from 'react';
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
    this.setState ({item: this.props.item})
    this.props.cancelEditing()
  }

  saveNewData= ()=>{

    let {name , price, left, fotos} = this.state.item

    let errors = []
//сообщения об ошибках отображаются возле неправильно заполненных полей.

    name = name.trim().replace(/\s/g, "");
    if (!validator.isAlpha(name)){
      errors.push ('Название только латинецей и только буквы')
    }

    if (!validator.isInt(price.toString())){
      errors.push ('Цена только число')
    }

    if (!validator.isInt(left.toString())){
      errors.push ('Остаток только число')
    }

    fotos.forEach ((el)=>{
        if (!validator.isURL(el)) {
        errors.push ('Ссылка на фото только URL')
      }

    })
    console.log (errors)
    console.log ((errors.length !== 0))
    console.log (errors.length)

    if (errors.length === 0) {
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
          <p className='mb-0 pb-0'>Ссылка {ind+1}</p>
          <input
          name={ind}
          className='mb-1' value = {el}
          onChange={this.handleFotos}
          />
          </div>
        )
      })

    const errorsView = this.state.errors.map ((el, ind) =>{
      return (
        <div className="alert alert-danger" role="alert">
          {el}
        </div>
      )
    })

    return (

      <div className='my-5'>
      <h4>Редактировать {this.state.item.name}</h4>
      <div className="card" >
      <div className="card-body">
          <h5 className="card-title">Редактировать</h5>

          <div className="card-text">

          <div><p className='mb-0 pb-0'> Имя</p>
          <input
          key={this.state.ID}
          className='mb-1' value = {this.state.item.name}
          onChange={this.handleName}
          />
          </div>

          <div><p className='mb-0 pb-0'>Цена</p>
          <input className='mb-1' value = {this.state.item.price}
          onChange={this.handlePrice}
          />
          </div>

          <div><p className='mb-0 pb-0'>Остаток</p>
          <input className='mb-1' value = {this.state.item.left}
          onChange={this.handleLeft}
          />
          </div>

          <div><p className='mb-0 pb-0'><strong>Ссылки на фото</strong></p>
          {imgLinks}
          </div>

          </div>

          <button
          className='btn btn-success mr-1'
          onClick={this.saveNewData}
          > Сохранить</button>

          <button
          className='btn btn-danger mr-1'
          onClick={this.cancelChange}
          >Отмена</button>

        </div>
          {errorsView}
      </div>

      </div>


    );
  }
}

export default EditCard;
