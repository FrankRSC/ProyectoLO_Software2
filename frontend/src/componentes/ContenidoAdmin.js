import React, { Component } from 'react'
import Jumbo from './jumbotron'

export default class ContenidoAdmin extends Component {

    componentDidMount(){
        //si el id con el que entra no es el del admin lo manda a pagina de inicio
        if(localStorage.getItem("id") != '13'){
            window.location.href = "http://localhost:3000/"
        }
    }

    render() {
        return (
            <div>
                {/* Instanciando al componente jumbotron para ser utilizado */}
                <Jumbo/>
            </div>
        )
    }
}


