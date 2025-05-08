import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { CRUD_ACTIONS } from '../../../utils';
import * as actions from "../../../store/actions";
import "./DeviceRedux.scss";
import TableManageDevice from './TableManageDevice';
class DeviceRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userArr: [],
            chargerArr: [],
            typeArr: [],
            isOpen: false,

            fcm_token: '',

            action: '',
            deviceEditId: '',
        }
    }

    async componentDidMount() {
        this.props.getRole();
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
                user_id: arrUsers && arrUsers.length > 0 ? arrUsers[0].id : ''
            })
        }
        if (prevProps.chargerRedux !== this.props.chargerRedux) {
            let arrChargers = this.props.chargerRedux;
            this.setState({
                chargerArr: arrChargers,
                charger_id: arrChargers && arrChargers.length > 0 ? arrChargers[0].id : ''
            })
        }
        if (prevState.charger_id !== this.state.charger_id) {
            this.props.getTypeStart(this.state.charger_id);           
        }
        if (prevProps.typeRedux !== this.props.typeRedux) {
            let arrTypes = this.props.typeRedux;
            this.setState({
                typeArr: arrTypes,
                type_id: arrTypes && arrTypes.length > 0 ? arrTypes[0].id : ''
            })
        }
        

        if (prevProps.listDevices !== this.props.listDevices) {
            let arrUsers = this.props.userRedux;
            let arrChargers = this.props.chargerRedux;
            let arrTypes = this.props.typeRedux;


            this.setState({
                fcm_token: '',
                user_id: arrUsers && arrUsers.length > 0 ? arrUsers[0].id : '',
                charger_id: arrChargers && arrChargers.length > 0 ? arrChargers[0].id : '',
                type_id: arrTypes && arrTypes.length > 0 ? arrTypes[0].id : '',

                action: CRUD_ACTIONS.CREATE,

            })

        }
    }

    

    handlesaveDevice = () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;
        let { action } = this.state;

        if (action === CRUD_ACTIONS.CREATE) {
            //fire redux create location
            this.props.createNewDevice({
                user_id: this.state.user_id,
                charger_id: this.state.charger_id,
                type_id: this.state.type_id,
                fcm_token: this.state.fcm_token,
            })
        }
        if (action === CRUD_ACTIONS.EDIT) {
            //fire redux edit location
            this.props.editADeviceRedux({
                id: this.state.deviceEditId,
                user_id: this.state.user_id,
                charger_id: this.state.charger_id,
                type_id: this.state.type_id,
                fcm_token: this.state.fcm_token,

            })
        }


    }

    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ["fcm_token"]
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

    handleEditDeviceFromParent = (device) => {
        this.setState({
            user_id: device.user_id,
            charger_id: device.charger_id,
            type_id: device.type_id,
            fcm_token: device.fcm_token,
            action: CRUD_ACTIONS.EDIT,
            deviceEditId: device.id
        })
    }

    render() {

        let users = this.state.userArr;
        let chargers = this.state.chargerArr;
        let types = this.state.typeArr;
console.log('state', this.state)

        let { user_id, charger_id, type_id, fcm_token} = this.state;
        return (
            <div className='device-redux-container'>

                <div className="title" >Device Redux</div>
                <div className='device-redux-body'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 my-3'><FormattedMessage id='manage-location.add' /></div>

                            <div className='col-3'>
                                <label><FormattedMessage id='fcm_token' /></label>
                                <input className='form-control' type='text'
                                    value={fcm_token}
                                    onChange={(event) => { this.onChangeInput(event, 'fcm_token') }}
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
                                    onClick={() => this.handlesaveDevice()}
                                >
                                    {this.state.action === CRUD_ACTIONS.EDIT ?
                                        <FormattedMessage id='Edit               ' /> :
                                        <FormattedMessage id='Save    ' />}
                                </button>
                            </div>
                            <div className='col-12 mb-5'>
                                <TableManageDevice
                                    handleEditDeviceFromParentKey={this.handleEditDeviceFromParent}
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

        listDevices: state.admin.devices
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getRole: () => dispatch(actions.getRoleStart()),
        getChargerStart: () => dispatch(actions.fetchAllChargersStart()),
        getTypeStart: (charger_id) => dispatch(actions.fetchAllTypeByChargerIdStart(charger_id)),

        createNewDevice: (data) => dispatch(actions.createNewDevice(data)),
        fetchDeviceRedux: () => dispatch(actions.fetchAllDevicesStart()),
        editADeviceRedux: (data) => dispatch(actions.editADevice(data))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeviceRedux);

