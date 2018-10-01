import React, { Component } from 'react';

import Error from './Error'

class NewItem extends Component {

state = {inputs:{
                  name: null,
                  price: null,
                  left: null,
                  fotos: ['']},
          errors: [ {message: 'Только латиница и буквы', status: true},
                    {message: 'Только  цифры', status: true},
                    {message: 'Только  цифры', status: true},
                    {message: 'Только URL', status: true}
          ],
          blockAddButton: true
}

handleChange = (e, ind=null)=>{

  let key = e.target.name
  let value = e.target.value
    
  let newState = {...this.state.inputs}
    
  if (ind!== null) {
    newState[key][ind] = value
  } else {
    newState[key] = value
  }
     
  this.setState({inputs:newState}, ()=>{
    this.validate(key, value)
  })
   
}

addFoto=()=>{
  let newStateInputs = {...this.state.inputs}
  newStateInputs.fotos.push('')
  this.setState({inputs: newStateInputs})
  this.validate('fotos', '')
}

validate = (name, value, ind=null) =>{

  let newErrors = [...this.state.errors]
  
  switch (name) {
    case 'name':
    if (/^[a-zA-Z]+$/.test(value)) {
      newErrors[0].status = false
      this.setState({errors : newErrors})
    } else {
      newErrors[0].status = true
      this.setState({errors : newErrors})
    }
    break;
    case 'price':
    if (/^\d+$/.test(value)) {
      newErrors[1].status = false
      this.setState({errors : newErrors})
    } else {
      newErrors[1].status = true
      this.setState({errors : newErrors})
    }
        break;
    case 'left':
    if (/^\d+$/.test(value)) {
      newErrors[2].status = false
      this.setState({errors : newErrors})
    } 
    else {
      newErrors[2].status = true
      this.setState({errors : newErrors})
    }
        break;
    case 'fotos':

    // перейти на validate через импорт только 1 функции для проверки урла
    function is_url(str)
      {
        let regexp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
              if (regexp.test(str))
              {
                return true;
              }
              else
              {
                return false;
              }
      }

    let urlInputs = [...this.state.inputs.fotos]
    
    // переписать происходит сатанияб как то без такого кол ва смен стейта
    let flag = []

      urlInputs.forEach ((el)=>{
        if ((is_url(el) === true)) {
          flag.push (true)
        } else {
          flag.push (false)
        }
  
      })

      if (flag.indexOf (false) === -1 ) {
        newErrors[3].status = false
        this.setState({errors : newErrors})

      } else {
        newErrors[3].status = true
        this.setState({errors : newErrors})
      }  
    
        break;
    default:
        // do nothing
        break;
    
}

this.canEnableSaveButon()
}

canEnableSaveButon = ()=>{
  let errorArray = [...this.state.errors]
  let checkToEnableButton = errorArray.filter ((el)=>{
    return el.status === false
  })
  
  if (checkToEnableButton.length === 4) {
    this.setState ({blockAddButton: false})
  } else {
    this.setState ({blockAddButton: true})
  }
  
}

  render() {

    const FOTOS_INPUTS = this.state.inputs.fotos.map ((el, ind)=>{
      return (
        <div key={ind}>
        <input 
                
                name='fotos'
                onChange={(e)=>{this.handleChange(e,ind)}}/>
                
        </div>
      )

    })

    return (
<div className="card d-flex flex-column w-75">

            <h5 className="card-header">Добавить элемент</h5>

            <div className="card-body d-flex flex-column">

            <h5 className="card-title">Заполните поля</h5>
                <div className='d-flex flex-column align-items-center'>
                
                      <div>
                      <span className="card-text">Имя</span>
                      <input 
                      name='name'
                      onChange={(e)=>{this.handleChange(e)}} />
                      {(this.state.errors[0].status === true) ? (<Error
                                                message={this.state.errors[0].message}/>): null}
                      </div>

                      <div>
                      <span className="card-text">Цена</span>
                      <input 
                      name='price'
                      onChange={(e)=>{this.handleChange(e)}}/>
                      {(this.state.errors[1].status === true) ? (<Error
                                                message={this.state.errors[1].message}/>): null}
                      </div>

                      <div>
                      <span className="card-text">Остаток</span>
                      <input 
                      name='left'
                      onChange={(e)=>{this.handleChange(e)}}/>
                      {(this.state.errors[2].status === true) ? (<Error
                                                message={this.state.errors[2].message}/>): null}
                      </div>

                </div>
                
                <div className='d-flex flex-column align-items-center'>
                
                <div className='d-flex flex-row flex-wrap mx-2 mb-2'>
                <span className="card-text">Фото</span>

                {FOTOS_INPUTS}
                {(this.state.errors[3].status === true) ? (<Error
                  message={this.state.errors[3].message}/>): null}

                <button 
                onClick={this.addFoto}>Еще</button>
                </div>
                </div>
                
                
                <div className = 'd-flex flex-row'>

                <button 
                disabled={this.state.blockAddButton}
                className='btn btn-success mx-3'
                onClick={()=>{this.props.addNewItem({...this.state.inputs})}}>
                Добавить</button>

                <button                 
                onClick={this.props.cancelAdd}
                className='btn btn-danger'
                >Отменить
                </button>

                </div>
            </div>
</div>
        
    );
  }
}

export default NewItem;
