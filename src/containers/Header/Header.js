import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
//import CustomScrollbars from '../../components/CustomScrollbars.js';
import { Scrollbars } from 'react-custom-scrollbars-2';
import './Header.scss';
import { USER_ROLE } from "../../utils";
import _ from 'lodash';
import {    LayoutDashboard,
  ArrowLeftRight,
  UsersRound,
  SquarePen,
  MapPinPlus,
  ChevronRight,LogOut  } from "lucide-react";
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
  {/*userInfo.roleId ===  USER_ROLE.ADMIN && userInfo?(*/
    <>
    {userInfo.roleId ===  USER_ROLE.ADMIN ? (
      <div className="header-container">Hi admin {userInfo ? (userInfo.firstName +' '+ userInfo.lastName): 'hmm'}</div>) : (
<div className="header-container">Hi Owner {userInfo ? (userInfo.firstName +' '+ userInfo.lastName): 'hmm'}</div>
      )
      }
        
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
            
          
        
        </ul>
      </div> 
    
    
    </>
    /**/}





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
          <br />          <br />           <br />  


</Scrollbars>
     {/**  </CustomScrollbars>*/}
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
