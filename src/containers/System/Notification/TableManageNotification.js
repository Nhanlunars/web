import React, { Component } from "react";
import { connect } from "react-redux";
import "./TableManageNotification.scss";
import * as actions from "../../../store/actions";
import { USER_ROLE } from "../../../utils";

class TableManageNotification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notificationsRedux: [],
    };
  }
  componentDidMount() {
    const { userInfo } = this.props;
    if (userInfo.roleId === USER_ROLE.ADMIN) {
      this.props.fetchNotificationRedux();
    }
    if (userInfo.roleId === USER_ROLE.OWNER) {
      this.props.fetchNotification(userInfo.id);
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listNotifications !== this.props.listNotifications) {
      this.setState({
        notificationsRedux: this.props.listNotifications,
      });
    }
  }

  handleDeleteNotification = (notification) => {
    //this.props.deleteANotificationRedux(notification.id);
    const { userInfo } = this.props;
    if (userInfo.roleId === USER_ROLE.ADMIN) {
      this.props.deleteANotificationRedux(notification.id);
    }
    if (userInfo.roleId === USER_ROLE.OWNER) {
      this.props.deleteANotification({
        id: notification.id,
        userId: userInfo.id,
      });
    }
  };

  handleEditNotification = (notification) => {
    this.props.handleEditNotificationFromParentKey(notification);
  };

  render() {
    let arrNotifications = this.state.notificationsRedux;
    return (
      <React.Fragment>
        <table id="TableManageNotification">
          <tbody>
            <tr>
              <th>User name</th>
              <th>Charger name</th>
              <th>Type name</th>
              <th>Title</th>
              <th>Message</th>
              <th>Is read</th>
              <th>Actions</th>
            </tr>
            {arrNotifications &&
              arrNotifications.length > 0 &&
              arrNotifications.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>
                      {item.user.firstName} {item.user.lastName}
                    </td>
                    <td>{item.charger.charger_name}</td>
                    <td>{item.type.type_name}</td>
                    <td>{item.title}</td>
                    <td>{item.message}</td>
                    <td>{item.is_read}</td>
                    <td>
                      <button
                        onClick={() => this.handleEditNotification(item)}
                        className="btn-edit"
                      >
                        <i className="fas fa-pencil-alt"></i>{" "}
                      </button>
                      <button
                        onClick={() => this.handleDeleteNotification(item)}
                        className="btn-delete"
                      >
                        <i className="fas fa-trash"></i>{" "}
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listNotifications: state.admin.notifications,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchNotificationRedux: () =>
      dispatch(actions.fetchAllNotificationsStart()),
    fetchNotification: (userId) =>
      dispatch(actions.fetchAllNotificationsByOwnerIdStart(userId)),

    deleteANotificationRedux: (id) => dispatch(actions.deleteANotification(id)),
    deleteANotification: (id) => dispatch(actions.deleteANotificationn(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableManageNotification);
