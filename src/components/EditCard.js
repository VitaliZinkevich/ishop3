import React, { Component } from 'react';

import Error from './Error'


class EditCard extends Component {

  constructor(props) {
      super(props);
      this.state = {
      item: {...props.item}, 
      errors:[
      {message: 'Только латиница ,текст, без пробелов', status: false},
      {message: 'Только  цифры', status: false},
      {message: 'Только  цифры', status: false},
      {message: 'Только URLы', status: false}],
      blockSaveButton: false,
    };

    }

  componentWillReceiveProps (props){
      this.setState ({item: props.item})
    }


  handleAllInputs = (e, ind=null)=>{

    let key = e.target.name;
    let value = e.target.value;


    let newItemState = {...this.state.item}

    console.log (newItemState)
    
    if (ind !== null) {
      newItemState[key][ind] = value
    } else {
      newItemState[key] = value
    }

    this.setState ({item: newItemState}, ()=>{

      this.validate (key, value, ind=null)
    })
        
  }

  validate = (key, value, ind) =>{

    let newErrors = [...this.state.errors]
  
    switch (key) {
      case 'name':
      if (/^[a-zA-Z]+$/.test(value)) {
        newErrors[0].status = false
        this.setState({errors : newErrors, blockSaveButton: false})
      } else {
        newErrors[0].status = true
        this.setState({errors : newErrors, blockSaveButton:true})
      }
      break;
      case 'price':
      if (/^\d+$/.test(value)) {
        newErrors[1].status = false
        this.setState({errors : newErrors, blockSaveButton: false})
      } else {
        newErrors[1].status = true
        this.setState({errors : newErrors, blockSaveButton:true})
      }
          break;
      case 'left':
      if (/^\d+$/.test(value)) {
        newErrors[2].status = false
        this.setState({errors : newErrors, blockSaveButton: false})
      } 
      else {
        newErrors[2].status = true
        this.setState({errors : newErrors, blockSaveButton:true})
      }
          break;
      case 'fotos':
  
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
  
      let urlInputs = [...this.state.item.fotos]
      
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
        this.setState({errors : newErrors, blockSaveButton: false})

      } else {
        newErrors[3].status = true
        this.setState({errors : newErrors, blockSaveButton: true})
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
    }
    
  }

  cancelChange = ()=>{
    this.props.cancelEditing()
  }

  saveNewData= ()=>{
    let newItem = {...this.state.item}
 
    this.props.setUpdateFromEdit (newItem)
  }


  render() {

    const IMGLINKS = this.state.item.fotos.map ((el, ind)=>{
        return (

          <div key={ind} >
          <p className=''>Ссылка {ind+1}</p>
          <input
          name='fotos'
          className='' value = {el}
          onChange={(e)=>{this.handleAllInputs(e, ind)}}
          />
         </div>
        )
      })
    
   

    return (

      <div className='w-75 mt-5'>
      <h4>Редактировать {this.state.item.name}</h4>
      <div className="card" >
      <div className="card-body">
          <h5 className="card-title">Редактировать</h5>

          <div className="card-text">

          <div><p className=''> Имя</p>
          <input
          name='name'
          className='' value = {this.state.item.name}
          onChange={(e)=>{this.handleAllInputs(e)}}
          
          />

         {this.state.errors[0].status === false ? null : (<Error message={this.state.errors[0].message}/>)} 

          </div>

          <div><p className=''>Цена</p>
          <input className='' value = {this.state.item.price}
          name='price'
          onChange={(e)=>{this.handleAllInputs(e)}}
          />
          {this.state.errors[1].status === false ? null : (<Error message={this.state.errors[1].message}/>)}
          </div>

          <div><p className=''>Остаток</p>
          <input name='left' value = {this.state.item.left}
          onChange={(e)=>{this.handleAllInputs(e)}}
          />
          {this.state.errors[2].status === false ? null : (<Error message={this.state.errors[2].message}/>)}
          </div>

          <div><p className=''><strong>Ссылки на фото</strong></p>
          {IMGLINKS}
          {this.state.errors[3].status === false ? null : (<Error message={this.state.errors[3].message}/>)}         
          </div>

          </div>

          <button
          className='btn btn-success '
          onClick={this.saveNewData}
          disabled={this.state.blockSaveButton}
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
