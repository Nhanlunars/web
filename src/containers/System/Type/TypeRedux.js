import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { CRUD_ACTIONS, USER_ROLE } from '../../../utils';
import * as actions from "../../../store/actions";
import "./TypeRedux.scss";
import TableManageType from './TableManageType';
class TypeRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chargerArr: [],
            statusArr: [],
            isOpen: false,

            type_name: '',
            charger: '',
            describe: '',
            default_price: '',
            status: '',

            action: '',
            typeEditId: '',
        }
    }

    async componentDidMount() {
//this.props.getChargerStart();
const {  userInfo } = this.props;
        if(userInfo.roleId === USER_ROLE.ADMIN){
            this.props.getChargerStart();
        }
        if(userInfo.roleId === USER_ROLE.OWNER){
            this.props.getCharger(userInfo.id)
        }
this.props.getStatusStart();

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        //render => didupdate
        //hiện tại(this) và quá khứ(previous)
        //[] [3]
        //[3] [3]
        if (prevProps.chargerRedux !== this.props.chargerRedux) {
            let arrChargers = this.props.chargerRedux;
            this.setState({
                chargerArr: arrChargers,
                charger_id: arrChargers && arrChargers.length > 0 ? arrChargers[0].id : ''
            })
        }
        if (prevProps.statusRedux !== this.props.statusRedux) {
            let arrStatus = this.props.statusRedux;
            this.setState({
                statusArr: arrStatus,
                status: arrStatus && arrStatus.length > 0 ? arrStatus[0].keyMap : ''
            })
        }

        if (prevProps.listTypes !== this.props.listTypes) {
            let arrChargers = this.props.chargerRedux;
            let arrStatus = this.props.statusRedux;


            this.setState({
                type_name: '',
            describe: '',
            default_price: '',
            charger_id: arrChargers && arrChargers.length > 0 ? arrChargers[0].id : '',
            status: arrStatus && arrStatus.length > 0 ? arrStatus[0].keyMap : '',
                action: CRUD_ACTIONS.CREATE,

            })

        }
    }

    

    handlesaveType = () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;
        let { action } = this.state;
const {  userInfo } = this.props;

        if (action === CRUD_ACTIONS.CREATE) {
            //fire redux create location
            this.props.createNewType({
                type_name: this.state.type_name,
                charger_id: this.state.charger_id,
                describe: this.state.describe,
                default_price: this.state.default_price,
                status: this.state.status,
            })
        }
        if(userInfo.roleId === USER_ROLE.ADMIN){
            if (action === CRUD_ACTIONS.EDIT) {
            //fire redux edit location
            this.props.editATypeRedux({
                id: this.state.typeEditId,
                type_name: this.state.type_name,
                charger_id: this.state.charger_id,
                describe: this.state.describe,
                default_price: this.state.default_price,
                status: this.state.status,
            })
        }
        }
        if(userInfo.roleId === USER_ROLE.OWNER){
             if (action === CRUD_ACTIONS.EDIT) {
            //fire redux edit location
            this.props.editAType({
                id: this.state.typeEditId,
                type_name: this.state.type_name,
                charger_id: this.state.charger_id,
                describe: this.state.describe,
                default_price: this.state.default_price,
                status: this.state.status,
                userId: userInfo.id
            })
        }
        }
        


    }

    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ["type_name", "describe", "default_price"]
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

    handleEditTypeFromParent = (type) => {
        this.setState({
            type_name: type.type_name,
            charger_id: type.charger_id,
            default_price: type.default_price,
            describe: type.describe,
            status: type.status,
            action: CRUD_ACTIONS.EDIT,
            typeEditId: type.id
        })
    }

    render() {

        let chargers = this.state.chargerArr;
        let statuss = this.state.statusArr;

console.log(this.state)
        let { type_name, charger_id, default_price, describe, status} = this.state;
        return (
            <div className='type-redux-container'>

                <div className="title" >type Redux</div>
                <div className='type-redux-body'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 my-3'><FormattedMessage id='manage-location.add' /></div>

                            <div className='col-3'>
                                <label><FormattedMessage id='type_name' /></label>
                                <input className='form-control' type='location_name'
                                    value={type_name}
                                    onChange={(event) => { this.onChangeInput(event, 'type_name') }}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='default_price' /></label>
                                <input className='form-control' type='text'
                                    value={default_price}
                                    onChange={(event) => { this.onChangeInput(event, 'default_price') }}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='describe' /></label>
                                <input className='form-control' type='text'
                                    value={describe}
                                    onChange={(event) => { this.onChangeInput(event, 'describe') }}
                                />
                            </div>
                            <div className='col-3'>
                                                            <label><FormattedMessage id='Status' /></label>
                                                            <select className='form-control'
                                                                value={status}
                                                                onChange={(event) => { this.onChangeInput(event, 'status') }}
                                                            >
                                                                {statuss && statuss.length > 0 &&
                                                                statuss.map((item, index) => {
                                                                    return (<option key={index} value={item.keyMap}>{item.value}</option>)
                                                                })}
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
                           
                            
                            <div className='col-12 my-3'>
                                <button className={this.state.action === CRUD_ACTIONS.EDIT ? 'btn btn-warning' : 'btn btn-primary'}
                                    onClick={() => this.handlesaveType()}
                                >
                                    {this.state.action === CRUD_ACTIONS.EDIT ?
                                        <FormattedMessage id='Edit               ' /> :
                                        <FormattedMessage id='Save    ' />}
                                </button>
                            </div>
                            <div className='col-12 mb-5'>
                                <TableManageType
                                    handleEditTypeFromParentKey={this.handleEditTypeFromParent}
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
        chargerRedux: state.admin.chargers,
        listTypes: state.admin.types,
        statusRedux: state.admin.statuss,
       userInfo: state.user.userInfo,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        getChargerStart: () => dispatch(actions.fetchAllChargersStart()),
        getCharger: (userId) => dispatch(actions.fetchAllChargerByUserIdStart(userId)),
        createNewType: (data) => dispatch(actions.createNewType(data)),
        fetchTypeRedux: () => dispatch(actions.fetchAllTypesStart()),
        editATypeRedux: (data) => dispatch(actions.editAType(data)),
                editAType: (data) => dispatch(actions.editATypee(data)),

        getStatusStart: () => dispatch(actions.fetchStatusStart()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TypeRedux);

