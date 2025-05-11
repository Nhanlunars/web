import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./TableManageDevice.scss";
import * as actions from "../../../store/actions";
import { USER_ROLE } from "../../../utils";

class TableManageDevice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      devicesRedux: [],
    };
  }
  componentDidMount() {
    //this.props.fetchDeviceRedux();
    const { userInfo } = this.props;
    if (userInfo.roleId === USER_ROLE.ADMIN) {
      this.props.fetchDeviceRedux();
    }
    if (userInfo.roleId === USER_ROLE.OWNER) {
      this.props.fetchDevice(userInfo.id);
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listDevices !== this.props.listDevices) {
      this.setState({
        devicesRedux: this.props.listDevices,
      });
    }
  }

  handleDeleteDevice = (device) => {
    //this.props.deleteADeviceRedux(device.id);
    const { userInfo } = this.props;
    if (userInfo.roleId === USER_ROLE.ADMIN) {
      this.props.deleteADeviceRedux(device.id);
    }
    if (userInfo.roleId === USER_ROLE.OWNER) {
      this.props.deleteADevice({ id: device.id, userId: userInfo.id });
    }
  };

  handleEditDevice = (device) => {
    this.props.handleEditDeviceFromParentKey(device);
  };

  render() {
    let { userInfo } = this.props;

    let arrDevices = this.state.devicesRedux;
    return (
      <React.Fragment>
        <table id="TableManageDevice">
          <tbody>
            <tr>
              {userInfo.roleId === USER_ROLE.ADMIN ? <th> User name </th> : ""}
              <th>Charger id</th>
              <th>Type id</th>
              <th>fcm_token</th>
              <th>Actions</th>
            </tr>
            {arrDevices &&
              arrDevices.length > 0 &&
              arrDevices.map((item, index) => {
                return (
                  <tr key={index}>
                    {userInfo.roleId === USER_ROLE.ADMIN ? (
                      <td>
                        {item.user.firstName} {item.user.lastName}
                      </td>
                    ) : (
                      ""
                    )}
                    <td>{item.charger.charger_name}</td>
                    <td>{item.type.type_name}</td>
                    <td>{item.fcm_token}</td>
                    <td>
                      <button
                        onClick={() => this.handleEditDevice(item)}
                        className="btn-edit"
                      >
                        <i className="fas fa-pencil-alt"></i>{" "}
                      </button>
                      <button
                        onClick={() => this.handleDeleteDevice(item)}
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
    listDevices: state.admin.devices,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDeviceRedux: () => dispatch(actions.fetchAllDevicesStart()),
    fetchDevice: (userId) =>
      dispatch(actions.fetchAllDevicesByUserIdStart(userId)),

    deleteADeviceRedux: (id) => dispatch(actions.deleteADevice(id)),
    deleteADevice: (id) => dispatch(actions.deleteADevicee(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageDevice);
