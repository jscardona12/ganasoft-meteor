/**
 * Created by Juan on 06/03/2017.
 */
/**
 * Created by Juan on 05/03/2017.
 */
import React, {Component, PropTypes} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import Finca from './Finca';
import {Farms} from '../api/fincas.js';

class Fincas extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fincas: [],
        }
    }

    componentDidMount() {
        console.log("hola");
        // this.getFincas();
    }

    render() {
        return (
            <div className="container-fluid col-md-10">
                <div className="row placeholders">
                    {console.log(this.props.fincas)}
                    {/*{console.log(this.props.currentUser)}*/}
                    {this.props.fincas.map((finca, index)=>
                        <Finca key={index} finca={finca}/>
                    )}
                </div>

            </div>

        );
    }


}
Fincas.propTypes = {
    fincas: PropTypes.array.isRequired,
    // currentUser: PropTypes.object,
};
export default createContainer(() => {
    // Meteor.subscribe('fincas');
    return {
        fincas: Farms.find({}).fetch(),
        // currentUser: Meteor.user(),
    };

}, Fincas);
