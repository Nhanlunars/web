import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageInfo.scss';
import * as actions from "../../../store/actions";

class TableManageInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            infosRedux: []
        }
    }
    componentDidMount() {
        this.props.fetchInfoRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listInfos !== this.props.listInfos) {
            this.setState({
                infosRedux: this.props.listInfos
            })
        }
    }

    handleDeleteInfo = (info) => {
        this.props.deleteAInfoRedux(info.id);
    }

    handleEditInfo = (info) => {
        this.props.handleEditInfoFromParentKey(info)
    }

    render() {
        let arrInfos = this.state.infosRedux;
        return (
            <React.Fragment>
                <table id="TableManageInfo">
                    <tbody>
                        <tr>
                            <th>User id</th>
                            <th>Bank name</th>
                            <th>Account number</th>
                            <th>Account name</th>
                            <th>picture</th>
                            <th>Actions</th>
                        </tr>
                        {arrInfos && arrInfos.length > 0 &&
                            arrInfos.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.user.firstName} {item.user.lastName}</td>
                                        <td>{item.bank_name}</td>
                                        <td>{item.account_number}</td>
                                        <td>{item.account_name}</td>
                                        <td>{item.picture}</td>
                                        <td>
                                            <button onClick={() => this.handleEditInfo(item)} className='btn-edit' ><i className='fas fa-pencil-alt'></i> </button>
                                            <button onClick={() => this.handleDeleteInfo(item)}
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
        listInfos: state.admin.infos
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchInfoRedux: () => dispatch(actions.fetchAllInfosStart()),
        deleteAInfoRedux: (id) => dispatch(actions.deleteAInfo(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageInfo);
