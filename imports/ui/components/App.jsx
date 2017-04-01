import React, {Component} from 'react';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';
// deberían corregir los errores de accesibilidad que les aparecen al correr audits
// ya que hay dos errores severos y dos warnings
//agregar labels a los inputs para mejorar a11y
// La app me gusta, solamente deberían solucionar los problemas de compatibilidad con diferentes pantallas, los de accesibilidad y uno que otro de usabilidad
class App extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }


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
                                <li><a id="navbar-list" href="/fincas">Fincas</a></li>
                                <li><a id="navbar-list" href="#">Settings</a></li>
                                <li><a id="navbar-list" href="#">Profile</a></li>
                            </ul>
                            <form className="navbar-form navbar-right">
                                <input type="text" className="form-control" placeholder="Search..."/>
                            </form>
                            <AccountsUIWrapper/>
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
