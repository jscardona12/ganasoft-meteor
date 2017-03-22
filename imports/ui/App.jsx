import React, {Component} from 'react';
import {Link} from 'react-router';
import Fincas from './Fincas';
import Animal from './Animal';
import Home from './Home'

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }


    render() {
        return (

            <div>
                <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle" data-toggle="collapse"
                                    data-target=".navbar-collapse">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <Link to="/" className="navbar-brand">GanaSoft</Link>
                        </div>
                        <div className="navbar-collapse collapse">
                            <ul className="nav navbar-nav navbar-right">
                                <li><Link to="/fincas">Fincas</Link></li>
                                <li><a href="#">Settings</a></li>
                                <li><a href="#">Profile</a></li>
                                <li><a href="#">Help</a></li>
                            </ul>
                            <form className="navbar-form navbar-right">
                                <input type="text" className="form-control" placeholder="Search..."/>
                            </form>
                        </div>
                    </div>
                </nav>
                <br/>
                <br/>
                <div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default App;
