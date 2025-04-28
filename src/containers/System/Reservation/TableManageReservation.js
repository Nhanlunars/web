import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageReservation.scss';
import * as actions from "../../../store/actions";

class TableManageReservation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reservationsRedux: []
        }
    }
    componentDidMount() {
        this.props.fetchReservationRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listReservations !== this.props.listReservations) {
            this.setState({
                reservationsRedux: this.props.listReservations
            })
        }
    }

    handleDeleteReservation = (reservation) => {
        this.props.deleteAReservationRedux(reservation.id);
    }

    handleEditReservation = (reservation) => {
        this.props.handleEditReservationFromParentKey(reservation)
    }

    render() {
        let arrReservations = this.state.reservationsRedux;
        return (
            <React.Fragment>
                <table id="TableManageReservation">
                    <tbody>
                        <tr>
                            <th>User id</th>
                            <th>Charger id</th>
                            <th>Type id</th>
                            <th>Time start</th>
                            <th>Time end</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                        {arrReservations && arrReservations.length > 0 &&
                            arrReservations.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.user_id}</td>
                                        <td>{item.charger_id}</td>
                                        <td>{item.type_id}</td>
                                        <td>{item.start_time}</td>

                                        <td>{item.end_time}</td>
                                        <td>{item.status}</td>
                                        <td>
                                            <button onClick={() => this.handleEditReservation(item)} className='btn-edit' ><i className='fas fa-pencil-alt'></i> </button>
                                            <button onClick={() => this.handleDeleteReservation(item)}
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
        listReservations: state.admin.reservations
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchReservationRedux: () => dispatch(actions.fetchAllReservationsStart()),
        deleteAReservationRedux: (id) => dispatch(actions.deleteAReservation(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageReservation);
