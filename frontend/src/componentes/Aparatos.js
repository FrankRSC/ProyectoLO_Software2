import React, { Component } from 'react'
import axios from 'axios';

export default class Aparatos extends Component {

    state = {
        aparatos: []
    }

    async componentDidMount() {
        //api para hacer peticiones al servidor con put get
        const res = await axios.get('http://localhost:4000/api/aparatos')
        this.setState({ aparatos: res.data })
        console.log(this.state.hola)
    }

    render() {
        console.log(this.state.aparatos)
        return (
            <div className="container">
                <div class="row">
                    <div class="col center-block mt-2">
                        <h4 className="modal-title">Lista de Aparatos</h4>
                        <div class="form-row">
                          
                                {this.state.aparatos.map(apa =>
                                  <div class="col-6">
                                    <div class="card mb-3 center-block mt-5" style={{ maxWidth: '540px' }}>
                                        <div class="row no-gutters">
                                            <div class="col-md-4">
                                                <img class="card-img-top" src={`data:image/png;base64,${Buffer.from(apa.Imagen.data).toString('base64')}`} />
                                            </div>
                                            <div class="col-md-8">
                                                <div class="card-body">
                                                    <h5 class="card-title">{apa.Titulo}</h5>
                                                    <p class="card-text">{apa.Descripcion}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                )}
                           
                        </div>

                    </div>
                </div>

            </div>
        )
    }
}

