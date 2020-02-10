import React, { Component } from 'react'
import axios from 'axios';

import Editar from './Editar'
import Tab from './Tab'
import { Route, BrowserRouter as Router, Redirect } from 'react-router-dom'

export default class Perfil extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usuarios: [],
            ordenes: [],
            ordenesPendientes: [],
            ordenesProceso: [],
            ordenesFinalizadas: [],
            ordenesRechazadas: [],

            id: '',
            nombre: '',
            apellidoP: '',
            apellidoF: '',
            direccion: '',
            telefono: '',
            corre: '',
            contraseña: '',
        }


    }

    async componentDidMount() {
        let a = [];
        let b = [];
        let c = [];
        let d = [];
        if (localStorage.getItem("id") != '10000') {
            const res = await axios.get('http://localhost:4000/api/usuarios/' + localStorage.getItem("Correo"))
            this.setState({ usuarios: res.data })
            const resOrdenes = await axios.get('http://localhost:4000/api/usuariosid/' + localStorage.getItem("id"))
            this.setState({ ordenes: resOrdenes.data })
            console.log('http://localhost:4000/api/usuariosid/' + localStorage.getItem("id"))
            const { nombre, apellidoP, apellidoF, direccion, telefono, corre, contraseña, clave_cliente } = this.state.usuarios[0];

            this.setState({ nombre: nombre })
            this.setState({ apellidoP: apellidoP })
            this.setState({ apellidoF: apellidoF })
            this.setState({ direccion: direccion })
            this.setState({ telefono: telefono })
            this.setState({ corre: corre })
            this.setState({ contraseña: contraseña })
            this.setState({ id: clave_cliente })

            console.log(this.state.ordenes[0])

            for (let i = 0; i < this.state.ordenes.length; i++) {
                if (this.state.ordenes[i].clave_cliente === clave_cliente) {
                    if (this.state.ordenes[i].Estado === 1) {
                        a.push(this.state.ordenes[i])
                    } else if (this.state.ordenes[i].Estado === 2) {
                        b.push(this.state.ordenes[i])
                    } else if (this.state.ordenes[i].Estado === 3) {
                        c.push(this.state.ordenes[i])
                    } else if (this.state.ordenes[i].Estado === 4) {
                        d.push(this.state.ordenes[i])
                    }
                }
            }
            console.log(a)
            console.log(b)
            console.log(c)
            console.log(d)
            this.setState({ ordenesPendientes: a })
            this.setState({ ordenesProceso: b })
            this.setState({ ordenesFinalizadas: c })
            this.setState({ ordenesRechazadas: d })

        } else {


            window.location.href = "http://localhost:3000/"
        }


    }

    rechazar = async (id) => {
        const newOrden = {
            Estado: 4
        }
        await axios.put('http://localhost:4000/api/ordenes/' + id, newOrden)
        window.location.reload();
    }

    aceptar = async (id) => {
        const newOrden = {
            Estado: 2
        }
        await axios.put('http://localhost:4000/api/ordenes/' + id, newOrden)
        window.location.reload();
    }

    Terminar = async (id) => {
        const newOrden = {
            Estado: 3
        }
        await axios.put('http://localhost:4000/api/ordenes/' + id, newOrden)
        window.location.reload();
    }

    Solicitar = async (id) => {
        const newOrden = {
            Estado: 1
        }
        await axios.put('http://localhost:4000/api/ordenes/' + id, newOrden)
        window.location.reload();
    }

    Obtener = async (id) => {
        const { nombre, apellidoP, apellidoF, direccion, telefono, corre, contraseña, clave_cliente } = this.state.usuarios[id];

        this.setState({ nombre: nombre })
        this.setState({ apellidoP: apellidoP })
        this.setState({ apellidoF: apellidoF })
        this.setState({ direccion: direccion })
        this.setState({ telefono: telefono })
        this.setState({ corre: corre })
        this.setState({ contraseña: contraseña })
        this.setState({ id: clave_cliente })

    }


    render() {
        const { nombre, apellidoP, apellidoF, direccion, telefono, corre, contraseña, id } = this.state;

        //USO DEL PATRON OBJECT LITERALS
        let Usuario = {
            nombreCompleto: (Nombre, apellidoPaterno, apellidoMaterno) => {
                return <h4>Nombre: {Nombre} {apellidoPaterno} {apellidoMaterno}</h4>
            },
            correo: (Correo) => {
                return <h4>Correo: {Correo}</h4>
            },
            direccion: (dir) => {
                return <h4>Direccion: {dir}</h4>
            },
            telefono: (tel) => {
                return <h4>Telefono: {tel}</h4>
            }
        }

        if (corre === 'admin@hotmail.com') {
            return (
                <div style={{ margin: '100px 100px 0px 100px' }}>
                    <div>
                        <h3>Perfil</h3>
                        <div className="m-5">
                            <div className="col-2 float-left">
                                <img style={{ width: '125px', height: '125px' }} src="https://d500.epimg.net/cincodias/imagenes/2016/07/04/lifestyle/1467646262_522853_1467646344_noticia_normal.jpg" className="img dropdown-toggle " data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />
                            </div>
                            <div className="row ">
                                <div className="col mt-3">
                                    {Usuario.nombreCompleto(nombre, apellidoP, apellidoF)}

                                </div>
                                <div className="col mt-3">
                                    <h4>Correo: {corre}</h4>
                                </div>
                            </div>
                            <div className="row ">
                                <div className="col mt-3">
                                    <h4>Direccion: {direccion}</h4>
                                </div>
                                <div className="col mt-3">
                                    <h4>Telefono: {telefono}</h4>
                                </div>
                            </div>
                            <div className="row ">
                                <div className="col mt-3">
                                    <button className="btn blue-gradient" href="#Editar" onClick={() => this.Obtener(0)} data-toggle="modal" data-backdrop="false">Editar</button>
                                </div>
                            </div>
                        </div>

                    </div>


                    <Editar nombre={nombre} apellidoP={apellidoP} apellidoF={apellidoF} direccion={direccion} telefono={telefono} corre={corre} contraseña={contraseña} id={id}></Editar>

                    <hr class="my-4" />
                    <div className="justify-content-center container-container-fluid">
                        <h5 className="section-title h1 " style={{ marginLeft: '35%' }}>HISTORIAL DE VENTAS</h5>
                    </div>

                </div>
            )
        } else {
            return (
                <div>
                    <div style={{ margin: '100px 100px 0px 100px' }}>
                        <div>
                            <h3>Perfil</h3>
                            <div className="m-5">
                                <div className="col-2 float-left">
                                    <img style={{ width: '125px', height: '125px' }} src="https://d500.epimg.net/cincodias/imagenes/2016/07/04/lifestyle/1467646262_522853_1467646344_noticia_normal.jpg" className="img dropdown-toggle " data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />
                                </div>
                                <div className="row ">
                                    <div className="col mt-3">
                                        {Usuario.nombreCompleto(nombre, apellidoP, apellidoF)}
                                    </div>
                                    <div className="col mt-3">
                                        {Usuario.correo(corre)}
                                    </div>
                                </div>
                                <div className="row ">
                                    <div className="col mt-3">
                                        {Usuario.direccion(direccion)}
                                    </div>
                                    <div className="col mt-3">
                                        {Usuario.telefono(telefono)}
                                    </div>
                                </div>
                                <div className="row ">
                                    <div className="col mt-3">
                                        <button className="btn blue-gradient" href="#Editar" onClick={() => this.Obtener(0)} data-toggle="modal" data-backdrop="false">Editar</button>
                                    </div>
                                </div>
                            </div>

                        </div>


                        <Editar nombre={nombre} apellidoP={apellidoP} apellidoF={apellidoF} direccion={direccion} telefono={telefono} corre={corre} contraseña={contraseña} id={id}></Editar>


                    </div>


                    <div className=" container" >
                        <hr class="ml-5 mr-5 my-4" />
                        <section id="tabs" style={{ maxWidth: '100%' }}>
                            <div class="container-fluid">
                                <h6 class="section-title h1">ORDENES DE TRABAJO  </h6>
                                <div class="row">
                                    <div class="col-xs-12 ">
                                        <nav>
                                            <div class="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                                                <a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Pendientes({this.state.ordenesPendientes.length})</a>
                                                <a class="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">En Proceso({this.state.ordenesProceso.length})</a>
                                                <a class="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Finalizadas({this.state.ordenesFinalizadas.length})</a>
                                                <a class="nav-item nav-link" id="nav-about-tab" data-toggle="tab" href="#nav-about" role="tab" aria-controls="nav-about" aria-selected="false">Rechazadas o Canceladas({this.state.ordenesRechazadas.length})</a>
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
                                                            <h4 class="card-title font-weight-bold"><a>Usuario:{nombre} {apellidoP} {apellidoF} </a></h4>


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
                                                                <button data-toggle="modal" data-target="#basicExampleModal" data-backdrop="false" type="button" class="btn btn-outline-danger  ml-5 waves-effect" onClick={() => this.rechazar(ordenes.Clave_Orden)}>Cancelar</button>
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
                                                            <h4 class="card-title font-weight-bold"><a>Usuario: {nombre} {apellidoP} {apellidoF} </a></h4>


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
                                                            <h4 class="card-title font-weight-bold"><a>Usuario:{nombre} {apellidoP} {apellidoF} </a></h4>


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
                                                                <button type="button" class="btn btn-outline-info waves-effect">Proceder al pago</button>
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
                                                            <h4 class="card-title font-weight-bold"><a>Usuario:{nombre} {apellidoP} {apellidoF}</a></h4>


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
                                                            <div className="justify-content-center d-flex">
                                                                <button data-toggle="modal" data-target="#basicExampleModal" data-backdrop="false" type="button" class="btn btn-outline-info waves-effect" onClick={() => this.Solicitar(ordenes.Clave_Orden)}>Volver a solicitar</button>
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

                                        <button type="button" class="btn btn-outline-primary  waves-effect" data-dismiss="modal" onClick={() => window.location.reload()}>Aceptar</button>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            )
        }
    }
}


