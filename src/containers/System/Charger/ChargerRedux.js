import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { CRUD_ACTIONS, CommonUtils, USER_ROLE } from "../../../utils";
import * as actions from "../../../store/actions";
import "./ChargerRedux.scss";
import Lightbox from "react-image-lightbox";
import TableManageCharger from "./TableManageCharger";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_orange.css";

class ChargerRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chargerArr: [],
      isOpen: false,

      charger_name: "",
      capacity: "",
      installation_date: "",
      last_maintence_date: "",
      location: "",

      action: "",
      chargerEditId: "",
    };
  }

  async componentDidMount() {
    let { userInfo } = this.props;
    let userId = userInfo.id;
    if (userInfo.roleId === USER_ROLE.ADMIN) {
      this.props.getLocationStart();
    }
    if (userInfo.roleId === USER_ROLE.OWNER) {
      this.props.fetchLocationByUserIdRedux(userId);
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    //render => didupdate
    //hiện tại(this) và quá khứ(previous)
    //[] [3]
    //[3] [3]
    if (prevProps.locationRedux !== this.props.locationRedux) {
      let arrLocation = this.props.locationRedux;
      this.setState({
        locationArr: arrLocation,
        location:
          arrLocation && arrLocation.length > 0 ? arrLocation[0].id : "",
      });
    }

    if (prevProps.listChargers !== this.props.listChargers) {
      let arrLocation = this.props.locationRedux;
      let { userInfo } = this.props;

      this.setState({
        userId: userInfo.id,
        charger_name: "",
        capacity: "",
        installation_date: "",
        last_maintence_date: "",
        image: "",
        location:
          arrLocation && arrLocation.length > 0 ? arrLocation[0].id : "",
        avatar: "",
        action: CRUD_ACTIONS.CREATE,
      });
    }
  }

  handlesaveCharger = () => {
    let isValid = this.checkValidateInput();
    if (isValid === false) return;
    let { action } = this.state;
    let { userInfo } = this.props;

    if (USER_ROLE.ADMIN === userInfo.roleId) {
      if (action === CRUD_ACTIONS.CREATE) {
        //fire redux create charger
        this.props.createNewChargerRedux({
          charger_name: this.state.charger_name,
          capacity: this.state.capacity,
          installation_date: this.state.installation_date,
          last_maintence_date: this.state.last_maintence_date,
          location_id: this.state.location,
        });
      }
      if (action === CRUD_ACTIONS.EDIT) {
        //fire redux edit charger
        this.props.editAChargerRedux({
          id: this.state.chargerEditId,
          charger_name: this.state.charger_name,
          capacity: this.state.capacity,
          installation_date: this.state.installation_date,
          last_maintence_date: this.state.last_maintence_date,
          location_id: this.state.location,
          
        });
      }
    }
    
    if (USER_ROLE.OWNER === userInfo.roleId) {
        if (action === CRUD_ACTIONS.CREATE) {
        //fire redux create charger
        this.props.createNewCharger({
          charger_name: this.state.charger_name,
          capacity: this.state.capacity,
          installation_date: this.state.installation_date,
          last_maintence_date: this.state.last_maintence_date,
          location_id: this.state.location,
          userId: this.state.userId,
        });
      }
      if (action === CRUD_ACTIONS.EDIT) {
        //fire redux edit charger
        this.props.editACharger({
          id: this.state.chargerEditId,
          charger_name: this.state.charger_name,
          capacity: this.state.capacity,
          installation_date: this.state.installation_date,
          last_maintence_date: this.state.last_maintence_date,
          location_id: this.state.location,
          userId: this.state.userId,
        });
      }
    }
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrCheck = [
      "charger_name",
      "capacity",
    ];
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

  handleEditChargerFromParent = (charger) => {
    this.setState({
      charger_name: charger.charger_name,
      capacity: charger.capacity,
      installation_date: charger.installation_date,
      last_maintence_date: charger.last_maintence_date,
      location: charger.location_id,
      action: CRUD_ACTIONS.EDIT,
      chargerEditId: charger.id,
    });
  };

  render() {
    let locations = this.state.locationArr;

    let {
      charger_name,
      capacity,
      installation_date,
      last_maintence_date,
      location,
    } = this.state;
    console.log("state", this.state);
    return (
      <div className="charger-redux-container">
        <div className="title">charger Redux</div>
        <div className="charger-redux-body">
          <div className="container">
            <div className="row">
              <div className="col-12 my-3">
                <FormattedMessage id="manage-charger.add" />
              </div>

              <div className="col-3">
                <label>
                  <FormattedMessage id="charger_name" />
                </label>
                <input
                  className="form-control"
                  type="location_name"
                  value={charger_name}
                  onChange={(event) => {
                    this.onChangeInput(event, "charger_name");
                  }}
                />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="capacity" />
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={capacity}
                  onChange={(event) => {
                    this.onChangeInput(event, "capacity");
                  }}
                />
              </div>

              <div className="col-3">
                <label>
                  <FormattedMessage id="installation_date" />
                </label>
                {/*<input className='form-control' type='text'
                                    value={installation_date}
                                    onChange={(event) => { this.onChangeInput(event, 'installation_date') }}
                                />*/}
                <Flatpickr
                  data-enable-time
                  className="form-control"
                  placeholder="Choose time"
                  format="yyyy/MM/dd HH:mm"
                  value={installation_date}
                  step={1}
                  onChange={(installation_date) =>
                    this.setState({ installation_date })
                  }
                />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="last_maintence_date" />
                </label>
                {/*<input className='form-control' type='text'
                                    value={last_maintence_date}
                                    onChange={(event) => { this.onChangeInput(event, 'last_maintence_date') }}
                                />*/}
                <Flatpickr
                  data-enable-time
                  className="form-control"
                  placeholder="Choose time"
                  format="yyyy/MM/dd HH:mm"
                  value={last_maintence_date}
                  step={1}
                  onChange={(last_maintence_date) =>
                    this.setState({ last_maintence_date })
                  }
                />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="location" />
                </label>
                <select
                  className="form-control"
                  value={location}
                  onChange={(event) => {
                    this.onChangeInput(event, "location");
                  }}
                >
                  {locations &&
                    locations.length > 0 &&
                    locations.map((item, index) => {
                      return (
                        <option key={index} value={item.id}>
                          {item.location_name}
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
                  onClick={() => this.handlesaveCharger()}
                >
                  {this.state.action === CRUD_ACTIONS.EDIT ? (
                    <FormattedMessage id="Edit               " />
                  ) : (
                    <FormattedMessage id="Save    " />
                  )}
                </button>
              </div>

              <div className="col-12 mb-5">
                <TableManageCharger
                  handleEditChargerFromParentKey={
                    this.handleEditChargerFromParent
                  }
                  action={this.state.action}
                />
              </div>
            </div>
          </div>
        </div>

        {this.state.isOpen === true && (
          <Lightbox
            mainSrc={this.state.previewImgURL}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    locationRedux: state.admin.locations,
    listChargers: state.admin.chargers,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getLocationStart: () => dispatch(actions.fetchAllLocationsStart()),
    fetchLocationByUserIdRedux: (userId) =>
      dispatch(actions.fetchAllLocationByUserIdStart(userId)),

    //getChargerByUserIdStart: (userId) => dispatch(actions.fetchAllChargerByUserIdStart(userId)),
    createNewChargerRedux: (data) => dispatch(actions.createNewCharger(data)),
    createNewCharger: (data) => dispatch(actions.createNewChargerr(data)),
    editAChargerRedux: (data) => dispatch(actions.editACharger(data)),
    editACharger: (data) => dispatch(actions.editAChargerr(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChargerRedux);
