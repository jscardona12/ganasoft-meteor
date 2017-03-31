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
            startDate: moment(),
            fecha1: '',
            fecha2: '',
            filtroId: ''
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.insertAnimal = this.insertAnimal.bind(this);
        this.changeDate= this.changeDate.bind(this);
        this.changeDate1= this.changeDate1.bind(this);
        this.changeDate2= this.changeDate2.bind(this);
    }

    changeDate(date) {
        this.setState({startDate: date});
    }

    changeDate1(date) {
        this.setState({fecha1: date});
    }

    changeDate2(date) {
        this.setState({fecha2: date});
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

    deleteThisAnimal(id){
      Meteor.call('animales.remove', id);

    }

    render() {
      let filteredAnimals=this.props.animales;
      console.log("ONI CHAN"+this.props.animales);
      if (this.state.fecha1) {
        filteredAnimals = filteredAnimals.filter(animal => animal.date-this.state.fecha1>=0);
      }
      if (this.state.fecha2) {
        filteredAnimals = filteredAnimals.filter(animal => animal.date-this.state.fecha2<=0);
      }
      if (this.state.filtroId) {
        filteredAnimals = filteredAnimals.filter(animal => animal._id.toString().startsWith(this.state.filtroId));
      }
        return (
            <div className="col-md-10">

                <div className="row">
                    <div className="col-md-10">
                        <div className="row">
                          <div className="col-md-3 text-center">
                            <b>Filtrar </b>
                          </div>
                          <div className="col-md-3 text-center">
                            Id: <input type="text" value={this.state.filtroId} onChange={(event) => {
                                this.setState({filtroId: event.target.value})
                            }}/>
                          </div>
                          <div className="col-md-3 text-center">
                            After: <DatePicker selected={this.state.fecha1} onChange={this.changeDate1}/>
                          </div>
                          <div className="col-md-3 text-center">
                            Before: <DatePicker selected={this.state.fecha2} onChange={this.changeDate2}/>
                          </div>
                        </div>
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

                    {filteredAnimals.map((animal, index) => <div key ={index} className="panel panel-info col-md-3">
                        <div className="panel-heading">

                            <h3 className="panel-title">
                                ID: {animal._id}</h3>

                                <button className="delete" onClick={()=> this.deleteThisAnimal(animal._id)}>
                                    &times;
                                </button>


                        </div>

                        <div className="col-md-3">


                              <img alt="User Pic" src="http://pre09.deviantart.net/0f00/th/pre/f/2011/170/8/2/stock_cow_number_3_by_pomprint-d3jbfnb.png" className="img-circle img-responsive"/>
                        </div>

                        <div className="col-md-9">
                                <table className="table table-user-information">
                                    <tbody>
                                      <tr>
                                          <td>Number:</td>
                                          <td>
                                              {animal.number}</td>
                                      </tr>
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
                                        <tr>
                                            <td>Fecha ingreso:</td>
                                            <td>{animal.date.toISOString()}</td>
                                        </tr>
                                    </tbody>
                                </table>
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
