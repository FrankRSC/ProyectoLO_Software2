

//#region Componentes Importados
import React from 'react';
import { Route, BrowserRouter as Router, Redirect } from 'react-router-dom'
import Usuarios from './componentes/MostrarUsuario';
import Login from './componentes/Login'
import Nav from './componentes/Navbar'
import Aparatos from './componentes/Aparatos'
import Jumbo from './componentes/jumbotron'
import Contenido from './componentes/Contenido'
import ContenidoUsuario from './componentes/ContenidoUsuario'
import Contacto from './componentes/Contactanos'
import Error from './componentes/Error'
import Orden from './componentes/FormOrdenT'
import Perfil from './componentes/Perfil'
import OrdenesAdmin from './componentes/OrdenesAdmin'
import ContenidoAdmin from './componentes/ContenidoAdmin'
import './App.css';
//#endregion


//Clase Princpal de la pagina web en donde se mandan llamar
//A todos los componentes(Se denomina clase padre)
export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Route path="/"
          exact render={() => {
            return (
              <div>
                <Nav Contenido={
                  [
                    <Error />
                  ]} />
              </div>
            );
          }}
        />
        <Route path="/Inicio"
          exact render={() => {
            return (
              <div>
                <Nav Contenido={
                  [
                    <Contenido />

                  ]} />

              </div>
            );
          }}
        />
        <Route path="/Contacto"
          exact render={() => {
            return (
              <div>
                <Nav Contenido={
                  [
                    <Contacto />

                  ]} />

              </div>
            );
          }}
        />
        <Route path="/Login"
          exact render={() => {
            return (
              <div>
                <Login />
              </div>
            );
          }}
        />
        <Route path="/InicioAdmin"
          exact render={() => {
            return (
              <div>
                <Nav Contenido={
                  [
                    <ContenidoAdmin />
                  ]} />
              </div>
            );
          }}
        />
        <Route path="/InicioUsuarios"
          exact render={() => {
            return (
              <div>
                <Nav Contenido={
                  [

                    <ContenidoUsuario />

                  ]} />
              </div>
            );
          }}
        />
        <Route path="/Usuarios"
          exact render={() => {
            return (
              <div>
                <Nav Contenido={
                  [
                    <Usuarios />


                  ]} />

              </div>
            );
          }} />
        <Route path="/Aparatos"
          exact render={() => {
            return (
              <div>
                <Nav Contenido={
                  [
                    <Aparatos />


                  ]} />


              </div>
            );
          }} />

        <Route path="/Orden"
          exact render={() => {
            return (
              <div>
                <Nav Contenido={
                  [
                    <Orden />


                  ]} />


              </div>
            );
          }} />

        <Route path="/Perfil"
          exact render={() => {
            return (
              <div>
                <Nav Contenido={
                  [
                    <Perfil />


                  ]} />


              </div>
            );
          }} />
        <Route path="/Ordenes"
          exact render={() => {
            return (
              <div>
                <Nav Contenido={
                  [
                   
                    <OrdenesAdmin/>

                  ]} />


              </div>
            );
          }} />
      </Router>

    );
  }
}
