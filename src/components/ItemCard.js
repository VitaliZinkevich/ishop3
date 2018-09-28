import React, { Component } from 'react';


class ItemCard extends Component {
  render() {

    let el = this.props.selectedItem[0]

    let imgs = el.fotos.map ((el)=>{
      return (
        <img
        src = {el}
        className="card-img-top"
        alt="Item foto"
        height="200"
         width="50"/>
      )
    })

    return (

      <div className='my-5'>
      <h4>Детали товара {el.name}</h4>
      <div className="card" >
      <div className='d-flex flex-row'>
        {imgs}
      </div>
        <div className="card-body">
          <h5 className="card-title">{el.name}</h5>
          <p className="card-text">
          <p>Цена {el.price + ' BYN'}</p>
          <p>Остаток {el.left + ' штук'}</p>
          </p>

        </div>
      </div>
      </div>

    )

  }
}

export default ItemCard;
