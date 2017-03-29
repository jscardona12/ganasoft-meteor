/**
 * Created by Juan on 05/03/2017.
 */
import React, {Component,PropTypes} from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import {createContainer} from 'meteor/react-meteor-data'
import {Meteor} from 'meteor/meteor';
import {Animales} from '../api/animales'
import { FlowRouter } from 'meteor/kadira:flow-router';
class Animal extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    componentDidMount() {
        console.log("hola");
    }

    getPath() {
        return "/" + this.props.params.idfinca + "/animales"
    }


    render() {
        return (
            <div>
                {console.log(this.props.animales)}
                {this.props.animales.map((animal, index)=>
                    <div key ={index} className="panel panel-info col-md-3">
                        <div className="panel-heading">
                            <h3 className="panel-title"> ID: {animal.numero}</h3>
                        </div>
                        <div className="col-md-4">
                            <img alt="User Pic" src={animal.foto}
                                 className="img-circle img-responsive"/>
                        </div>
                        <div className="col-md-9">
                            <div className=" col-md-9 col-lg-9 ">
                                <table className="table table-user-information">
                                    <tbody>
                                    <tr>
                                        <td>Especie:</td>
                                        <td> {animal.especie}</td>
                                    </tr>
                                    <tr>
                                        <td>Raza:</td>
                                        <td>{animal.raza}</td>
                                    </tr>

                                    <tr>
                                        <td>Genero:</td>
                                        <td>{animal.sexo}</td>
                                    </tr>

                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                )}
            </div>

        );
    }


}
Animal.propTypes = {
    animales: PropTypes.array.isRequired,
    currentUser: PropTypes.object
};

export default createContainer(() => {
    Meteor.subscribe('animales');
    var idFinca = FlowRouter.getParam("fincaId");
    console.log(idFinca);
    return {
        animales: Animales.find({farm:idFinca,owner:Meteor.userId()}).fetch(),
        currentUser: Meteor.user()
    };

}, Animal);

