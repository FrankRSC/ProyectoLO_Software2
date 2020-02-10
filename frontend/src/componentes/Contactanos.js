import React, { Component } from 'react'

export default class Contactanos extends Component {
    render() {
        return (
            <div className="container">
            <h3 className="text-center">Contactanos</h3>
            <p className="text-center"><em>Queremos saber su opinion</em></p>

            <div className="row">
                <div className="col-md-4">
                    <p>Informacion del contacto</p>
                    <p><span className="glyphicon glyphicon-map-marker"></span>Hermosillo, Sonora</p>
                    <p><span className="glyphicon glyphicon-phone"></span>Celular: 6624865223</p>
                    <p><span className="glyphicon glyphicon-envelope"></span>Email: GuillermoFlores@gmail.com</p>
                </div>
                <div className="col-md-8">
                    <div className="row">
                        <div className="col-sm-6 form-group">
                            <input className="form-control" id="name" name="name" placeholder="Nombre" type="text" required />
                        </div>
                        <div className="col-sm-6 form-group">
                            <input className="form-control" id="email" name="email" placeholder="Email" type="email" required />
                        </div>
                    </div>
                    <textarea className="form-control" id="comments" name="comments" placeholder="Comentario" rows="5"></textarea>
                    <br />
                    <div className="row">
                        <div className="col-md-12 form-group">
                            <button className="btn pull-right" type="submit">Enviar</button>
                        </div>
                    </div>
                </div>
            </div>
            <br />



            <div className="tab-content">



            </div>
        </div>
        )
    }
}
