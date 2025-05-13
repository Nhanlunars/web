import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import { Scrollbars } from "react-custom-scrollbars-2";
import "./Header.scss";
import { USER_ROLE } from "../../utils";
import {
  LayoutDashboard,
  BatteryCharging,
  UsersRound,
  SquarePen,
  MessageSquareText,
  Cable,
  MapPinPlus,
  ChevronRight,
  Bell,
  Wrench,
  Calendar,
  Cpu,
  Clock,
  Smartphone,
  LogOut,
} from "lucide-react";
import { Link } from "react-router-dom";

class Header extends Component {
  /*constructor(props) {
        super(props);
        this.state = {
            menuApp: []
        }
    }*/

  componentDidMount() {
    //let { userInfo } = this.props;
    /*let menu = [];
        if (userInfo && !_.isEmpty(userInfo)) {
            let role = userInfo.roleId;
            if (role === USER_ROLE.ADMIN){
                menu = adminMenu;
            }
            if (role === USER_ROLE.OWNER){
                menu = ownerMenu;
            }
        } 

        this.setState({
            menuApp: menu
        })*/
  }

  render() {
    const { processLogout, userInfo } = this.props;

    return (
      <div className="sidebar">
        <Scrollbars style={{ width: 280, height: 700 }}>
          {/*<CustomScrollbars style={{ height: '100vh', width: '100%' }}>*/}
          {
            /*userInfo.roleId ===  USER_ROLE.ADMIN && userInfo?(*/
            <>
              {userInfo.roleId === USER_ROLE.ADMIN ? (
                <div className="header-container">
                  Hi admin{" "}
                  {userInfo
                    ? userInfo.firstName + " " + userInfo.lastName
                    : "hmm"}
                </div>
              ) : (
                <div className="header-container">
                  Hi Owner{" "}
                  {userInfo
                    ? userInfo.firstName + " " + userInfo.lastName
                    : "hmm"}
                </div>
              )}

              <div className="navigationBar">
                <ul>
                  <li>
                    <LayoutDashboard />
                    <Link to="/system/dashboard" className="link">
                      Bảng điều khiển
                    </Link>
                    <ChevronRight />
                  </li>
                  <li>
                    <UsersRound />
                    <Link to="/system/user-management" className="link">
                      User management
                    </Link>
                    <ChevronRight />
                  </li>
                  <li>
                    <MapPinPlus />

                    <Link to="/system/location-management" className="link">
                      Location management
                    </Link>
                    <ChevronRight />
                  </li>
                  <li>
                    <BatteryCharging />
                    <Link to="/system/charger-management" className="link">
                      Charger management
                    </Link>
                    <ChevronRight />
                  </li>
                  <li>
                    <Cable />
                    <Link to="/system/type-management" className="link">
                      Type management
                    </Link>
                    <ChevronRight />
                  </li>
                  <li>
                    <Calendar />
                    <Link to="/system/reservation-management" className="link">
                      Reservation management
                    </Link>
                    <ChevronRight />
                  </li>
                  <li>
                    <Clock />
                    <Link to="/system/history-management" className="link">
                      History management
                    </Link>
                    <ChevronRight />
                  </li>
                  <li>
                    <SquarePen />
                    <Link to="/system/info-management" className="link">
                      Info management
                    </Link>
                    <ChevronRight />
                  </li>
                  <li>
                    <MessageSquareText />
                    <Link to="/system/feedback-management" className="link">
                      Feedback management
                    </Link>
                    <ChevronRight />
                  </li>
                  <li>
                    <Cpu />
                    <Link to="/system/device-management" className="link">
                      Device management
                    </Link>
                    <ChevronRight />
                  </li>
                  <li>
                    <Wrench />
                    <Link to="/system/maintenance-management" className="link">
                      Maintenance management
                    </Link>
                    <ChevronRight />
                  </li>
                  <li>
                    <Bell />
                    <Link to="/system/notification-management" className="link">
                      Notification management
                    </Link>
                    <ChevronRight />
                  </li>
                  {userInfo.roleId === USER_ROLE.ADMIN ? (
                    <li>
                      <Smartphone />
                      <Link to="/system/otp-management" className="link">
                        Otp management
                      </Link>
                      <ChevronRight />
                    </li>
                  ) : (
                    ""
                  )}
                </ul>
              </div>
            </>
            /**/
          }
          &emsp;&emsp;&emsp;&emsp;&emsp;&ensp;
          <button
            onClick={processLogout}
            variant="outlined"
            startIcon={<LogOut />}
            sx={{
              color: "#d32f2f",
              borderColor: "#d32f2f",
              "&:hover": {
                backgroundColor: "#fbeaea",
                borderColor: "#d32f2f",
              },
              margin: 1,
            }}
            Width="30%"
          >
            Đăng xuất <LogOut />
          </button>
          <br /> <br /> <br />
        </Scrollbars>
        {/**  </CustomScrollbars>*/}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
