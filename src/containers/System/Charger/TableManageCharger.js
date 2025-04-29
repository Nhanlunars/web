import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageCharger.scss';
import * as actions from "../../../store/actions";

class TableManageCharger extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chargersRedux: []
        }
    }
    componentDidMount() {
        this.props.fetchChargerRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listChargers !== this.props.listChargers) {
            this.setState({
                chargersRedux: this.props.listChargers
            })
        }
    }

    handleDeleteCharger = (charger) => {
        this.props.deleteAChargerRedux(charger.id);
    }

    handleEditCharger = (charger) => {
        this.props.handleEditChargerFromParentKey(charger)
    }

    render() {
        let arrChargers = this.state.chargersRedux;
        return (
            <React.Fragment>
                <table id="TableManageCharger">
                    <tbody>
                        <tr>
                            <th>Charger name</th>
                            <th>capacity</th>
                            <th>installation_date</th>
                            <th>last_maintence_date</th>
                            <th>location_id</th>
                            <th>Actions</th>
                        </tr>
                        {arrChargers && arrChargers.length > 0 &&
                            arrChargers.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.charger_name}</td>
                                        <td>{item.capacity}</td>
                                        <td>{item.installation_date}</td>
                                        <td>{item.last_maintence_date}</td>
                                        <td>{item.location_id}</td>
                                        <td>
                                            <button onClick={() => this.handleEditCharger(item)} className='btn-edit' ><i className='fas fa-pencil-alt'></i> </button>
                                            <button onClick={() => this.handleDeleteCharger(item)}
                                                className='btn-delete' ><i className='fas fa-trash'></i> </button>
                                        </td>
                                    </tr>
                                )
                            })


                        }

                    </tbody>
                </table>
            </React.Fragment>
        );
    }

}




const mapStateToProps = state => {
    return {
        listChargers: state.admin.chargers
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchChargerRedux: () => dispatch(actions.fetchAllChargersStart()),
        deleteAChargerRedux: (id) => dispatch(actions.deleteACharger(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageCharger);
