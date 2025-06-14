import React, { Component } from "react";
import { connect } from "react-redux";
import "./TableManageHistory.scss";
import * as actions from "../../../store/actions";
import { USER_ROLE } from "../../../utils";

class TableManageHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      historysRedux: [],
    };
  }
  componentDidMount() {
    //this.props.fetchHistoryRedux();
    const { userInfo } = this.props;
    if (userInfo.roleId === USER_ROLE.ADMIN) {
      this.props.fetchHistoryRedux();
    }
    if (userInfo.roleId === USER_ROLE.OWNER) {
      this.props.fetchHistory(userInfo.id);
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listHistorys !== this.props.listHistorys) {
      this.setState({
        historysRedux: this.props.listHistorys,
      });
    }
  }

  handleDeleteHistory = (history) => {
    //this.props.deleteAHistoryRedux(history.id);
    const { userInfo } = this.props;
    if (userInfo.roleId === USER_ROLE.ADMIN) {
      this.props.deleteAHistoryRedux(history.id);
    }
    if (userInfo.roleId === USER_ROLE.OWNER) {
      this.props.deleteAHistory({ id: history.id, userId: userInfo.id });
    }
  };

  handleEditHistory = (history) => {
    this.props.handleEditHistoryFromParentKey(history);
  };

  render() {
    let arrHistorys = this.state.historysRedux;
    return (
      <React.Fragment>
        <table id="TableManageHistory">
          <tbody>
            <tr>
              <th>User name</th>
              <th>Charger name</th>
              <th>Type name</th>
              <th>Time start</th>
              <th>Time end</th>
              <th>Number start</th>
              <th>Number end</th>
              <th>Cost</th>
              <th>Actions (VND)</th>
            </tr>
            {arrHistorys &&
              arrHistorys.length > 0 &&
              arrHistorys.map((item, index) => {
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
                    <td>{item.number_start}</td>

                    <td>{item.number_end}</td>
                    <td>
                      {item.cost ? item.cost.toLocaleString("vi-VN") : "0"}
                    </td>
                    <td>
                      <button
                        onClick={() => this.handleEditHistory(item)}
                        className="btn-edit"
                      >
                        <i className="fas fa-pencil-alt"></i>{" "}
                      </button>
                      <button
                        onClick={() => this.handleDeleteHistory(item)}
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
    listHistorys: state.admin.historys,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchHistoryRedux: () => dispatch(actions.fetchAllHistorysStart()),
    fetchHistory: (userId) =>
      dispatch(actions.fetchAllHistorysbyUserId(userId)),

    deleteAHistoryRedux: (id) => dispatch(actions.deleteAHistory(id)),
    deleteAHistory: (id) => dispatch(actions.deleteAHistoryy(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageHistory);
