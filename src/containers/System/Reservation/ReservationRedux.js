import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { CRUD_ACTIONS, USER_ROLE } from "../../../utils";
import * as actions from "../../../store/actions";
import "./ReservationRedux.scss";
import TableManageReservation from "./TableManageReservation";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_orange.css";

class ReservationRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userArr: [],
      chargerArr: [],
      typeArr: [],
      isOpen: false,

      start_time: new Date(),
      end_time: "",
      note: "",

      action: "",
      reservationEditId: "",
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
    this.props.getStatusStart();

    // this.props.getTypeStart(a?.[0].id);
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

      // console.log("Update charge when get list")

      //console.log( arrChargers && arrChargers.length > 0 ? arrChargers[0].id : '')
      //this.props.getTypeStart(arrChargers[0].id);

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
    if (prevProps.statusRedux !== this.props.statusRedux) {
      let arrStatus = this.props.statusRedux;
      this.setState({
        statusArr: arrStatus,
        status: arrStatus && arrStatus.length > 0 ? arrStatus[0].keyMap : "",
      });
    }

    if (prevProps.listReservations !== this.props.listReservations) {
      let arrUsers = this.props.userRedux;
      let arrChargers = this.props.chargerRedux;
      let arrTypes = this.props.typeRedux;
      let arrStatus = this.props.statusRedux;

      this.setState({
        start_time: "",
        end_time: "",
        note: "",
        status: "",
        user_id: arrUsers && arrUsers.length > 0 ? arrUsers[0].id : "",
        charger_id:
          arrChargers && arrChargers.length > 0 ? arrChargers[0].id : "",
        type_id: arrTypes && arrTypes.length > 0 ? arrTypes[0].id : "",
        status: arrStatus && arrStatus.length > 0 ? arrStatus[0].keyMap : "",
        action: CRUD_ACTIONS.CREATE,
      });
    }
  }

  handlesaveReservation = () => {
    let isValid = this.checkValidateInput();
    if (isValid === false) return;
    let { action } = this.state;
    const { userInfo } = this.props;

    if (userInfo.roleId === USER_ROLE.ADMIN) {
      if (action === CRUD_ACTIONS.CREATE) {
        //fire redux create location
        this.props.createNewReservationRedux({
          user_id: this.state.user_id,
          charger_id: this.state.charger_id,
          type_id: this.state.type_id,
          start_time: this.state.start_time,
          end_time: this.state.end_time,
          note: this.state.note,
          status: this.state.status,
        });
      }
      if (action === CRUD_ACTIONS.EDIT) {
        //fire redux edit location
        this.props.editAReservationRedux({
          id: this.state.reservationEditId,
          user_id: this.state.user_id,
          charger_id: this.state.charger_id,
          type_id: this.state.type_id,
          start_time: this.state.start_time,
          end_time: this.state.end_time,
          note: this.state.note,
          status: this.state.status,
        });
      }
    }
    if (userInfo.roleId === USER_ROLE.OWNER) {
      if (action === CRUD_ACTIONS.CREATE) {
        //fire redux create location
        this.props.createNewReservation({
          user_id: this.state.user_id,
          charger_id: this.state.charger_id,
          type_id: this.state.type_id,
          start_time: this.state.start_time,
          end_time: this.state.end_time,
          note: this.state.note,
          status: this.state.status,
          userId: userInfo.id,
        });
      }
      if (action === CRUD_ACTIONS.EDIT) {
        //fire redux edit location
        this.props.editAReservation({
          id: this.state.reservationEditId,
          user_id: this.state.user_id,
          charger_id: this.state.charger_id,
          type_id: this.state.type_id,
          start_time: this.state.start_time,
          end_time: this.state.end_time,
          note: this.state.note,
          status: this.state.status,
          userId: userInfo.id,
        });
      }
    }
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrCheck = ["start_time", "note", "end_time"];
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

  handleEditReservationFromParent = (reservation) => {
    this.setState({
      user_id: reservation.user_id,
      charger_id: reservation.charger_id,
      type_id: reservation.type_id,
      start_time: reservation.start_time,
      end_time: reservation.end_time,
      note: reservation.note,
      status: reservation.status,
      action: CRUD_ACTIONS.EDIT,
      reservationEditId: reservation.id,
    });
  };

  render() {
    let users = this.state.userArr;
    let chargers = this.state.chargerArr;
    let types = this.state.typeArr;
    let statuss = this.state.statusArr;

    console.log("state", this.state);

    let { user_id, charger_id, type_id, start_time, end_time, note, status } =
      this.state;
    return (
      <div className="reservation-redux-container">
        <div className="title">Reservation Redux</div>
        <div className="reservation-redux-body">
          <div className="container">
            <div className="row">
              <div className="col-12 my-3">
                <FormattedMessage id="manage-location.add" />
              </div>

              <div className="col-3">
                <label>
                  <FormattedMessage id="Time start" />
                </label>
                <Flatpickr
                  data-enable-time
                  className="form-control"
                  placeholder="Choose time"
                  format="yyyy/MM/dd HH:mm"
                  value={start_time}
                  onChange={(start_time) => this.setState({ start_time })}
                />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="Time end" />
                </label>
                {/*<input className='form-control' type='text'
                                    value={end_time}
                                    onChange={(event) => { this.onChangeInput(event, 'end_time') }}
                                />*/}
                <Flatpickr
                  data-enable-time
                  className="form-control"
                  placeholder="Choose time"
                  format="yyyy/MM/dd HH:mm"
                  value={end_time}
                  onChange={(end_time) => this.setState({ end_time })}
                />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="Note" />
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={note}
                  onChange={(event) => {
                    this.onChangeInput(event, "note");
                  }}
                />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="Status" />
                </label>
                <select
                  className="form-control"
                  value={status}
                  onChange={(event) => {
                    this.onChangeInput(event, "status");
                  }}
                >
                  {statuss &&
                    statuss.length > 0 &&
                    statuss.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {item.value}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="user" />
                </label>
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
                <label>
                  <FormattedMessage id="Charger" />
                </label>
                <select
                  className="form-control"
                  value={charger_id}
                  onChange={(event) => {
                    this.onChangeInput(event, "charger_id");
                  }}
                >
                  {chargers.length > 0 &&
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
                <label>
                  <FormattedMessage id="Type" />
                </label>
                <select
                  className="form-control"
                  value={type_id /*?? types?.[0]?.id */}
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
                  onClick={() => this.handlesaveReservation()}
                >
                  {this.state.action === CRUD_ACTIONS.EDIT ? (
                    <FormattedMessage id="Edit               " />
                  ) : (
                    <FormattedMessage id="Save    " />
                  )}
                </button>
              </div>
              <div className="col-12 mb-5">
                <TableManageReservation
                  handleEditReservationFromParentKey={
                    this.handleEditReservationFromParent
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
    statusRedux: state.admin.statuss,
    userInfo: state.user.userInfo,

    listReservations: state.admin.reservations,
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
    getStatusStart: () => dispatch(actions.fetchStatusStart()),

    createNewReservationRedux: (data) =>
      dispatch(actions.createNewReservation(data)),
    createNewReservation: (data) =>
      dispatch(actions.createNewReservationn(data)),
    editAReservationRedux: (data) => dispatch(actions.editAReservation(data)),
    editAReservation: (data) => dispatch(actions.editAReservationn(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReservationRedux);
