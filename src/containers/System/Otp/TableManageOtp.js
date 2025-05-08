import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageOtp.scss';
import * as actions from "../../../store/actions";

class TableManageOtp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            otpsRedux: []
        }
    }
    componentDidMount() {
        this.props.fetchOtpRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listOtps !== this.props.listOtps) {
            this.setState({
                otpsRedux: this.props.listOtps
            })
        }
    }

    handleDeleteOtp = (otp) => {
        this.props.deleteAOtpRedux(otp.id);
    }

    handleEditOtp = (otp) => {
        this.props.handleEditOtpFromParentKey(otp)
    }

    render() {
        let arrOtps = this.state.otpsRedux;
        return (
            <React.Fragment>
                <table id="TableManageOtp">
                    <tbody>
                        <tr>
                            <th>User id</th>
                            <th>code</th>
                            <th>expiry_date</th>
                            <th>is_used</th>
                            <th>Actions</th>
                        </tr>
                        {arrOtps && arrOtps.length > 0 &&
                            arrOtps.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.user.firstName} {item.user.lastName}</td>
                                        <td>{item.code}</td>
                                        <td>{item.expiry_date}</td>
                                        <td>{item.is_used}</td>
                                        <td>
                                            <button onClick={() => this.handleEditOtp(item)} className='btn-edit' ><i className='fas fa-pencil-alt'></i> </button>
                                            <button onClick={() => this.handleDeleteOtp(item)}
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
        listOtps: state.admin.otps
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchOtpRedux: () => dispatch(actions.fetchAllOtpsStart()),
        deleteAOtpRedux: (id) => dispatch(actions.deleteAOtp(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageOtp);
