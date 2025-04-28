import axios from '../axios'


const handleLogin = (userEmail, userPassword) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword });
}

const getAllUsers = (inputId) => {
    //tamplate string
    return axios.get(`/api/get-all-user?id=${inputId}`)
}

const createNewUserService = (data) => {
    //console.log('check data from service: ', data)
    return axios.post('/api/create-new-user', data)
}

const deleteUserService = (userId) => {
    //return axios.post('/api/delete-user', { id: userId })
    return axios.delete('/api/delete-user', {
        data: {
            id: userId
        }
    });
}

const editUserService = (inputData) => {
    return axios.put('/api/edit-user', inputData);
}

const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`)
}


const getAllLocations = (inputId) => {
    //tamplate string
    return axios.get(`/api/get-all-location?id=${inputId}`)
}

const createNewLocationService = (data) => {
    //console.log('check data from service: ', data)
    return axios.post('/api/create-location', data)
}

const deleteLocationService = (locationId) => {
    //return axios.post('/api/delete-user', { id: userId })
    return axios.delete('/api/delete-location', {
        data: {
            id: locationId
        }
    });
}

const editLocationService = (inputData) => {
    return axios.put('/api/edit-location', inputData);
}


const getAllChargers = (inputId) => {
    //tamplate string
    return axios.get(`/api/get-all-charger?id=${inputId}`)
}

const createNewChargerService = (data) => {
    //console.log('check data from service: ', data)
    return axios.post('/api/create-charger', data)
}

const deleteChargerService = (chargerId) => {
    //return axios.post('/api/delete-user', { id: userId })
    return axios.delete('/api/delete-charger', {
        data: {
            id: chargerId
        }
    });
}

const editChargerService = (inputData) => {
    return axios.put('/api/edit-charger', inputData);
}


const getAllTypes = (inputId) => {
    //tamplate string
    return axios.get(`/api/get-all-type?id=${inputId}`)
}

const createNewTypeService = (data) => {
    //console.log('check data from service: ', data)
    return axios.post('/api/create-type', data)
}

const deleteTypeService = (typeId) => {
    //return axios.post('/api/delete-user', { id: userId })
    return axios.delete('/api/delete-type', {
        data: {
            id: typeId
        }
    });
}

const editTypeService = (inputData) => {
    return axios.put('/api/edit-type', inputData);
}


const getAllReservations = (inputId) => {
    return axios.get(`/api/get-all-reservation?id=${inputId}`)
}

const createNewReservationService = (data) => {
    return axios.post('/api/create-reservation', data)
}

const deleteReservationService = (reservationId) => {
    return axios.delete('/api/delete-reservation', {
        data: {
            id: reservationId
        }
    });
}

const editReservationService = (inputData) => {
    return axios.put('/api/edit-reservation', inputData);
}


export {
    handleLogin, getAllUsers,
    createNewUserService, deleteUserService,
    editUserService, getAllCodeService,
    getAllLocations, createNewLocationService,
    deleteLocationService, editLocationService,
    getAllChargers, createNewChargerService,
    deleteChargerService, editChargerService,
    getAllTypes, createNewTypeService,
    deleteTypeService, editTypeService,
    getAllReservations, createNewReservationService,
    deleteReservationService, editReservationService,

}