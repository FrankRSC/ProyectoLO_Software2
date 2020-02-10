import { Button, Row, Container, Col } from 'react-bootstrap';
import React, { Component } from 'react'
import '../Estilos/FormOrdenT.css'
import Logo from '../Imagenes/logo.jpg'
import '../Estilos/animations.css'

import axios from 'axios';

export default class FormOrdenT extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '', value2: '', value3: '', value4: '', value5: '', value6: '', value7: '', value8: '', value9: ''
      , value10: 'Ninguna',
      value1Error: '',
      value2Error: '',
      value3Error: '',
      value4Error: '',
      value5Error: '',
      value6Error: '',
      value7Error: '',
      value8Error: '',
      value9Error: '',
      value10Error: '',
      file: '',
      imagePreviewUrl: '',
      valido: false,
      material: []
    };

    this.handleChange = this.handleChange.bind(this);
    
  }



  //#region Validacion
  validar = () => {
    let value1Error = ''
    let value2Error = ''
    let value3Error = ''
    let value4Error = ''
    let value5Error = ''
    let value6Error = ''
    let value7Error = ''
    let value8Error = ''
    let value9Error = ''
    let value10Error = ''



    if (this.state.value.length < 3 || this.state.value.length >= 40) {
      value1Error = "*Ingrese Nombre De Clinica Valido"
      if (this.state.value.length >= 40) {
        value1Error = "*El nombre de la clinica es demasiado largo"
      }
    }

    if (this.state.value2.length < 3 || this.state.value.length >= 60) {
      value2Error = "*Ingrese Paciente Valido"
      if (this.state.value.length >= 60) {
        value2Error = "*El nombre del Paciente es demasiado largo"
      }
    }

    if (!this.state.value3) {
      value3Error = "*Ingrese Fecha Valida"

    }

    if (this.state.value4.length < 3 || this.state.value.length >= 60) {
      value4Error = "*Ingrese Doctor Valido"
      if (this.state.value.length >= 60) {
        value4Error = "*El nombre del Doctor es demasiado largo"
      }
    }

    if (!this.state.value5) {
      value5Error = "*Ingrese Fecha Valida"
    }

    if (this.state.value6.length < 16 || this.state.value.length >= 2048) {
      value6Error = "*Descripcion demasiado corto, minimo 15 caracteres"
      if (this.state.value.length >= 2048) {
        value6Error = "*El contenido es demasiado largo"
      }
    }

    if (this.state.value7.length < 3 || this.state.value.length >= 25) {
      value7Error = "*Ingrese Color"
      if (this.state.value.length >= 25) {
        value7Error = "*El nombre del color es demasiado largo"
      }
    }

    if (!this.state.value8) {
      value8Error = "*Ingrese Material Valido"
    }

    if (!this.state.value9) {
      value9Error = "*Campo Vacio"
    }


    if (value1Error || value2Error || value3Error || value4Error || value5Error || value6Error || value7Error || value8Error || value9Error || value10Error) {
      this.setState({ value1Error, value2Error, value3Error, value4Error, value5Error, value6Error, value7Error, value8Error, value9Error, value10Error });
      return false;
    }

    return true;
  }

  //#endregion



  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleChangeDoctor = (e) => {
    let valor
    var numbers = new RegExp("^(?=.*[0-9])");
    var words = e.target.value
    if (numbers.test(words)) {
      valor = 1
    } else {
      valor = 0
    }
    this.setState({
      value4: e.target.value
    })

    if (valor === 1) {
      this.setState({ valido: false, value4Error: 'Este campo no puede contener numeros' })
    } else {
      this.setState({ valido: true, value4Error: '' })
    }
  }


  handleSubmit = async (event) => {
    const isvalid = this.validar();
    if (isvalid && this.state.valido) {
      alert('Orden Realizada correctamente')
      const formData = new FormData();
      formData.append('image', this.state.file);
      await axios.post('http://localhost:4000/api/images/', formData)
        .then((result) => {
          this.setState({imagePreviewUrl:result.data.path })
        })

      console.log(this.state.imagePreviewUrl)
      await axios.post('http://localhost:4000/api/ordenes/',
        {
          Clinica: this.state.value,
          Paciente: this.state.value2,
          Fecha_salida: this.state.value3,
          Doctor: this.state.value4,
          Fecha_entrada: this.state.value5,
          Trabajo_realizar: this.state.value6,
          Color: this.state.value7,
          Material: this.state.value8,
          Imagen: this.state.imagePreviewUrl,
          Observaciones: this.state.value10,
          Estado: 1,
          clave_cliente:  localStorage.getItem("id"),
        })
      event.preventDefault();
    }
    event.preventDefault();
  }

  handleChangeImage = (e) => {
    this.setState({ file: e.target.files[0], value9: 'as' });
  }


    async componentDidMount() {
    //api para hacer peticiones al servidor con put get
    if (localStorage.getItem("id") === '10000' || localStorage.getItem("id") === '13') {
      window.location.href = "http://localhost:3000/"
    }else{
      const res = await axios.get('http://localhost:4000/api/material')
      console.log(res.data)
      this.setState({ material: res.data })
    }
    
}


  render() {
    return (
      <div class="ffl" style={{ marginTop: '50px' }}>
        <form onSubmit={this.handleSubmit} className="boxx">
          <div class="d-flex justify-content-center">

            <img class="slideRight imglogo" src={Logo} />

            <h1 class="slideLeft h1logo mt-4">Lapro-Orto</h1>
          </div>
          <Container >
            <Row>
              <Col>
                <div style={{ fontSize: '16px' }} className="text-center font-weight-bold text-danger mt-5">{this.state.value1Error}</div>
                <label>
                  *Clinica:
                <input minlength="5" maxLength="40" type="text" name="value" id="defaultContactFormName" class="input" value={this.state.value} onChange={this.handleChange} />
                </label>
              </Col>
              <Col>
                <div style={{ fontSize: '16px' }} className="text-center font-weight-bold text-danger mt-5">{this.state.value2Error}</div>
                <label>
                  *Paciente:
               <input type="text" maxLength="60" minlength="5" class="input" name="value2" id="defaultContactFormName" value={this.state.value2} onChange={this.handleChange} />
                </label></Col>
            </Row>

            <Row>
              <Col>
                <div style={{ fontSize: '16px' }} className="text-center font-weight-bold text-danger mt-5">{this.state.value3Error}</div>
                <label>
                  *Fecha de salida:
            <input type="date" name="value3" id="defaultContactFormName" class="input" value={this.state.value3} min="2019-12-11" onChange={this.handleChange} />
                </label>
              </Col>
              <Col>
                <div style={{ fontSize: '16px' }} className="text-center font-weight-bold text-danger mt-5">{this.state.value4Error}</div>
                <label>
                  *Doctor:
            <input type="text" name="value4" maxLength="60" minlength="5" id="defaultContactFormName" class="input" value={this.state.value4} onChange={this.handleChangeDoctor} />
                </label>
              </Col>
            </Row>

            <Row>
              <Col>
                <div style={{ fontSize: '16px' }} className="text-center font-weight-bold text-danger mt-5">{this.state.value5Error} </div>
                <label>
                  *Fecha de entrada:
                  <input type="date" name="value5" id="defaultContactFormName" class="input" min="2019-12-02" max={this.state.value3} value={this.state.value5} onChange={this.handleChange} />
                </label>
              </Col>
              <Col>
                <div style={{ fontSize: '16px' }} className="text-center font-weight-bold text-danger mt-5">{this.state.value6Error}</div>
                <label>
                  *Trabajo a realizar:
                  <textarea type="text" maxLength="2048" name="value6" id="defaultContactFormName" class="input" style={{ height: "80px", textAlign: "left" }} value={this.state.value6} onChange={this.handleChange} />
                </label>
              </Col>
            </Row>

            <Row>
              <Col>
                <div style={{ fontSize: '16px' }} className="text-center font-weight-bold text-danger mt-5">{this.state.value7Error}</div>
                <label>
                  *Color:
                  <input type="text" name="value7" maxLength="25" minlength="3" id="defaultContactFormName" class="input" value={this.state.value7} onChange={this.handleChange} />
                </label>
              </Col>
              <Col>
                <div style={{ fontSize: '16px' }} className="text-center font-weight-bold text-danger mt-5">{this.state.value8Error}</div>
                <label>
                  *Material:
                  <select name="value8" class="input" value={this.state.value8} onChange={this.handleChange} >
                  <option value="---">---</option>/>
                  {this.state.material.map(mat =>
                    <option value={mat.nombre_material}>{mat.nombre_material}</option>
                    
                    )}
                  <option value="Otro">Otro</option>/>
            </select>
                </label>
              </Col>
            </Row>

            <Row>
              <Col>
                <div style={{ fontSize: '16px' }} className="text-center font-weight-bold text-danger mt-5">{this.state.value9Error}</div>
                <label>
                  *Adjuntar foto del caso:
                 <input type="file" name="value9" id="inputFile" class="input" onChange={this.handleChangeImage} />
                </label>
              </Col>
              <Col>
                <div style={{ fontSize: '16px' }} className="text-center font-weight-bold text-danger mt-5">{this.state.value10Error}</div>
                <label>
                  Observaciones:
                 <input type="text" name="value10" id="defaultContactFormName" class="input" value={this.state.value10} onChange={this.handleChange} />
                </label>
              </Col>
            </Row>
          </Container>
          <button type="submit" className="btn blue-gradient"  >Enviar Orden</button>
        </form>
      </div>
    );
  }
}