import React, { Component } from 'react'
import axios from 'axios';
export default class Tab extends Component {
    constructor(props){
        super(props);
        this.state = {
            ordenes:[]
        }
    }

    async componentDidMount(){
        const res = await axios.get('http://localhost:4000/api/ordenes')
        this.setState({ ordenes: res.data })
    }

    render() {

        let TablaPendiente =(

        <table className="table ">
        <thead className="blue-gradient text-center ">
            <tr>
                <th scope="col">Clave #</th>
                <th scope="col">Clinica</th>
                <th scope="col">Paciente</th>
                <th scope="col">Fecha de salida</th>
                <th scope="col">Fecha de entrada</th>
                <th scope="col">Doctor</th>
                <th scope="col">Trabajo a realizar</th>
                <th scope="col">Color</th>
                <th scope="col">Material</th>
                <th scope="col">Observaciones</th>
                <th scope="col">Opciones</th>
            </tr>
        </thead>
        <tbody className="text-center">
            {this.state.ordenes.map((ordenes,index) =>
                <tr key={ordenes.Clave_Orden}>
                    <th scope="row">{ordenes.Clave_Orden}</th>
                    <td>{ordenes.Clinica}</td>
                    <td>{ordenes.Paciente}</td>
                    <td>{ordenes.Fecha_salida.substring(0,10)}</td>
                    <td>{ordenes.Fecha_entrada.substring(0,10)}</td>
                    <td>{ordenes.Doctor}</td>
                    <td>{ordenes.Trabajo_realizar}</td>
                    <td>{ordenes.Color}</td>
                    <td>{ordenes.Material}</td>
                    <td>{ordenes.Observaciones}</td>
                    <td>
                        <button  className="btn btn-danger ml-3 ">Cancelar</button>
                    </td>
                </tr>
            )}
        </tbody>
    </table>) 


        return (
            <div className="mt-1">
                <nav className="blue-gradient">
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        <span className="nav-item .text-dark nav-link active font-weight-bold" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">
                            <span>Ordenes Pendientes</span>
                        </span>
                        <span className="nav-item nav-link font-weight-bold" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">
                            Ordenes en Proceso
                        </span>
                        <span className="nav-item nav-link font-weight-bold" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">
                            Ordenes Finalizadas
                        </span>
                    </div>
                </nav>
                <div className="tab-content" id="nav-tabContent">
                    <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                        {TablaPendiente}
                    </div>
                    <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">b
                    </div>
                    <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">c
                    </div>
                </div>
            </div>
        )
    }
}
