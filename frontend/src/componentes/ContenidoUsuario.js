import React, { Component } from 'react'
import imagen from '../Imagenes/ortodoncia_1.jpg';
import Paladar from '../Imagenes/paladar.jpg';
import Frenos from '../Imagenes/frenos.jpg';
import Guardas from '../Imagenes/guarda.jpg';
import imagen2 from '../Imagenes/ortodoncia_2.jpg';
import imagen3 from '../Imagenes/ortodoncia_3.jpg';
import producto from '../Imagenes/producto.jpg';
import producto1 from '../Imagenes/producto1.jpg';
import producto2 from '../Imagenes/producto2.jpg';
import { Link } from 'react-router-dom';

import JUMBO from './jumbotron'

export default class ContenidoUsuario extends Component {
    componentDidMount() {
       
        if(localStorage.getItem("id") === '13' || localStorage.getItem("id") === '10000'){
            window.location.href = "http://localhost:3000/"
        }
    }
    verAparatos = () => {
        window.location.href = "http://localhost:3000/Aparatos"
    }
    render() {
        return (
            <div className="body">
                <div className="App">
                    <JUMBO />


                    <div class="featurette-divider"></div>

                    <div class="row featurette">
                        <div class="col-md-7">
                            <h2 class="featurette-heading text-white">Paladar. <span class="text-white">a la medida </span></h2>
                            <p class="lead">Paladares creado de los mejores materiales de alta calidad y adaptados de forma expecifica para el cliente</p>
                        </div>
                        <div class="col-md-5">

                            <div>
                                <img src={Paladar}
                                    alt="500x500"
                                    width="500"
                                    height="300"
                                    class='imgRedonda '
                                ></img>

                            </div>
                        </div>
                    </div>


                    <div class="featurette-divider"></div>

                    <div class="row featurette">
                        <div class="col-md-7 order-md-2">
                            <h2 class="featurette-heading">Frenos. <span class="text-muted">resistencia y durabilidad.</span></h2>
                            <p class="lead">Frenos creados a la medida parael ajuste de los dientes para obtener la posicion adecuada y la dentadura que siempre quisiste </p>
                        </div>
                        <div class="col-md-5 order-md-1">
                            <img src={Frenos}
                                alt="500x500"
                                width="500"
                                height="300"
                                class='imgRedonda img10'
                            ></img>
                        </div>


                    </div>

                    <div class="featurette-divider"></div>

                    <div class="row featurette" >
                        <div class="col-md-7">
                            <h2 class="featurette-heading text-white">Guardas.  <span class="text-white">resistentes y alta calidad </span></h2>
                            <h7 class="lead">Guardas de la mejor calidad y resistencia de todo tipo y diseños que puedas encontrar </h7>
                        </div>
                        <div class="col-md-5">

                            <div>
                                <img src={Guardas}
                                    alt="500x500"
                                    width="500"
                                    height="300"
                                    background-repeat="no-repeat"
                                    background-position="50%"
                                    border-radius="50%"
                                    background-size="100% auto"
                                    class='imgRedonda img10'
                                ></img>

                            </div>
                        </div>
                    </div>


                    <div class="featurette-divider"></div>

                    <div class="bg-1">
                        <div class="container">
                            <h3 class="text-center">Productos</h3>


                            <div class="row text-center">
                                <div class="col-sm-4">
                                    <div class="thumbnail">
                                        <img src={producto} alt="Paris" width="400" height="300" />
                                        <p><strong>Paladar</strong></p>
                                        <p>Disponible!</p>
                                        <button class="btn" onClick={this.verAparatos}>mas informacion</button>
                                    </div>
                                </div>
                                <div class="col-sm-4">
                                    <div class="thumbnail">
                                        <img src={producto1} alt="New York" width="400" height="300" />
                                        <p><strong>Frenos</strong></p>
                                        <p>Disponible!</p>
                                        <button class="btn" onClick={this.verAparatos}>mas informacion</button>
                                    </div>
                                </div>
                                <div class="col-sm-4">
                                    <div class="thumbnail">
                                        <img src={producto2} alt="San Francisco" width="400" height="300" />
                                        <p><strong>Guardas</strong></p>
                                        <p>Disponible!</p>
                                        <button class="btn" onClick={this.verAparatos}>mas informacion</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="modal fade" id="myModal" role="dialog">
                            <div class="modal-dialog">


                                <div class="modal-content">
                                    <div class="modal-header">
                                        <button type="button" class="close" data-dismiss="modal">×</button>
                                        <h4><span class="glyphicon glyphicon-lock"></span> Tickets</h4>
                                    </div>
                                    <div class="modal-body">
                                        <form role="form">
                                            <div class="form-group">
                                                <label for="psw"><span class="glyphicon glyphicon-shopping-cart"></span> Tickets, $23 per person</label>
                                                <input type="number" class="form-control" id="psw" placeholder="How many?" />
                                            </div>
                                            <div class="form-group">
                                                <label for="usrname"><span class="glyphicon glyphicon-user"></span> Send To</label>
                                                <input type="text" class="form-control" id="usrname" placeholder="Enter email" />
                                            </div>
                                            <button type="submit" class="btn btn-block">Pay
                    <span class="glyphicon glyphicon-ok"></span>
                                            </button>
                                        </form>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="submit" class="btn btn-danger btn-default pull-left" data-dismiss="modal">
                                            <span class="glyphicon glyphicon-remove"></span> Cancel
              </button>
                                        <p>Need <a href="#">help?</a></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>











                    <footer>
                        <div class="container">
                            <div class="row">
                                <div class="col-xs-12 col-md-6 text-left">
                                    <h6 class="text-muted lead">CONTACTO:</h6>
                                    <h6 class="text-muted">

                                        <h7>Egipcia poniente #6</h7>
                                        <h7>Hermosillo Sonora</h7>
                                        <h7>Teléfonos: 3115988953 – 3112641818.</h7>
                                    </h6>
                                </div>

                                <div class="col-xs-12 col-md-6 text-right">
                                    <h6 class="text-muted lead">ENCUENTRANOS EN LAS REDES</h6>
                                    <div class="redes-footer">
                                        <i className="fab fa-youtube-square fa-10x mr-2"></i>
                                        <i className="fab fa-facebook-square fa-10x"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="row">

                                <div class="col-md-12 text-right">
                                    <p class="text-muted small"><h8>Lapro-Orto.</h8> Todos los derechos reservados.</p>
                                </div>

                            </div>

                        </div>

                    </footer>
                </div>
            </div>
        )
    }
}
