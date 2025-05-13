import React, { Component } from "react";
import { connect } from "react-redux";
import { CRUD_ACTIONS, USER_ROLE } from "../../../utils";
import * as actions from "../../../store/actions";
import "./NotificationRedux.scss";
import TableManageNotification from "./TableManageNotification";
class NotificationRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userArr: [],
      chargerArr: [],
      typeArr: [],
      isOpen: false,

      user: "",
      title: "",
      message: "",
      is_read: "",

      action: "",
      notificationEditId: "",
    };
  }

  async componentDidMount() {
    this.props.getUserStart();
    const { userInfo } = this.props;
    if (userInfo.roleId === USER_ROLE.ADMIN) {
      this.props.getChargerStart();
    }
    if (userInfo.roleId === USER_ROLE.OWNER) {
      this.props.getCharger(userInfo.id);
    }
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
        user_id: arrUsers && arrUsers.length > 0 ? arrUsers[0].id : "",
      });
    }
    if (prevProps.chargerRedux !== this.props.chargerRedux) {
      let arrChargers = this.props.chargerRedux;
      this.setState({
        chargerArr: arrChargers,
        charger_id:
          arrChargers && arrChargers.length > 0 ? arrChargers[0].id : "",
      });
    }
    if (prevState.charger_id !== this.state.charger_id) {
      this.props.getTypeStart(this.state.charger_id);
    }

    if (prevProps.typeRedux !== this.props.typeRedux) {
      let arrTypes = this.props.typeRedux;
      this.setState({
        typeArr: arrTypes,
        type_id: arrTypes && arrTypes.length > 0 ? arrTypes[0].id : "",
     
      });
    }

    if (prevProps.listNotifications !== this.props.listNotifications) {
      let arrUsers = this.props.userRedux;
      let arrChargers = this.props.chargerRedux;
      let arrTypes = this.props.typeRedux;
      this.setState({
        title: "",
        message: "",
        is_read: "",
        user_id: arrUsers && arrUsers.length > 0 ? arrUsers[0].id : "",
        charger_id:
          arrChargers && arrChargers.length > 0 ? arrChargers[0].id : "",
        type_id: arrTypes && arrTypes.length > 0 ? arrTypes[0].id : "",
        action: CRUD_ACTIONS.CREATE,
      });
    }
  }

  handlesaveNotification = () => {
    let isValid = this.checkValidateInput();
    if (isValid === false) return;
    let { action } = this.state;
    const { userInfo } = this.props;
    if (userInfo.roleId === USER_ROLE.ADMIN) {
      if (action === CRUD_ACTIONS.CREATE) {
        //fire redux create notification
        this.props.createNewNotificationRedux({
          user_id: this.state.user_id,
          charger_id: this.state.charger_id,
          type_id: this.state.type_id,
          title: this.state.title,
          message: this.state.message,
          is_read: this.state.is_read,
        });
      }
      if (action === CRUD_ACTIONS.EDIT) {
        //fire redux edit notification
        this.props.editANotificationRedux({
          id: this.state.notificationEditId,
          user_id: this.state.user_id,
          charger_id: this.state.charger_id,
          type_id: this.state.type_id,
          title: this.state.title,
          message: this.state.message,
          is_read: this.state.is_read,
        });
      }
    }

    if (userInfo.roleId === USER_ROLE.OWNER) {
      if (action === CRUD_ACTIONS.CREATE) {
        //fire redux create notification
        this.props.createNewNotification({
          user_id: this.state.user_id,
          charger_id: this.state.charger_id,
          type_id: this.state.type_id,
          title: this.state.title,
          message: this.state.message,
          is_read: this.state.is_read,
          userId: userInfo.id,
        });
      }
      if (action === CRUD_ACTIONS.EDIT) {
        //fire redux edit notification
        this.props.editANotification({
          id: this.state.notificationEditId,
          user_id: this.state.user_id,
          charger_id: this.state.charger_id,
          type_id: this.state.type_id,
          title: this.state.title,
          message: this.state.message,
          is_read: this.state.is_read,
          userId: userInfo.id,
        });
      }
    }
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrCheck = ["title", "message"];
    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        isValid = false;
        alert("This input is required: " + arrCheck[i]);
        break;
      }
    }
    return isValid;
  };

  onChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  handleEditNotificationFromParent = (notification) => {
    this.setState({
      user_id: notification.user_id,
      charger_id: notification.charger_id,
      type_id: notification.type_id,
      title: notification.title,
      message: notification.message,
      is_read: notification.is_read,
      action: CRUD_ACTIONS.EDIT,
      notificationEditId: notification.id,
    });
  };

  render() {
    let users = this.state.userArr;
let chargers = this.state.chargerArr;
    let types = this.state.typeArr;

    let { user_id, charger_id, type_id, title, message, is_read } = this.state;
    return (
      <div className="notification-redux-container">
        <div className="title">Notification Redux</div>
        <div className="notification-redux-body">
          <div className="container">
            <div className="row">
              <div className="col-12 my-3"></div>

              <div className="col-3">
                <label>Title</label>
                <input
                  className="form-control"
                  type="text"
                  value={title}
                  onChange={(event) => {
                    this.onChangeInput(event, "title");
                  }}
                />
              </div>
              <div className="col-3">
                <label>Message</label>
                <input
                  className="form-control"
                  type="text"
                  value={message}
                  onChange={(event) => {
                    this.onChangeInput(event, "message");
                  }}
                />
              </div>
              <div className="col-3">
                <label>Is read </label>
                <input
                  className="form-control"
                  type="text"
                  value={is_read}
                  onChange={(event) => {
                    this.onChangeInput(event, "is_read");
                  }}
                />
              </div>

              <div className="col-3">
                <label>User</label>
                <select
                  className="form-control"
                  value={user_id}
                  onChange={(event) => {
                    this.onChangeInput(event, "user_id");
                  }}
                >
                  {users &&
                    users.length > 0 &&
                    users.map((item, index) => {
                      return (
                        <option key={index} value={item.id}>
                          {item.email}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-3">
                <label>Charger</label>
                <select
                  className="form-control"
                  value={charger_id}
                  onChange={(event) => {
                    this.onChangeInput(event, "charger_id");
                  }}
                >
                  {chargers &&
                    chargers.length > 0 &&
                    chargers.map((item, index) => {
                      return (
                        <option key={index} value={item.id}>
                          {item.charger_name}
                        </option>
                      );
                    })}
                </select>
              </div>

              <div className="col-3">
                <label>Type</label>
                <select
                  className="form-control"
                  value={type_id}
                  onChange={(event) => {
                    this.onChangeInput(event, "type_id");
                  }}
                >
                  {types &&
                    types.length > 0 &&
                    types.map((item, index) => {
                      return (
                        <option key={index} value={item.id}>
                          {item.type_name}
                        </option>
                      );
                    })}
                </select>
              </div>

              <div className="col-12 my-3">
                <button
                  className={
                    this.state.action === CRUD_ACTIONS.EDIT
                      ? "btn btn-warning"
                      : "btn btn-primary"
                  }
                  onClick={() => this.handlesaveNotification()}
                >
                  {this.state.action === CRUD_ACTIONS.EDIT ? (
                    "Edit               " 
                  ) : (
                    "Create    " 
                  )}
                </button>
              </div>
              <div className="col-12 mb-5">
                <TableManageNotification
                  handleEditNotificationFromParentKey={
                    this.handleEditNotificationFromParent
                  }
                  action={this.state.action}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userRedux: state.admin.users,
    chargerRedux: state.admin.chargers,
    typeRedux: state.admin.types,
    listNotifications: state.admin.notifications,
        userInfo: state.user.userInfo,

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserStart: () => dispatch(actions.fetchAllUsersStart()),
    getChargerStart: () => dispatch(actions.fetchAllChargersStart()),
    getCharger: (userId) =>
      dispatch(actions.fetchAllChargerByUserIdStart(userId)),
    getTypeStart: (charger_id) =>
      dispatch(actions.fetchAllTypeByChargerIdStart(charger_id)),
    createNewNotificationRedux: (data) =>
      dispatch(actions.createNewNotification(data)),
    createNewNotification: (data) =>
      dispatch(actions.createNewNotificationn(data)),

    editANotificationRedux: (data) => dispatch(actions.editANotification(data)),
    editANotification: (data) => dispatch(actions.editANotificationn(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationRedux);
