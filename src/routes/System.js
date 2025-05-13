import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import UserManage from "../containers/System/UserManage";
import UserRedux from "../containers/System/Admin/UserRedux";
import LocationRedux from "../containers/System/Location/LocationRedux";
import ChargerRedux from "../containers/System/Charger/ChargerRedux";
import TypeRedux from "../containers/System/Type/TypeRedux";
import ReservationRedux from "../containers/System/Reservation/ReservationRedux";
import HistoryRedux from "../containers/System/History/HistoryRedux";
import InfoRedux from "../containers/System/Info/InfoRedux";
import FeedbackRedux from "../containers/System/Feedback/FeedbackRedux";
import DeviceRedux from "../containers/System/Device/DeviceRedux";
import MaintenanceRedux from "../containers/System/Maintenance/MaintenanceRedux";
import NotificationRedux from "../containers/System/Notification/NotificationRedux";
import OtpRedux from "../containers/System/Otp/OtpRedux";
import Header from "../containers/Header/Header";
import Dashboard from "../containers/System/Dashboard/Dashboard";
import "../styles/common.scss";

class System extends Component {
  render() {
    const { systemMenuPath, isLoggedIn } = this.props;
    return (
      <React.Fragment>
        {isLoggedIn && <Header />}
        <div className="system-container">
          <div className="system-list">
            <Switch>
              <Route path="/system/dashboard" component={Dashboard} />
              <Route path="/system/user-manage" component={UserManage} />
              <Route path="/system/user-management" component={UserRedux} />
              <Route
                path="/system/location-management"
                component={LocationRedux}
              />
              <Route
                path="/system/charger-management"
                component={ChargerRedux}
              />
              <Route path="/system/type-management" component={TypeRedux} />
              <Route
                path="/system/reservation-management"
                component={ReservationRedux}
              />
              <Route
                path="/system/history-management"
                component={HistoryRedux}
              />
              <Route path="/system/info-management" component={InfoRedux} />
              <Route
                path="/system/feedback-management"
                component={FeedbackRedux}
              />
              <Route path="/system/device-management" component={DeviceRedux} />
              <Route
                path="/system/maintenance-management"
                component={MaintenanceRedux}
              />
              <Route
                path="/system/notification-management"
                component={NotificationRedux}
              />
              <Route path="/system/otp-management" component={OtpRedux} />
              <Route
                component={() => {
                  return <Redirect to={systemMenuPath} />;
                }}
              />
            </Switch>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    systemMenuPath: state.app.systemMenuPath,
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
