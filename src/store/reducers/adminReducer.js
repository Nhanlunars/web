import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    genders: [],
    roles: [],
    statuss: [],
    users: [],
    roleIds: [],
    locations: [],
    chargers: [],
    types: [],
    reservations: [],
    historys: [],
    infos: [],
    feedbacks: [],
    devices: [],
    maintenances: [],
    notifications: [],
    otps: [],
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            let copyState = { ...state };
            copyState.isLoadingGender = true;
            return {
                ...copyState
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data;
            state.isLoadingGender = false;
            return {
                ...state
            }
        case actionTypes.FETCH_GENDER_FAILED:
            state.isLoadingGender = false;
            state.genders = [];
            return {
                ...state
            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_ROLE_FAILED:
            state.roles = [];
            return {
                ...state
            }
            case actionTypes.FETCH_STATUS_SUCCESS:
                state.statuss = action.data;
                return {
                    ...state
                }
            case actionTypes.FETCH_STATUS_FAILED:
                state.statuss = [];
                return {
                    ...state
                }
        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            state.users = action.users;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_USERS_FAILED:
            state.users = [];
            return {
                ...state
            }
            case actionTypes.GET_ALL_ROLE_SUCCESS:
                state.users = action.users;
                return {
                    ...state
                }
            case actionTypes.GET_ALL_ROLE_FAILED:
                state.users = [];
                return {
                    ...state
                }



        case actionTypes.FETCH_ALL_LOCATIONS_SUCCESS:
            state.locations = action.locations;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_LOCATIONS_FAILED:
            state.locations = [];
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_LOCATION_BY_USERID_SUCCESS:
            state.locations = action.locations;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_LOCATION_BY_USERID_FAILED:
            state.locations = [];
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_CHARGERS_SUCCESS:
            state.chargers = action.chargers;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_CHARGERS_FAILED:
            state.chargers = [];
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_CHARGER_BY_LOCATIONID_SUCCESS:
            state.chargers = action.chargers;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_CHARGER_BY_LOCATIONID_FAILED:
            state.chargers = [];
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_TYPES_SUCCESS:
            state.types = action.types;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_TYPES_FAILED:
            state.types = [];
            return {
                ...state
            }
            case actionTypes.FETCH_ALL_TYPE_BY_CHARGERID_SUCCESS:
                state.types = action.types;
                return {
                    ...state
                }
            case actionTypes.FETCH_ALL_TYPE_BY_CHARGERID_FAILED:
                state.types = [];
                return {
                    ...state
                }
        case actionTypes.FETCH_ALL_RESERVATIONS_SUCCESS:
            state.reservations = action.reservations;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_RESERVATIONS_FAILED:
            state.reservations = [];
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_HISTORYS_SUCCESS:
            state.historys = action.historys;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_HISTORYS_FAILED:
            state.historys = [];
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_INFOS_SUCCESS:
                state.infos = action.infos;
                return {
                    ...state
            }
        case actionTypes.FETCH_ALL_INFOS_FAILED:
                state.infos = [];
                return {
                    ...state
            }



        case actionTypes.FETCH_ALL_FEEDBACKS_SUCCESS:
                state.feedbacks = action.feedbacks;
                return {
                    ...state
            }
        case actionTypes.FETCH_ALL_FEEDBACKS_FAILED:
                state.feedbacks = [];
                return {
                    ...state
            }
        case actionTypes.FETCH_ALL_DEVICES_SUCCESS:
                state.devices = action.devices;
                return {
                    ...state
            }
        case actionTypes.FETCH_ALL_DEVICES_FAILED:
            state.devices = [];
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_MAINTENANCES_SUCCESS:
                state.maintenances = action.maintenances;
                return {
                    ...state
            }
        case actionTypes.FETCH_ALL_MAINTENANCES_FAILED:
                state.maintenances = [];
                return {
                    ...state
            } 
        case actionTypes.FETCH_ALL_NOTIFICATIONS_SUCCESS:
                state.notifications = action.notifications;
                return {
                    ...state
            }
        case actionTypes.FETCH_ALL_NOTIFICATIONS_FAILED:
                state.notifications = [];
                return {
                    ...state
            }
            case actionTypes.FETCH_ALL_OTPS_SUCCESS:
                state.otps = action.otps;
                return {
                    ...state
            }
        case actionTypes.FETCH_ALL_OTPS_FAILED:
                state.otps = [];
                return {
                    ...state
            }  



                
        default:
            return state;
    }
}

export default adminReducer;