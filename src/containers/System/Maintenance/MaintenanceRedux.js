import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { CRUD_ACTIONS, USER_ROLE } from "../../../utils";
import * as actions from "../../../store/actions";
import "./MaintenanceRedux.scss";
import TableManageMaintenance from "./TableManageMaintenance";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_orange.css";

class MaintenanceRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chargerArr: [],
      typeArr: [],
      statusArr: [],
      isOpen: false,

      maintenance_date: "",
      completion_date: "",
      maintenance_type: "",
      technician_name: "",
      maintenance_cost: "",

      action: "",
      maintenanceEditId: "",
    };
  }

  async componentDidMount() {
    const { userInfo } = this.props;
    if (userInfo.roleId === USER_ROLE.ADMIN) {
      this.props.getChargerStart();
    }
    if (userInfo.roleId === USER_ROLE.OWNER) {
      this.props.getCharger(userInfo.id);
    }
    this.props.getTypeStart();
    this.props.getStatusStart();
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

    if (prevProps.listMaintenances !== this.props.listMaintenances) {
      let arrChargers = this.props.chargerRedux;
      let arrTypes = this.props.typeRedux;
      let arrStatus = this.props.statusRedux;

      this.setState({
        maintenance_date: "",
        completion_date: "",
        maintenance_type: "",
        technician_name: "",
        maintenance_cost: "",
        status: arrStatus && arrStatus.length > 0 ? arrStatus[0].keyMap : "",
        charger: arrChargers && arrChargers.length > 0 ? arrChargers[0].id : "",
        type: arrTypes && arrTypes.length > 0 ? arrTypes[0].id : "",

        action: CRUD_ACTIONS.CREATE,
      });
    }
  }

  handlesaveMaintenance = () => {
    let isValid = this.checkValidateInput();
    if (isValid === false) return;
    let { action } = this.state;
    const { userInfo } = this.props;

    if (userInfo.roleId === USER_ROLE.ADMIN) {
      if (action === CRUD_ACTIONS.CREATE) {
        //fire redux create location
        this.props.createNewMaintenanceRedux({
          charger_id: this.state.charger_id,
          type_id: this.state.type_id,
          maintenance_date: this.state.maintenance_date,
          completion_date: this.state.completion_date,
          maintenance_type: this.state.maintenance_type,
          technician_name: this.state.technician_name,
          maintenance_cost: this.state.maintenance_cost,
          status: this.state.status,
        });
      }
      if (action === CRUD_ACTIONS.EDIT) {
        //fire redux edit location
        this.props.editAMaintenanceRedux({
          id: this.state.maintenanceEditId,
          charger_id: this.state.charger_id,
          type_id: this.state.type_id,
          maintenance_date: this.state.maintenance_date,
          completion_date: this.state.completion_date,
          maintenance_type: this.state.maintenance_type,
          technician_name: this.state.technician_name,
          maintenance_cost: this.state.maintenance_cost,
          status: this.state.status,
        });
      }
    }
    if (userInfo.roleId === USER_ROLE.OWNER) {
      if (action === CRUD_ACTIONS.CREATE) {
        //fire redux create location
        this.props.createNewMaintenance({
          charger_id: this.state.charger_id,
          type_id: this.state.type_id,
          maintenance_date: this.state.maintenance_date,
          completion_date: this.state.completion_date,
          maintenance_type: this.state.maintenance_type,
          technician_name: this.state.technician_name,
          maintenance_cost: this.state.maintenance_cost,
          status: this.state.status,
          userId: userInfo.id,
        });
      }
      if (action === CRUD_ACTIONS.EDIT) {
        //fire redux edit location
        this.props.editAMaintenance({
          id: this.state.maintenanceEditId,
          charger_id: this.state.charger_id,
          type_id: this.state.type_id,
          maintenance_date: this.state.maintenance_date,
          completion_date: this.state.completion_date,
          maintenance_type: this.state.maintenance_type,
          technician_name: this.state.technician_name,
          maintenance_cost: this.state.maintenance_cost,
          status: this.state.status,
          userId: userInfo.id,
        });
      }
    }
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrCheck = ["maintenance_date", "technician_name"];
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

  handleEditMaintenanceFromParent = (maintenance) => {
    this.setState({
      charger_id: maintenance.charger_id,
      type_id: maintenance.type_id,
      maintenance_date: maintenance.maintenance_date,
      completion_date: maintenance.completion_date,
      maintenance_type: maintenance.maintenance_type,
      technician_name: maintenance.technician_name,
      maintenance_cost: maintenance.maintenance_cost,
      status: maintenance.status,
      action: CRUD_ACTIONS.EDIT,
      maintenanceEditId: maintenance.id,
    });
  };

  render() {
    let chargers = this.state.chargerArr;
    let types = this.state.typeArr;
    let statuss = this.state.statusArr;
    console.log(this.state);
    let {
      charger_id,
      type_id,
      maintenance_date,
      completion_date,
      maintenance_type,
      technician_name,
      maintenance_cost,
      status,
    } = this.state;
    return (
      <div className="maintenance-redux-container">
        <div className="title">Maintenance Redux</div>
        <div className="maintenance-redux-body">
          <div className="container">
            <div className="row">
              <div className="col-12 my-3">
                
              </div>

              <div className="col-3">
                <label>
                  Maintenance date
                </label>
                {/*<input className='form-control' type='text'
                                    value={maintenance_date}
                                    onChange={(event) => { this.onChangeInput(event, 'maintenance_date') }}
                                />*/}
                <Flatpickr
                  data-enable-time
                  className="form-control"
                  placeholder="Choose time"
                  format="yyyy/MM/dd"
                  value={maintenance_date}
                  step={1}
                  onChange={(maintenance_date) =>
                    this.setState({ maintenance_date })
                  }
                />
              </div>
              <div className="col-3">
                <label>
                  Completion date
                </label>
                {/*<input className='form-control' type='text'
                                    value={completion_date}
                                    onChange={(event) => { this.onChangeInput(event, 'completion_date') }}
                                />*/}
                <Flatpickr
                  data-enable-time
                  className="form-control"
                  placeholder="Choose time"
                  format="yyyy/MM/dd"
                  value={completion_date}
                  step={1}
                  onChange={(completion_date) =>
                    this.setState({ completion_date })
                  }
                />
              </div>
              <div className="col-3">
                <label>
                  Maintenance type
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={maintenance_type}
                  onChange={(event) => {
                    this.onChangeInput(event, "maintenance_type");
                  }}
                />
              </div>
              <div className="col-3">
                <label>
                  Technician name
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={technician_name}
                  onChange={(event) => {
                    this.onChangeInput(event, "technician_name");
                  }}
                />
              </div>
              <div className="col-3">
                <label>
                  Maintenance cost
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={maintenance_cost}
                  onChange={(event) => {
                    this.onChangeInput(event, "maintenance_cost");
                  }}
                />
              </div>
              <div className="col-3">
                <label>
                  Status
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
                  Charger
                </label>
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
                <label>
                  Type
                </label>
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
                  onClick={() => this.handlesaveMaintenance()}
                >
                  {this.state.action === CRUD_ACTIONS.EDIT ? (
                    <FormattedMessage id="Edit               " />
                  ) : (
                    <FormattedMessage id="Save    " />
                  )}
                </button>
              </div>
              <div className="col-12 mb-5">
                <TableManageMaintenance
                  handleEditMaintenanceFromParentKey={
                    this.handleEditMaintenanceFromParent
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
    chargerRedux: state.admin.chargers,
    typeRedux: state.admin.types,
    statusRedux: state.admin.statuss,
    userInfo: state.user.userInfo,

    listMaintenances: state.admin.maintenances,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getChargerStart: () => dispatch(actions.fetchAllChargersStart()),
    getCharger: (userId) =>
      dispatch(actions.fetchAllChargerByUserIdStart(userId)),

    getTypeStart: (charger_id) =>
      dispatch(actions.fetchAllTypeByChargerIdStart(charger_id)),
    getStatusStart: () => dispatch(actions.fetchStatusStart()),

    createNewMaintenanceRedux: (data) =>
      dispatch(actions.createNewMaintenance(data)),
    createNewMaintenance: (data) =>
      dispatch(actions.createNewMaintenancee(data)),
    editAMaintenanceRedux: (data) => dispatch(actions.editAMaintenance(data)),
    editAMaintenance: (data) => dispatch(actions.editAMaintenancee(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MaintenanceRedux);
