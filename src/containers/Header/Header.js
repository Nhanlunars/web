import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, ownerMenu } from './menuApp';
import CustomScrollbars from '../../components/CustomScrollbars.js';
import './Header.scss';
import { USER_ROLE } from "../../utils";
import _ from 'lodash';
import { Link } from "react-router-dom";
import {
    LayoutDashboard,
    ArrowLeftRight,
    UsersRound,
    SquarePen,
    MapPinPlus,
    ChevronRight,
    LogOut,
  } from "lucide-react";


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuApp: []
        }
    }

    componentDidMount() {
        let { userInfo } = this.props;
        let menu = [];
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
        })
    }

    render() {
        const { processLogout, userInfo } = this.props;

        return (
                                  
          
            <div className="sidebar">
<CustomScrollbars style={{ height: '100vh', width: '100%' }}>
            <div className="header-container">
                {/* thanh navigator */}
                {/*<div className="header-tabs-container">
                    <Navigator menus={this.state.menuApp} /> 
                   {/* <Navigator menus={adminMenu} />}
                </div>*/}
<div className='languages'>
<span className='welcome' ><FormattedMessage id='Welcome ' />
                        {userInfo && userInfo.firstName ? userInfo.lastName : 'hmm'}
                    </span>
{/* nút logout */}
{/*<div className="btn btn-logout" onClick={processLogout}>
                    <i className="fas fa-sign-out-alt"></i>
                </div>*/}
</div>     
            </div>
            <div className="navigationBar">
        <ul>
          <li>
            <LayoutDashboard />
            <Link to="/" className="link">
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
            <UsersRound />
            <Link to="/system/charger-management" className="link">
              Charger management
            </Link>
            <ChevronRight />
          </li>
          <li>
            <SquarePen />
            <Link to="/system/type-management" className="link">
              Type management
            </Link>
            <ChevronRight />
          </li>
          <li>
            <MapPinPlus />
            <Link to="/system/reservation-management" className="link">
              Reservation management
            </Link>
            <ChevronRight />
          </li>
          <li>
          <ArrowLeftRight />
          <Link to="/system/history-management" className="link">
              History management
            </Link>
            <ChevronRight />
          </li>
          <li>
            <MapPinPlus />
            <Link to="/system/info-management" className="link">
              Info management
            </Link>
            <ChevronRight />
          </li>
          <li>
            <MapPinPlus />
            <Link to="/system/feedback-management" className="link">
              Feedback management
            </Link>
            <ChevronRight />
          </li>
          <li>
            <MapPinPlus />
            <Link to="/system/device-management" className="link">
              Device management
            </Link>
            <ChevronRight />
          </li>
          <li>
            <MapPinPlus />
            <Link to="/system/maintenance-management" className="link">
            Maintenance management
            </Link>
            <ChevronRight />
          </li>
          <li>
            <MapPinPlus />
            <Link to="/system/notification-management" className="link">
              Notification management
            </Link>
            <ChevronRight />
          </li>
          <li>
            <MapPinPlus />
            <Link to="/system/otp-management" className="link">
              Otp management
            </Link>
            <ChevronRight />
          </li>
          {/* Mục Quản lý giao dịch chỉ hiển thị khi roleName là "ROLE_ADMIN" */}
            
          
          <br />
          <hr />
          {/* Button Đăng Xuất */}
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
            Đăng xuất
          </button>
        </ul>
      </div>

      </CustomScrollbars>
            </div>
           

        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
