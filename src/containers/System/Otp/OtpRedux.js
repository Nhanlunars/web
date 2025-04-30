import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { CRUD_ACTIONS } from '../../../utils';
import * as actions from "../../../store/actions";
import "./OtpRedux.scss";
import TableManageOtp from './TableManageOtp';
class OtpRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userArr: [],
            isOpen: false,

            code: '',
            user: '',
            expiry_date: '',
            is_used: '',
            
            action: '',
            otpEditId: '',
        }
    }

    async componentDidMount() {
this.props.getUserStart();
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
        

        if (prevProps.listOtps !== this.props.listOtps) {
            let arrUsers = this.props.userRedux;

            this.setState({
                code: '',
            expiry_date: '',
            is_used: '',
            user: arrUsers && arrUsers.length > 0 ? arrUsers[0].id : '',
                action: CRUD_ACTIONS.CREATE

            })

        }
    }

    

    handlesaveOtp = () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;
        let { action } = this.state;

        if (action === CRUD_ACTIONS.CREATE) {
            //fire redux create otp
            this.props.createNewOtp({
                user_id: this.state.user_id,
                code: this.state.code,
                expiry_date: this.state.expiry_date,
                is_used: this.state.is_used,
            })
        }
        if (action === CRUD_ACTIONS.EDIT) {
            //fire redux edit otp
            this.props.editAOtpRedux({
                id: this.state.otpEditId,
                user_id: this.state.user_id,
                code: this.state.code,
                expiry_date: this.state.expiry_date,
                is_used: this.state.is_used,
            })
        }


    }

    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ["code", "expiry_date"]
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

    handleEditOtpFromParent = (otp) => {
        this.setState({
            user_id: otp.user_id,
            code: otp.code,
            expiry_date: otp.expiry_date,
            is_used: otp.is_used,
            action: CRUD_ACTIONS.EDIT,
            otpEditId: otp.id
        })
    }

    render() {

        let users = this.state.userArr;

        let { user_id, code, expiry_date, is_used} = this.state;
        return (
            <div className='otp-redux-container'>

                <div className="title" >Otp Redux</div>
                <div className='otp-redux-body'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 my-3'><FormattedMessage id='manage-otp.add' /></div>

                            
                            <div className='col-3'>
                                <label><FormattedMessage id='code' /></label>
                                <input className='form-control' type='text'
                                    value={code}
                                    onChange={(event) => { this.onChangeInput(event, 'code') }}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='expiry_date' /></label>
                                <input className='form-control' type='text'
                                    value={expiry_date}
                                    onChange={(event) => { this.onChangeInput(event, 'expiry_date') }}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='is_used' /></label>
                                <input className='form-control' type='text'
                                    value={is_used}
                                    onChange={(event) => { this.onChangeInput(event, 'is_used') }}
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
                           
                            
                            <div className='col-12 my-3'>
                                <button className={this.state.action === CRUD_ACTIONS.EDIT ? 'btn btn-warning' : 'btn btn-primary'}
                                    onClick={() => this.handlesaveOtp()}
                                >
                                    {this.state.action === CRUD_ACTIONS.EDIT ?
                                        <FormattedMessage id='Edit               ' /> :
                                        <FormattedMessage id='Save    ' />}
                                </button>
                            </div>
                            <div className='col-12 mb-5'>
                                <TableManageOtp
                                    handleEditOtpFromParentKey={this.handleEditOtpFromParent}
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
        listOtps: state.admin.otps
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getUserStart: () => dispatch(actions.fetchAllUsersStart()),
        createNewOtp: (data) => dispatch(actions.createNewOtp(data)),
        fetchOtpRedux: () => dispatch(actions.fetchAllOtpsStart()),
        editAOtpRedux: (data) => dispatch(actions.editAOtp(data))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OtpRedux);

