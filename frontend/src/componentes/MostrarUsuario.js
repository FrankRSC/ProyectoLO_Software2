import React, { Component } from 'react'
import axios from 'axios';
import Registro from './AgregarUsuario'
import Editar from './Editar'


export default class MostrarUsuario extends Component {

    //Variables
    state = {
        usuarios: [],
        id: '',
        nombre: '',
        apellidoP: '',
        apellidoF: '',
        direccion: '',
        telefono: '',
        corre: '',
        contraseña: '',
    }

    async componentDidMount() {
        //api para hacer peticiones al servidor con put get
        if(localStorage.getItem("id")  != '13'){
            window.location.href = "http://localhost:3000/"
        }else{
            //Obtener todos los usuarios de la bd y almacenarlos en el arreglo usuarios
            const res = await axios.get('http://localhost:4000/api/usuarios')
            this.setState({ usuarios: res.data })
        }
        
    }


    //Eliminar un usuario
    delete = async (id) => {
        if(id === 13){
            alert('Este usuario no se puede eliminar')
        }else{
            await axios.delete('http://localhost:4000/api/usuarios/' + id)
            window.location.reload();
        }
        
    }


    //Obtener todos los datos del usuario seleccionado para la creacion de la vista de edicion
    Obtener = async (id) => {
        const { nombre,apellidoP,apellidoF,direccion,telefono,corre,contraseña,clave_cliente} = this.state.usuarios[id]; 
        this.setState({nombre:nombre})
        this.setState({apellidoP:apellidoP})
        this.setState({apellidoF:apellidoF})
        this.setState({direccion:direccion})
        this.setState({telefono:telefono})
        this.setState({corre:corre})
        this.setState({contraseña:contraseña})
        this.setState({id:clave_cliente})
    }

    //#region Codigo Html 
    render() {
        const { nombre,apellidoP,apellidoF,direccion,telefono,corre,contraseña,id} = this.state;
        return (
            <div className="container" >
                <div class="col-xs-12">
                    <div class="center-block ">
                        <h4 className="modal-title">Lista de Clientes</h4>
                        <table className="table table-bordered">
                            <thead className="thead-dark text-center ">
                                <tr>
                                    <th scope="col">Clave #</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Apellidos</th>
                                    <th scope="col">Direccion</th>
                                    <th scope="col">Telefono</th>
                                    <th scope="col">Correo</th>
                                    <th scope="col">Opciones</th>
                                </tr>
                            </thead>
                            <tbody className="text-center">

                                {/* Uso de la funcion map para desplegar todos los usuarios con formato */}
                                {this.state.usuarios.map((user,index) =>
                                    
                                    <tr key={user.clave_cliente}>
                                        <th scope="row">{user.clave_cliente}</th>
                                        <td>{user.nombre}</td>
                                        <td>{user.apellidoP} {user.apellidoF}</td>
                                        <td>{user.direccion}</td>
                                        <td>{user.telefono}</td>
                                        <td>{user.corre}</td>
                                        <td>
                                            <button className="btn btn-primary" href="#Editar" onClick={() => this.Obtener(index)} data-toggle="modal" data-backdrop="false">Editar</button>
                                            <button  className="btn btn-danger ml-3 " onClick={() => this.delete(user.clave_cliente)}>Eliminar</button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table> 
                        <button className="btn btn-primary float-right" href="#Registrar" data-toggle="modal" data-backdrop="false">Nuevo Usuario</button>
                        <Registro></Registro>
                        <Editar nombre = {nombre} apellidoP = {apellidoP} apellidoF={apellidoF} direccion={direccion} telefono={telefono} corre={corre} contraseña={contraseña} id={id}></Editar>
                    </div>
                </div>
                             
            </div>
        )
    }
    //#endregion
}
