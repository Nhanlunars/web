import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageLocation.scss';
import * as actions from "../../../store/actions";
import {  USER_ROLE } from '../../../utils';

class TableManageLocation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locationsRedux: []
        }
    }
    componentDidMount() {
        //this.props.fetchLocationRedux();
         const {  userInfo } = this.props;
                    if(userInfo.roleId === USER_ROLE.ADMIN){
                        this.props.fetchLocationRedux();
                    }
                    if(userInfo.roleId === USER_ROLE.OWNER){
                        this.props.fetchLocationByUserIdRedux(userInfo.id);
        
                    }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listLocations !== this.props.listLocations) {
            this.setState({
                locationsRedux: this.props.listLocations
            })
        }
    }

    handleDeleteLocation = (location) => {
        this.props.deleteALocationRedux(location.id);
    }

    handleEditLocation = (location) => {
        this.props.handleEditLocationFromParentKey(location)
    }

    render() {
                let { userInfo } = this.props;
        let arrLocations = this.state.locationsRedux;
        return (
            <React.Fragment>
                <table id="TableManageLocation">
                    <tbody>
                        <tr>
                            <th>Location name</th>
                            {userInfo.roleId === USER_ROLE.ADMIN ? (
                                <th> User name </th>
                            ): ''}
                            <th>city</th>
                            <th>Address</th>
                            <th>Ward</th>
                            <th>District</th>
                            <th>lng</th>
                            <th>lat</th>
                            <th>Actions</th>
                        </tr>
                        {arrLocations && arrLocations.length > 0 &&
                            arrLocations.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.location_name}</td>
                                        {userInfo.roleId === USER_ROLE.ADMIN && userInfo ? (
                                        <td>{item.user.firstName} {item.user.lastName}</td>
                                    ):''}
                                        <td>{item.city}</td>
                                        <td>{item.address}</td>
                                        <td>{item.ward}</td>
                                        <td>{item.district}</td>
                                        <td>{item.lng}</td>
                                        <td>{item.lat}</td>
                                        <td>
                                            <button onClick={() => this.handleEditLocation(item)} className='btn-edit' ><i className='fas fa-pencil-alt'></i> </button>
                                            <button onClick={() => this.handleDeleteLocation(item)}
                                                className='btn-delete' ><i className='fas fa-trash'></i> </button>
                                        </td>
                                    </tr>
                                )
                            })


                        }

                    </tbody>
                </table>
            </React.Fragment>
        );
    }

}




const mapStateToProps = state => {
    return {
        listLocations: state.admin.locations,
        userInfo: state.user.userInfo,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchLocationByUserIdRedux: (userId) => dispatch(actions.fetchAllLocationByUserIdStart(userId)),
        fetchLocationRedux: () => dispatch(actions.fetchAllLocationsStart()),
        deleteALocationRedux: (id) => dispatch(actions.deleteALocation(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageLocation);
