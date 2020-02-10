import React, { Component } from 'react'
import Jumbo from './jumbotron'

export default class ContenidoAdmin extends Component {

    componentDidMount(){
        if(localStorage.getItem("id") != '13'){
            window.location.href = "http://localhost:3000/"
        }
    }

    render() {
        return (
            <div>
                <Jumbo/>
            </div>
        )
    }
}


