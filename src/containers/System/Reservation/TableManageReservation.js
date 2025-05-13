import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./TableManageReservation.scss";
import * as actions from "../../../store/actions";
import { USER_ROLE } from "../../../utils";

class TableManageReservation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reservationsRedux: [],
    };
  }
  componentDidMount() {
    const { userInfo } = this.props;
    if (userInfo.roleId === USER_ROLE.ADMIN) {
      this.props.fetchReservationRedux();
    }
    if (userInfo.roleId === USER_ROLE.OWNER) {
      this.props.fetchReservation(userInfo.id);
    }
    //  this.props.fetchReservationRedux();
    //this.props.getName();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listReservations !== this.props.listReservations) {
      this.setState({
        reservationsRedux: this.props.listReservations,
        //userName
      });
    }
  }

  handleDeleteReservation = (reservation) => {
    //this.props.deleteAReservationRedux(reservation.id);
    const { userInfo } = this.props;
    if (userInfo.roleId === USER_ROLE.ADMIN) {
      this.props.deleteAReservationRedux(reservation.id);
    }
    if (userInfo.roleId === USER_ROLE.OWNER) {
      this.props.deleteAReservation({
        id: reservation.id,
        userId: userInfo.id,
      });
    }
  };

  handleEditReservation = (reservation) => {
    this.props.handleEditReservationFromParentKey(reservation);
  };

  render() {
    let arrReservations = this.state.reservationsRedux;
    return (
      <React.Fragment>
        <table id="TableManageReservation">
          <tbody>
            <tr>
              <th>User name</th>
              <th>Charger name</th>
              <th>Type name</th>
              <th>Time start</th>
              <th>Time end</th>
              <th>Note</th>
              <th>Actions</th>
            </tr>
            {arrReservations &&
              arrReservations.length > 0 &&
              arrReservations.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>
                      {item.user.firstName} {item.user.lastName}
                    </td>
                    <td>{item.charger.charger_name}</td>
                    <td>{item.type.type_name}</td>
                    <td>
                      {(() => {
                        const date = new Date(item.start_time);
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
                        const date = new Date(item.end_time);
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
                    <td>{item.note}</td>
                    <td>
                      <button
                        onClick={() => this.handleEditReservation(item)}
                        className="btn-edit"
                      >
                        <i className="fas fa-pencil-alt"></i>{" "}
                      </button>
                      <button
                        onClick={() => this.handleDeleteReservation(item)}
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
    listReservations: state.admin.reservations,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchReservationRedux: () => dispatch(actions.fetchAllReservationsStart()),
    fetchReservation: (userId) =>
      dispatch(actions.fetchAllReservationsByUserIdStart(userId)),
    deleteAReservationRedux: (id) => dispatch(actions.deleteAReservation(id)),
    deleteAReservation: (id) => dispatch(actions.deleteAReservationn(id)),

    getName: (id) => dispatch(actions.getNameUserByUserId(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableManageReservation);
