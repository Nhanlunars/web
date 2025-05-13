import React, { Component } from "react";
import { connect } from "react-redux";
import "./TableManageInfo.scss";
import * as actions from "../../../store/actions";
import { USER_ROLE } from "../../../utils";

class TableManageInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      infosRedux: [],
    };
  }
  componentDidMount() {
    // this.props.fetchInfoRedux();
    const { userInfo } = this.props;
    if (userInfo.roleId === USER_ROLE.ADMIN) {
      this.props.fetchInfoRedux();
    }
    if (userInfo.roleId === USER_ROLE.OWNER) {
      this.props.fetchInfo(userInfo.id);
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listInfos !== this.props.listInfos) {
      this.setState({
        infosRedux: this.props.listInfos,
      });
    }
  }

  handleDeleteInfo = (info) => {
    //this.props.deleteAInfoRedux(info.id);
    const { userInfo } = this.props;
    if (userInfo.roleId === USER_ROLE.ADMIN) {
      this.props.deleteAInfoRedux(info.id);
    }
    if (userInfo.roleId === USER_ROLE.OWNER) {
      this.props.deleteAInfo({ id: info.id, userId: userInfo.id });
    }
  };

  handleEditInfo = (info) => {
    this.props.handleEditInfoFromParentKey(info);
  };

  render() {
    let arrInfos = this.state.infosRedux;
    let { userInfo } = this.props;

    return (
      <React.Fragment>
        <table id="TableManageInfo">
          <tbody>
            <tr>
              {userInfo.roleId === USER_ROLE.ADMIN ? <th> User name </th> : ""}
              <th>Bank name</th>
              <th>Account number</th>
              <th>Account name</th>
              <th>Actions</th>
            </tr>
            {arrInfos &&
              arrInfos.length > 0 &&
              arrInfos.map((item, index) => {
                return (
                  <tr key={index}>
                    {userInfo.roleId === USER_ROLE.ADMIN ? (
                      <td>
                        {item.user.firstName} {item.user.lastName}
                      </td>
                    ) : (
                      ""
                    )}
                    <td>{item.bank_name}</td>
                    <td>{item.account_number}</td>
                    <td>{item.account_name}</td>
                    <td>
                      <button
                        onClick={() => this.handleEditInfo(item)}
                        className="btn-edit"
                      >
                        <i className="fas fa-pencil-alt"></i>{" "}
                      </button>
                      <button
                        onClick={() => this.handleDeleteInfo(item)}
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
    listInfos: state.admin.infos,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchInfoRedux: () => dispatch(actions.fetchAllInfosStart()),
    fetchInfo: (userId) => dispatch(actions.fetchAllInfosByUserIdStart(userId)),

    deleteAInfoRedux: (id) => dispatch(actions.deleteAInfo(id)),
    deleteAInfo: (id) => dispatch(actions.deleteAInfoo(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageInfo);
