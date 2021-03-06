import React, {Component} from 'react';
import {Farms} from '../../api/fincas';
import SweetAlert from 'react-bootstrap-sweetalert';
import {Meteor} from 'meteor/meteor';
import {Animales} from '../../api/animales'
import {FlowRouter} from 'meteor/kadira:flow-router';

class Finca extends Component {
    constructor(props) {
        super(props);

        this.state = {
            alert: null,
        }
    }

    deleteFinca(name) {
        const texto = "Se ha eliminado la finca \"" +name+ "\"" ;
        const hideAlert = () => {
            this.setState({
                alert: null
            });
        };
        const succesA = ()=> {
            console.log("delete");
            this.setState({
                alert: getSuccessAlert
            });

        };
        const deleteThisFarm =()=> {
          this.setState({
              alert: null
          });
            Meteor.call('fincas.remove', this.props.finca._id);

        };

        const getWAlert = (

            <SweetAlert
                warning
                showCancel
                confirmBtnText="Si!"
                confirmBtnBsStyle="danger"
                cancelBtnBsStyle="default"
                title="Estas seguro?"
                onConfirm={succesA}
                onCancel={hideAlert}
            >
                No podras recuperar la informacion de esta finca!
            </SweetAlert>
        );
        const getSuccessAlert = (
            <SweetAlert
                        success
                        title={texto}
                        onConfirm={deleteThisFarm}>
            </SweetAlert>

        );
        this.setState({
            alert: getWAlert
        });



    }



    getPath() {
        return "fincas/" + this.props.finca._id + "/animales"
    }


    componentDidMount() {

    }

    render() {
        {console.log(this.props.animales);}
        return (
            <div className="col-md-4 circle">
                <div>
                    <button className="delete" onClick={()=> this.deleteFinca(this.props.finca.name)}>
                        &times;
                    </button>
                </div>
                <div className="text-vertical-center">
                    <a href={this.getPath()}>
                        <button className="btn btn-circle">
                            <h2>{this.props.finca.name}</h2>
                            <h4 >NumAnimales: {this.props.animales.length}</h4>
                        </button>
                    </a>
                    {this.state.alert}
                    <a href={this.getPath()}>
                        <button id="buttonAnimal"className="btn btn-lg"> Animales</button>
                    </a>
                </div>
            </div>
        );
    }
}

export default Finca;
