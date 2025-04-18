import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { CRUD_ACTIONS, CommonUtils } from '../../../utils';
import * as actions from "../../../store/actions";
import "./ChargerRedux.scss";
import Lightbox from 'react-image-lightbox';
import TableManageCharger from './TableManageCharger';
class ChargerRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chargerArr: [],
            isOpen: false,

            charger_name: '',
            model: '',
            capacity: '',
            status: '',
            installation_date: '',
            last_maintence_date: '',
            location: '',
            image: '',

            action: '',
            chargerEditId: '',
        }
    }

    async componentDidMount() {
this.props.getLocationStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        //render => didupdate
        //hiện tại(this) và quá khứ(previous)
        //[] [3]
        //[3] [3]
        if (prevProps.locationRedux !== this.props.locationRedux) {
            let arrLocation = this.props.locationRedux;
            this.setState({
                locationArr: arrLocation,
                location: arrLocation && arrLocation.length > 0 ? arrLocation[0].id : ''
            })
        }
        

        if (prevProps.listChargers !== this.props.listChargers) {
            let arrLocation = this.props.locationRedux;

            this.setState({
                 charger_name: '',
            model: '',
            capacity: '',
            status: '',
            installation_date: '',
            last_maintence_date: '',
            image: '',
            location: arrLocation && arrLocation.length > 0 ? arrLocation[0].id : '',
                avatar: '',
                action: CRUD_ACTIONS.CREATE,
                previewImgURL: '',

            })

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
                    avatar: base64
                })
            }
        }
    
        openPreviewImage = () => {
            if (!this.state.previewImgURL) return;
            this.setState({
                isOpen: true
            })
        }
    

    handlesaveCharger = () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;
        let { action } = this.state;

        if (action === CRUD_ACTIONS.CREATE) {
            //fire redux create charger
            this.props.createNewCharger({
                charger_name: this.state.charger_name,
                model: this.state.model,
                capacity: this.state.capacity,
                status: this.state.status,
                installation_date: this.state.installation_date,
                last_maintence_date: this.state.last_maintence_date,
                location_id: this.state.location,
                avatar: this.state.avatar
            })
        }
        if (action === CRUD_ACTIONS.EDIT) {
            //fire redux edit charger
            this.props.editAChargerRedux({
                id: this.state.chargerEditId,
                charger_name: this.state.charger_name,
                model: this.state.model,
                capacity: this.state.capacity,
                status: this.state.status,
                installation_date: this.state.installation_date,
                last_maintence_date: this.state.last_maintence_date,
                location_id: this.state.location,
                avatar: this.state.avatar
            })
        }


    }

    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ["charger_name", "model", "capacity",
            "status", "installation_date", "last_maintence_date"]
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

    handleEditChargerFromParent = (charger) => {
        let imageBase64 = '';
        if (charger.image) {
            imageBase64 = new Buffer(charger.image, 'base64').toString('binary');
        }
        this.setState({
            charger_name: charger.charger_name,
            model: charger.model,
            capacity: charger.capacity,
            status: charger.status,
            installation_date: charger.installation_date,
            last_maintence_date: charger.last_maintence_date,
            location: charger.location_id,
            previewImgURL: imageBase64,
            action: CRUD_ACTIONS.EDIT,
            chargerEditId: charger.id
        })
    }

    render() {

        let locations = this.state.locationArr;

        let { charger_name, model, capacity, status, installation_date,
            last_maintence_date,location, avatar } = this.state;
        return (
            <div className='charger-redux-container'>

                <div className="title" >charger Redux</div>
                <div className='charger-redux-body'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 my-3'><FormattedMessage id='manage-charger.add' /></div>

                            <div className='col-3'>
                                <label><FormattedMessage id='charger_name' /></label>
                                <input className='form-control' type='location_name'
                                    value={charger_name}
                                    onChange={(event) => { this.onChangeInput(event, 'charger_name') }}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='model' /></label>
                                <input className='form-control' type='text'
                                    value={model}
                                    onChange={(event) => { this.onChangeInput(event, 'model') }}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='capacity' /></label>
                                <input className='form-control' type='text'
                                    value={capacity}
                                    onChange={(event) => { this.onChangeInput(event, 'capacity') }}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='disstatustrict' /></label>
                                <input className='form-control' type='text'
                                    value={status}
                                    onChange={(event) => { this.onChangeInput(event, 'status') }}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='installation_date' /></label>
                                <input className='form-control' type='text'
                                    value={installation_date}
                                    onChange={(event) => { this.onChangeInput(event, 'installation_date') }}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='last_maintence_date' /></label>
                                <input className='form-control' type='text'
                                    value={last_maintence_date}
                                    onChange={(event) => { this.onChangeInput(event, 'last_maintence_date') }}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='location' /></label>
                                <select className="form-control"
                                    value={location}
                                    onChange={(event) => { this.onChangeInput(event, 'location') }}
                                >
                                    {locations && locations.length > 0 &&
                                        locations.map((item, index) => {
                                            return (<option key={index} value={item.id}>{item.location_name}</option>
                                            )
                                        })
                                    }

                                </select>
                            </div>
                           
                            
                            <div className='col-12 my-3'>
                                <button className={this.state.action === CRUD_ACTIONS.EDIT ? 'btn btn-warning' : 'btn btn-primary'}
                                    onClick={() => this.handlesaveCharger()}
                                >
                                    {this.state.action === CRUD_ACTIONS.EDIT ?
                                        <FormattedMessage id='Edit               ' /> :
                                        <FormattedMessage id='Save    ' />}
                                </button>
                            </div>
   <div className='col-3'>
                                <label><FormattedMessage id='Avatar' /></label>
                                <div className='preview-image-container'>
                                    <input id="previewImg" type="file" hidden
                                        onChange={(event) => this.handleOnchangeImage(event)} />
                                    <label className='label-upload' htmlFor="previewImg">Up load... <i className='fas fa-upload'></i></label>
                                    <div className='preview-image'
                                        style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                        onClick={() => this.openPreviewImage()}

                                    ></div>

                                </div>
                            </div>

                            <div className='col-12 mb-5'>
                                <TableManageCharger
                                    handleEditChargerFromParentKey={this.handleEditChargerFromParent}
                                    action={this.state.action}
                                />
                            </div>
                        </div>
                    </div>

                </div>

                {this.state.isOpen === true &&
                                    <Lightbox
                                        mainSrc={this.state.previewImgURL}
                                        onCloseRequest={() => this.setState({ isOpen: false })}
                                    />
                                }

            </div>

        )
    }

}

const mapStateToProps = state => {
    return {
        locationRedux: state.admin.locations,
        listChargers: state.admin.chargers
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getLocationStart: () => dispatch(actions.fetchAllLocationsStart()),
        createNewCharger: (data) => dispatch(actions.createNewCharger(data)),
        fetchChargerRedux: () => dispatch(actions.fetchAllChargersStart()),
        editAChargerRedux: (data) => dispatch(actions.editACharger(data))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChargerRedux);

