import React, { Component } from 'react'
import axios from 'axios';


export default class OrdenesAdmin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ordenes: [],
            usuarios: [],
            ordenesPendientes: [],
            ordenesProceso: [],
            ordenesFinalizadas: [],
            ordenesRechazadas: [],
        }
    }

    //Metodo de react que se utiliza para hacer acciones antes de que se dibuje la pagina
    async componentDidMount() {
        if(localStorage.getItem("id") === '13'){
            //Obtener todas las ordenes y guardarlas en un arreglo dependiendo del estado
            const res = await axios.get('http://localhost:4000/api/ordenes')
            const resusuarios = await axios.get('http://localhost:4000/api/usuarios/')
            const resusuarios1 = await axios.get('http://localhost:4000/api/ordenes/1')
            const resusuarios2 = await axios.get('http://localhost:4000/api/ordenes/2')
            const resusuarios3 = await axios.get('http://localhost:4000/api/ordenes/3')
            const resusuarios4 = await axios.get('http://localhost:4000/api/ordenes/4')
            this.setState({ usuarios: resusuarios.data })
            this.setState({ ordenes: res.data })
            this.setState({ ordenesPendientes: resusuarios1.data })
            this.setState({ ordenesProceso: resusuarios2.data })
            this.setState({ ordenesFinalizadas: resusuarios3.data })
            this.setState({ ordenesRechazadas: resusuarios4.data })
        }else{
            window.location.href = "http://localhost:3000/"
        }
       

    }

    nombre = (id) => {
        const { usuarios } = this.state
        //var nombreCompleto = resusuarios.data[0].nombre + " " + resusuarios.data[0].apellidoP + " " + resusuarios.data[0].apellidoF
        for (let i = 0; i <= usuarios.length; i++) {

            if (id === usuarios[i].clave_cliente) {
                var nombreCompleto = usuarios[i].nombre + " " + usuarios[i].apellidoP + " " + usuarios[i].apellidoF
                break
            }
        }
        return nombreCompleto
    }


    //Cambiar de estado la orden a rechazada
    rechazar = async (id) => {
        const newOrden = {
            Estado: 4
        }
        await axios.put('http://localhost:4000/api/ordenes/' + id, newOrden)
        window.location.reload();
    }

    //Cambiar de estado la orden a Aceptada
    aceptar = async (id) => {
        const newOrden = {
            Estado: 2
        }
        await axios.put('http://localhost:4000/api/ordenes/' + id, newOrden)
        window.location.reload();
    }

    //Cambiar de estado la orden a Terminada
    Terminar = async (id) => {
        const newOrden = {
            Estado: 3
        }
        await axios.put('http://localhost:4000/api/ordenes/' + id, newOrden)
        window.location.reload();
    }

    render() {
 
        return (
            //#region Codigo HTML
            <div style={{ margin: '7%' }}>

                <section id="tabs" style={{ maxWidth: '100%' }}>
                    <div class="container-fluid">
                        <h6 class="section-title h1">ORDENES DE TRABAJO</h6>
                        <div class="row">
                            <div class="col-xs-12 ">
                                <nav>
                                    <div class="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                                        <a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Pendientes({this.state.ordenesPendientes.length})</a>
                                        <a class="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">En Proceso({this.state.ordenesProceso.length})</a>
                                        <a class="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Finalizadas({this.state.ordenesFinalizadas.length})</a>
                                        <a class="nav-item nav-link" id="nav-about-tab" data-toggle="tab" href="#nav-about" role="tab" aria-controls="nav-about" aria-selected="false">Rechazadas({this.state.ordenesRechazadas.length})</a>
                                    </div>
                                </nav>
                                <div class="tab-content py-3 px-3 px-sm-0" id="nav-tabContent">
                                    <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                                        {this.state.ordenesPendientes.map((ordenes, index) =>
                                            <div class="card float-left mr-4 mb-3" style={{ width: '25rem' }}>

                                                <div class="view overlay">
                                                    <img class="card-img-top" style={{ width: '200px' }} alt="Card image cap" src={`data:image/png;base64,${Buffer.from(ordenes.Imagen.data).toString('base64')}`} />
                                                </div>
                                                <div class="card-body">
                                                    <h4 class="card-title font-weight-bold"><a>Usuario:{this.nombre(ordenes.clave_cliente)} </a></h4>


                                                    <p class="mb-2">Solicita: </p>

                                                    <p class="card-text text-justify">
                                                        {ordenes.Trabajo_realizar}
                                                    </p>
                                                    <hr class="my-4" />
                                                    <p class="lead"><strong>Detalles</strong></p>
                                                    <ul class="list-group">
                                                        <li class="list-inline-item mr-0">
                                                            <div class="chip mr-0">Clinica:{ordenes.Clinica}</div>
                                                        </li>

                                                        <li class="list-inline-item mr-0">
                                                            <div class="chip mr-0">Doctor: {ordenes.Doctor}</div>
                                                        </li>

                                                        <li class="list-inline-item mr-0">
                                                            <div class="chip mr-0">Paciente: {ordenes.Paciente}</div>
                                                        </li>
                                                        <li class="list-inline-item mr-0">
                                                            <div class="chip mr-0">Fecha de salida: {ordenes.Fecha_salida.substring(0, 10)}</div>
                                                        </li>
                                                        <li class="list-inline-item mr-0">
                                                            <div class="chip mr-0">Fecha de entrada: {ordenes.Fecha_entrada.substring(0, 10)}</div>
                                                        </li>

                                                        <li class="list-inline-item mr-0">
                                                            <div class="chip mr-0">Color y Material: {ordenes.Color} y {ordenes.Material}</div>
                                                        </li>
                                                        <li class="list-inline-item mr-0">
                                                            <p class="chip mr-0 text-justify">Observaciones: {ordenes.Observaciones}</p>
                                                        </li>
                                                    </ul>
                                                    <div className="">
                                                        <button data-toggle="modal" data-target="#basicExampleModal" data-backdrop="false" type="button" class="btn btn-outline-info waves-effect" onClick={() => this.aceptar(ordenes.Clave_Orden)}>Acepatar</button>
                                                        <button data-toggle="modal" data-target="#basicExampleModal" data-backdrop="false" type="button" class="btn btn-outline-danger  ml-5 waves-effect" onClick={() => this.rechazar(ordenes.Clave_Orden)}>Rechazar</button>
                                                    </div>
                                                </div>
                                            </div>

                                        )}
                                    </div>
                                    <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                                        {this.state.ordenesProceso.map((ordenes, index) =>
                                            <div class="card float-left mr-4 mb-3" style={{ width: '25rem' }}>

                                                <div class="view overlay">
                                                    <img class="card-img-top" style={{ width: '200px' }} alt="Card image cap" src={`data:image/png;base64,${Buffer.from(ordenes.Imagen.data).toString('base64')}`} />
                                                </div>
                                                <div class="card-body">
                                                    <h4 class="card-title font-weight-bold"><a>Usuario:{this.nombre(ordenes.clave_cliente)} </a></h4>


                                                    <p class="mb-2">Solicita: </p>

                                                    <p class="card-text text-justify">
                                                        {ordenes.Trabajo_realizar}
                                                    </p>
                                                    <hr class="my-4" />
                                                    <p class="lead"><strong>Detalles</strong></p>
                                                    <ul class="list-group">
                                                        <li class="list-inline-item mr-0">
                                                            <div class="chip mr-0">Clinica:{ordenes.Clinica}</div>
                                                        </li>

                                                        <li class="list-inline-item mr-0">
                                                            <div class="chip mr-0">Doctor: {ordenes.Doctor}</div>
                                                        </li>

                                                        <li class="list-inline-item mr-0">
                                                            <div class="chip mr-0">Paciente: {ordenes.Paciente}</div>
                                                        </li>
                                                        <li class="list-inline-item mr-0">
                                                            <div class="chip mr-0">Fecha de salida: {ordenes.Fecha_salida.substring(0, 10)}</div>
                                                        </li>
                                                        <li class="list-inline-item mr-0">
                                                            <div class="chip mr-0">Fecha de entrada: {ordenes.Fecha_entrada.substring(0, 10)}</div>
                                                        </li>

                                                        <li class="list-inline-item mr-0">
                                                            <div class="chip mr-0">Color y Material: {ordenes.Color} y {ordenes.Material}</div>
                                                        </li>
                                                        <li class="list-inline-item mr-0">
                                                            <p class="chip mr-0 text-justify">Observaciones: {ordenes.Observaciones}</p>
                                                        </li>
                                                    </ul>
                                                    <div className="">
                                                        <button data-toggle="modal" data-target="#basicExampleModal" data-backdrop="false" type="button" class="btn btn-outline-info waves-effect" onClick={() => this.Terminar(ordenes.Clave_Orden)}>Terminar</button>
                                                        <button data-toggle="modal" data-target="#basicExampleModal" data-backdrop="false" type="button" class="btn btn-outline-danger  ml-5 waves-effect" onClick={() => this.rechazar(ordenes.Clave_Orden)}>Rechazar</button>
                                                    </div>
                                                </div>
                                            </div>

                                        )}
                                    </div>
                                    <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                                        {this.state.ordenesFinalizadas.map((ordenes, index) =>
                                            <div class="card float-left mr-4 mb-3" style={{ width: '25rem' }}>

                                                <div class="view overlay">
                                                    <img class="card-img-top" style={{ width: '200px' }} alt="Card image cap" src={`data:image/png;base64,${Buffer.from(ordenes.Imagen.data).toString('base64')}`} />
                                                </div>
                                                <div class="card-body">
                                                    <h4 class="card-title font-weight-bold"><a>Usuario:{this.nombre(ordenes.clave_cliente)} </a></h4>


                                                    <p class="mb-2">Solicita: </p>

                                                    <p class="card-text text-justify">
                                                        {ordenes.Trabajo_realizar}
                                                    </p>
                                                    <hr class="my-4" />
                                                    <p class="lead"><strong>Detalles</strong></p>
                                                    <ul class="list-group">
                                                        <li class="list-inline-item mr-0">
                                                            <div class="chip mr-0">Clinica:{ordenes.Clinica}</div>
                                                        </li>

                                                        <li class="list-inline-item mr-0">
                                                            <div class="chip mr-0">Doctor: {ordenes.Doctor}</div>
                                                        </li>

                                                        <li class="list-inline-item mr-0">
                                                            <div class="chip mr-0">Paciente: {ordenes.Paciente}</div>
                                                        </li>
                                                        <li class="list-inline-item mr-0">
                                                            <div class="chip mr-0">Fecha de salida: {ordenes.Fecha_salida.substring(0, 10)}</div>
                                                        </li>
                                                        <li class="list-inline-item mr-0">
                                                            <div class="chip mr-0">Fecha de entrada: {ordenes.Fecha_entrada.substring(0, 10)}</div>
                                                        </li>

                                                        <li class="list-inline-item mr-0">
                                                            <div class="chip mr-0">Color y Material: {ordenes.Color} y {ordenes.Material}</div>
                                                        </li>
                                                        <li class="list-inline-item mr-0">
                                                            <p class="chip mr-0 text-justify">Observaciones: {ordenes.Observaciones}</p>
                                                        </li>
                                                    </ul>
                                                    <div className="">
                                                        <button type="button" class="btn btn-outline-info waves-effect" >Revisar Pago</button>
                                                   </div>
                                                </div>
                                            </div>

                                        )}
                                    </div>
                                    <div class="tab-pane fade" id="nav-about" role="tabpanel" aria-labelledby="nav-about-tab">
                                        {this.state.ordenesRechazadas.map((ordenes, index) =>
                                            <div class="card float-left mr-4 mb-3" style={{ width: '25rem' }}>

                                                <div class="view overlay">
                                                    <img class="card-img-top" style={{ width: '200px' }} alt="Card image cap" src={`data:image/png;base64,${Buffer.from(ordenes.Imagen.data).toString('base64')}`} />
                                                </div>
                                                <div class="card-body">
                                                    <h4 class="card-title font-weight-bold"><a>Usuario:{this.nombre(ordenes.clave_cliente)} </a></h4>


                                                    <p class="mb-2">Solicita: </p>

                                                    <p class="card-text text-justify">
                                                        {ordenes.Trabajo_realizar}
                                                    </p>
                                                    <hr class="my-4" />
                                                    <p class="lead"><strong>Detalles</strong></p>
                                                    <ul class="list-group">
                                                        <li class="list-inline-item mr-0">
                                                            <div class="chip mr-0">Clinica:{ordenes.Clinica}</div>
                                                        </li>

                                                        <li class="list-inline-item mr-0">
                                                            <div class="chip mr-0">Doctor: {ordenes.Doctor}</div>
                                                        </li>

                                                        <li class="list-inline-item mr-0">
                                                            <div class="chip mr-0">Paciente: {ordenes.Paciente}</div>
                                                        </li>
                                                        <li class="list-inline-item mr-0">
                                                            <div class="chip mr-0">Fecha de salida: {ordenes.Fecha_salida.substring(0, 10)}</div>
                                                        </li>
                                                        <li class="list-inline-item mr-0">
                                                            <div class="chip mr-0">Fecha de entrada: {ordenes.Fecha_entrada.substring(0, 10)}</div>
                                                        </li>

                                                        <li class="list-inline-item mr-0">
                                                            <div class="chip mr-0">Color y Material: {ordenes.Color} y {ordenes.Material}</div>
                                                        </li>
                                                        <li class="list-inline-item mr-0">
                                                            <p class="chip mr-0 text-justify">Observaciones: {ordenes.Observaciones}</p>
                                                        </li>
                                                    </ul>
                                                    <div className="">
                                                        <button data-toggle="modal" data-target="#basicExampleModal" data-backdrop="false" type="button" class="btn btn-outline-info waves-effect" onClick={() => this.aceptar(ordenes.Clave_Orden)}>Recuperar</button>
                                                    </div>
                                                </div>
                                            </div>

                                        )}
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>

                <div class="modal fade right" id="basicExampleModal" tabindex="-1" role="dialog" aria-labelledby="basicExampleModal"
                    aria-hidden="true">

                    <div class="modal-dialog modal-notify modal-primary" role="document">

                        <div class="modal-content">

                            <div class="modal-header">
                                <p class="heading lead">Cambio Realizado Correctamente</p>
                            </div>

                            <div class="modal-body">
                                <div class="text-center">
                                    <i class="fas fa-check fa-4x mb-3 animated rotateIn"></i>
                                </div>
                            </div>


                            <div class="modal-footer justify-content-center">
                          
                                <button type="button" class="btn btn-outline-primary  waves-effect" data-dismiss="modal" onClick={()=>window.location.reload()}>Aceptar</button>
                            </div>
                        </div>

                    </div>

                </div>





            </div>



//#endregion
        )
    }
}


