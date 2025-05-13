import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./TableManageCharger.scss";
import * as actions from "../../../store/actions";
import { USER_ROLE } from "../../../utils";

class TableManageCharger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chargersRedux: [],
    };
  }
  componentDidMount() {
    const { userInfo } = this.props;
    if (userInfo.roleId === USER_ROLE.ADMIN) {
      this.props.fetchChargerRedux();
    }
    if (userInfo.roleId === USER_ROLE.OWNER) {
      this.props.fetchChargerReduxx(userInfo.id);
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listChargers !== this.props.listChargers) {
      this.setState({
        chargersRedux: this.props.listChargers,
      });
    }
  }

  handleDeleteCharger = (charger) => {
    //this.props.deleteAChargerRedux(charger.id);
    const { userInfo } = this.props;
    if (userInfo.roleId === USER_ROLE.ADMIN) {
      this.props.deleteAChargerRedux(charger.id);
    }
    if (userInfo.roleId === USER_ROLE.OWNER) {
      this.props.deleteACharger({ id: charger.id, userId: userInfo.id });
    }
  };

  handleEditCharger = (charger) => {
    this.props.handleEditChargerFromParentKey(charger);
  };

  render() {
    let arrChargers = this.state.chargersRedux;
    return (
      <React.Fragment>
        <table id="TableManageCharger">
          <tbody>
            <tr>
              <th>Charger name</th>
              <th>Capacity</th>
              <th>Installation date</th>
              <th>Last maintence date</th>
              <th>Location name</th>
              <th>Actions</th>
            </tr>
            {arrChargers &&
              arrChargers.length > 0 &&
              arrChargers.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.charger_name}</td>
                    <td>{item.capacity}</td>
                    <td>
                      {(() => {
                        const date = new Date(item.installation_date);
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
                        const date = new Date(item.last_maintence_date);
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
                    <td>{item.location.location_name}</td>
                    <td>
                      <button
                        onClick={() => this.handleEditCharger(item)}
                        className="btn-edit"
                      >
                        <i className="fas fa-pencil-alt"></i>{" "}
                      </button>
                      <button
                        onClick={() => this.handleDeleteCharger(item)}
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
    listChargers: state.admin.chargers,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchChargerRedux: () => dispatch(actions.fetchAllChargersStart()),
    deleteAChargerRedux: (id) => dispatch(actions.deleteACharger(id)),
    deleteACharger: (id) => dispatch(actions.deleteAChargerr(id)),

    fetchChargerReduxx: (userId) =>
      dispatch(actions.fetchAllChargerByUserIdStart(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageCharger);
