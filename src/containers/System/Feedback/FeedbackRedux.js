import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { CRUD_ACTIONS, USER_ROLE } from "../../../utils";
import * as actions from "../../../store/actions";
import "./FeedbackRedux.scss";
import TableManageFeedback from "./TableManageFeedback";
class FeedbackRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userArr: [],
      chargerArr: [],
      typeArr: [],
      isOpen: false,

      rating: "",
      comment: "",

      action: "",
      feedbackEditId: "",
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
    this.props.getTypeStart();
    //this.state.getTypeStart();
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

    if (prevProps.listFeedbacks !== this.props.listFeedbacks) {
      let arrUsers = this.props.userRedux;
      let arrChargers = this.props.chargerRedux;
      let arrTypes = this.props.typeRedux;

      this.setState({
        rating: "",
        comment: "",
        user_id: arrUsers && arrUsers.length > 0 ? arrUsers[0].id : "",
        charger_id:
          arrChargers && arrChargers.length > 0 ? arrChargers[0].id : "",
        type_id: arrTypes && arrTypes.length > 0 ? arrTypes[0].id : "",

        action: CRUD_ACTIONS.CREATE,
      });
    }
  }

  handlesaveFeedback = () => {
    let isValid = this.checkValidateInput();
    if (isValid === false) return;
    let { action } = this.state;
    const { userInfo } = this.props;

    if (userInfo.roleId === USER_ROLE.ADMIN) {
      if (action === CRUD_ACTIONS.CREATE) {
        //fire redux create location
        this.props.createNewFeedbackRedux({
          user_id: this.state.user_id,
          charger_id: this.state.charger_id,
          type_id: this.state.type_id,
          rating: this.state.rating,
          comment: this.state.comment,
        });
      }
      if (action === CRUD_ACTIONS.EDIT) {
        //fire redux edit location
        this.props.editAFeedbackRedux({
          id: this.state.feedbackEditId,
          user_id: this.state.user_id,
          charger_id: this.state.charger_id,
          type_id: this.state.type_id,
          rating: this.state.rating,
          comment: this.state.comment,
        });
      }
    }
    if (userInfo.roleId === USER_ROLE.OWNER) {
      if (action === CRUD_ACTIONS.CREATE) {
        //fire redux create location
        this.props.createNewFeedback({
          user_id: this.state.user_id,
          charger_id: this.state.charger_id,
          type_id: this.state.type_id,
          rating: this.state.rating,
          comment: this.state.comment,
          userId: userInfo.id,
        });
      }
      if (action === CRUD_ACTIONS.EDIT) {
        //fire redux edit location
        this.props.editAFeedback({
          id: this.state.feedbackEditId,
          user_id: this.state.user_id,
          charger_id: this.state.charger_id,
          type_id: this.state.type_id,
          rating: this.state.rating,
          comment: this.state.comment,
          userId: userInfo.id,
        });
      }
    }
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrCheck = ["rating"];
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

  handleEditFeedbackFromParent = (feedback) => {
    this.setState({
      user_id: feedback.user_id,
      charger_id: feedback.charger_id,
      type_id: feedback.type_id,
      rating: feedback.rating,
      comment: feedback.comment,
      action: CRUD_ACTIONS.EDIT,
      feedbackEditId: feedback.id,
    });
  };

  render() {
    let users = this.state.userArr;
    let chargers = this.state.chargerArr;
    let types = this.state.typeArr;
    let { user_id, charger_id, type_id, rating, comment } = this.state;
    console.log("state", this.state);
    return (
      <div className="feedback-redux-container">
        <div className="title">Feedback Redux</div>
        <div className="feedback-redux-body">
          <div className="container">
            <div className="row">
              <div className="col-12 my-3">
              
              </div>

              <div className="col-3">
                <label>
                  Comment
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={comment}
                  onChange={(event) => {
                    this.onChangeInput(event, "comment");
                  }}
                />
              </div>
              <div className="col-3">
                <label>
                  Rating
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={rating}
                  onChange={(event) => {
                    this.onChangeInput(event, "rating");
                  }}
                />
              </div>
              <div className="col-3">
                <label>
                  User
                </label>
                <select
                  className="form-control"
                  type="listbox"
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
                  onClick={() => this.handlesaveFeedback()}
                >
                  {this.state.action === CRUD_ACTIONS.EDIT ? (
                    <FormattedMessage id="Edit               " />
                  ) : (
                    <FormattedMessage id="Save    " />
                  )}
                </button>
              </div>
              <div className="col-12 mb-5">
                <TableManageFeedback
                  handleEditFeedbackFromParentKey={
                    this.handleEditFeedbackFromParent
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
    userInfo: state.user.userInfo,

    listFeedbacks: state.admin.feedbacks,
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

    createNewFeedbackRedux: (data) => dispatch(actions.createNewFeedback(data)),
    createNewFeedback: (data) => dispatch(actions.createNewFeedbackk(data)),

    editAFeedbackRedux: (data) => dispatch(actions.editAFeedback(data)),
    editAFeedback: (data) => dispatch(actions.editAFeedbackk(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackRedux);
