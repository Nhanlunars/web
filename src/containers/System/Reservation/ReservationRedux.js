import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { CRUD_ACTIONS } from '../../../utils';
import * as actions from "../../../store/actions";
import "./ReservationRedux.scss";
import TableManageReservation from './TableManageReservation';
class ReservationRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userArr: [],
            chargerArr: [],
            typeArr: [],
            isOpen: false,

            start_time: '',
            end_time: '',
            status: '',
            
            action: '',
            reservationEditId: '',
        }
    }

    async componentDidMount() {
        this.props.getUserStart();
        this.props.getChargerStart();
        this.props.getTypeStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        //render => didupdate
        //hiện tại(this) và quá khứ(previous)
        //[] [3]
        //[3] [3]
        if (prevProps.userRedux !== this.props.userRedux) {
            let arrUsers = this.props.userRedux;
            this.setState({
                userArr: arrUsers,
                user: arrUsers && arrUsers.length > 0 ? arrUsers[0].id : ''
            })
        }
        if (prevProps.chargerRedux !== this.props.chargerRedux) {
            let arrChargers = this.props.chargerRedux;
            this.setState({
                chargerArr: arrChargers,
                charger: arrChargers && arrChargers.length > 0 ? arrChargers[0].id : ''
            })
        }
        if (prevProps.typeRedux !== this.props.typeRedux) {
            let arrTypes = this.props.typeRedux;
            this.setState({
                typeArr: arrTypes,
                type: arrTypes && arrTypes.length > 0 ? arrTypes[0].id : ''
            })
        }
        

        if (prevProps.listReservations !== this.props.listReservations) {
            let arrUsers = this.props.userRedux;
            let arrChargers = this.props.chargerRedux;
            let arrTypes = this.props.typeRedux;


            this.setState({
                start_time: '',
                end_time: '',
                status: '',
            user: arrUsers && arrUsers.length > 0 ? arrUsers[0].id : '',
            charger: arrChargers && arrChargers.length > 0 ? arrChargers[0].id : '',
            type: arrTypes && arrTypes.length > 0 ? arrTypes[0].id : '',

                action: CRUD_ACTIONS.CREATE,

            })

        }
    }

    

    handlesaveReservation = () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;
        let { action } = this.state;

        if (action === CRUD_ACTIONS.CREATE) {
            //fire redux create location
            this.props.createNewReservation({
                user_id: this.state.user_id,
                charger_id: this.state.charger_id,
                type_id: this.state.type_id,
                start_time: this.state.start_time,
                end_time: this.state.end_time,
                status: this.state.status,
            })
        }
        if (action === CRUD_ACTIONS.EDIT) {
            //fire redux edit location
            this.props.editAReservationRedux({
                id: this.state.reservationEditId,
                user_id: this.state.user_id,
                charger_id: this.state.charger_id,
                type_id: this.state.type_id,
                start_time: this.state.start_time,
                end_time: this.state.end_time,
                status: this.state.status,
            })
        }


    }

    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ["start_time", "status", "end_time"]
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('This input is required: ' + arrCheck[i])
                break;
            }
        }
        return isValid;
    }

    onChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }

    handleEditReservationFromParent = (reservation) => {
        this.setState({
            user_id: reservation.user_id,
            charger_id: reservation.charger_id,
            type_id: reservation.type_id,
            start_time: reservation.start_time,
            end_time: reservation.end_time,
            status: reservation.status,
            action: CRUD_ACTIONS.EDIT,
            reservationEditId: reservation.id
        })
    }

    render() {

        let users = this.state.userArr;
        let chargers = this.state.chargerArr;
        let types = this.state.typeArr;


        let { user_id, charger_id, type_id, start_time, end_time, status} = this.state;
        return (
            <div className='reservation-redux-container'>

                <div className="title" >Reservation Redux</div>
                <div className='reservation-redux-body'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 my-3'><FormattedMessage id='manage-location.add' /></div>

                            <div className='col-3'>
                                <label><FormattedMessage id='Time start' /></label>
                                <input className='form-control' type='text'
                                    value={start_time}
                                    onChange={(event) => { this.onChangeInput(event, 'start_time') }}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='Time end' /></label>
                                <input className='form-control' type='text'
                                    value={end_time}
                                    onChange={(event) => { this.onChangeInput(event, 'end_time') }}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='Status' /></label>
                                <input className='form-control' type='text'
                                    value={status}
                                    onChange={(event) => { this.onChangeInput(event, 'status') }}
                                />
                            </div>
                            
                            <div className='col-3'>
                                <label><FormattedMessage id='user' /></label>
                                <select className="form-control"
                                    value={user_id}
                                    onChange={(event) => { this.onChangeInput(event, 'user_id') }}
                                >
                                    {users && users.length > 0 &&
                                        users.map((item, index) => {
                                            return (<option key={index} value={item.id}>{item.email}</option>
                                            )
                                        })
                                    }

                                </select>
                            </div>

                            <div className='col-3'>
                                <label><FormattedMessage id='Charger' /></label>
                                <select className="form-control"
                                    value={charger_id}
                                    onChange={(event) => { this.onChangeInput(event, 'charger_id') }}
                                >
                                    {chargers && chargers.length > 0 &&
                                        chargers.map((item, index) => {
                                            return (<option key={index} value={item.id}>{item.charger_name}</option>
                                            )
                                        })
                                    }

                                </select>
                            </div>

                            <div className='col-3'>
                                <label><FormattedMessage id='Type' /></label>
                                <select className="form-control"
                                    value={type_id}
                                    onChange={(event) => { this.onChangeInput(event, 'type_id') }}
                                >
                                    {types && types.length > 0 &&
                                        types.map((item, index) => {
                                            return (<option key={index} value={item.id}>{item.type_name}</option>
                                            )
                                        })
                                    }

                                </select>
                            </div>
                           
                            
                            <div className='col-12 my-3'>
                                <button className={this.state.action === CRUD_ACTIONS.EDIT ? 'btn btn-warning' : 'btn btn-primary'}
                                    onClick={() => this.handlesaveReservation()}
                                >
                                    {this.state.action === CRUD_ACTIONS.EDIT ?
                                        <FormattedMessage id='Edit               ' /> :
                                        <FormattedMessage id='Save    ' />}
                                </button>
                            </div>
                            <div className='col-12 mb-5'>
                                <TableManageReservation
                                    handleEditReservationFromParentKey={this.handleEditReservationFromParent}
                                    action={this.state.action}
                                />
                            </div>
                        </div>
                    </div>

                </div>

                

            </div>

        )
    }

}

const mapStateToProps = state => {
    return {
        userRedux: state.admin.users,
        chargerRedux: state.admin.chargers,
        typeRedux: state.admin.types,

        listReservations: state.admin.reservations
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getUserStart: () => dispatch(actions.fetchAllUsersStart()),
        getChargerStart: () => dispatch(actions.fetchAllChargersStart()),
        getTypeStart: () => dispatch(actions.fetchAllTypesStart()),

        createNewReservation: (data) => dispatch(actions.createNewReservation(data)),
        fetchReservationRedux: () => dispatch(actions.fetchAllReservationsStart()),
        editAReservationRedux: (data) => dispatch(actions.editAReservation(data))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReservationRedux);

