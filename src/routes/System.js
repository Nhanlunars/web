import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../containers/System/UserManage';
import UserRedux from '../containers/System/Admin/UserRedux';
import LocationRedux from '../containers/System/Location/LocationRedux';
import ChargerRedux from '../containers/System/Charger/ChargerRedux';
import TypeRedux from '../containers/System/Type/TypeRedux';
import ReservationRedux from '../containers/System/Reservation/ReservationRedux';


import Header from '../containers/Header/Header';
import ProductManage from '../containers/System/ProductManage';
import RegisterPackageGroupOrAcc from '../containers/System/RegisterPackageGroupOrAcc';
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
                        <Route path="/system/user-manage" component={UserManage} />
                        <Route path="/system/user-management" component={UserRedux} />
                        <Route path="/system/location-management" component={LocationRedux} />
                        <Route path="/system/charger-management" component={ChargerRedux} />
                        <Route path="/system/type-management" component={TypeRedux} />
                        <Route path="/system/reservation-management" component={ReservationRedux} />


                        <Route path="/system/product-manage" component={ProductManage} />
                        <Route path="/system/register-package-group-or-account" component={RegisterPackageGroupOrAcc} />
                        <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
                    </Switch>
                </div>
            </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
