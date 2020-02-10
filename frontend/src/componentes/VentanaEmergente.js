import React, { Component } from 'react'
import { Link } from 'react-router-dom';




export default class VentanaEmergente extends Component {
    
Validacion = () => {
    if(this.props.link === "/Login" ){
        window.location.reload();
    }else{
        
    }
    
}
    render() {
        return (
            
                    <div className="modal fade" data-backdrop="false" id="ventana1" >
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                <h4 className="modal-title align-items-start">{this.props.info}</h4>
                                    <button tyle ="button" className="close" data-dismiss="modal" aria-hidden = "true">&times;</button>
                                  
                                </div>

                                <div className="modal-body">
                                    <p id="info">{this.props.usuario}</p>
                                </div>
                                <div className="modal-footer">
                                   <Link to={this.props.link} onClick={this.Validacion}><button type="button" className="btn btn-primary">Aceptar</button></Link> 
                                </div>
                            </div>
                        </div>
                    </div>
        )
    }
}
