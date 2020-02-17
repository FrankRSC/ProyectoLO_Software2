import React, { Component } from 'react'
import Logo from '../Imagenes/Logo.jpeg'
import { Link } from 'react-router-dom';
import fondo from '../Imagenes/imgJumbo.jpg';
import { MDBNavbar } from "mdbreact"
import Perfil from '../Imagenes/fotoPerfil.jpg';
import {Button,Header,Icon,Menu,Segment,Sidebar} from 'semantic-ui-react'


//Clase donde van las funciones a utilizar en la vista
export default class Navbar extends Component {
    
    state = {
        animation: 'scale down',
        direction: 'left',
        dimmed: false,
        visible: false,
        tipoUsuario: null
    }

    //Esconder la navbar o mostrarla
    hola = (e) => {
        this.setState({ visible: !this.state.visible })
        e.preventDefault();
    }

    //Cerrar sesion
    desconectar = () => {
        localStorage.setItem("id", 10000)
    }


    render() {

        //#region Aqui esta el patron prototype posiblemente lo borre
        //Patron Prototype
        function Usuario(Nombre, ApellidoPaterno){
            this.Nombre = Nombre;
            this.ApellidoPaterno = ApellidoPaterno
        }

        Usuario.prototype.getNombre = function(){
            return this.Nombre
        }
        
        Usuario.prototype.getApellido = function(){
                return this.ApellidoPaterno
        }

        function Administrador(Nombre, ApellidoPaterno,id){
            Usuario.call(this,Nombre,ApellidoPaterno)
            this.id = id
        }

        Administrador.prototype = Object.create(Usuario.prototype)

        Administrador.prototype.getAdministrador = function(){
            
            return (this.getNombre() + " " + this.getApellido() + this.id)
        }
        //#endregion


        //Obener el nombre, apellido y id del local storage del navegador
        let Admin = new Administrador(localStorage.getItem("Nombre"),localStorage.getItem("ApellidoPaterno"),localStorage.getItem("id"))
        //Cambiar el local storage a administraciodor
        localStorage.setItem("administrador", Admin.getAdministrador())
        
        const { animation, direction, visible } = this.state
        //Variable para almacenar la navbar
        let div;
        //Variable para almacenar las opcines disponibles
        let opciones;

        //si el id del usuario es 13 significa que es administrador
        if (localStorage.getItem("id") === '13') {
            //#region Codigo html de la navbar del admin
            div =
                <div className="d-flex justify content-end">
                    <label className="mt-1 lead text-white">{localStorage.getItem("Usuario")}</label>
                    <div className="ml-3 dropleft">
                        <img src={Perfil} className="img dropdown-toggle " data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />
                        <i class="fas fa-chevron-down ml-3 " data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" ></i>
                        <div class="dropdown">
                            <div class="dropdown-menu">

                                <Link to="Perfil" class="dropdown-item"> Perfil </Link>

                                <a class="dropdown-item">Ventas</a>
                                <div class="dropdown-divider"></div>
                                <Link style={{ textDecoration: 'none' }} onClick={this.desconectar} to="/Login" className="dropdown-item">Salir</Link>
                            </div>
                        </div>
                    </div>
                </div>

            opciones =
                <div>
                    <Link to="InicioAdmin">
                        <Menu.Item>
                            <img src={Logo} className="img" style={{ marginLeft: '26%' }} />
                        </Menu.Item>
                    </Link>
                    <Link to="InicioAdmin">
                        <Menu.Item as='a'>
                            <Icon name='home' />
                            Inicio
                    </Menu.Item>
                    </Link>
                    <Link to="Aparatos">
                        <Menu.Item as='a'>
                            <Icon name='clipboard list' />
                            Productos
                    </Menu.Item>
                    </Link>
                    <Link to="Ordenes">
                        <Menu.Item as='a'>
                            <Icon name='clipboard outline' />
                            Ver Ordenes
                    </Menu.Item>
                    </Link>
                    <Link to="Usuarios">
                        <Menu.Item as='a'>
                            <Icon name='user outline' />
                            Usuarios
                    </Menu.Item>
                    </Link>
                </div>
        //#endregion
        
        
        //si el id del usuario es diferente de 10000, el usuario es un usuario registrado
        } else if (localStorage.getItem("id") != '10000') {
        //#region Codigo html para la navbar del usuario logueado
            div = <div className="d-flex justify content-end">
                <label className="mt-1 lead text-white">{localStorage.getItem("Usuario")}</label>
                <div className="ml-3 dropleft">
                    <img src={Perfil} className="img dropdown-toggle " data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />
                    <i class="fas fa-chevron-down ml-3 " data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" ></i>
                    <div class="dropdown">
                        <div class="dropdown-menu">

                            <Link to="Perfil" class="dropdown-item"> Perfil </Link>
                            <div class="dropdown-divider"></div>
                            <Link style={{ textDecoration: 'none' }} onClick={this.desconectar} to="/Login" className="dropdown-item">Salir</Link>
                        </div>
                    </div>
                </div>
            </div>

            opciones =
                <div>
                    <Link to="InicioUsuarios">
                        <Menu.Item>
                            <img src={Logo} className="img" style={{ marginLeft: '26%' }} />
                        </Menu.Item>
                    </Link>
                    <Link to="InicioUsuarios">
                        <Menu.Item as='a'>
                            <Icon name='home' />
                            Inicio
                    </Menu.Item>
                    </Link>
                    <Link to="Aparatos">
                        <Menu.Item as='a'>
                            <Icon name='clipboard list' />
                            Productos
                    </Menu.Item>
                    </Link>
                    <Link to="Orden">
                        <Menu.Item as='a'>
                            <Icon name='clipboard outline' />
                            Hacer Orden
                    </Menu.Item>
                    </Link>
{/*                    <Link to="Contacto">
                        <Menu.Item as='a'>
                            <Icon name='address book outline' />
                            Contacto
                    </Menu.Item>
                    </Link>
                    <Menu.Item as='a'>
                        <Icon name='question circle outline' />
                        Acerca de
                    </Menu.Item>*/}
                </div>

        //#endregion
        //es un usuario sin cuenta
        } else {
            //#region Codigo html para navbar sin usuario
            div = <form class="form-inline my-2 my-lg-0">
                <Link to="/Login"><button className="btn blue-gradient my-2 my-sm-0">Iniciar Sesion</button></Link>

            </form>

            opciones =
                <div>
                    <Link to="/Inicio">
                        <Menu.Item>
                            <img src={Logo} className="img" style={{ marginLeft: '26%' }} />
                        </Menu.Item>
                    </Link>
                    <Link to="Inicio">
                        <Menu.Item as='a'>
                            <Icon name='home' />
                            Inicio
                    </Menu.Item>
                    </Link>
                    <Link to="Aparatos">
                        <Menu.Item as='a'>
                            <Icon name='clipboard list' />
                            Productos
                    </Menu.Item>
                    </Link>
                   {/* <Link to="Contacto">
                        <Menu.Item as='a'>
                            <Icon name='address book outline' />
                            Contacto
                    </Menu.Item>
        </Link>*/}
                
                </div>
        //#endregion
        }



        return (


            //#region Codigo html
            <div>
                <Sidebar.Pushable style={{ height: '100vh' }}>

                    <Sidebar className="blue-gradient" as={Menu} animation={animation} direction={direction} icon='labeled' inverted vertical visible={visible} width='very'>
                        {opciones}
                    </Sidebar>

                    <Sidebar.Pusher>
                        <MDBNavbar className="navbar fixed-top" color="blue-gradient" dark expand="md" >
                            <a className="mr-5" onClick={this.hola}><i class="fas fa-bars"></i><span className="text-black ml-3 " style={{font:'sans-serif'}}>Menu</span></a>
                            <div>
                                <img src={Logo} className="img mr-3" />
                            </div>
                            <a className="navbar-brand text-black " >Lapro-Orto</a>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            <div className="collapse navbar-collapse justify-content-center" id="navbarColor01" >
                            </div>
                            {div}
                        </MDBNavbar>

                        {this.props.Contenido}

                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div>
//#endregion
        )
    }
}