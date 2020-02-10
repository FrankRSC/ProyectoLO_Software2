import React, { Component } from 'react'
import axios from 'axios';

export default class Error extends Component {
    constructor(props){
        super(props);

        this.state ={
            file:null
        }
    }

    onSubmit =async (e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('image',this.state.file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        await axios.post('http://localhost:4000/api/ordenes',formData)
    }

    onChange= (e) =>{
        this.setState({file:e.target.files[0]});
    }

    render() {
        
        return (
            <div style={{marginTop: '100px', marginLeft:'40%'}}>
                <h1>No tiene acceso a esta pagina</h1>
                
            </div>
        )
    }
}
