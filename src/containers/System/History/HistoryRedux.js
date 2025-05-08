import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { CRUD_ACTIONS } from '../../../utils';
import * as actions from "../../../store/actions";
import "./HistoryRedux.scss";
import TableManageHistory from './TableManageHistory';
class HistoryRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userArr: [],
            chargerArr: [],
            typeArr: [],
            statusArr: [],
            isOpen: false,

            start_time: '',
            end_time: '',
            number_start: '',
            number_end: '',
            cost: '',
            status: '',

            action: '',
            historyEditId: '',
        }
    }

    async componentDidMount() {
        this.props.getUserStart();
        this.props.getChargerStart();
        this.props.getTypeStart();
        this.props.getStatusStart();
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
                user_id: arrUsers && arrUsers.length > 0 ? arrUsers[0].id : '',
                a:'1'
            })
        }
        if (prevProps.chargerRedux !== this.props.chargerRedux) {
            let arrChargers = this.props.chargerRedux;
            this.setState({
                chargerArr: arrChargers,
                charger_id: arrChargers && arrChargers.length > 0 ? arrChargers[0].id : '',
                a:'2'
            })
        }
        if (prevState.charger_id !== this.state.charger_id) {
            this.props.getTypeStart(this.state.charger_id);  
            this.setState({
                a:'3'
            })        
        }
        if (prevProps.typeRedux !== this.props.typeRedux) {
            let arrTypes = this.props.typeRedux;
            this.setState({
                typeArr: arrTypes,
                type_id: arrTypes && arrTypes.length > 0 ? arrTypes[0].id : '',
                a:'4'
            })
        }
        
        if (prevProps.statusRedux !== this.props.statusRedux) {
            let arrStatus = this.props.statusRedux;
            this.setState({
                statusArr: arrStatus,
                status: arrStatus && arrStatus.length > 0 ? arrStatus[0].id : '',
                a:'4'
            })
        }
        

        if (prevProps.listHistorys !== this.props.listHistorys) {
            let arrUsers = this.props.userRedux;
            let arrChargers = this.props.chargerRedux;
            let arrTypes = this.props.typeRedux;
            let arrStatus = this.props.statusRedux;

            this.setState({
                start_time: '',
                end_time: '',
                number_start: '',
                number_end: '',
                cost: '',
                status: '',
                user_id: arrUsers && arrUsers.length > 0 ? arrUsers[0].id : '',
                charger_id: arrChargers && arrChargers.length > 0 ? arrChargers[0].id : '',
                type_id: arrTypes && arrTypes.length > 0 ? arrTypes[0].id : '',
                status: arrStatus && arrStatus.length > 0 ? arrStatus[0].id : '',

                action: CRUD_ACTIONS.CREATE,
a:'6'
            })

        }
    }

    

    handlesaveHistory = () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;
        let { action } = this.state;

        if (action === CRUD_ACTIONS.CREATE) {
            //fire redux create location
            this.props.createNewHistory({
                user_id: this.state.user_id,
                charger_id: this.state.charger_id,
                type_id: this.state.type_id,
                start_time: this.state.start_time,
                end_time: this.state.end_time,
                number_start: this.state.number_start,
                number_end: this.state.number_end,
                cost: this.state.cost,
                status: this.state.status,
                
            })
        }
        if (action === CRUD_ACTIONS.EDIT) {
            //fire redux edit location
            this.props.editAHistoryRedux({
                id: this.state.historyEditId,
                user_id: this.state.user_id,
                charger_id: this.state.charger_id,
                type_id: this.state.type_id,
                start_time: this.state.start_time,
                end_time: this.state.end_time,
                number_start: this.state.number_start,
                number_end: this.state.number_end,
                cost: this.state.cost,
                status: this.state.status,
            })
            console.log(this.state.status);
        }


    }

    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ["start_time", "number_start"]
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

    handleEditHistoryFromParent = (history) => {
        this.setState({
            user_id: history.user_id,
            charger_id: history.charger_id,
            type_id: history.type_id,
            start_time: history.start_time,
            end_time: history.end_time,
            number_start: history.number_start,
            number_end: history.number_end,
            cost: history.cost,
            status: history.status,
            action: CRUD_ACTIONS.EDIT,
            historyEditId: history.id
        })
    }

    render() {

        let users = this.state.userArr;
        let chargers = this.state.chargerArr;
        let types = this.state.typeArr;
        let statuss = this.state.statusArr;

console.log('state', this.state)
        let { user_id, charger_id, type_id, start_time, end_time, number_start,number_end,cost, status} = this.state;
        return (
            <div className='history-redux-container'>

                <div className="title" >History Redux</div>
                <div className='history-redux-body'>
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
                                <label><FormattedMessage id='number_start' /></label>
                                <input className='form-control' type='text'
                                    value={number_start}
                                    onChange={(event) => { this.onChangeInput(event, 'number_start') }}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='number_end' /></label>
                                <input className='form-control' type='text'
                                    value={number_end}
                                    onChange={(event) => { this.onChangeInput(event, 'number_end') }}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='cost' /></label>
                                <input className='form-control' type='text'
                                    value={cost}
                                    onChange={(event) => { this.onChangeInput(event, 'cost') }}
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
                                    onClick={() => this.handlesaveHistory()}
                                >
                                    {this.state.action === CRUD_ACTIONS.EDIT ?
                                        <FormattedMessage id='Edit               ' /> :
                                        <FormattedMessage id='Save    ' />}
                                </button>
                            </div>
                            <div className='col-12 mb-5'>
                                <TableManageHistory
                                    handleEditHistoryFromParentKey={this.handleEditHistoryFromParent}
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
        statusRedux: state.admin.statuss,
        listHistorys: state.admin.historys
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getUserStart: () => dispatch(actions.fetchAllUsersStart()),
        getChargerStart: () => dispatch(actions.fetchAllChargersStart()),
        getStatusStart: () => dispatch(actions.fetchStatusStart()),
        getTypeStart: (charger_id) => dispatch(actions.fetchAllTypeByChargerIdStart(charger_id)),

        createNewHistory: (data) => dispatch(actions.createNewHistory(data)),
        fetchHistoryRedux: () => dispatch(actions.fetchAllHistorysStart()),
        editAHistoryRedux: (data) => dispatch(actions.editAHistory(data))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HistoryRedux);

