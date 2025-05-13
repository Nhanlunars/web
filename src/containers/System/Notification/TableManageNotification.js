import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageNotification.scss';
import * as actions from "../../../store/actions";

class TableManageNotification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notificationsRedux: []
        }
    }
    componentDidMount() {
        this.props.fetchNotificationRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listNotifications !== this.props.listNotifications) {
            this.setState({
                notificationsRedux: this.props.listNotifications
            })
        }
    }

    handleDeleteNotification = (notification) => {
        this.props.deleteANotificationRedux(notification.id);
    }

    handleEditNotification = (notification) => {
        this.props.handleEditNotificationFromParentKey(notification)
    }

    render() {
        let arrNotifications = this.state.notificationsRedux;
        return (
            <React.Fragment>
                <table id="TableManageNotification">
                    <tbody>
                        <tr>
                            <th>User name</th>
                            <th>Title</th>
                            <th>Message</th>
                            <th>Is read</th>
                            <th>Actions</th>
                        </tr>
                        {arrNotifications && arrNotifications.length > 0 &&
                            arrNotifications.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.user.firstName} {item.user.lastName}</td>
                                        <td>{item.title}</td>
                                        <td>{item.message}</td>
                                        <td>{item.is_read}</td>
                                        <td>
                                            <button onClick={() => this.handleEditNotification(item)} className='btn-edit' ><i className='fas fa-pencil-alt'></i> </button>
                                            <button onClick={() => this.handleDeleteNotification(item)}
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
        listNotifications: state.admin.notifications
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchNotificationRedux: () => dispatch(actions.fetchAllNotificationsStart()),
        deleteANotificationRedux: (id) => dispatch(actions.deleteANotification(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageNotification);
