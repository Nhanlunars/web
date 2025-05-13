import React, { Component } from "react";
import { connect } from "react-redux";
import "./TableManageMaintenance.scss";
import * as actions from "../../../store/actions";
import { USER_ROLE } from "../../../utils";

class TableManageMaintenance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maintenancesRedux: [],
    };
  }
  componentDidMount() {
    //this.props.fetchMaintenanceRedux();
    const { userInfo } = this.props;
    if (userInfo.roleId === USER_ROLE.ADMIN) {
      this.props.fetchMaintenanceRedux();
    }
    if (userInfo.roleId === USER_ROLE.OWNER) {
      this.props.fetchMaintenance(userInfo.id);
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listMaintenances !== this.props.listMaintenances) {
      this.setState({
        maintenancesRedux: this.props.listMaintenances,
      });
    }
  }

  handleDeleteMaintenance = (maintenance) => {
    //this.props.deleteAMaintenanceRedux(maintenance.id);
    const { userInfo } = this.props;
    if (userInfo.roleId === USER_ROLE.ADMIN) {
      this.props.deleteAMaintenanceRedux(maintenance.id);
    }
    if (userInfo.roleId === USER_ROLE.OWNER) {
      this.props.deleteAMaintenance({
        id: maintenance.id,
        userId: userInfo.id,
      });
    }
  };

  handleEditMaintenance = (maintenance) => {
    this.props.handleEditMaintenanceFromParentKey(maintenance);
  };

  render() {
    let arrMaintenances = this.state.maintenancesRedux;
    return (
      <React.Fragment>
        <table id="TableManageMaintenance">
          <tbody>
            <tr>
              <th>Charger name</th>
              <th>Type name</th>
              <th>Maintenance date</th>
              <th>Completion date</th>
              <th>Maintenance type</th>
              <th>Technician name</th>
              <th>Maintenance cost</th>
              <th>Actions</th>
            </tr>
            {arrMaintenances &&
              arrMaintenances.length > 0 &&
              arrMaintenances.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.charger.charger_name}</td>
                    <td>{item.type.type_name}</td>
                    <td>
                      {(() => {
                        const date = new Date(item.maintenance_date);
                        const year = date.getFullYear();
                        const month = String(date.getMonth() + 1).padStart(
                          2,
                          "0"
                        );
                        const day = String(date.getDate()).padStart(2, "0");
                        const hours = String(date.getHours()).padStart(2, "0");
                        const minutes = String(date.getMinutes()).padStart(
                          2,
                          "0"
                        );
                        return `${year}/${month}/${day} ${hours}:${minutes}`;
                      })()}
                    </td>
                    <td>
                      {(() => {
                        const date = new Date(item.completion_date);
                        const year = date.getFullYear();
                        const month = String(date.getMonth() + 1).padStart(
                          2,
                          "0"
                        );
                        const day = String(date.getDate()).padStart(2, "0");
                        const hours = String(date.getHours()).padStart(2, "0");
                        const minutes = String(date.getMinutes()).padStart(
                          2,
                          "0"
                        );
                        return `${year}/${month}/${day} ${hours}:${minutes}`;
                      })()}
                    </td>
                    <td>{item.maintenance_type}</td>
                    <td>{item.technician_name}</td>
                    <td>{item.maintenance_cost}</td>
                    <td>
                      <button
                        onClick={() => this.handleEditMaintenance(item)}
                        className="btn-edit"
                      >
                        <i className="fas fa-pencil-alt"></i>{" "}
                      </button>
                      <button
                        onClick={() => this.handleDeleteMaintenance(item)}
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
    listMaintenances: state.admin.maintenances,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMaintenanceRedux: () => dispatch(actions.fetchAllMaintenancesStart()),
    fetchMaintenance: (userId) =>
      dispatch(actions.fetchAllMaintenancesByUserIdStart(userId)),

    deleteAMaintenanceRedux: (id) => dispatch(actions.deleteAMaintenance(id)),
    deleteAMaintenance: (id) => dispatch(actions.deleteAMaintenancee(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableManageMaintenance);
