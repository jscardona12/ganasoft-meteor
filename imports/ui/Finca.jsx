import React, {Component} from 'react';
import {Farms} from '../api/fincas';
import SweetAlert from 'react-bootstrap-sweetalert';



class Finca extends Component {
    constructor(props) {
        super(props);

        this.state = {
            alert:null
        }
    }


    deleteFinca() {

        const texto = "Se ha eliminado la finca &quot;" + this.props.finca.name + "&quot;"
        const hideAlert=()=> {
            this.setState({
                alert: null
            });
        }
        const getAlert = () => (
        <SweetAlert
            warning
            showCancel
            confirmBtnText="Yes, delete it!"
            confirmBtnBsStyle="danger"
            cancelBtnBsStyle="default"
            title="Are you sure?"
            onConfirm={hideAlert()}
            onCancel={hideAlert()}
        >
            You will not be able to recover this imaginary file!
        </SweetAlert>
        );

        this.setState({
            alert: getAlert()
        });
    }
    getPath(){
        return"fincas/"+this.props.finca._id+"/animales"
    }


    componentDidMount() {
        console.log("im finca");
        // this.getAnimales();
    }

    render() {
        return (
            <div className="col-md-4 circle">
                <button className="delete" onClick={this.deleteFinca.bind(this)}>
                    &times;
                </button>
                <a href={this.getPath()}>
                    <button className="btn btn-circle"><h2>{this.props.finca.name}</h2></button>
                </a>
                {this.state.alert}
                <h4 className="text-muted">NumAnimales: 2</h4>
                <a href={this.getPath()}><button> lista de animales  </button> </a>
                <button onClick={this.deleteFinca.bind(this)}> ELIMINAR FINCA</button>
            </div>
        );
    }
}

export default Finca;
