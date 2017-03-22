/**
 * Created by Juan on 06/03/2017.
 */
/**
 * Created by Juan on 05/03/2017.
 */
import React, {Component, PropTypes} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import Finca from './Finca';
import {farms} from '../api/fincas.js';

class Fincas extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fincas: [],
        }
    }

    // getFincas() {
    //     axios.get(ROOT_URL + "farms")
    //         .then(response => {
    //             this.setState({
    //                 fincas: response.data
    //             })
    //         })
    // }



    componentDidMount() {
        console.log("hola");
        this.getFincas();
    }

    render() {
        return (
            <div className="container-fluid col-md-10">
                <div className="row placeholders">
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
    currentUser: PropTypes.object,
};
export default createContainer(() => {
    Meteor.subscribe('fincas');
    return {
        fincas: farms.find({}),
        currentUser: Meteor.user(),
    };

}, Fincas);
