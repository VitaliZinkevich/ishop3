import React, { Component } from 'react';


class App extends Component {
  render() {

    return (
<div className="card d-flex flex-column">
            <h5 className="card-header">Добавить элемент</h5>
            <div className="card-body d-flex flex-column align-items-center">
            <h5 className="card-title">Заполните поля</h5>
                <div className='d-flex flex-row'>
                
                <div className='d-flex flex-row mx-1'>
                <p className="card-text">Имя</p>
                <input />
                </div>

                 <div className='d-flex flex-row mx-1 my-1'>
                <p className="card-text">Цена</p>
                <input />
                </div>

                <div className='d-flex flex-row mx-1'>
                <p className="card-text">Остаток</p>
                <input />
                </div>

                </div>
                
                <div className='d-flex flex-row'>
                

                <div className='d-flex flex-row mx-2 mb-2'>
                <p className="card-text">Фото</p>
                <input />
                <button>Еще</button>
                </div>
                </div>
                
                
                <div className = 'd-flex flex-row'>

                <button className='btn btn-success mx-3'>Добавить</button>
                <button className='btn btn-danger'>Отменить</button>

                </div>

                

            </div>
</div>
        
    );
  }
}

export default App;
