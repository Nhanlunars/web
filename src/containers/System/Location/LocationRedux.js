import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { CRUD_ACTIONS , USER_ROLE} from '../../../utils';
import * as actions from "../../../store/actions";
import "./LocationRedux.scss";
import TableManageLocation from './TableManageLocation';
class LocationRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userArr: [],
            isOpen: false,

            location_name: '',
            user: '',
            city: '',
            address: '',
            lastName: '',
            phoneNumber: '',
            district: '',
            ward: '',
            lng: '',
            lat: '',
            
            action: '',
            locationEditId: '',
        }
    }

    async componentDidMount() {
this.props.getUserStart();
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
                user_id: arrUsers && arrUsers.length > 0 ? arrUsers[0].id : ''
            })
        }
        

        if (prevProps.listLocations !== this.props.listLocations) {
            let arrUsers = this.props.userRedux;

            this.setState({
                location_name: '',
            city: '',
            address: '',
            lastName: '',
            phoneNumber: '',
            district: '',
            ward: '',
            lng: '',
            lat: '',
            user: arrUsers && arrUsers.length > 0 ? arrUsers[0].id : '',
                action: CRUD_ACTIONS.CREATE,
                previewImgURL: '',

            })

        }
    }

    

    handlesaveLocation = () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;
        let { action } = this.state;
        let {  userInfo } = this.props;
        if(userInfo.roleId === USER_ROLE.ADMIN){
            let userId = 'All';
            if (action === CRUD_ACTIONS.CREATE) {
                //fire redux create location
                this.props.createNewLocation({
                    location_name: this.state.location_name,
                    user_id:  this.state.user_id,
                    city: this.state.city,
                    address: this.state.address,
                    ward: this.state.ward,
                    district: this.state.district,
                    lng: this.state.lng,
                    lat: this.state.lat
                })
            }
    
            if (action === CRUD_ACTIONS.EDIT) {
                //fire redux edit location
                this.props.editALocationRedux({
                    id: this.state.locationEditId,
                    location_name: this.state.location_name,
                    user_id: this.state.user_id,
                    city: this.state.city,
                    address: this.state.address,
                    ward: this.state.ward,
                    district: this.state.district,
                    lng: this.state.lng,
                    lat: this.state.lat
                })
            }
        }
        if(userInfo.roleId === USER_ROLE.OWNER){
            let userId = userInfo.id;
        if (action === CRUD_ACTIONS.CREATE) {
            //fire redux create location
            this.props.createNewLocation({
                location_name: this.state.location_name,
                user_id:  userId,
                city: this.state.city,
                address: this.state.address,
                ward: this.state.ward,
                district: this.state.district,
                lng: this.state.lng,
                lat: this.state.lat
            })
        }

        if (action === CRUD_ACTIONS.EDIT) {
            //fire redux edit location
            this.props.editALocationRedux({
                id: this.state.locationEditId,
                location_name: this.state.location_name,
                city: this.state.city,
                address: this.state.address,
                ward: this.state.ward,
                district: this.state.district,
                lng: this.state.lng,
                lat: this.state.lat
            })
        }
    }


    }

    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ["location_name", "city", "address",
            "ward", "district", "lng","lat"]
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('This input is required: ' + arrCheck[i])
                break;
            }
        }
        return isValid;
    }

    onChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }

    handleEditLocationFromParent = (location) => {
        let {  userInfo } = this.props;

    if(userInfo.roleId === USER_ROLE.ADMIN){
        this.setState({
            location_name: location.location_name,
            user_id: location.user_id,
            city: location.city,
            address: location.address,
            ward: location.ward,
            district: location.district,
            lng: location.lng,
            lat: location.lat,
            action: CRUD_ACTIONS.EDIT,
            locationEditId: location.id
        })
        }
    if(userInfo.roleId === USER_ROLE.OWNER){
        this.setState({
            location_name: location.location_name,
            //user_id: location.user_id,
            city: location.city,
            address: location.address,
            ward: location.ward,
            district: location.district,
            lng: location.lng,
            lat: location.lat,
            action: CRUD_ACTIONS.EDIT,
            locationEditId: location.id
        })
                                }
        // this.setState({
        //     location_name: location.location_name,
        //     user_id: location.user_id,
        //     city: location.city,
        //     address: location.address,
        //     ward: location.ward,
        //     district: location.district,
        //     lng: location.lng,
        //     lat: location.lat,
        //     action: CRUD_ACTIONS.EDIT,
        //     locationEditId: location.id
        // })
    }

    render() {

        let users = this.state.userArr;
        let {  userInfo } = this.props;
        let { location_name, user_id, city, address, ward,
            district, lng, lat } = this.state;
        return (
            <div className='location-redux-container'>

                <div className="title" >Location Redux</div>
                <div className='location-redux-body'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 my-3'><FormattedMessage id='manage-location.add' /></div>

                            <div className='col-3'>
                                <label><FormattedMessage id='location_name' /></label>
                                <input className='form-control' type='location_name'
                                    value={location_name}
                                    onChange={(event) => { this.onChangeInput(event, 'location_name') }}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='city' /></label>
                                <input className='form-control' type='text'
                                    value={city}
                                    onChange={(event) => { this.onChangeInput(event, 'city') }}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='ward' /></label>
                                <input className='form-control' type='text'
                                    value={ward}
                                    onChange={(event) => { this.onChangeInput(event, 'ward') }}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='district' /></label>
                                <input className='form-control' type='text'
                                    value={district}
                                    onChange={(event) => { this.onChangeInput(event, 'district') }}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='lng' /></label>
                                <input className='form-control' type='text'
                                    value={lng}
                                    onChange={(event) => { this.onChangeInput(event, 'lng') }}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='lat' /></label>
                                <input className='form-control' type='text'
                                    value={lat}
                                    onChange={(event) => { this.onChangeInput(event, 'lat') }}
                                />
                            </div>
                            <div className='col-9'>
                                <label><FormattedMessage id='Address' /></label>
                                <input className='form-control' type='text'
                                    value={address}
                                    onChange={(event) => { this.onChangeInput(event, 'address') }}
                                />
                            </div>
                            {userInfo.roleId === USER_ROLE.ADMIN  ?( 
                                 <div className='col-3'>
                                 <label><FormattedMessage id='user' /></label>
                                 <select className="form-control"
                                     value={user_id}
                                     onChange={(event) => { this.onChangeInput(event, 'user_id') }}
                                 >
                                     {users && users.length > 0 &&
                                         users.map((item, index) => {
                                             return (<option key={index} value={item.id}>{item.email}</option>
                                             )
                                         })
                                     }
 
                                 </select>
                             </div>
                                                            ):''}
                            
                           
                            
                            <div className='col-12 my-3'>
                                <button className={this.state.action === CRUD_ACTIONS.EDIT ? 'btn btn-warning' : 'btn btn-primary'}
                                    onClick={() => this.handlesaveLocation()}
                                >
                                    {this.state.action === CRUD_ACTIONS.EDIT ?
                                        <FormattedMessage id='Edit               ' /> :
                                        <FormattedMessage id='Save    ' />}
                                </button>
                            </div>
                            <div className='col-12 mb-5'>
                                <TableManageLocation
                                    handleEditLocationFromParentKey={this.handleEditLocationFromParent}
                                    action={this.state.action}
                                />
                            </div>
                        </div>
                    </div>

                </div>

                

            </div>

        )
    }

}

const mapStateToProps = state => {
    return {
        userRedux: state.admin.users,
        listLocations: state.admin.locations,
        userInfo: state.user.userInfo,
    };
};


const mapDispatchToProps = dispatch => {
                return {
                    getUserStart: () => dispatch(actions.fetchAllUsersStart()),
                    createNewLocation: (data) => dispatch(actions.createNewLocation(data)),
                    //fetchLocationRedux: (userId) => dispatch(actions.fetchAllLocationsStart(userId)),
                    editALocationRedux: (data) => dispatch(actions.editALocation(data)),
            
                
            
                };
            }
        
            

export default connect(mapStateToProps, mapDispatchToProps)(LocationRedux);

