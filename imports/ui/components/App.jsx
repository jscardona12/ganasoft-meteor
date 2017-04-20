import React, {Component} from 'react';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

// No encontre la retroalimentación de los usuriarios, si que tiene dos logos pero aun cuando se despliega que sigue saliendo del fondo negro.
// Se esta perdiendo mucho espacio en la paguina en su inicio y cuando se loggea, se puede adicionar una descripción para entender mejor la dinamica de la aplicación
// En los campos cuando se quiere agregar un animal, no tiene ninguna diferenciación del tipo de dato que recibe, seria bueno que si son de tipo date
// me de un ayuda visual de que va ahi.
// en el menu principal, me parece muy bien que cuando no estoy loggeada me arroje un pop-up que me explique que me tengo que loggear, pero también deberia pasar 
// con settings o profile (o solo no aparecer). 
// Otra cosita son las validación en las fechas del filtro, es decir que los usuarios no puedan poner las fechas inversas y aun tenga sentido.

    render() {
        return (
            <div >
                <nav id ="navbar" className="navbar navbar-light navbar-fixed-top" role="navigation">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle" data-toggle="collapse"
                                    data-target=".navbar-collapse">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>

                            <a href="/" id="navbar-brand" className="navbar-brand">
                                <img
                                    className="logo"
                                    src="../images/logo1.png"
                                    alt="logo"/>
                            </a>
                        </div>
                        <div className="navbar-collapse collapse">
                            <ul className="nav navbar-nav navbar-right">
                                <li><AccountsUIWrapper/></li>
                                <li><a id="navbar-list" href="/fincas">Fincas</a></li>
                                <li><a id="navbar-list" href="#">Settings</a></li>
                                <li><a id="navbar-list" href="#">Profile</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <br/>
                <br/>
                <br/>
                <br/>
                <div>
                    <div>
                        <div className="col-md-1"></div>
                        {this.props.main}
                    </div>
                </ div >
            </ div >
        )
    };
}
export default App;
