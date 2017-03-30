/**
 * Created by Juan on 05/03/2017.
 */
import React, {Component, PropTypes} from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import {createContainer} from 'meteor/react-meteor-data'
import {Meteor} from 'meteor/meteor';
import {Animales} from '../api/animales'
import {FlowRouter} from 'meteor/kadira:flow-router';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import moment from 'moment';

require('react-datepicker/dist/react-datepicker.css');

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

class Animal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            number: 1,
            especie: '',
            raza: '',
            sexo: '',
            descripcion: '',
            modalIsOpen: false,
            startDate: moment()
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.insertAnimal = this.insertAnimal.bind(this);
        this.changeDate= this.changeDate.bind(this);
    }

    changeDate(date) {
        this.setState({startDate: date});
    }

    componentDidMount() {
        console.log("hola");
        console.log("THE DATE IS: "+this.state.startDate);
    }

    getPath() {
        return "/" + this.props.params.idfinca + "/animales"
    }

    insertAnimal()
    {
        Meteor.call('animales.insert', FlowRouter.getParam('fincaId'), this.state.number, this.state.especie, this.state.raza, this.state.sexo, this.state.descripcion, this.state.startDate.toDate());
        this.setState({modalIsOpen: false});

    }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    render() {
        return (
            <div className="col-md-11">

                <div className="row">
                    <div className="col-md-10">
                        <p>This is a paragraph</p>
                    </div>
                    <div className="col-md-2">
                        <button onClick={this.openModal} className="btn btn-success">+ Animal</button>
                    </div>
                </div>
                <div className="row">
                    <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal} contentLabel="Modal" shouldCloseOnOverlayClick={false} style={customStyles}>
                        <div className="container">
                            <div className="row text-center">
                                <h2>Animal Form</h2>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="row">
                                        <div className="col-md-3">
                                            <div className="row">
                                                Number
                                            </div>
                                            <div className="row">
                                                Genero
                                            </div>
                                        </div>
                                        <div className="col-md-9">
                                            <div className="row">
                                                <input type="text" value={this.state.number} onChange={(event) => {
                                                    this.setState({number: event.target.value})
                                                }}/>
                                            </div>
                                            <div className="row">
                                                <input type="text" value={this.state.sexo} onChange={(event) => {
                                                    this.setState({sexo: event.target.value})
                                                }}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="row">
                                        <div className="col-md-3">
                                            <div className="row">
                                                Especie
                                            </div>
                                            <div className="row">
                                                Raza
                                            </div>
                                        </div>
                                        <div className="col-md-9">
                                            <div className="row">
                                                <input type="text" value={this.state.especie} onChange={(event) => {
                                                    this.setState({especie: event.target.value})
                                                }}/>

                                            </div>
                                            <div className="row">
                                                <input type="text" value={this.state.raza} onChange={(event) => {
                                                    this.setState({raza: event.target.value})
                                                }}/>

                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="col-md-4">
                                    <div className="row">
                                        <div className="col-md-3">
                                            <div className="row">
                                                Descripción
                                            </div>
                                            <div className="row">
                                                Fecha Ingreso
                                            </div>
                                        </div>
                                        <div className="col-md-9">
                                            <div className="row">
                                                <input type="text" value={this.state.descripcion} onChange={(event) => {
                                                    this.setState({descripcion: event.target.value})
                                                }}/>

                                            </div>
                                            <div className="row">
                                                <DatePicker selected={this.state.startDate} onChange={this.changeDate}/>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 text-center">
                                    <button type="button" className="btn btn-danger" onClick={this.closeModal}>Back</button>
                                </div>
                                <div className="col-md-6 text-center">
                                    <button type="button" className="btn btn-success" onClick={this.insertAnimal}>Add</button>
                                </div>
                            </div>
                        </div>
                    </Modal>
                    {this.props.animales.map((animal, index) => <div key ={index} className="panel panel-info col-md-3">
                        <div className="panel-heading">
                            <h3 className="panel-title">
                                ID: {animal.numero}</h3>
                        </div>
                        <div className="col-md-4">
                            <img alt="User Pic" src={animal.foto} className="img-circle img-responsive"/>
                        </div>
                        <div className="col-md-9">
                            <div className=" col-md-9 col-lg-9 ">
                                <table className="table table-user-information">
                                    <tbody>
                                        <tr>
                                            <td>Especie:</td>
                                            <td>
                                                {animal.especie}</td>
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
                    </div>)}
                </div>
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
        animales: Animales.find({farm: idFinca}).fetch(),
        currentUser: Meteor.user()
    };

}, Animal);
