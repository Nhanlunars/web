import React, { Component } from "react";
import { connect } from "react-redux";
import { CRUD_ACTIONS, CommonUtils, USER_ROLE } from "../../../utils";
import * as actions from "../../../store/actions";
import "./InfoRedux.scss";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import TableManageInfo from "./TableManageInfo";
class InfoRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userArr: [],
      previewImgURL: "",
      isOpen: false,

      bank_name: "",
      user: "",
      account_number: "",
      account_name: "",
      picture: "",

      action: "",
      infoEditId: "",
    };
  }

  async componentDidMount() {
    const { userInfo } = this.props;
    if (userInfo.roleId === USER_ROLE.ADMIN) {
      this.props.getRole();
    }
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

    if (prevProps.listInfos !== this.props.listInfos) {
      let arrUsers = this.props.userRedux;

      this.setState({
        bank_name: "",
        account_number: "",
        account_name: "",
        picture: "",
        user: arrUsers && arrUsers.length > 0 ? arrUsers[0].id : "",
        action: CRUD_ACTIONS.CREATE,
        previewImgURL: "",
      });
    }
  }

  handleOnchangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImgURL: objectUrl,
        picture: base64,
      });
    }
  };

  openPreviewImage = () => {
    if (!this.state.previewImgURL) return;
    this.setState({
      isOpen: true,
    });
  };

  handlesaveInfo = () => {
    let isValid = this.checkValidateInput();
    if (isValid === false) return;
    let { action } = this.state;
    let { userInfo } = this.props;
    if (userInfo.roleId === USER_ROLE.ADMIN) {
      if (action === CRUD_ACTIONS.CREATE) {
        //fire redux create info
        this.props.createNewInfoRedux({
          user_id: this.state.user_id,
          bank_name: this.state.bank_name,
          account_number: this.state.account_number,
          account_name: this.state.account_name,
          picture: this.state.picture,
        });
      }
      if (action === CRUD_ACTIONS.EDIT) {
        //fire redux edit info
        this.props.editAInfoRedux({
          id: this.state.infoEditId,
          user_id: this.state.user_id,
          bank_name: this.state.bank_name,
          account_number: this.state.account_number,
          account_name: this.state.account_name,
          picture: this.state.picture,
        });
      }
    }
    if (userInfo.roleId === USER_ROLE.OWNER) {
      if (action === CRUD_ACTIONS.CREATE) {
        //fire redux create info
        this.props.createNewInfo({
          user_id: userInfo.id,
          bank_name: this.state.bank_name,
          account_number: this.state.account_number,
          account_name: this.state.account_name,
          picture: this.state.picture,
          userId: userInfo.id,
        });
      }
      if (action === CRUD_ACTIONS.EDIT) {
        //fire redux edit info
        this.props.editAInfo({
          id: this.state.infoEditId,
          bank_name: this.state.bank_name,
          account_number: this.state.account_number,
          account_name: this.state.account_name,
          picture: this.state.picture,
          userId: userInfo.id,
        });
      }
    }
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrCheck = ["bank_name", "account_number", "account_name"];
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

  handleEditInfoFromParent = (info) => {
    let imageBase64 = "";
    if (info.picture) {
      imageBase64 = new Buffer.from(info.picture, "base64").toString("binary");
    }
    this.setState({
      user_id: info.user_id,
      bank_name: info.bank_name,
      account_number: info.account_number,
      account_name: info.account_name,
      picture: "",
      previewImgURL: imageBase64,
      action: CRUD_ACTIONS.EDIT,
      infoEditId: info.id,
    });
  };

  render() {
    let { userInfo } = this.props;

    let users = this.state.userArr;

    let { user_id, bank_name, account_number, account_name } =
      this.state;
    return (
      <div className="info-redux-container">
        <div className="title">Info Redux</div>
        <div className="info-redux-body">
          <div className="container">
            <div className="row">
              <div className="col-12 my-3">
               
              </div>

              <div className="col-3">
                <label>
                  Bank name
                </label>
                <input
                  className="form-control"
                  type="Text"
                  value={bank_name}
                  onChange={(event) => {
                    this.onChangeInput(event, "bank_name");
                  }}
                />
              </div>
              <div className="col-3">
                <label>
                  Account number
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={account_number}
                  onChange={(event) => {
                    this.onChangeInput(event, "account_number");
                  }}
                />
              </div>
              <div className="col-3">
                <label>
                  Account name
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={account_name}
                  onChange={(event) => {
                    this.onChangeInput(event, "account_name");
                  }}
                />
              </div>

              {userInfo.roleId === USER_ROLE.ADMIN ? (
                <div className="col-3">
                  <label>
                    User
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
              ) : (
                ""
              )}
              <div className="col-3">
                <label>
                  QR picture
                </label>
                <div className="preview-image-container">
                  <input
                    id="previewImg"
                    type="file"
                    hidden
                    onChange={(event) => this.handleOnchangeImage(event)}
                  />
                  <label className="label-upload" htmlFor="previewImg">
                    Up load... <i className="fas fa-upload"></i>
                  </label>
                  <div
                    className="preview-image"
                    style={{
                      backgroundImage: `url(${this.state.previewImgURL})`,
                    }}
                    onClick={() => this.openPreviewImage()}
                  ></div>
                </div>
              </div>

              <div className="col-12 my-3">
                <button
                  className={
                    this.state.action === CRUD_ACTIONS.EDIT
                      ? "btn btn-warning"
                      : "btn btn-primary"
                  }
                  onClick={() => this.handlesaveInfo()}
                >
                  {this.state.action === CRUD_ACTIONS.EDIT ? (
                    "Edit               " 
                  ) : (
                    "Create    " 
                  )}
                </button>
              </div>
              <div className="col-12 mb-5">
                <TableManageInfo
                  handleEditInfoFromParentKey={this.handleEditInfoFromParent}
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
    userRedux: state.admin.users,
    listInfos: state.admin.infos,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRole: () => dispatch(actions.getRoleStart()),
    createNewInfoRedux: (data) => dispatch(actions.createNewInfo(data)),
    createNewInfo: (data) => dispatch(actions.createNewInfoo(data)),

    fetchInfoRedux: () => dispatch(actions.fetchAllInfosStart()),
    editAInfoRedux: (data) => dispatch(actions.editAInfo(data)),
    editAInfo: (data) => dispatch(actions.editAInfoo(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InfoRedux);
