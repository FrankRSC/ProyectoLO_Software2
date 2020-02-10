import React, { Component } from 'react'
import Ventana from './VentanaEmergente'
import {MDBRow, MDBCol,MDBCardBody, MDBInput} from 'mdbreact';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../Estilos/login.css'


export default class Login extends Component {


    constructor(props) {
        super(props)
        this.state = {
            usuarios: [],
            inputCorreo: '',
            inputPass: '',
            ruta: '/Login',
            Bienvenida: "Error al iniciar sesion",
            correoError:"",
            contraseñaError: ""
        }

    }

    componentDidMount(){
        if(localStorage.getItem("id") != '10000'){
            window.location.href = "http://localhost:3000/"
        }
    }


    onChangepass = (pass) => {
        this.setState({ inputPass: pass.target.value })
    }

    comprobar = async () => {

        const isvalid = this.validar();
        if(isvalid){
            const { inputCorreo, inputPass } = this.state;
            const datos = await axios.get('http://localhost:4000/api/usuarios/' + inputCorreo)
        
            console.log(datos.data.length)
            if(datos.data.length != 1){
                document.getElementById('info').innerHTML = "Usuario o contraseña inconrrecto "
                this.setState({ Bienvenida: 'Error al iniciar sesion' })
            }else{
                const { contraseña, nombre, apellidoP, corre, clave_cliente } = datos.data[0];
    
                if (inputPass === contraseña) {
                    if (corre === 'admin@hotmail.com') {
                        localStorage.setItem("Usuario", nombre + " " + apellidoP)
                        localStorage.setItem("Nombre", nombre);
                        localStorage.setItem("ApellidoPaterno", apellidoP)
                        localStorage.setItem("Correo", corre);
                        localStorage.setItem("id", clave_cliente)
                        this.setState({ ruta: '/InicioAdmin' })
        
                    } else {

                        localStorage.setItem("Usuario", nombre + " " + apellidoP)
                        localStorage.setItem("Correo", corre);
                        localStorage.setItem("id", clave_cliente)
                        this.setState({ ruta: '/InicioUsuarios' })
                    }
                    document.getElementById('info').innerHTML = "Bienvenido " + nombre + " " + apellidoP
                  
                    this.setState({ Bienvenida: 'Inicio de Sesion Correcto' })
                 
                } else {
                    document.getElementById('info').innerHTML = "Usuario o contraseña inconrrecto "
                    this.setState({ Bienvenida: 'Error al iniciar sesion' })
                }
            }
        }
       
       
    }

    validar= () =>{
        let correoError = "";
        let contraseñaError =  "";

        
        if(!this.state.inputCorreo.includes('@hotmail.com')  && !this.state.inputCorreo.includes('@gmail.com') && !this.state.inputCorreo.includes('@yahoo.com')){
            correoError = '*Correo invalido';
        }

        if(!this.state.inputPass){
            contraseñaError = "*Ingrese contraseña"
        }

        if(correoError || contraseñaError){
            this.setState({ correoError, contraseñaError});
            return false;
        }

        return true;
    }


    render() {
        return (
            
            <div className="fondo">
               
                <div className="fl">
                    <div className="redondear" style={{ width: '28rem', background: 'white' }}>
                        <div className="header pt-3 blue-gradient redondeara">
                            <MDBRow className="d-flex justify-content-center">
                           
                                
                            <i class="far fa-arrow-alt-circle-left white-text mr-3 mb-2 pt-3" style={{fontSize: 30}} onClick={()=>window.location.href = "http://localhost:3000/Inicio"}></i>
                                <h3 className="white-text mb-3 pt-3 font-weight-bold">
                                    Iniciar Sesion
                                </h3>
                            </MDBRow>
                        </div>
                        <MDBCardBody className="mx-4 mt-4">
                            <div>
                            <div style={{fontSize: '16px'}} className="text-left font-weight-bold text-danger mt-5">{this.state.correoError}</div>
                            <MDBInput label="Correo" group type="text" validate onChange={correo => this.setState({ inputCorreo: correo.target.value })} />
                            </div>
                            <div>
                            <div style={{fontSize: '16px'}} className="text-left font-weight-bold text-danger mt-5">{this.state.contraseñaError}</div>
                            <MDBInput label="Contraseña" group type="password" validate containerClass="mb-0" onChange={this.onChangepass} />
                            </div>
                           
                            <MDBRow className="d-flex align-items-center mb-4 mt-5">

                                <MDBCol md="7" className="d-flex justify-content-end">
                                    <p className="font-small grey-text mt-3">
                                        <a href="#!" className="dark-grey-text ml-1 font-weight-bold">
                                            
                                        </a>
                                    </p>
                                </MDBCol>
                                <MDBCol md="5" className="d-flex align-items-start">
                                    <div className="text-center">
                                        <button onClick={this.comprobar} className="btn blue-gradient btn-circle" data-toggle="modal" data-target="#ventana1">
                                            Iniciar
                                        </button>
                                    </div>
                                </MDBCol>
                            </MDBRow>
                        </MDBCardBody>

                    </div>
                    
                </div>
                <Ventana info={this.state.Bienvenida} link={this.state.ruta}/>
            </div>
        )


    }
}
