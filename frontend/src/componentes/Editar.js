import React, { Component } from 'react'
import axios from 'axios';
import '../Estilos/RegistrarUsuarios.css'

const initialState ={
    usuarios: [],
    nombre: '',
    apellidoP: '',
    apellidoF: '',
    direccion: '',
    telefono: '',
    corre: '',
    contraseña: '',
    nombreError: '',
    apellidoPError: '',
    apellidoFError: '',
    direccionError: '',
    telefonoError: '',
    correoError: '',
    contraseñaError: '',
}

export default class Editar extends Component {
 
    state = initialState;

    onChangeTelefono = (e) => {
        this.setState({
            telefono: e.target.value
        })
    }


    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    //Envio de los datos del formulario, a la vez que se validan
    onSubmit = async (e) => {
        var n,ap,af,d,t,c,p

        //si el estado de algun campo se encuentra vacio, le agrega el nombre que tenia antes de enentrar a la edicion
        n = !this.state.nombre ? this.props.nombre : this.state.nombre
        ap = !this.state.apellidoP ? this.props.apellidoP : this.state.apellidoP
        af = !this.state.apellidoF ? this.props.apellidoF : this.state.apellidoF
        d = !this.state.direccion ? this.props.direccion : this.state.direccion
        t = !this.state.telefono ? this.props.telefono : this.state.telefono
        c = !this.state.corre ? this.props.corre : this.state.corre
        p = !this.state.contraseña ? this.props.contraseña : this.state.contraseña

        //Ejecuta el comando de validacion para ver si los datos estan correctos
        const isvalid = this.validar();
        const newCliente = {
            nombre: n,
            apellidoP: ap,
            apellidoF: af,
            direccion: d,
            telefono: t,
            corre: c,
            contraseña: p
        }
        //Si los datos no son correctos refresca la pagina
        //Si los datos son correctos se utiliza la peticion put para cambiar el usuario
        if(isvalid){
            await axios.put('http://localhost:4000/api/usuarios/' + this.props.id, newCliente)
            e.preventDefault();
        }
        
        e.preventDefault();
      window.opener.location.reload();
    }


    //Limpiar campos
    Limpiar = () =>{
        this.setState(initialState);
    }

    //
    validar= () =>{
        let nombreError = ''
        let apellidoPError = ''
        let apellidoFError = ''
        let direccionError = ''
        let telefonoError = ''
        let correoError = ''
        let contraseñaError = ''


        if ((this.state.corre.length >= 1 && this.state.corre.length <= 2) &&  (!this.state.corre.includes('@hotmail.com') && !this.state.corre.includes('@gmail.com') && !this.state.corre.includes('@yahoo.com'))) {
            correoError = '*Correo invalido';
        }

        if ((this.state.contraseña.length >= 1 && this.state.contraseña.length < 5) || this.state.contraseña.length >=35) {
            contraseñaError = "*Ingrese Contraseña Valida"
        }

        if ((this.state.nombre.length >= 1 && this.state.nombre.length < 3) || this.state.nombre.length >= 35 ) {
            nombreError = "*Ingrese Nombre Valido"
        }

        if ((this.state.apellidoP.length >= 1 && this.state.apellidoP.length < 3)  || this.state.apellidoP.length >= 35 ){
            apellidoPError = "*Ingrese Apellido Valido"
        }

        if ((this.state.direccion.length >= 1 && this.state.direccion.length < 3)  || this.state.direccion.length >= 35) {
            direccionError = "*Ingrese Direccion Valida"
        }

        if ((this.state.telefono.length >= 1 && this.state.telefono.length < 3)  || this.state.telefono.length >= 35) {
            telefonoError = "*Ingrese Telefono Valido"
        }

        if ((this.state.apellidoF.length > 1 && this.state.apellidoF.length < 3) || this.state.apellidoF.length >= 35) {
            apellidoFError = "*Ingrese Apellido Valido"
        }

        

        if(correoError || contraseñaError || nombreError || apellidoPError || direccionError || telefonoError || apellidoFError){
            this.setState({ correoError, contraseñaError, nombreError , apellidoPError ,direccionError , telefonoError , apellidoFError});
            return false;
        }

        return true;
    }
    render() {
        return (
            //#region Codigo html
            <div >
                <div class="modal fade bd-example-modal-lg" id="Editar" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <form onSubmit={this.onSubmit}>


                                <div className="modal-header">
                                    <h4 className="modal-title">Registrar Usuario</h4>
                                    <button onClick={this.Limpiar} type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                </div>
                                <div className="modal-body"></div>
                                <div className="row mt-4">
                                    <div className="col">
                                    <div style={{fontSize: '16px'}} className="text-center font-weight-bold text-danger mt-5">{this.state.nombreError}</div>
                                    <input value={this.state.nombre} onFocus={() => this.setState({nombre: this.props.nombre})} placeholder={this.props.nombre} type="text" className="input1"  name="nombre" onChange={this.onChange} />
                                    </div>
                                    <div className="col">
                                    <div style={{fontSize: '16px'}} className="text-center font-weight-bold text-danger mt-5">{this.state.apellidoPError}</div>
                                        <input type="text" className="input1" name="apellidoP" onChange={this.onChange} value={this.state.apellidoP} onFocus={() => this.setState({apellidoP: this.props.apellidoP})} placeholder={this.props.apellidoP}/>
                                    </div>
                                    <div className="col">
                                    <div style={{fontSize: '16px'}} className="text-center font-weight-bold text-danger mt-5">{this.state.apellidoFError}</div>
                                        <input type="text" className="input1"  name="apellidoF" onChange={this.onChange} value={this.state.apellidoF} onFocus={() => this.setState({apellidoF: this.props.apellidoF})} placeholder={this.props.apellidoF}/>
                                    </div>
                                </div>
                                <div className="row mt-4">
                                    <div className="col">
                                    <div style={{fontSize: '16px'}} className="text-center font-weight-bold text-danger mt-5">{this.state.direccionError}</div>
                                        <input type="text" className="input1" name="direccion" onChange={this.onChange} value={this.state.direccion} onFocus={() => this.setState({direccion: this.props.direccion})} placeholder={this.props.direccion} />
                                    </div>
                                    <div className="col">
                                    <div style={{fontSize: '16px'}} className="text-center font-weight-bold text-danger mt-5">{this.state.telefonoError}</div>
                                        <input type="number" className="input1" onChange={this.onChangeTelefono} value={this.state.telefono} onFocus={() => this.setState({telefono: this.props.telefono})} placeholder={this.props.telefono} />
                                    </div>
                                </div>
                                <div className="row mt-4 mb-4">
                                    <div className="col">
                                    <div style={{fontSize: '16px'}} className="text-center font-weight-bold text-danger mt-5">{this.state.correoError}</div>
                                        <input type="text" className="input1"  name="corre" onChange={this.onChange} value={this.state.corre} onFocus={() => this.setState({corre: this.props.corre})} placeholder={this.props.corre} />
                                    </div>
                                    <div className="col">
                                    <div style={{fontSize: '16px'}} className="text-center font-weight-bold text-danger mt-5">{this.state.contraseñaError}</div>
                                        <input type="password" className="input1"  name="contraseña" onChange={this.onChange}  value={this.state.contraseña} onFocus={() => this.setState({contraseña: this.props.contraseña})} placeholder={this.props.contraseña} />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button className="btn btn-primary" data-dismoss="modal" type="submit" onClick={this.Recargar}>Aceptar</button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>

        )
    }
    //#endregion
}

