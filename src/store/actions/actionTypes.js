const actionTypes = Object.freeze({
    //app
    APP_START_UP_COMPLETE: 'APP_START_UP_COMPLETE',
    SET_CONTENT_OF_CONFIRM_MODAL: 'SET_CONTENT_OF_CONFIRM_MODAL',
    //user
    ADD_USER_SUCCESS: 'ADD_USER_SUCCESS',
    USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
    USER_LOGIN_FAIL: 'USER_LOGIN_FAIL',
    PROCESS_LOGOUT: 'PROCESS_LOGOUT',
    //admin
    FETCH_GENDER_START: "FETCH_GENDER_START",
    FETCH_GENDER_SUCCESS: "FETCH_GENDER_SUCCESS",
    FETCH_GENDER_FAIDED: "FETCH_GENDER_FAILED",

    FETCH_ROLE_SUCCESS: "FETCH_ROLE_SUCCESS",
    FETCH_ROLE_FAIDED: "FETCH_ROLE_FAILED",

    CREATE_USER_SUCCESS: 'CREATE_USER_SUCCESS',
    CREATE_USER_FAILED: 'CREATE_USER_FAILED',

    EDIT_USER_FAILED: 'EDIT_USER_FAILED',
    EDIT_USER_SUCCESS: 'EDIT_USER_SUCCESS',

    DELETE_USER_SUCCESS: 'DELETE_USER_SUCCESS',
    DELETE_USER_FAILED: 'DELETE_USER_FAILED',

    FETCH_ALL_USERS_SUCCESS: "FETCH_ALL_USERS_SUCCESS",
    FETCH_ALL_USERS_FAILED: "FETCH_ALL_USERS_FAILED",

 
    CREATE_LOCATION_SUCCESS: 'CREATE_LOCATION_SUCCESS',
    CREATE_LOCATION_FAILED: 'CREATE_LOCATION_FAILED',

    EDIT_LOCATION_FAILED: 'EDIT_LOCATION_FAILED',
    EDIT_LOCATION_SUCCESS: 'EDIT_LOCATION_SUCCESS',

    DELETE_LOCATION_SUCCESS: 'DELETE_LOCATION_SUCCESS',
    DELETE_LOCATION_FAILED: 'DELETE_LOCATION_FAILED',

    FETCH_ALL_LOCATIONS_SUCCESS: "FETCH_ALL_LOCATIONS_SUCCESS",
    FETCH_ALL_LOCATIONS_FAILED: "FETCH_ALL_LOCATIONS_FAILED",


    CREATE_CHARGER_SUCCESS: 'CREATE_CHARGER_SUCCESS',
    CREATE_CHARGER_FAILED: 'CREATE_CHARGER_FAILED',

    EDIT_CHARGER_FAILED: 'EDIT_CHARGER_FAILED',
    EDIT_CHARGER_SUCCESS: 'EDIT_CHARGER_SUCCESS',

    DELETE_CHARGER_SUCCESS: 'DELETE_CHARGER_SUCCESS',
    DELETE_CHARGER_FAILED: 'DELETE_CHARGER_FAILED',

    FETCH_ALL_CHARGERS_SUCCESS: "FETCH_ALL_CHARGERS_SUCCESS",
    FETCH_ALL_CHARGERS_FAILED: "FETCH_ALL_CHARGERS_FAILED",


    CREATE_TYPE_SUCCESS: 'CREATE_TYPE_SUCCESS',
    CREATE_TYPE_FAILED: 'CREATE_TYPE_FAILED',

    EDIT_TYPE_FAILED: 'EDIT_TYPE_FAILED',
    EDIT_TYPE_SUCCESS: 'EDIT_TYPE_SUCCESS',

    DELETE_TYPE_SUCCESS: 'DELETE_TYPE_SUCCESS',
    DELETE_TYPE_FAILED: 'DELETE_TYPE_FAILED',

    FETCH_ALL_TYPES_SUCCESS: "FETCH_ALL_TYPES_SUCCESS",
    FETCH_ALL_TYPES_FAILED: "FETCH_ALL_TYPES_FAILED",

})

export default actionTypes;