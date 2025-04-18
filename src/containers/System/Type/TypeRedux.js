import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { CRUD_ACTIONS } from '../../../utils';
import * as actions from "../../../store/actions";
import "./TypeRedux.scss";
import TableManageType from './TableManageType';
class TypeRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chargerArr: [],
            isOpen: false,

            type_name: '',
            charger: '',
            describe: '',
            default_price: '',
            
            action: '',
            typeEditId: '',
        }
    }

    async componentDidMount() {
this.props.getChargerStart();
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
                charger: arrChargers && arrChargers.length > 0 ? arrChargers[0].id : ''
            })
        }
        

        if (prevProps.listTypes !== this.props.listTypes) {
            let arrChargers = this.props.chargerRedux;

            this.setState({
                type_name: '',
            describe: '',
            default_price: '',
            charger: arrChargers && arrChargers.length > 0 ? arrChargers[0].id : '',
                action: CRUD_ACTIONS.CREATE,

            })

        }
    }

    

    handlesaveType = () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;
        let { action } = this.state;

        if (action === CRUD_ACTIONS.CREATE) {
            //fire redux create location
            this.props.createNewType({
                type_name: this.state.type_name,
                charger_id: this.state.charger_id,
                describe: this.state.describe,
                default_price: this.state.default_price,
            })
        }
        if (action === CRUD_ACTIONS.EDIT) {
            //fire redux edit location
            this.props.editATypeRedux({
                id: this.state.typeEditId,
                type_name: this.state.type_name,
                charger_id: this.state.charger_id,
                describe: this.state.describe,
                default_price: this.state.default_price,
            })
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
            action: CRUD_ACTIONS.EDIT,
            typeEditId: type.id
        })
    }

    render() {

        let chargers = this.state.chargerArr;

        let { type_name, charger_id, default_price, describe} = this.state;
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
                                <label><FormattedMessage id='user' /></label>
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
        listTypes: state.admin.types
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getChargerStart: () => dispatch(actions.fetchAllChargersStart()),
        createNewType: (data) => dispatch(actions.createNewType(data)),
        fetchTypeRedux: () => dispatch(actions.fetchAllTypesStart()),
        editATypeRedux: (data) => dispatch(actions.editAType(data))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TypeRedux);

